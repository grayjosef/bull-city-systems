/* global React */

/* ---------- Pricing ---------- */
const TIERS = [
  {
    name: "Scan",
    price: "Free",
    sub: "30 min",
    desc: "I look at what a customer sees: Google, your site on a phone, booking. Then a 30-minute chat. You get the three things I noticed.",
    items: ["Public-footprint review", "30-minute call", "Three things I noticed, in writing"],
    cta: "Book the Scan",
  },
  {
    name: "Starter Presence",
    price: "$499",
    sub: "all-in · one page",
    desc: "A clean, fast one-pager that makes you look like a real business and takes bookings. The fastest way to Be Found.",
    items: ["Single-page custom site", "Mobile-first", "Booking + intake wired in", "Domain, hosting, hand over"],
    cta: "Start small",
    go: "I SHIP IN 72 HOURS",
  },
  {
    name: "Map",
    price: "$299",
    sub: "credited to any Build",
    desc: "All four BULL letters scored red / yellow / green. Top five fixes with prices. An hours-back estimate. The $299 comes off whatever we build next.",
    items: ["BULL scorecard", "Top 5 fixes, priced", "Hours-back estimate", "Yours to keep, hire me or not"],
    cta: "Map it",
    feature: true,
    go: "COMES OFF YOUR BUILD",
  },
  {
    name: "Be Found + Unify",
    price: "$2,499",
    sub: "all-in · Map included",
    desc: "Fix the footprint. Google profile claimed and complete, one clear Book button, every listing matched, a brand kit from the logo you already have.",
    items: ["Map included", "Google profile + listings", "Multi-page site or redesign", "Brand kit, copy, hand over"],
    cta: "Build it",
  },
  {
    name: "Link + Lighten",
    price: "$2,999",
    sub: "all-in · Map included",
    desc: "Wire the tools. Live schedule on the site, calendar as source of truth, reply drafts and reminders, a Monday digest, AI only where you approve the result.",
    items: ["Map included", "Booking + calendar integration", "Automations with an off switch", "AI intake, control panel, hand over"],
    cta: "Wire it",
  },
  {
    name: "Care",
    price: "$350–650",
    sub: "per month · cancel any time",
    desc: "I keep it running and send one page of results a month. Fixes, small improvements, and the hours-back number measured, not estimated.",
    items: ["Monthly results page", "Fixes & small improvements", "Priority response", "Cancel any time"],
    cta: "Keep it running",
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
              Every number is the whole number.<br />
              <span className="t-mute">Nothing gets added at the end.</span>
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
              {t.feature && <span className="tier-flag">Start here</span>}
              <header className="tier-head">
                <h3 className="tier-name">{t.name}</h3>
                {t.go && (
                  <span className="tier-go">
                    <span className="tier-go-dot" />
                    {t.go}
                  </span>
                )}
                <div className="tier-price">
                  <span className="tier-sub eyebrow-mute">{t.sub}</span>
                  <span className="tier-amt">{t.price}</span>
                </div>
              </header>
              <p className="tier-desc body">{t.desc}</p>
              <ul className="tier-list">
                {t.items.map((i) => (
                  <li key={i}><span className="tier-tick">+</span>{i}</li>
                ))}
              </ul>
              <a
                className={"btn " + (t.feature ? "btn-primary" : "btn-ghost") + " tier-cta"}
                href="/book/"
              >
                {t.cta} <span className="arrow">→</span>
              </a>
            </article>
          ))}
        </div>

        <p className="pricing-note">
          <span className="numeral">Note:</span> The Map ($299) is baked into every Build price, so if you Map first
          it comes off the Build. Custom software, enterprise work, and team trainings are quoted in writing after the Map.
        </p>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
/* ---------- Process: The BULL Method ---------- */
const STEPS = [
  { n: "01", t: "Scan",      who: "Free · 30 min",         d: "I look at what a customer sees: Google, your website on a phone, booking. Then a 30-minute chat. You get the three things I noticed." },
  { n: "02", t: "Map",       who: "$299 · credited to any Build",      d: "I check all four BULL letters, test your booking end to end, and list your tools and time sinks. You get a scorecard, the top five fixes with prices, and an hours-back estimate. Yours whether or not you hire me for anything else." },
  { n: "03", t: "Build",     who: "From $2,499 all-in · Map included", d: "I do the BULL letters you pick, in order. Fixed footprint, connected tools, automations you approve.",
    bull: [
      { l: "B", t: "Be found",          q: "Can a nearby stranger find you and know what to do next?" },
      { l: "U", t: "Unify",             q: "Is it the same business everywhere?" },
      { l: "L", t: "Link and lighten",  q: "Do your tools talk to each other, and what gets typed twice?" },
      { l: "L", t: "Lock in control",   q: "Can you run it without me?" },
    ] },
  { n: "04", t: "Hand over", who: "Included",              d: "You run it while I watch. Short videos, a list of every account you own, and a teach-back where you do it, not me. Done means you can change it, see it, pause it, and get help without calling me first." },
  { n: "05", t: "Care",      who: "$350 or $650 / month",  d: "I keep it running and send one page of results a month. Fixes, small improvements, and the hours-back number measured, not estimated." },
];

function Process() {
  const ref = useReveal();
  const [open, setOpen] = React.useState(-1);
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">04 / Process</span>
            <span className="aijs-id">THE BULL METHOD · LOOK, PLAN, FIX, TEACH, KEEP</span>
          </div>
          <h2 className="h-section">
            Five steps.<br />
            <span className="t-mute">Nothing gets built before the Map.</span>
          </h2>
          <p className="lede process-lede">
            The Scan earns the conversation. The Map decides what's worth fixing, and it's
            baked into every Build so you never pay for it twice.
          </p>
        </div>

        <ol className="process-list">
          {STEPS.map((s, i) => (
            <li className={"process-step" + (open === i ? " is-open" : "")} key={s.n}>
              <button type="button" className="process-toggle" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <div className="process-marker">
                  <span className="process-num">{s.n}</span>
                  {i < STEPS.length - 1 && <span className="process-line" />}
                </div>
                <div className="process-head">
                  <h3 className="process-t">{s.t}</h3>
                  <span className="process-who">{s.who}</span>
                  <svg className="process-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </button>
              <div className="process-body" hidden={open !== i}>
                <p className="body">{s.d}</p>
                {s.bull && (
                  <ul className="bull-letters">
                    {s.bull.map((b, j) => (
                      <li key={j}>
                        <span className="bull-letter">{b.l}</span>
                        <div>
                          <span className="bull-letter-t">{b.t}</span>
                          <span className="bull-letter-q">{b.q}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="process-rule">
          <span className="numeral">Order rule:</span> fix any red in B or U before building L.
          Automating a messy footprint just spreads the mess faster.
        </p>
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
          {/* abstract horizon: water tower silhouette + warehouse roofs, no real landmarks */}
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
          <span className="eyebrow">07 / Durham, NC</span>
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
          dashboards no one opens, just clean technical work for the cafés, contractors,
          clinics, studios, and small operators that make the Triangle actually run.
        </p>

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
