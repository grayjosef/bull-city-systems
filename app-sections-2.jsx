/* global React */

/* ---------- Pricing ---------- */
const TIERS = [
  {
    name: "Starter Presence",
    price: "$499",
    sub: "starting",
    desc: "A clean, fast one-pager that makes you look like a real business and captures inbound leads.",
    items: [
      "Single-page custom website",
      "Mobile-first responsive build",
      "Intake form & basic analytics",
      "Domain & hosting setup",
    ],
    cta: "Start small",
    go: "WE SHIP IN 72 HOURS",
  },
  {
    name: "Business Website",
    price: "$1,199",
    sub: "starting",
    desc: "A multi-page site for an established small business — services, about, contact, the whole picture.",
    items: [
      "Up to 6 designed pages",
      "Copy support & basic SEO",
      "Lead routing to your inbox",
      "Training & handoff docs",
    ],
    cta: "Most common",
    feature: true,
    go: "WE SHIP IN 14 DAYS",
  },
  {
    name: "Growth System",
    price: "$4,999",
    sub: "starting",
    desc: "Website plus the connected pieces — automation, intake routing, and the workflows behind the scenes.",
    items: [
      "Everything in Business",
      "Workflow automation build",
      "M365 / Google integration",
      "Internal tool or dashboard",
    ],
    cta: "Build the system",
  },
  {
    name: "Custom Technical Work",
    price: "Custom",
    sub: "scoped quote",
    desc: "Migrations, internal tools, app prototypes, IT cleanup, advisory. Quoted clearly before we start.",
    items: [
      "Discovery call & scope doc",
      "Fixed or hourly options",
      "Documented handoff",
      "Optional ongoing support",
    ],
    cta: "Let's scope it",
  },
  {
    name: "Enterprise & Training",
    price: "SOW",
    sub: "or day-rate",
    desc: "For larger orgs and team-wide trainings. Procurement-friendly statements of work, fixed-fee workshops, or a senior operator embedded for the duration.",
    items: [
      "Fixed-fee SOW projects",
      "Half-day & full-day workshops",
      "On-site (Triangle) or remote",
      "NDA / MSA ready",
    ],
    cta: "Talk enterprise",
  },
];

