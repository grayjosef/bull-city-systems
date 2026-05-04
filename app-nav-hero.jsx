/* global React */
const { useState, useEffect, useRef } = React;

/* ---------- Booking URL — single source of truth ---------- */
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "services", label: "Services" },
    { id: "why", label: "Why us" },
    { id: "pricing", label: "Pricing" },
    { id: "process", label: "Process" },
    { id: "intake", label: "Contact" },
  ];

  return (
    <header className={"nav" + (scrolled ? " nav-scrolled" : "")}>
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>
          <BCSMark />
          <span className="brand-text">
            <span className="brand-name">Bull City Systems</span>
            <span className="brand-sub">An Arc &amp; Anchor studio</span>
          </span>
        </a>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.id} href={"#" + l.id} onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-ghost" onClick={() => scrollToId("intake")}>
            Free project review
            <span className="arrow">→</span>
          </button>
        </div>
        <button className="nav-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {links.map((l) => (
            <a key={l.id} href={"#" + l.id}
               onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId(l.id); }}>
              {l.label}
            </a>
          ))}
          <button className="btn btn-primary" onClick={() => { setOpen(false); scrollToId("intake"); }}>
            Free project review <span className="arrow">→</span>
          </button>
        </div>
      )}
    </header>
  );
}

/* Mark / monogram — simple BCS in a notched square */
function BCSMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className="bcs-mark" aria-hidden="true">
      <defs>
        <linearGradient id="bcs-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#1B2029" />
          <stop offset="100%" stopColor="#0B0D11" />
        </linearGradient>
      </defs>
      <path d="M2 2 H32 L38 8 V38 H8 L2 32 Z" fill="url(#bcs-g)" stroke="#2A2F38" strokeWidth="1" />
      <text x="20" y="26" textAnchor="middle" fontFamily="IBM Plex Mono, monospace"
            fontSize="13" fontWeight="700" letterSpacing="0.5">
        <tspan fill="#B83A28">B</tspan><tspan fill="#C8932E">C</tspan><tspan fill="#4A7AC4">S</tspan>
      </text>
    </svg>
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
          Durham-built websites,
          <br />
          automation, and IT systems
          <br />
          <em className="hero-italic">with precision. under pressure.</em>
        </h1>

        <p className="lede hero-lede">
          Bull City Systems helps Durham and Triangle businesses clean up,
          modernize, and strengthen their tech — from websites and customer intake
          to Microsoft 365, automation, cloud, and day-to-day IT support.
        </p>

        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={() => scrollToId("intake")}>
            Request a free project review <span className="arrow">→</span>
          </button>
          <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a consultation
          </a>
        </div>

        <ul className="hero-trust">
          <li><Tick /> <span className="t-vet">Veteran-owned</span></li>
          <li><Tick /> Durham-based</li>
          <li><Tick /> Built for small business</li>
          <li><Tick /> Affordable flat-fee options</li>
          <li><Tick /> Practical technical guidance</li>
        </ul>
      </div>

      <div className="hero-coords">
        <span>35.9940° N</span>
        <span className="hero-coords-bar" />
        <span>78.8986° W</span>
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
