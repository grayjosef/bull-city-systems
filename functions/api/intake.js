/**
 * Cloudflare Pages Function: /api/intake
 *
 * Receives the multi-service intake form. For each submission:
 *  1. Sends a notification email to quotes@bullcitysystems.com via Resend
 *  2. Writes a row to the Bull City Systems Leads Google Sheet
 *     (one row per submission; customer email is the key for grouping)
 *
 * Required environment variables (set in Cloudflare Pages dashboard):
 *   RESEND_API_KEY              — from resend.com (free tier OK)
 *   NOTIFY_TO_EMAIL             — quotes@bullcitysystems.com
 *   NOTIFY_FROM_EMAIL           — e.g. "Bull City Systems <noreply@bullcitysystems.com>"
 *                                 (must be a verified Resend sender for your domain)
 *   GOOGLE_SHEET_ID             — the long ID from the Sheet URL
 *   GOOGLE_SA_EMAIL             — service-account email
 *   GOOGLE_SA_PRIVATE_KEY       — service-account private key (paste full
 *                                 multi-line PEM exactly; Cloudflare handles \n)
 *
 * The Sheet must be shared with GOOGLE_SA_EMAIL as Editor.
 * Tab name expected: "Leads" (created automatically if missing? no — create
 * it once with the headers from sheet-template.md)
 */

export async function onRequestPost({ request, env }) {
  // -------- CORS / preflight tolerance --------
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400, corsHeaders);
  }

  // -------- Honeypot (silently drop bots) --------
  if (payload._hp) {
    return json({ ok: true }, 200, corsHeaders);
  }

  // -------- Minimal validation --------
  const required = ["name", "email", "services"];
  for (const k of required) {
    if (!payload[k] || (Array.isArray(payload[k]) && payload[k].length === 0)) {
      return json({ error: `Missing required field: ${k}` }, 400, corsHeaders);
    }
  }
  if (!isEmail(payload.email)) {
    return json({ error: "Invalid email" }, 400, corsHeaders);
  }

  // -------- Build canonical record --------
  const now = new Date();
  const record = {
    submittedAt: now.toISOString(),
    submittedAtPretty: now.toLocaleString("en-US", { timeZone: "America/New_York" }),
    name: str(payload.name),
    businessName: str(payload.businessName),
    email: str(payload.email).toLowerCase().trim(),
    phone: str(payload.phone),
    location: str(payload.location),
    currentWebsite: str(payload.currentWebsite),
    businessType: str(payload.businessType),
    services: Array.isArray(payload.services) ? payload.services : [],
    serviceDetails: payload.serviceDetails || {},
    budget: str(payload.budget),
    timeline: str(payload.timeline),
    biggestProblem: str(payload.biggestProblem),
    preferredNextStep: str(payload.preferredNextStep),
    sourceUrl: str(payload.sourceUrl) || request.headers.get("referer") || "",
    userAgent: request.headers.get("user-agent") || "",
    ipHint: request.headers.get("cf-connecting-ip") || "",
  };

  // -------- Fire side effects in parallel; never block on failure --------
  const tasks = [];
  if (env.RESEND_API_KEY && env.NOTIFY_TO_EMAIL && env.NOTIFY_FROM_EMAIL) {
    tasks.push(safe(() => sendNotificationEmail(record, env)));
  }
  if (env.GOOGLE_SHEET_ID && env.GOOGLE_SA_EMAIL && env.GOOGLE_SA_PRIVATE_KEY) {
    tasks.push(safe(() => appendToSheet(record, env)));
  }

  const results = await Promise.all(tasks);
  const failures = results.filter((r) => r && r.error);
  if (failures.length) {
    console.error("Intake side-effect failures:", failures);
  }

  return json({
    ok: true,
    message: "Submission received",
    nextStep: "Someone will contact you within 72 hours to schedule a 30-minute call.",
  }, 200, corsHeaders);
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

/* ===================== Helpers ===================== */

