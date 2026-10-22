/* =====================================================================
 * INTAKE v3: five fields and a problem box.
 * Everything else is collected on the 15-minute call the form promises.
 * POSTs the same shape /api/intake already accepts (services[] is now
 * a single-item array; serviceDetails is empty).
 * ===================================================================== */

function Intake() {
  const useS = window.useStateW || React.useState;
  const [phase, setPhase] = useS("form"); // "form" | "submitting" | "success"
  const [revealed, setRevealed] = useS(false);
  const [errMsg, setErrMsg] = useS("");

  const [name, setName] = useS("");
  const [businessName, setBusinessName] = useS("");
  const [email, setEmail] = useS("");
  const [phone, setPhone] = useS("");
  const [currentWebsite, setCurrentWebsite] = useS("");
  const [biggestProblem, setBiggestProblem] = useS("");
  const [hp, setHp] = useS("");

  async function submit(e) {
    e.preventDefault();
    setErrMsg("");
    if (!name.trim() || !email.trim()) { setErrMsg("Name and email are required."); return; }
    if (!biggestProblem.trim()) { setErrMsg("Tell me what's wrong, even in one sentence."); return; }
    setPhase("submitting");
    try {
      const r = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, businessName, email, phone, currentWebsite,
          location: "", businessType: "",
          services: ["Scan"],
          serviceDetails: {},
          budget: "", timeline: "",
          biggestProblem,
          preferredNextStep: "Schedule a discovery call",
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          _hp: hp,
        }),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err.error || `Server returned ${r.status}`);
      }
      setPhase("success");
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Email hello@bullcitysystems.com directly.");
      setPhase("form");
    }
  }

  if (phase === "success") return <IntakeSuccess name={name} />;

  return (
    <section id="intake" className="section section-intake">
      <div className="container">
        <div className="section-head">
          <span className="section-num">10</span>
          <h2 className="section-title">Tell me what's wrong.</h2>
          <p className="section-lead">
            Five fields. I read every one and reach out within 72 hours to set a 15-minute call.
            We'll figure out scope and price together on that call, not in a form.
          </p>
        </div>

        {!revealed && (
          <div className="intake-gate">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => setRevealed(true)}>
              Start <span className="arrow">→</span>
            </button>
            <p className="intake-gate-alt">
              Or skip the form: <a href="/book/">book a call</a> · <a href="tel:+19192839006">(919) 283-9006</a> · <a href="mailto:hello@bullcitysystems.com">hello@bullcitysystems.com</a>
            </p>
          </div>
        )}

        <form className="intake-form" onSubmit={submit} noValidate hidden={!revealed}>
          <div className="intake-grid">
            <Field label="Name *">
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Business">
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} autoComplete="organization" />
            </Field>
            <Field label="Email *">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </Field>
            <Field label="Phone">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </Field>
            <Field label="Current website" full>
              <input type="text" placeholder="https://" value={currentWebsite} onChange={(e) => setCurrentWebsite(e.target.value)} />
            </Field>
            <Field label="What's wrong? *" full>
              <textarea rows={4} value={biggestProblem} onChange={(e) => setBiggestProblem(e.target.value)}
                        placeholder="The thing that, if fixed, would change the most for your business right now. One sentence is fine." />
            </Field>
          </div>

          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", height: 0, overflow: "hidden" }}>
            <label>Don't fill this in: <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
          </div>

          {errMsg && <div className="intake-error">{errMsg}</div>}

          <div className="intake-submit-row">
            <button type="submit" className="btn btn-primary btn-lg" disabled={phase === "submitting"}>
              {phase === "submitting" ? "Sending…" : "Send it"}
            </button>
            <p className="intake-disclaimer">
              No obligation. No mystery pricing. 72 hours.
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

function IntakeSuccess({ name }) {
  const bookingUrl = (typeof window !== "undefined" && window.BOOKING_URL) || "/book/";
  return (
    <section id="intake" className="section section-intake intake-success-wrap">
      <div className="container">
        <div className="intake-success">
          <span className="success-mark">✓</span>
          <h2>Got it{name ? `, ${name.split(" ")[0]}` : ""}.</h2>
          <p className="intake-success-lead">
            <strong>I'll reach out within 72 hours</strong> to set a <strong>15-minute call</strong>. Scope and price get worked out there, together.
          </p>
          <a className="btn btn-primary btn-lg success-book-cta" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Skip the wait, book the call now <span className="arrow">→</span>
          </a>
          <div className="intake-success-panel">
            <div className="success-row">
              <span className="success-label">What happens next</span>
              <ol className="success-steps">
                <li>I look at what a customer sees: Google, your site on a phone, booking.</li>
                <li>I reach out within 72 hours with the three things I noticed.</li>
                <li>15-minute call. If it makes sense, we start with the Map.</li>
              </ol>
            </div>
            <div className="success-row">
              <span className="success-label">Need to reach me sooner</span>
              <p className="success-contact">
                <a href="tel:+19192839006">(919) 283-9006</a> · <a href="mailto:hello@bullcitysystems.com">hello@bullcitysystems.com</a>
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
