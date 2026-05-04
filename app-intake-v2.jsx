/* =====================================================================
 * INTAKE — multi-service form with conditional sub-forms
 * ---------------------------------------------------------------------
 * Replaces the prior single-step intake. Flow:
 *   1. Customer fills core contact + business info
 *   2. Selects ONE OR MORE services via checkbox grid
 *   3. Each selected service expands a small sub-form (3–6 fields)
 *   4. Final shared fields: budget / timeline / biggest problem
 *   5. Submit → POST /api/intake → 72-hour confirmation panel
 *
 * On success, the confirmation page tells the visitor explicitly:
 * "Someone will contact you within 72 hours to schedule a 30-minute call."
 * ===================================================================== */

const SERVICE_DEFS = [
  { id: "website_new",     label: "New website",           q: ["What's the site for?", "Any sites you love (URLs)?", "Pages you'll need?"] },
  { id: "website_redesign",label: "Website redesign",      q: ["Current site URL", "What's broken or feels stale?", "Any sites you love (URLs)?"] },
  { id: "intake_form",     label: "Customer intake form",  q: ["What does the form collect?", "Where should submissions go?"] },
  { id: "booking",         label: "Booking setup",         q: ["What kind of appointments?", "Avg session length?"] },
  { id: "payments",        label: "Online payments",       q: ["Stripe, Square, or no preference?", "One-time, recurring, or both?"] },
  { id: "automation",      label: "Automation",            q: ["What's the manual task you keep repeating?", "Tools currently involved?"] },
  { id: "m365",            label: "Microsoft 365 cleanup", q: ["How many users?", "What's broken or messy?"] },
  { id: "cloud",           label: "Cloud setup or migration", q: ["Which platform (Google, Microsoft, AWS)?", "Migrating from where?"] },
  { id: "it_support",      label: "IT support",            q: ["How many endpoints?", "Recurring issues?"] },
  { id: "internal_tool",   label: "Internal tool / dashboard", q: ["What does it need to do?", "Who uses it?"] },
  { id: "app_idea",        label: "App idea",              q: ["Describe the app in one sentence.", "Mobile, web, or both?"] },
  { id: "not_sure",        label: "Not sure yet",          q: ["What problem are you trying to solve?"] },
];

