/* global React */
const { useState: useStateI, useEffect: useEffectI } = React;

/* =====================================================================
   SERVICE-ROUTED INTAKE
   Step 1: Pick service(s)  →  Step 2: Per-service tailored form  →  Step 3: Success
   Each service definition carries its own field list including any
   inspiration / examples collectors. Free-text "in your own words" is
   universal across all forms.
   ===================================================================== */

const SERVICE_DEFS = [
  {
    id: "website",
    title: "Website build or redesign",
    blurb: "A new site, or fixing the one you have. Fast, mobile-first, and built to convert.",
    glyph: "01",
    accent: "blue",
    fields: [
      { kind: "text", id: "currentSite", label: "Current website (if any)", ph: "https://" },
      { kind: "select", id: "scope", label: "Scope", opts: ["One-page presence", "Multi-page small business site", "Redesign of existing site", "E-commerce / online payments", "Not sure yet"] },
      { kind: "select", id: "pageCount", label: "Approximate page count", opts: ["1 page", "3–5 pages", "6–10 pages", "10+ pages", "Not sure yet"] },
      { kind: "chips", id: "features", label: "Features needed", opts: ["Contact form", "Booking", "Online payments", "Blog / news", "Photo gallery", "Member login", "Multi-language", "SEO basics"] },
      { kind: "inspirations", id: "inspirations", label: "Sites you like", hint: "Drop in URLs of sites whose look, feel, or structure you'd want to capture. Add as many as you want." },
      { kind: "textarea", id: "story", label: "What's the site supposed to do, in your own words?", hint: "What should visitors come away knowing, feeling, or doing?", ph: "e.g. Make us look like a real business so wedding clients trust us with $8k bookings…" },
    ],
  },
  {
    id: "automation",
    title: "Intake forms & workflow automation",
    blurb: "Capture leads, route them properly, and automate the busywork in between.",
    glyph: "02",
    accent: "brass",
    fields: [
      { kind: "chips", id: "tools", label: "What you currently use", opts: ["Gmail / Google Workspace", "Microsoft 365 / Outlook", "Calendly / Acuity", "Squarespace / Wix forms", "Spreadsheets", "Other CRM", "Nothing systematic"] },
      { kind: "chips", id: "needs", label: "What needs to happen automatically", opts: ["Lead capture & routing", "Auto-reply / receipt emails", "Calendar booking", "Payment / invoicing", "File / contract sending", "Internal Slack / Teams pings", "Spreadsheet logging"] },
      { kind: "textarea", id: "currentFlow", label: "Walk me through your current workflow", hint: "How does a new lead or order make its way through your business today?", ph: "e.g. They fill out a Squarespace form, it emails my Gmail, I copy details into a spreadsheet, then…" },
      { kind: "inspirations", id: "inspirations", label: "Examples or references", hint: "Tools, sites, or processes you've seen that you'd want to feel like." },
      { kind: "textarea", id: "story", label: "What would 'fixed' look like, in your own words?", ph: "e.g. I want a new lead to book themselves, get a receipt, and land on my calendar with no manual work from me…" },
    ],
  },
  {
    id: "m365",
    title: "Microsoft 365 / cloud cleanup",
    blurb: "Tenant cleanup, licensing, mailboxes, SharePoint, Teams, security baselines.",
    glyph: "03",
    accent: "blue",
    fields: [
      { kind: "select", id: "tenantState", label: "Current state", opts: ["Brand new tenant", "Existing tenant — needs cleanup", "Migrating from Google Workspace", "Migrating between M365 tenants", "Not sure"] },
      { kind: "text", id: "userCount", label: "Approximate number of users", ph: "e.g. 6" },
      { kind: "chips", id: "concerns", label: "Areas of concern", opts: ["Licensing / cost", "Shared mailboxes", "SharePoint / OneDrive", "Teams setup", "Security / MFA", "Backup", "Account offboarding", "Permissions sprawl"] },
      { kind: "textarea", id: "story", label: "What's broken, in your own words?", hint: "What triggered you reaching out today?", ph: "e.g. Last admin left, nobody knows who has access to what, and we just got a phishing scare…" },
      { kind: "inspirations", id: "inspirations", label: "References (optional)", hint: "Any docs, vendors, or reference orgs you want me to look at." },
    ],
  },
  {
    id: "it",
    title: "IT operations support",
    blurb: "Day-to-day IT for small teams. Devices, accounts, vendors, the things that break Friday afternoon.",
    glyph: "04",
    accent: "brick",
    fields: [
      { kind: "select", id: "supportType", label: "What you're after", opts: ["One-time cleanup project", "Ongoing monthly support", "On-call as needed", "Not sure yet"] },
      { kind: "text", id: "teamSize", label: "Team size", ph: "e.g. 4 employees + 2 contractors" },
      { kind: "chips", id: "areas", label: "Areas of support", opts: ["Onboarding / offboarding", "Devices (Mac/Windows)", "Accounts & identity", "Vendor management", "Network / wifi", "Printers", "Backups", "Documentation"] },
      { kind: "textarea", id: "story", label: "What's the current pain, in your own words?", ph: "e.g. Onboarding new hires takes 2 days because nobody knows where the accounts live…" },
    ],
  },
  {
    id: "app",
    title: "App design / internal tool",
    blurb: "Lightweight prototypes, internal tools, custom dashboards that solve real operational pain.",
    glyph: "05",
    accent: "brass",
    fields: [
      { kind: "select", id: "stage", label: "Current stage", opts: ["Just an idea", "Sketches or notes", "Spreadsheet that needs to become a tool", "Existing tool that needs replacing", "Designed but not built"] },
      { kind: "select", id: "audience", label: "Who is this for?", opts: ["My internal team", "My customers", "Both", "A specific client of mine"] },
      { kind: "textarea", id: "problem", label: "What problem does it solve?", ph: "e.g. Right now my dispatch team uses 3 spreadsheets and a group text…" },
      { kind: "inspirations", id: "inspirations", label: "Apps or tools you like", hint: "URLs or names of products whose UX or functionality you'd want to draw from." },
      { kind: "textarea", id: "story", label: "Describe the ideal version, in your own words", ph: "e.g. One screen where I can see today's jobs, drag them between drivers, and ping the customer…" },
    ],
  },
  {
    id: "advising",
    title: "Technical advising",
    blurb: "An hour with a technical operator. Stack reviews, vendor selection, second opinions, roadmaps.",
    glyph: "06",
    accent: "blue",
    fields: [
      { kind: "select", id: "topic", label: "Primary topic", opts: ["Stack / vendor review", "Build vs. buy decision", "Roadmap / priorities", "Hiring or vendor selection", "Second opinion on a quote", "Other"] },
      { kind: "textarea", id: "context", label: "Background — what brings you here?", hint: "The more specific, the more useful the conversation will be.", ph: "e.g. We're being quoted $40k for a CRM rebuild and I want a sanity check before signing…" },
      { kind: "inspirations", id: "inspirations", label: "Anything I should review beforehand", hint: "Links to proposals, current vendors, your existing site, etc." },
    ],
  },
  {
    id: "unsure",
    title: "Not sure yet",
    blurb: "Tell me what's going on. We'll figure out the right path together.",
    glyph: "07",
    accent: "brick",
    fields: [
      { kind: "textarea", id: "story", label: "What's going on, in your own words?", hint: "Vent. Be specific. Be vague. Whatever's useful.", ph: "e.g. Something is broken with how my business runs technically, but I can't tell if it's a website problem, a process problem, or a people problem…" },
      { kind: "inspirations", id: "inspirations", label: "Anything you want me to look at", hint: "Optional — your current site, a competitor, a vendor proposal, anything." },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise engagement",
    blurb: "For larger orgs: scoped projects with NDA, MSA, procurement workflows.",
    glyph: "08",
    accent: "brass",
    fields: [
      { kind: "row", fields: [
        { kind: "text", id: "orgSize", label: "Organization size", ph: "e.g. 250 employees" },
        { kind: "select", id: "engagement", label: "Engagement type", opts: ["One-time scoped project", "Multi-phase migration", "Embedded technical operator", "Procurement-driven RFP", "Not sure yet"] },
      ]},
      { kind: "chips", id: "domains", label: "Project domains", opts: ["M365 / Azure migration", "Security & compliance", "Internal tool / app build", "Vendor / integration work", "Cloud cost optimization", "Identity & access", "Documentation & runbooks"] },
      { kind: "select", id: "compliance", label: "Compliance environment", opts: ["None / standard", "HIPAA", "SOC 2", "PCI", "FERPA", "Government / FedRAMP-adjacent", "Other / multiple"] },
      { kind: "textarea", id: "scope", label: "Scope summary, in your own words", hint: "What is the deliverable? What does success look like?", ph: "e.g. Migrate 240 users from Google Workspace to M365, retire 3 legacy SharePoint sites, baseline security…" },
      { kind: "inspirations", id: "inspirations", label: "Reference docs / existing RFP", hint: "Links to anything procurement has shared, vendor proposals, current architecture docs." },
    ],
  },
  {
    id: "training",
    title: "Training or workshop",
    blurb: "Half-day or full-day sessions for your team. Hands-on, custom, no slideware.",
    glyph: "09",
    accent: "blue",
    fields: [
      { kind: "row", fields: [
        { kind: "text", id: "headcount", label: "Approx. headcount", ph: "e.g. 12" },
        { kind: "select", id: "format", label: "Format", opts: ["Half-day (3 hrs)", "Full-day (6 hrs)", "Two-day deep dive", "Recurring weekly series", "Not sure yet"] },
      ]},
      { kind: "row", fields: [
        { kind: "select", id: "delivery", label: "Delivery", opts: ["On-site (Triangle)", "On-site (travel — let's discuss)", "Remote / Zoom", "Hybrid"] },
        { kind: "select", id: "audience", label: "Audience level", opts: ["Mixed / mostly non-technical", "Power users", "IT / admin staff", "Leadership", "Engineering"] },
      ]},
      { kind: "chips", id: "topics", label: "Topics of interest", opts: ["Microsoft 365 power-user", "Automation for non-engineers (Zapier / Make / Power Automate)", "AI tools your team will actually use", "Security & phishing-resistant habits", "SharePoint & Teams hygiene", "Data hygiene & spreadsheets that don't break", "Custom — describe below"] },
      { kind: "textarea", id: "outcomes", label: "What should they walk out knowing or doing?", ph: "e.g. Every account manager should be able to set up a Zap that emails them when a new lead comes in…" },
      { kind: "inspirations", id: "inspirations", label: "Past trainings or examples", hint: "Sessions you've done that worked, or didn't." },
    ],
  },
  {
    id: "webapp",
    title: "Custom web-based app",
    blurb: "Bespoke web application — portal, dashboard, scheduler, marketplace. Quoted per-project.",
    glyph: "10",
    accent: "brick",
    fields: [
      { kind: "select", id: "stage", label: "Current stage", opts: ["Just an idea", "Validated with users / customers", "Existing tool that needs replacing", "MVP needs to be rebuilt at scale", "Specced and ready to build"] },
      { kind: "select", id: "audience", label: "Primary users", opts: ["Our customers (public-facing)", "Internal team only", "Both — same product", "A specific client / partner network"] },
      { kind: "chips", id: "features", label: "Likely capabilities", opts: ["User accounts & auth", "Payments / billing", "Real-time updates", "File upload / docs", "Reporting / dashboards", "Third-party integrations", "Admin / back-office tools", "Mobile-friendly responsive"] },
      { kind: "row", fields: [
        { kind: "text", id: "userCount", label: "Expected users (year 1)", ph: "e.g. 200, or 5,000" },
        { kind: "select", id: "compliance", label: "Compliance / sensitivity", opts: ["Standard", "HIPAA", "SOC 2", "PCI", "Other / multiple"] },
      ]},
      { kind: "textarea", id: "problem", label: "What does this app do? In your own words.", ph: "e.g. Our crews need a single screen to see today's jobs, log materials used, and have the customer sign off on completion…" },
      { kind: "inspirations", id: "inspirations", label: "Apps or sites you'd want it to feel like", hint: "URLs of products whose UX, layout, or functionality you'd want to draw from." },
    ],
  },
  {
    id: "standalone",
    title: "Standalone / native app",
    blurb: "Native desktop, mobile, or installed app — when a browser tab isn't right. Quoted per-project.",
    glyph: "11",
    accent: "brick",
    fields: [
      { kind: "chips", id: "platforms", label: "Target platforms", opts: ["iOS", "Android", "macOS", "Windows", "Linux", "Cross-platform (one codebase)", "Not sure yet"] },
      { kind: "select", id: "distribution", label: "How will users get it?", opts: ["Public app stores (App Store / Play)", "Direct download / installer", "MDM / enterprise distribution", "Internal-only sideload", "Not sure yet"] },
      { kind: "chips", id: "needs", label: "Why standalone (not web)?", opts: ["Offline-first / spotty connectivity", "Hardware integration (printers, scanners, BLE)", "Native performance / graphics", "OS-level integrations", "App store distribution required", "Customer expectation"] },
      { kind: "textarea", id: "problem", label: "What does this app do? In your own words.", ph: "e.g. Field techs need an iPad app that works offline at job sites, scans equipment barcodes, and syncs back when they hit wifi…" },
      { kind: "inspirations", id: "inspirations", label: "Apps you'd want it to feel like", hint: "Names or App Store / Play Store URLs of native apps you admire." },
    ],
  },
  {
    id: "ai",
    title: "AI integration",
    blurb: "AI in the seams of your business — intake routing, internal copilots, support drafting, workflow agents.",
    glyph: "12",
    accent: "brass",
    fields: [
      { kind: "select", id: "currentUse", label: "How are you using AI today?", opts: ["Not at all yet", "ChatGPT / Claude in a browser tab", "Built-in AI in our existing tools (Notion, M365, Google)", "A few automations / Zapier with AI steps", "Production integrations already, want more"] },
      { kind: "chips", id: "interests", label: "Where you'd want AI working", opts: ["Lead intake & routing", "Customer support replies", "Internal docs / KB search", "Sales research & enrichment", "Drafting proposals / quotes", "Meeting summaries → action items", "Data extraction from documents", "Quality / compliance review"] },
      { kind: "textarea", id: "workflow", label: "A workflow you'd love to automate end-to-end", ph: "e.g. New lead fills out intake → AI scores fit + drafts a personalized reply → routes to the right account manager with context…" },
      { kind: "select", id: "data", label: "Where does the data live today?", opts: ["Microsoft 365 / SharePoint", "Google Workspace / Drive", "Notion / Confluence / wikis", "Salesforce / HubSpot / CRM", "Spreadsheets & email", "All of the above", "Not sure"] },
      { kind: "textarea", id: "concerns", label: "Concerns or constraints", hint: "Privacy, compliance, model choice, on-prem requirements, prior bad experiences — anything.", ph: "e.g. We can't send PHI to OpenAI; needs to stay HIPAA-compliant…" },
      { kind: "inspirations", id: "inspirations", label: "AI products you admire", hint: "URLs of products whose AI integration you'd want yours to feel like." },
    ],
  },
];

/* universal contact fields appended to every per-service form */
const CONTACT_FIELDS = [
  { kind: "row", fields: [
    { kind: "text", id: "name", label: "Name", required: true, ph: "Your full name" },
    { kind: "text", id: "business", label: "Business name", ph: "What it's called" },
  ]},
  { kind: "row", fields: [
    { kind: "text", id: "email", label: "Email", required: true, ph: "you@business.com", type: "email" },
    { kind: "text", id: "phone", label: "Phone", ph: "(919) 555-0123", type: "tel" },
  ]},
  { kind: "row", fields: [
    { kind: "text", id: "location", label: "Location", ph: "Durham, Chapel Hill, Raleigh…" },
    { kind: "select", id: "budget", label: "Budget range", opts: ["Under $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"] },
  ]},
  { kind: "row", fields: [
    { kind: "select", id: "timeline", label: "Timeline", opts: ["ASAP / this month", "1–3 months", "3–6 months", "Just exploring"] },
    { kind: "select", id: "nextStep", label: "Preferred next step", opts: ["Email me", "Call me", "Send me a quote", "Book a consultation"] },
  ]},
];

function Intake() {
  const ref = useReveal();
  const [step, setStep] = useStateI(1);            // 1=pick service, 2=fill form, 3=success
  const [pickedIds, setPickedIds] = useStateI([]); // multi-select of services
  const [activeIdx, setActiveIdx] = useStateI(0);  // which picked service is currently being filled
  const [data, setData] = useStateI({});           // { [serviceId]: { fieldId: value, ... } }
  const [contact, setContact] = useStateI({ nextStep: "Email me" });
  const [errors, setErrors] = useStateI({});

  const picked = pickedIds.map((id) => SERVICE_DEFS.find((s) => s.id === id)).filter(Boolean);
  const active = picked[activeIdx];

  function togglePicked(id) {
    setPickedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  }

  function setField(serviceId, fieldId, value) {
    setData((d) => ({ ...d, [serviceId]: { ...(d[serviceId] || {}), [fieldId]: value } }));
  }

  function goToFormStep() {
    if (pickedIds.length === 0) {
      setErrors({ pick: true });
      return;
    }
    setErrors({});
    setActiveIdx(0);
    setStep(2);
    requestAnimationFrame(() => {
      const el = document.getElementById("intake");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function nextOrSubmit() {
    // validate contact fields only on the final picked service
    if (activeIdx < picked.length - 1) {
      setActiveIdx(activeIdx + 1);
      requestAnimationFrame(() => {
        const el = document.getElementById("intake");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    const errs = {};
    if (!contact.name || !contact.name.trim()) errs.name = true;
    if (!contact.email || !contact.email.includes("@")) errs.email = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // FUTURE: POST { picked: pickedIds, byService: data, contact } to /api/intake
    // The server will email info@bullcitysystems.com and (if nextStep==="Book a consultation")
    // create a Google Calendar hold via the configured calendar.
    console.log("[Bull City Systems intake]", { services: pickedIds, data, contact });
    setStep(3);
    requestAnimationFrame(() => {
      const el = document.getElementById("intake");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function reset() {
    setStep(1); setPickedIds([]); setActiveIdx(0); setData({});
    setContact({ nextStep: "Email me" }); setErrors({});
  }

  return (
    <section id="intake" className="intake">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">11 / Tell me what you need</span>
          </div>
          <div className="intake-head">
            <h2 className="h-section">
              Pick what you need help with.<br />
              <span className="t-mute">I'll route you to the right intake.</span>
            </h2>
            <p className="lede intake-lede">
              Different work needs different details. Choose one or more services and you'll
              get a tailored intake — including space to drop examples and describe things in
              your own words.
            </p>
          </div>
        </div>

        <IntakeProgress step={step} pickedCount={pickedIds.length} activeIdx={activeIdx} />

        {step === 1 && (
          <ServicePicker
            picked={pickedIds}
            onToggle={togglePicked}
            onContinue={goToFormStep}
            error={errors.pick}
          />
        )}

        {step === 2 && active && (
          <ServiceForm
            service={active}
            isLast={activeIdx === picked.length - 1}
            indexOf={activeIdx}
            total={picked.length}
            data={data[active.id] || {}}
            contact={contact}
            errors={errors}
            onField={(fid, v) => setField(active.id, fid, v)}
            onContact={(fid, v) => setContact((c) => ({ ...c, [fid]: v }))}
            onBack={() => {
              if (activeIdx > 0) setActiveIdx(activeIdx - 1);
              else setStep(1);
              requestAnimationFrame(() => {
                const el = document.getElementById("intake");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              });
            }}
            onNext={nextOrSubmit}
          />
        )}

        {step === 3 && (
          <IntakeSuccess
            picked={picked}
            data={data}
            contact={contact}
            onReset={reset}
          />
        )}
      </div>
    </section>
  );
}

/* progress dots */
function IntakeProgress({ step, pickedCount, activeIdx }) {
  const total = Math.max(pickedCount, 1);
  return (
    <div className="intake-progress">
      <span className={"ip-step" + (step >= 1 ? " on" : "")}>
        <span className="ip-dot" />
        <span className="ip-label">Pick services</span>
      </span>
      <span className="ip-line" />
      <span className={"ip-step" + (step >= 2 ? " on" : "")}>
        <span className="ip-dot" />
        <span className="ip-label">
          {step === 2 ? "Tell me about it (" + (activeIdx + 1) + " of " + total + ")" : "Tell me about it"}
        </span>
      </span>
      <span className="ip-line" />
      <span className={"ip-step" + (step >= 3 ? " on" : "")}>
        <span className="ip-dot" />
        <span className="ip-label">Confirm</span>
      </span>
    </div>
  );
}

/* ---------- Step 1: Service Picker ---------- */
function ServicePicker({ picked, onToggle, onContinue, error }) {
  return (
    <div className="picker">
      <div className={"picker-grid" + (error ? " picker-error" : "")}>
        {SERVICE_DEFS.map((s) => {
          const on = picked.includes(s.id);
          return (
            <button
              type="button"
              key={s.id}
              className={"picker-card accent-" + s.accent + (on ? " on" : "")}
              onClick={() => onToggle(s.id)}
              aria-pressed={on}
            >
              <header className="picker-head">
                <span className="numeral">{s.glyph}</span>
                <span className="picker-check">
                  {on ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8.5 L6.5 12 L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : <span className="picker-circle" />}
                </span>
              </header>
              <h3 className="picker-title">{s.title}</h3>
              <p className="picker-blurb">{s.blurb}</p>
            </button>
          );
        })}
      </div>

      <div className="picker-bar">
        <span className="picker-count">
          {picked.length === 0
            ? "Select one or more services"
            : picked.length + " selected"}
        </span>
        <button className="btn btn-primary" onClick={onContinue}>
          Continue <span className="arrow">→</span>
        </button>
      </div>
      {error && <p className="picker-err">Pick at least one service to continue.</p>}
    </div>
  );
}

/* ---------- Step 2: Per-service Form ---------- */
function ServiceForm({ service, isLast, indexOf, total, data, contact, errors, onField, onContact, onBack, onNext }) {
  return (
    <form className="intake-form" onSubmit={(e) => { e.preventDefault(); onNext(); }} noValidate>
      <header className="form-banner">
        <div className="form-banner-meta">
          <span className="numeral">Service {indexOf + 1} of {total}</span>
          <h3 className="form-banner-title">{service.title}</h3>
          <p className="form-banner-blurb">{service.blurb}</p>
        </div>
        <span className={"form-banner-pill accent-" + service.accent}>{service.glyph}</span>
      </header>

      <div className="form-fields">
        {service.fields.map((f) => (
          <RenderField key={f.id} field={f} value={data[f.id]} onChange={(v) => onField(f.id, v)} />
        ))}
      </div>

      {isLast && (
        <div className="form-contact">
          <div className="contact-head">
            <span className="numeral">Contact & logistics</span>
            <h4 className="contact-title">Last thing — how do I reach you?</h4>
          </div>
          {CONTACT_FIELDS.map((row, i) => (
            <div className="form-row" key={i}>
              {row.fields.map((f) => (
                <RenderField key={f.id} field={f} value={contact[f.id]}
                             onChange={(v) => onContact(f.id, v)}
                             error={errors[f.id]} />
              ))}
            </div>
          ))}
        </div>
      )}

      <footer className="form-foot">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button type="submit" className="btn btn-primary btn-lg">
          {isLast ? "Submit request" : "Next service"} <span className="arrow">→</span>
        </button>
      </footer>
    </form>
  );
}

/* ---------- Field renderer ---------- */
function RenderField({ field, value, onChange, error }) {
  if (field.kind === "text") {
    return (
      <label className={"field" + (error ? " field-error" : "")}>
        <span className="field-label">
          <span>{field.label}</span>{field.required && <span className="req">*</span>}
        </span>
        <input className="field-input"
               type={field.type || "text"}
               value={value || ""}
               onChange={(e) => onChange(e.target.value)}
               placeholder={field.ph} />
      </label>
    );
  }
  if (field.kind === "textarea") {
    return (
      <label className="field">
        <span className="field-label">
          <span>{field.label}</span>
          {field.hint && <span className="field-hint">— {field.hint}</span>}
        </span>
        <textarea className="field-textarea"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={field.ph} />
      </label>
    );
  }
  if (field.kind === "select") {
    return (
      <label className="field">
        <span className="field-label"><span>{field.label}</span></span>
        <select className="field-select"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}>
          <option value="">Select one…</option>
          {field.opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  }
  if (field.kind === "chips") {
    const list = Array.isArray(value) ? value : [];
    return (
      <div className="field">
        <span className="field-label">
          <span>{field.label}</span>
          {field.hint && <span className="field-hint">— {field.hint}</span>}
        </span>
        <div className="chips">
          {field.opts.map((o) => {
            const on = list.includes(o);
            return (
              <button type="button" key={o}
                      className={"chip" + (on ? " on" : "")}
                      onClick={() => onChange(on ? list.filter((x) => x !== o) : [...list, o])}>
                <span className="dot" />{o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  if (field.kind === "inspirations") {
    return <InspirationCollector field={field} value={value} onChange={onChange} />;
  }
  return null;
}

/* ---------- Inspiration / examples collector ---------- */
function InspirationCollector({ field, value, onChange }) {
  const list = Array.isArray(value) ? value : [];
  const [draftUrl, setDraftUrl] = useStateI("");
  const [draftNote, setDraftNote] = useStateI("");

  function add() {
    const url = draftUrl.trim();
    if (!url && !draftNote.trim()) return;
    onChange([...list, { url, note: draftNote.trim() }]);
    setDraftUrl(""); setDraftNote("");
  }
  function remove(i) {
    onChange(list.filter((_, idx) => idx !== i));
  }
  function fmtHost(u) {
    try { return new URL(u.startsWith("http") ? u : "https://" + u).hostname.replace(/^www\./, ""); }
    catch { return u; }
  }

  return (
    <div className="field insp-field">
      <span className="field-label">
        <span>{field.label}</span>
        {field.hint && <span className="field-hint">— {field.hint}</span>}
      </span>

      {list.length > 0 && (
        <ul className="insp-list">
          {list.map((item, i) => (
            <li className="insp-item" key={i}>
              <span className="insp-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="insp-body">
                {item.url && (
                  <a href={item.url.startsWith("http") ? item.url : "https://" + item.url}
                     target="_blank" rel="noopener noreferrer"
                     className="insp-url">{fmtHost(item.url)} <span className="insp-arrow">↗</span></a>
                )}
                {item.note && <p className="insp-note">"{item.note}"</p>}
              </div>
              <button type="button" className="insp-x" onClick={() => remove(i)} aria-label="Remove">×</button>
            </li>
          ))}
        </ul>
      )}

      <div className="insp-add">
        <input className="field-input insp-url-input"
               value={draftUrl}
               onChange={(e) => setDraftUrl(e.target.value)}
               placeholder="https:// — paste a URL" />
        <input className="field-input insp-note-input"
               value={draftNote}
               onChange={(e) => setDraftNote(e.target.value)}
               placeholder="What you like about it (optional)" />
        <button type="button" className="btn btn-brass insp-add-btn" onClick={add}>
          + Add
        </button>
      </div>
    </div>
  );
}

/* ---------- Step 3: Success ---------- */
function IntakeSuccess({ picked, data, contact, onReset }) {
  const ref = useReveal();
  const first = (contact.name || "").split(" ")[0];
  const next = contact.nextStep || "Email me";
  return (
    <div className="success reveal in" ref={ref}>
      <div className="success-mark">
        <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="none" stroke="#C8932E" strokeWidth="1.5" />
          <path d="M14 25 L21 32 L34 17" fill="none" stroke="#C8932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="numeral">Request received</span>
      <h2 className="h-section success-title">
        Got it{first ? ", " + first : ""}.<br />
        <span className="t-mute">I'll be in touch within two business days.</span>
      </h2>
      <p className="lede success-lede">
        Your request is on its way to <strong>info@bullcitysystems.com</strong>.{" "}
        {next === "Book a consultation"
          ? "I'll send a calendar link for a 30-minute scoping call."
          : next === "Call me"
          ? "I'll call the number you provided during business hours."
          : next === "Send me a quote"
          ? "I'll review what you sent and reply with a written scope and quote."
          : "I'll reply by email with next steps and any quick questions."}
      </p>

      <div className="success-summary">
        <span className="eyebrow-mute">Summary</span>
        <ul>
          <li><span>Services</span><strong>{picked.map((p) => p.title).join(" · ") || "—"}</strong></li>
          <li><span>Budget</span><strong>{contact.budget || "—"}</strong></li>
          <li><span>Timeline</span><strong>{contact.timeline || "—"}</strong></li>
          <li><span>Next step</span><strong>{next}</strong></li>
        </ul>
      </div>

      <div className="success-ctas">
        <button className="btn btn-ghost" onClick={onReset}>Submit another request</button>
        <a className="btn btn-brass" href="mailto:info@bullcitysystems.com">
          Email directly <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}

/* ---------- Footer (kept here so old footer file can be deleted) ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <hr className="rule" />
        <div className="footer-grid">
          <div className="footer-brand">
            <BCSMark size={44} />
            <div>
              <div className="footer-name">Bull City Systems</div>
              <div className="footer-sub"><span className="t-vet">Veteran-owned</span> technical studio<br />serving Durham and the Triangle</div>
              <div className="footer-arc">An Arc &amp; Anchor studio</div>
            </div>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Studio</span>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToId("services"); }}>Services</a></li>
              <li><a href="#why" onClick={(e) => { e.preventDefault(); scrollToId("why"); }}>Why us</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToId("pricing"); }}>Pricing</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollToId("process"); }}>Process</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToId("about"); }}>About the owner</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Contact</span>
            <ul>
              <li><a href="mailto:info@bullcitysystems.com">info@bullcitysystems.com</a></li>
              <li><span className="t-mute">Phone — by request</span></li>
              <li><span className="t-mute">Durham, North Carolina</span></li>
              <li><a href="#intake" onClick={(e) => { e.preventDefault(); scrollToId("intake"); }}>Free project review →</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Community</span>
            <ul>
              <li><a href="https://moneyoutofpolitics.org" target="_blank" rel="noopener noreferrer">Money Out of Politics ↗</a></li>
              <li><span className="t-mute">A nonprofit by the founder</span></li>
              <li><span className="t-mute">Bull City · NC</span></li>
              <li><span className="t-mute">35.99° N · 78.90° W</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2026 Bull City Systems · bullcitysystems.com</span>
          <span className="t-mute">Built in Durham. Built to last.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Intake, Footer });
