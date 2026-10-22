/* global React */
const { useState, useEffect, useRef } = React;

/* ---------- Booking URL: single source of truth ---------- */
const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2oW6zGqgKv8Rc7MhWwjGwq_zvMrIMGln-B2QrGf9AmiCaY1z1fYYJSec81tN5cVAFp2T1lv6i9";

/* Expose to other JSX modules loaded after this one */
if (typeof window !== "undefined") window.BOOKING_URL = BOOKING_URL;

/* ---------- Hooks & utilities ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Smooth scroll to id */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------- Nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("top");

  // track which screen is active so the menu can highlight it
  useEffect(() => {
    const sync = () => setCurrent(document.body.getAttribute("data-screen") || "top");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-screen"] });
    return () => mo.disconnect();
  }, []);

  // Esc closes; body class drives desktop push-aside layout
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = (window.SCREENS || []).filter((s) => s.id !== "top");

  function nav(id) {
    setOpen(false);
    // let the menu start closing before the screen slides
    setTimeout(() => scrollToId(id), 120);
  }

  return (
    <React.Fragment>
      <header className={"nav nav-deck" + (open ? " bull-menu-open" : "")}>
        <div className="container nav-inner">
          <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); nav("top"); }}>
            <BCSMark size={118} />
            <span className="brand-text">
              <span className="brand-name">Bull City Systems</span>
            </span>
          </a>
          <button className="bull-menu-btn"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}>
            <span className="hb" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </header>

      <div className={"bull-menu-scrim" + (open ? " open" : "")} onClick={() => setOpen(false)} />
      <nav className={"bull-menu" + (open ? " open" : "")} aria-hidden={!open}>
        <button type="button" className="bm-back" onClick={() => setOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
          Back
        </button>
        <span className="bull-menu-eyebrow">Bull City Systems · Durham, NC</span>
        {links.map((l, i) => (
          <a key={l.id}
             href={"#" + l.id}
             className={"bm-link" + (current === l.id ? " on" : "")}
             style={{ transitionDelay: open ? (60 + i * 38) + "ms" : "0ms" }}
             onClick={(e) => { e.preventDefault(); nav(l.id); }}>
            <span className="bm-num">{String(i + 1).padStart(2, "0")}</span>
            {l.label}
          </a>
        ))}
        <div className="bull-menu-foot">
          <a className="btn btn-primary" href="/book/">Book a call <span className="arrow">→</span></a>
          <a className="bm-phone" href="tel:+19192839006">(919) 283-9006</a>
        </div>
      </nav>
    </React.Fragment>
  );
}

/* Mark / monogram: simple BCS in a notched square */
function BCSMark({ size = 36 }) {
  return (
    <img src="brand/bull-b3-cream.png" width={Math.round(size * 1.954)} height={size} className="bcs-mark" alt="" aria-hidden="true" />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useReveal();
  return (
    <section id="top" className="hero">
      <HeroBackdrop />
      <div className="container hero-inner" ref={ref}>
        <div className="hero-meta">
          <span className="eyebrow">Bull City Systems · Durham, NC</span>
          <span className="hero-meta-sep" />
          <span className="eyebrow-mute">Est. 2025 · <span className="t-vet">Veteran-owned</span></span>
        </div>

        <h1 className="h-display hero-title">
          Your tech is costing you
          <br />
          customers. <em className="hero-italic">Let's fix that.</em>
        </h1>

        <p className="lede hero-lede">
          Missed calls. No online booking. A website that embarrasses you.
          Bull City Systems builds the websites, automation,
          and IT systems Durham businesses should have had years ago, from customer intake
          to Microsoft 365 to day-to-day support.
        </p>

        <blockquote className="hero-promise">
          "When you hire Bull City Systems, you're my only customer. I walk you
          through it hand in hand, from first call to final delivery, and I don't
          stop until it's done the way you want it."
          <cite>Josef Gray, founder</cite>
        </blockquote>

        <div className="hero-ctas">
          <a className="btn btn-primary" href="/book/">
            Book a call <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="tel:+19192839006">
            Call (919) 283-9006
          </a>
        </div>

        <p className="hero-capacity">
          I take on one automation build at a time. If the calendar's full,
          I'll tell you when the next slot opens.
        </p>

        <ul className="hero-trust">
          <li><Tick /> <span className="t-vet">Veteran-owned</span></li>
          <li><Tick /> Durham-based</li>
          <li><Tick /> Built for small business</li>
          <li><Tick /> Affordable flat-fee options</li>
          <li><Tick /> Practical technical guidance</li>
        </ul>
      </div>


    </section>
  );
}

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2 7.5 L5.5 11 L12 3.5" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Hero backdrop: blueprint grid + soft warm vignette + a hairline diagram */
function HeroBackdrop() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-vignette" />
      <svg className="hero-diagram" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        {/* sparse hairline schematic suggesting interconnected systems */}
        <g stroke="#2A2F38" strokeWidth="1" fill="none">
          <circle cx="980" cy="180" r="3" fill="#C8932E" stroke="none" />
          <circle cx="1080" cy="320" r="3" fill="#2E5DA8" stroke="none" />
          <circle cx="900" cy="420" r="3" fill="#C8932E" stroke="none" />
          <circle cx="1100" cy="540" r="3" fill="#A23A28" stroke="none" />
          <circle cx="820" cy="280" r="3" fill="#2E5DA8" stroke="none" />
          <path d="M820 280 L980 180 L1080 320 L900 420 L1100 540" stroke="#2E5DA8" strokeOpacity="0.4" />
          <path d="M980 180 L1080 320" />
          <path d="M820 280 L900 420" />
          <rect x="780" y="260" width="80" height="40" rx="2" />
          <rect x="940" y="160" width="80" height="40" rx="2" />
          <rect x="1040" y="300" width="80" height="40" rx="2" />
          <rect x="860" y="400" width="80" height="40" rx="2" />
          <rect x="1060" y="520" width="80" height="40" rx="2" />
        </g>
      </svg>
    </div>
  );
}

Object.assign(window, { Nav, Hero, BCSMark, useReveal, scrollToId, Tick });
