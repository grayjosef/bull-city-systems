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

/* ---------- Services Section: what we do, four entries, stated once ---------- */
const SERVICES = [
  {
    n: "01",
    title: "Custom software",
    body: "Internal tools, portals, and systems built end to end for the way your business actually runs.",
    accent: "blue",
  },
  {
    n: "02",
    title: "AI automation & integration",
    body: "AI set up on your accounts and your team trained to use it. The AI Jumpstart: $999 flat.",
    accent: "brass",
  },
  {
    n: "03",
    title: "Websites",
    body: "Custom websites that load fast, look sharp, and turn visitors into customers.",
    accent: "blue",
  },
  {
    n: "04",
    title: "Online stores",
    body: "Stores and checkout built around how you sell, connected to the tools you already use.",
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
            <span className="numeral">01 / What we do</span>
          </div>
          <h2 className="h-section">What we do.</h2>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <article className={"svc-card accent-" + s.accent} key={s.n}>
              <div className="card-accent-top" />
              <header className="svc-head">
                <span className="numeral">{s.n}</span>
                <span className="svc-dot" />
              </header>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-body body">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
            <span className="numeral">06 / Why Bull City Systems</span>
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