function Intake() {
  const useS = window.useStateW || React.useState;
  const [phase, setPhase] = useS("form"); // "form" | "submitting" | "success" | "error"
  const [errMsg, setErrMsg] = useS("");

  // Core fields
  const [name, setName] = useS("");
  const [businessName, setBusinessName] = useS("");
  const [email, setEmail] = useS("");
  const [phone, setPhone] = useS("");
  const [location, setLocation] = useS("");
  const [currentWebsite, setCurrentWebsite] = useS("");
  const [businessType, setBusinessType] = useS("");

  // Service selection
  const [services, setServices] = useS([]);
  const [serviceDetails, setServiceDetails] = useS({}); // { service_id: { q1: "", q2: "" } }

  // Final shared fields
  const [budget, setBudget] = useS("");
  const [timeline, setTimeline] = useS("");
  const [biggestProblem, setBiggestProblem] = useS("");
  const [preferredNextStep, setPreferredNextStep] = useS("");

  // Honeypot
  const [hp, setHp] = useS("");

  function toggleService(id) {
    setServices((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((s) => s !== id);
        const sd = { ...serviceDetails };
        delete sd[id];
        setServiceDetails(sd);
        return next;
      }
      return [...prev, id];
    });
  }

  function setServiceAnswer(serviceId, qIndex, value) {
    setServiceDetails((prev) => ({
      ...prev,
      [serviceId]: { ...(prev[serviceId] || {}), [`q${qIndex + 1}`]: value },
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setErrMsg("");

    if (!name || !email) {
      setErrMsg("Name and email are required.");
      return;
    }
    if (services.length === 0) {
      setErrMsg("Please select at least one service.");
      return;
    }

    setPhase("submitting");

    const serviceLabels = services.map((id) => {
      const def = SERVICE_DEFS.find((s) => s.id === id);
      return def ? def.label : id;
    });

    try {
      const r = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, businessName, email, phone, location,
          currentWebsite, businessType,
          services: serviceLabels,
          serviceDetails,
          budget, timeline, biggestProblem, preferredNextStep,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          _hp: hp,
        }),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err.error || `Server returned ${r.status}`);
      }
      setPhase("success");
      // Scroll the confirmation into view
      setTimeout(() => {
        const el = document.getElementById("intake");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Please try again or email quotes@bullcitysystems.com directly.");
      setPhase("form");
    }
  }

  if (phase === "success") {
    return <IntakeSuccess name={name} services={services} preferredNextStep={preferredNextStep} />;
  }

  return (
    <section id="intake" className="section section-intake">
      <div className="container">
        <div className="section-head">
          <span className="section-num">08</span>
          <h2 className="section-title">Tell me what you need fixed, built, or improved.</h2>
          <p className="section-lead">
            Pick every service that fits. I'll review your request and reach out within 72 hours to schedule a 30-minute call where we'll talk through the plan and pricing.
          </p>
        </div>

        <form className="intake-form" onSubmit={submit} noValidate>
          {/* Core */}
          <div className="intake-grid">
            <Field label="Name *">
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Business name">
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} autoComplete="organization" />
            </Field>
            <Field label="Email *">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </Field>
            <Field label="Phone">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </Field>
            <Field label="Location">
              <input type="text" placeholder="Durham, Chapel Hill, Raleigh…" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Field>
            <Field label="Current website">
              <input type="text" placeholder="https://" value={currentWebsite} onChange={(e) => setCurrentWebsite(e.target.value)} />
            </Field>
            <Field label="Business type" full>
              <input type="text" placeholder="Law firm, contractor, retail shop, nonprofit…" value={businessType} onChange={(e) => setBusinessType(e.target.value)} />
            </Field>
          </div>

          {/* Service multi-select */}
          <div className="intake-section-head">
            <span className="intake-num">A</span>
            <h3>What do you need help with?</h3>
            <span className="intake-hint">Select all that apply.</span>
          </div>
          <div className="service-grid">
            {SERVICE_DEFS.map((s) => (
              <label key={s.id} className={"service-chip" + (services.includes(s.id) ? " is-on" : "")}>
                <input type="checkbox" checked={services.includes(s.id)} onChange={() => toggleService(s.id)} />
                <span>{s.label}</span>
              </label>
            ))}
          </div>

          {/* Conditional sub-forms */}
          {services.length > 0 && (
            <div className="intake-section-head intake-section-head-sub">
              <span className="intake-num">B</span>
              <h3>A few details on each one</h3>
              <span className="intake-hint">Skip anything you're not sure about.</span>
            </div>
          )}
          {services.map((id) => {
            const def = SERVICE_DEFS.find((s) => s.id === id);
            if (!def) return null;
            return (
              <div key={id} className="service-detail">
                <h4 className="service-detail-title">{def.label}</h4>
                <div className="service-detail-grid">
                  {def.q.map((q, idx) => (
                    <Field key={idx} label={q} full>
                      <textarea
                        rows={2}
                        value={(serviceDetails[id] || {})[`q${idx + 1}`] || ""}
                        onChange={(e) => setServiceAnswer(id, idx, e.target.value)}
                      />
                    </Field>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Final shared */}
          <div className="intake-section-head">
            <span className="intake-num">C</span>
            <h3>Budget, timing, and the big picture</h3>
          </div>
          <div className="intake-grid">
            <Field label="Budget range">
              <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Select a range</option>
                <option>Under $1,500</option>
                <option>$1,500 – $3,000</option>
                <option>$3,000 – $7,500</option>
                <option>$7,500 – $15,000</option>
                <option>$15,000+</option>
                <option>Not sure yet</option>
              </select>
            </Field>
            <Field label="Timeline">
              <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                <option value="">Select a timeline</option>
                <option>ASAP / urgent</option>
                <option>Within 30 days</option>
                <option>1–3 months</option>
                <option>3+ months</option>
                <option>Just exploring</option>
              </select>
            </Field>
            <Field label="Biggest current problem" full>
              <textarea rows={3} value={biggestProblem} onChange={(e) => setBiggestProblem(e.target.value)} placeholder="What's the thing that, if fixed, would change the most for your business right now?" />
            </Field>
            <Field label="Preferred next step" full>
              <select value={preferredNextStep} onChange={(e) => setPreferredNextStep(e.target.value)}>
                <option value="">Select one</option>
                <option>Email me</option>
                <option>Call me</option>
                <option>Send me a quote</option>
                <option>Schedule a discovery call</option>
              </select>
            </Field>
          </div>

          {/* Honeypot — hidden from real users */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", height: 0, overflow: "hidden" }}>
            <label>Don't fill this in: <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
          </div>

          {errMsg && <div className="intake-error">{errMsg}</div>}

          <div className="intake-submit-row">
            <button type="submit" className="btn btn-primary btn-lg" disabled={phase === "submitting"}>
              {phase === "submitting" ? "Sending…" : "Request My Free Project Review"}
            </button>
            <p className="intake-disclaimer">
              No obligation. No mystery pricing. I'll review your request and reach out within 72 hours.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, full, children }) {
  return (
    <label className={"intake-field" + (full ? " intake-field-full" : "")}>
      <span className="intake-label">{label}</span>
      {children}
    </label>
  );
}

function IntakeSuccess({ name, services, preferredNextStep }) {
  const showBookingLink = preferredNextStep === "Schedule a discovery call";
  const bookingUrl = (typeof window !== "undefined" && window.BOOKING_URL) || null;
  return (
    <section id="intake" className="section section-intake intake-success-wrap">
      <div className="container">
        <div className="intake-success">
          <span className="success-mark">✓</span>
          <h2>Got it{name ? `, ${name.split(" ")[0]}` : ""}.</h2>
          <p className="intake-success-lead">
            Your request is in. <strong>Someone will contact you within 72 hours</strong> to discuss your plan, and at that time we'll book a <strong>30-minute call</strong> to walk through scope and pricing together.
          </p>

          {showBookingLink && bookingUrl && (
            <a className="btn btn-primary btn-lg success-book-cta"
               href={bookingUrl}
               target="_blank"
               rel="noopener noreferrer">
              Skip the wait — book your discovery call now <span className="arrow">→</span>
            </a>
          )}

          <div className="intake-success-panel">
            <div className="success-row">
              <span className="success-label">What happens next</span>
              <ol className="success-steps">
                <li>I review what you submitted and prepare an initial read.</li>
                <li>I reach out by your preferred method within 72 hours.</li>
                <li>We schedule a 30-minute discovery call to align on the plan.</li>
                <li>You get a written quote with clear scope. No surprises.</li>
              </ol>
            </div>

            {services.length > 0 && (
              <div className="success-row">
                <span className="success-label">You requested</span>
                <ul className="success-services">
                  {services.map((id) => {
                    const def = SERVICE_DEFS.find((s) => s.id === id);
                    return <li key={id}>{def ? def.label : id}</li>;
                  })}
                </ul>
              </div>
            )}

            <div className="success-row">
              <span className="success-label">Need to reach me sooner</span>
              <p className="success-contact">
                <a href="mailto:quotes@bullcitysystems.com">quotes@bullcitysystems.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

if (typeof window !== "undefined") {
  Object.assign(window, { Intake });
}
