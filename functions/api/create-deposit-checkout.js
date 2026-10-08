/**
 * Cloudflare Pages Function: /api/create-deposit-checkout
 *
 * Creates a Stripe Checkout session for the $99 refundable deposit
 * on a Bull City Systems working session. The deposit is applied
 * in full to quoted work; refundable if no work is commissioned.
 *
 * Required environment variable (Cloudflare Pages dashboard):
 *   STRIPE_SECRET_KEY — Stripe secret key (paste in Cloudflare, never in code)
 *
 * POST body: { name, email, notes? }
 * Returns: { url } — redirect the browser to the Stripe Checkout URL.
 */
export async function onRequestPost({ request, env }) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "Payments not configured yet." }, 503, cors);
  }

  let body;
  try { body = await request.json(); }
  catch { return json({ error: "Invalid JSON" }, 400, cors); }

  const { name, email, notes } = body || {};
  if (!name || !email) {
    return json({ error: "Name and email are required." }, 400, cors);
  }

  const origin = new URL(request.url).origin;
  const params = new URLSearchParams({
    "payment_method_types[]": "card",
    "mode": "payment",
    "customer_email": email,
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": "Bull City Systems — Working Session Deposit",
    "line_items[0][price_data][product_data][description]": "Refundable $99 deposit, applied in full to quoted work.",
    "line_items[0][price_data][unit_amount]": "9900",
    "line_items[0][quantity]": "1",
    "success_url": origin + "/book/success?session_id={CHECKOUT_SESSION_ID}",
    "cancel_url": origin + "/book/",
    "metadata[customer_name]": name,
    "metadata[notes]": (notes || "").slice(0, 500),
  });

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + env.STRIPE_SECRET_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!stripeRes.ok) {
    const err = await stripeRes.text();
    console.error("Stripe error:", err.slice(0, 300));
    return json({ error: "Could not start checkout. Try again." }, 502, cors);
  }

  const session = await stripeRes.json();
  return json({ url: session.url }, 200, cors);
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
