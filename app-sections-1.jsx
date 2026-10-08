/* global React */
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

/* ---------- Problem Section ---------- */
function Problem() {
  const ref = useReveal();
  const problems = [
    "Outdated website",
    "Broken intake forms",
    "Manual busywork",
    "Scattered files & docs",
    "Weak automation",
    "Messy Microsoft 365",
  ];
  return (
    <section id="problem" className="problem">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">02 / Problem</span>
          </div>
          <h2 className="h-section problem-title">
            Most businesses do not have one tech problem.
            <br />
            <span className="t-mute">They have a stack of them.</span>
          </h2>
          <p className="lede problem-lede">
            An outdated website, a broken intake form, manual busywork, scattered files,
            weak automation, and a messy Microsoft 365 setup are not separate annoyances.
            They are connected business problems, and they compound every week you wait.
          </p>
        </div>

        <div className="problem-stack">
          {problems.map((p, i) => (
            <div className="problem-row" key={p} style={{ animationDelay: (i * 60) + "ms" }}>
              <span className="problem-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="problem-label">{p}</span>
              <span className="problem-bar"><span className="problem-bar-fill" style={{ width: (40 + i * 9) + "%" }} /></span>
              <span className="problem-status">unresolved</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services Section ---------- */
const SERVICES = [
  {
    n: "01",
    title: "Website design & development",
    body: "Custom websites built to load fast, look sharp, and turn visitors into customers, designed around your brand, engineered to perform.",
    points: ["Custom design & build", "Mobile-first responsive", "SEO basics & analytics"],
    accent: "blue",
  },
  {
    n: "02",
    title: "Branding & identity",
    body: "Logos, visual identity, and brand systems that make you look like the business you're becoming, not a template someone else is also using.",
    points: ["Logo & visual identity", "Brand guidelines", "Marketing collateral"],
    accent: "brass",
  },
  {
    n: "03",
    title: "Messaging & copy",
    body: "Words that sell. I sharpen your story, your offers, and your calls to action so a visitor understands why you in seconds, not minutes.",
    points: ["Website copy", "Offer & positioning", "Email & sales collateral"],
    accent: "blue",
  },
  {
    n: "04",
    title: "Business development",
    body: "Go-to-market strategy, offer design, and lead systems: the business thinking that has to come before the technology, from someone who's operated.",
    points: ["Offer design", "Lead systems & intake", "Growth roadmaps"],
    accent: "brick",
  },
  {
    n: "05",
    title: "Software engineering",
    body: "Senior-level engineering capacity for teams that need it: architecture reviews, code audits, and technical leadership on demand, no agency bloat.",
    points: ["Architecture reviews", "Code audits", "Fractional tech leadership"],
    accent: "brass",
  },
  {
    n: "06",
    title: "Custom software builds",
    body: "Bespoke software built end-to-end: internal tools, customer portals, dashboards, scheduling systems. Scoped, quoted, and delivered. The things off-the-shelf SaaS can't do.",
    points: ["Discovery & scoping", "Full-stack build", "Deploy & maintenance"],
    accent: "blue",
    cta: "email",
  },
  {
    n: "07",
    title: "Custom cloud applications",
    body: "Cloud-native applications designed to scale, architected on modern infrastructure, deployed with CI/CD, monitored in production. Built for growth, not just launch.",
    points: ["Cloud architecture", "CI/CD pipelines", "Monitoring & scaling"],
    accent: "brick",
    cta: "email",
  },
  {
    n: "08",
    title: "IT security",
    body: "Security baselines, audits, and hardening for small businesses that can't afford a breach: MFA everywhere, backups that work, endpoint protection, phishing-resistant setups.",
    points: ["Security audits", "MFA & access hardening", "Backup & recovery"],
    accent: "brass",
  },
  {
    n: "09",
    title: "Managed IT services",
    body: "Your outsourced IT department: devices, accounts, vendor coordination, and the things that always seem to break on Friday. Proactive, documented, one call away.",
    points: ["Helpdesk & support", "Device & account management", "Vendor coordination"],
    accent: "blue",
  },
  {
    n: "10",
    title: "Cloud infrastructure",
    body: "Cloud architecture, migrations, and Microsoft 365 management, set up right, secured, documented, and handed back to you with training.",
    points: ["M365 setup & migration", "Cloud architecture", "Backup & compliance"],
    accent: "brick",
  },
  {
    n: "11",
    title: "Hardware consulting",
    body: "Workstations, networking, point-of-sale, field hardware: spec'd, sourced, and set up for how your team actually works. No oversold gear, no underpowered regrets.",
    points: ["Hardware spec & sourcing", "Network setup", "POS & field systems"],
    accent: "brass",
    cta: "email",
  },
  {
    n: "12",
    title: "AI integrations",
    body: "Real AI in your real systems, doing real work. Not a chatbot widget. I build AI that reads your docs, routes your leads, drafts your replies, and runs your queues.",
    points: ["Intake that thinks", "Internal copilots over your docs", "Support that closes itself", "Operational agents"],
    accent: "blue",
  },
];

function Services() {
  const ref = useReveal();
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-head">
            <span className="numeral">04 / Services</span>
          </div>
          <div className="services-head">
            <h2 className="h-section">
              Twelve disciplines.<br />
              <span className="t-mute">Small business to enterprise.</span>
            </h2>
            <p className="lede services-lede">
              Whether you're a five-person shop on Foster Street or a 500-person
              organization with a procurement office, the work is the same: real
              technical execution, written down, delivered to spec. Plus trainings
              that actually stick.
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
  const [hover, setHover] = useState2(false);
  return (
    <article
      className={"svc-card accent-" + s.accent + (hover ? " is-hover" : "") + (s.cta === "email" ? " has-quote-cta" : "")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-accent-top" />
      <header className="svc-head">
        <span className="numeral">{s.n}</span>
        <span className="svc-dot" />
      </header>
      <h3 className="svc-title">{s.title}</h3>
      <p className="svc-body body">{s.body}</p>
      <ul className="svc-points">
        {s.points.map((p) => (
          <li key={p}><span className="svc-tick">+</span>{p}</li>
        ))}
      </ul>
      {s.cta === "email" && (
        <a
          className="svc-quote-cta"
          href={"mailto:hello@bullcitysystems.com?subject=" + encodeURIComponent("Quote request: " + s.title) + "&body=" + encodeURIComponent("Hi,\n\nI'd like a quote for full-spectrum app development. A quick summary of what I'm trying to build:\n\n- What it does:\n- Who uses it:\n- Rough timeline:\n- Approximate budget:\n\nThanks.\n")}
        >
          <span className="svc-quote-dot" />
          Email for a quote <span className="arrow">→</span>
        </a>
      )}
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
            <span className="numeral">05 / Why Bull City Systems</span>
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

Object.assign(window, { Problem, Services, Why });