function Pricing() {
  const ref = useReveal();
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">06 / Pricing</span>
          </div>
          <div className="pricing-head">
            <h2 className="h-section">
              Honest starting prices.<br />
              <span className="t-mute">Every quote scoped before work begins.</span>
            </h2>
            <p className="lede pricing-lede">
              No mystery pricing. No bait-and-switch. You'll know the cost,
              the timeline, and what's in scope before a line of code gets written.
            </p>
          </div>
        </div>

        <div className="tiers">
          {TIERS.map((t) => (
            <article key={t.name} className={"tier" + (t.feature ? " tier-feature" : "")}>
              {t.feature && <span className="tier-flag">Most projects fit here</span>}
              <header className="tier-head">
                <h3 className="tier-name">{t.name}</h3>
                {t.go && (
                  <span className="tier-go">
                    <span className="tier-go-dot" />
                    {t.go}
                  </span>
                )}
                <div className="tier-price">
                  <span className="tier-sub eyebrow-mute">{t.sub} at</span>
                  <span className="tier-amt">{t.price}</span>
                </div>
              </header>
              <p className="tier-desc body">{t.desc}</p>
              <ul className="tier-list">
                {t.items.map((i) => (
                  <li key={i}><span className="tier-tick">+</span>{i}</li>
                ))}
              </ul>
              <button
                className={"btn " + (t.feature ? "btn-primary" : "btn-ghost") + " tier-cta"}
                onClick={() => scrollToId("intake")}
              >
                {t.cta} <span className="arrow">→</span>
              </button>
            </article>
          ))}
        </div>

        <p className="pricing-note">
          <span className="numeral">Note —</span> Every quote is scoped clearly before work begins.
          No mystery pricing. No bait and switch.
        </p>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
const STEPS = [
  { n: "01", t: "Review the problem", d: "A short call to hear what's broken, what you've tried, and what you actually need to be true in 30 days." },
  { n: "02", t: "Define the scope", d: "A written scope with deliverables, timeline, and a fixed or capped price. You sign before anything starts." },
  { n: "03", t: "Build and refine", d: "The work happens. You see it as it goes — not surprises at the end. Real check-ins, real revisions." },
  { n: "04", t: "Launch and handoff", d: "Ship it, document it, train your team, and hand back the keys. Optional ongoing support if you want it." },
];

function Process() {
  const ref = useReveal();
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">07 / Process</span>
          </div>
          <h2 className="h-section">
            Four steps.<br />
            <span className="t-mute">No theater.</span>
          </h2>
        </div>

        <ol className="process-list">
          {STEPS.map((s, i) => (
            <li className="process-step" key={s.n}>
              <div className="process-marker">
                <span className="process-num">{s.n}</span>
                {i < STEPS.length - 1 && <span className="process-line" />}
              </div>
              <div className="process-body">
                <h3 className="process-t">{s.t}</h3>
                <p className="body">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Durham Section ---------- */
function Durham() {
  const ref = useReveal();
  return (
    <section id="durham" className="durham">
      <div className="durham-bg" aria-hidden="true">
        <svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" className="durham-skyline">
          {/* abstract horizon — water tower silhouette + warehouse roofs, no real landmarks */}
          <g fill="none" stroke="#2A2F38" strokeWidth="1">
            <path d="M0 480 L120 480 L120 420 L200 420 L200 460 L320 460 L320 380 L360 380 L360 460 L480 460 L500 440 L520 460 L640 460 L640 400 L680 400 L680 360 L720 360 L720 460 L860 460 L860 440 L920 440 L920 470 L1040 470 L1040 410 L1080 410 L1080 380 L1100 380 L1100 410 L1140 410 L1140 470 L1280 470 L1280 450 L1400 450 L1400 600 L0 600 Z" fill="#0E1014" />
            <circle cx="700" cy="330" r="22" />
            <line x1="700" y1="352" x2="700" y2="400" />
            <line x1="688" y1="400" x2="712" y2="400" />
            {/* smokestack */}
            <line x1="380" y1="380" x2="380" y2="320" />
            <rect x="375" y="316" width="10" height="6" />
          </g>
        </svg>
      </div>

      <div className="container durham-inner reveal" ref={ref}>
        <div className="durham-meta">
          <span className="eyebrow">08 / Durham, NC</span>
        </div>
        <h2 className="h-section durham-title">
          Built in Bull City.<br />
          <span className="durham-italic">Built for businesses that serve real people.</span>
        </h2>
        <p className="lede durham-lede">
          Durham knows reinvention. Tobacco warehouses became startups, mills became
          studios, and a stretch of empty road became American Tobacco. The work that
          built this place was practical, hands-on, and accountable to the people doing it.
        </p>
        <p className="lede durham-lede">
          Bull City Systems is built in that same spirit. Not chasing trends, not selling
          dashboards no one opens — just clean technical work for the cafés, contractors,
          clinics, studios, and small operators that make the Triangle actually run.
        </p>

        <div className="durham-stats">
          <div className="dstat">
            <span className="dstat-num">35.99° N</span>
            <span className="dstat-lbl">Latitude</span>
          </div>
          <div className="dstat">
            <span className="dstat-num">78.90° W</span>
            <span className="dstat-lbl">Longitude</span>
          </div>
          <div className="dstat">
            <span className="dstat-num">405 ft</span>
            <span className="dstat-lbl">Elevation</span>
          </div>
          <div className="dstat">
            <span className="dstat-num">EST 1869</span>
            <span className="dstat-lbl">City of Medicine</span>
          </div>
        </div>

        <div className="durham-rally">
          <span className="durham-rally-rule" />
          <h3 className="durham-rally-text">
            Durham was built to <span className="rally-gold">succeed</span>
            <br />
            and so were <span className="rally-red">you</span>.
          </h3>
          <span className="durham-rally-rule" />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Pricing, Process, Durham });
