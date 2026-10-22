/* global React */
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

/* ---------- Services Section ---------- */
const SERVICES = [
  {
    n: "01",
    title: "Websites",
    body: "Fast, mobile-first, built to turn a stranger into a booking. Google profile, listings, and the site all pointing at one door.",
    points: ["Design & build", "Booking + intake wired in", "Google profile & listings", "SEO basics & analytics"],
    accent: "blue",
  },
  {
    n: "02",
    title: "Brand & messaging",
    body: "Same name, same voice, same hours everywhere. A small brand kit from the logo you already have, and copy that explains why you in seconds.",
    points: ["Brand kit from your existing logo", "Website & offer copy", "Every listing matched", "Sales collateral"],
    accent: "brass",
  },
  {
    n: "03",
    title: "Custom software",
    body: "Internal tools, portals, dashboards, scheduling, the things off-the-shelf SaaS can't do. Scoped, quoted, built, deployed, maintained.",
    points: ["Discovery & scoping", "Web, mobile, or cloud-native", "CI/CD & monitoring", "Deploy & maintain"],
    accent: "brick",
    cta: "email",
  },
  {
    n: "04",
    title: "IT & cloud",
    body: "Microsoft 365 and Google set up right, secured, documented, and handed back with training. Devices, accounts, backups, and the Friday-afternoon fires.",
    points: ["M365 / Google setup & migration", "MFA, backups, hardening", "Device & account management", "Helpdesk on call"],
    accent: "blue",
  },
  {
    n: "05",
    title: "AI integration",
    body: "Real AI in your real systems, doing real work. Reads your leads, drafts your replies, runs your queues. You approve the result. It never cancels a customer.",
    points: ["Intake that thinks", "Copilots over your own docs", "Support that drafts itself", "AI Jumpstart: setup + training, $999"],
    accent: "brass",
  },
  {
    n: "06",
    title: "Advisory",
    body: "An hour with an operator who has run real systems. Stack reviews, vendor selection, second opinions on a quote, roadmaps. No agency bloat.",
    points: ["Stack & vendor review", "Build vs. buy", "Second opinion on a quote", "Fractional tech leadership"],
    accent: "brick",
  },
];

function Services() {
  const ref = useReveal();
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">03 / Services</span>
          </div>
          <div className="services-head">
            <h2 className="h-section">
              Six things I do.<br />
              <span className="t-mute">Each one, end to end.</span>
            </h2>
            <p className="lede services-lede">
              Whether you're a five-person shop on Foster Street or a 500-person
              organization with a procurement office, the work is the same: real
              technical execution, written down, delivered to spec.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => <ServiceCard key={s.n} s={s} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }) {
  const [open, setOpen] = useState2(false);
  const quoteHref = "mailto:hello@bullcitysystems.com?subject=" + encodeURIComponent("Quote request: " + s.title) + "&body=" + encodeURIComponent("Hi,\n\nI'd like a quote for " + s.title.toLowerCase() + ". A quick summary of what I'm trying to build:\n\n- What it does:\n- Who uses it:\n- Rough timeline:\n- Approximate budget:\n\nThanks.\n");
  return (
    <article
      className={"svc-card accent-" + s.accent + (open ? " is-open is-hover" : "") + (s.cta === "email" ? " has-quote-cta" : "")}
    >
      <div className="card-accent-top" />
      <button type="button" className="svc-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <header className="svc-head">
          <span className="numeral">{s.n}</span>
          <span className="svc-dot" />
        </header>
        <h3 className="svc-title">
          {s.title}
          <svg className="svc-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </h3>
      </button>
      <div className="svc-panel" hidden={!open}>
        <p className="svc-body body">{s.body}</p>
        <ul className="svc-points">
          {s.points.map((p) => (
            <li key={p}><span className="svc-tick">+</span>{p}</li>
          ))}
        </ul>
        {s.cta === "email" && (
          <a className="svc-quote-cta" href={quoteHref}>
            <span className="svc-quote-dot" />
            Email for a quote <span className="arrow">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

/* ---------- Why Section ---------- */
const REASONS = [
  {
    t: "Pressure-tested judgment",
    d: "Built in environments where the wrong call has consequences, translated into calm, deliberate technical work for small businesses.",
  },
  {
    t: "Veteran-owned discipline",
    veteran: true,
    d: "Showing up, finishing things, and writing it down. Not as a marketing line, as the operating system.",
  },
  {
    t: "Local perspective",
    d: "Durham-based. I know the rhythm of the Triangle, the businesses here, and the constraints they actually work under.",
  },
  {
    t: "Affordable by design",
    d: "Flat-fee starter packages and clearly scoped projects. No retainers you don't need, no enterprise tax.",
  },
  {
    t: "One accountable point of contact",
    d: "You text one person. That person owns the outcome. No account managers, no offshore handoffs.",
  },
];

function Why() {
  const ref = useReveal();
  return (
    <section id="why" className="why">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">07 / Why me</span>
          </div>
          <h2 className="h-section why-title">
            I build systems the way<br />
            <span className="t-mute">I'd want them built for me.</span>
          </h2>
        </div>

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <div className="why-item" key={r.t}>
              <div className="why-num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="why-t">{r.t}</h3>
              <p className="why-d body">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services, Why });