function json(obj, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

function isEmail(s) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function str(v) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

async function safe(fn) {
  try {
    await fn();
    return { ok: true };
  } catch (err) {
    return { error: err.message || String(err) };
  }
}

/* ===================== Resend email ===================== */

async function sendNotificationEmail(record, env) {
  const subject = `New lead — ${record.name}${record.businessName ? " · " + record.businessName : ""}`;
  const servicesLine = record.services.join(", ") || "(none specified)";

  const html = `
    <h2 style="font-family:system-ui,sans-serif;color:#0F1B2D;margin:0 0 12px">${escapeHtml(record.name)}</h2>
    <p style="font-family:system-ui,sans-serif;color:#3A4453;margin:0 0 18px">
      ${record.businessName ? escapeHtml(record.businessName) + " · " : ""}
      <a href="mailto:${escapeHtml(record.email)}">${escapeHtml(record.email)}</a>
      ${record.phone ? " · " + escapeHtml(record.phone) : ""}
    </p>
    <table style="font-family:system-ui,sans-serif;border-collapse:collapse;width:100%;max-width:640px">
      ${row("Submitted", record.submittedAtPretty + " ET")}
      ${row("Location", record.location)}
      ${row("Business type", record.businessType)}
      ${row("Current site", record.currentWebsite)}
      ${row("Services requested", servicesLine)}
      ${row("Budget", record.budget)}
      ${row("Timeline", record.timeline)}
      ${row("Biggest problem", record.biggestProblem)}
      ${row("Preferred next step", record.preferredNextStep)}
      ${row("Source", record.sourceUrl)}
    </table>
    ${Object.keys(record.serviceDetails).length ? `
      <h3 style="font-family:system-ui,sans-serif;color:#0F1B2D;margin:24px 0 8px">Service-specific details</h3>
      <pre style="font-family:ui-monospace,Menlo,monospace;background:#F2EDE4;padding:12px;border-radius:6px;font-size:12px;white-space:pre-wrap">${escapeHtml(JSON.stringify(record.serviceDetails, null, 2))}</pre>
    ` : ""}
  `;

  const text = `
New intake submission

Name: ${record.name}
Business: ${record.businessName}
Email: ${record.email}
Phone: ${record.phone}
Location: ${record.location}
Services: ${servicesLine}
Budget: ${record.budget}
Timeline: ${record.timeline}
Biggest problem: ${record.biggestProblem}
Preferred next step: ${record.preferredNextStep}
Source: ${record.sourceUrl}
Submitted: ${record.submittedAtPretty} ET

Service details:
${JSON.stringify(record.serviceDetails, null, 2)}
  `.trim();

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + env.RESEND_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.NOTIFY_FROM_EMAIL,
      to: [env.NOTIFY_TO_EMAIL],
      reply_to: record.email,
      subject,
      html,
      text,
    }),
  });
  if (!r.ok) {
    throw new Error("Resend " + r.status + ": " + (await r.text()));
  }
}

function row(label, value) {
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#6B5B4F;font-size:13px;vertical-align:top;width:170px">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#0F1B2D;font-size:13px">${escapeHtml(value || "—")}</td>
  </tr>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

/* ===================== Google Sheets append ===================== */

async function appendToSheet(record, env) {
  const accessToken = await getGoogleAccessToken(env);
  const sheetId = env.GOOGLE_SHEET_ID;
  const tab = "Leads";
  const range = `${tab}!A:Z`;

  const values = [[
    record.submittedAtPretty,                         // A — Submitted (ET)
    record.email,                                     // B — Customer email (KEY)
    record.name,                                      // C — Name
    record.businessName,                              // D — Business
    record.phone,                                     // E — Phone
    record.location,                                  // F — Location
    record.businessType,                              // G — Business type
    record.currentWebsite,                            // H — Current site
    record.services.join(", "),                       // I — Services (combined)
    record.budget,                                    // J — Budget
    record.timeline,                                  // K — Timeline
    record.biggestProblem,                            // L — Biggest problem
    record.preferredNextStep,                         // M — Preferred next step
    JSON.stringify(record.serviceDetails),            // N — Service details JSON
    "New",                                            // O — Status (default)
    "",                                               // P — Quote sent?
    "",                                               // Q — Quote amount
    "",                                               // R — Discovery booked?
    "",                                               // S — Follow-up date
    "",                                               // T — Notes
    record.sourceUrl,                                 // U — Source URL
    record.submittedAt,                               // V — Submitted (ISO UTC)
  ]];

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });

  if (!r.ok) {
    throw new Error("Sheets append " + r.status + ": " + (await r.text()));
  }
}

/* ----- Google service-account JWT → access token (no library) ----- */

async function getGoogleAccessToken(env) {
  const header = { alg: "RS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const claim = {
    iss: env.GOOGLE_SA_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat,
    exp: iat + 3600,
  };

  const enc = (obj) => base64url(new TextEncoder().encode(JSON.stringify(obj)));
  const unsigned = `${enc(header)}.${enc(claim)}`;

  const key = await importPrivateKey(env.GOOGLE_SA_PRIVATE_KEY);
  const sigBuf = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    new TextEncoder().encode(unsigned)
  );
  const jwt = `${unsigned}.${base64url(new Uint8Array(sigBuf))}`;

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!r.ok) {
    throw new Error("Google token " + r.status + ": " + (await r.text()));
  }
  const j = await r.json();
  return j.access_token;
}

async function importPrivateKey(pem) {
  const cleaned = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  const der = Uint8Array.from(atob(cleaned), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    der.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function base64url(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
