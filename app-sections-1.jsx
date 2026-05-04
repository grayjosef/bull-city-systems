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
            They are connected business problems — and they compound every week you wait.
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
    title: "Websites that convert",
    body: "Fast, modern sites built to load quickly, look sharp, and turn visitors into booked work — not portfolios for portfolios' sake.",
    points: ["Custom design & build", "Copy support", "SEO basics & analytics"],
    accent: "blue",
  },
  {
    n: "02",
    title: "Intake forms & workflow automation",
    body: "Replace email tag and lost leads with intake that captures the right details and routes them to the right place automatically.",
    points: ["Multi-step intake", "Email & calendar routing", "Zapier / Make / Apps Script"],
    accent: "brass",
  },
  {
    n: "03",
    title: "Cloud & Microsoft 365 support",
    body: "Cleanup, licensing, shared mailboxes, SharePoint, Teams, security baselines — done properly, documented, and handed back to you.",
    points: ["M365 audit & cleanup", "Tenant migrations", "Backup & MFA"],
    accent: "blue",
  },
  {
    n: "04",
    title: "IT operations support",
    body: "Day-to-day technical operations for small teams: devices, accounts, vendor coordination, and the things that always seem to break on Friday.",
    points: ["Onboarding / offboarding", "Device & identity", "Vendor wrangling"],
    accent: "brick",
  },
  {
    n: "05",
    title: "App design & internal tools",
    body: "Lightweight prototypes and internal tools that solve specific operational pain — built fast, scoped tight, and shippable.",
    points: ["Prototypes & MVPs", "Dashboards", "Custom forms & databases"],
    accent: "brass",
  },
  {
    n: "06",
    title: "Technical advising",
    body: "An hour with a technical operator who has run real systems is often worth more than a month of agency proposals. Bring your stack.",
    points: ["Stack reviews", "Vendor selection", "Roadmaps & second opinions"],
    accent: "blue",
  },
  {
    n: "07",
    title: "Enterprise engagements",
    body: "For larger organizations: discrete technical projects delivered with the precision of a senior operator and the speed of a small shop. Procurement-friendly, NDA-ready, scoped to a fixed deliverable.",
    points: ["SOW-based projects", "M365 / Azure migrations at scale", "Security & compliance baselines", "Vendor / integration work"],
    accent: "brass",
  },
  {
    n: "08",
    title: "Trainings & workshops",
    body: "Half-day and full-day sessions for teams: practical, hands-on, no slideware. Done on-site in the Triangle or remote. Custom curriculum built around what your people actually use.",
    points: ["Microsoft 365 power-user", "Automation for non-engineers", "Security & phishing-resistant habits", "AI tools your team will actually use"],
    accent: "blue",
  },
  {
    n: "09",
    title: "Custom web-based app development",
    body: "Bespoke web applications built end-to-end — customer portals, scheduling tools, dashboards, marketplaces, the things off-the-shelf SaaS can't do. Scoping, architecture, build, deploy, and ongoing maintenance. Quoted per-project; email for a custom quote.",
    points: ["Discovery & technical scoping", "Web app build (React, Next, Rails, etc.)", "Cloud deployment & CI/CD", "Ongoing maintenance & SLA"],
    accent: "brick",
    cta: "email",
  },
  {
    n: "10",
    title: "Standalone app development",
    body: "Native desktop, mobile, or installable applications when a browser tab isn't the right fit — point-of-sale, kiosk, field tools, internal-only software with hardware integration. Quoted per-project; email for a custom quote.",
    points: ["iOS, Android, macOS, Windows", "Offline-first & hardware integration", "App store / MDM deployment", "Ongoing maintenance & SLA"],
    accent: "brick",
    cta: "email",
  },
  {
    n: "11",
    title: "AI integrations that actually work",
    body: "Most teams use AI like a fancy spell-checker. We integrate it into the seams of your business — intake, support, ops, internal search — so it does real work instead of just sitting in a browser tab.",
    points: ["LLM-powered intake & routing", "Internal copilots over your docs", "Customer support that drafts replies", "Workflow agents (not chatbots)"],
    accent: "brass",
    cta: "email",
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
              Eleven disciplines.<br />
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
          href={"mailto:info@bullcitysystems.com?subject=" + encodeURIComponent("Quote request — " + s.title) + "&body=" + encodeURIComponent("Hi —\n\nI'd like a quote for full-spectrum app development. A quick summary of what I'm trying to build:\n\n— What it does:\n— Who uses it:\n— Rough timeline:\n— Approximate budget:\n\nThanks.\n")}
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
    d: "Built in environments where the wrong call has consequences — translated into calm, deliberate technical work for small businesses.",
  },
  {
    t: "Veteran-owned discipline",
    veteran: true,
    d: "Showing up, finishing things, and writing it down. Not as a marketing line — as the operating system.",
  },
  {
    t: "Local perspective",
    d: "Durham-based. We know the rhythm of the Triangle, the businesses here, and the constraints they actually work under.",
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
            We build systems the way<br />
            <span className="t-mute">we'd want them built for us.</span>
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
