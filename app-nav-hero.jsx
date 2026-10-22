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

/* ---------- Nav: slim bar. Monogram left; the little bull runs the menu; one Book button. ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [charging, setCharging] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const menuLinks = [
    { id: "services", label: "What we do" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "apparel", label: "Apparel" },
    { id: "intake", label: "Contact" },
  ];

  const toggleMenu = () => {
    if (!open) setCharging(true);
    else setCharging(false);
    setOpen((v) => !v);
  };

  const goTo = (id) => {
    setOpen(false);
    setCharging(false);
    scrollToId(id);
  };

  return (
    <header className={"nav" + (scrolled ? " nav-scrolled" : "")}>
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); goTo("top"); }}>
          <BCSMonogram height={42} />
          <span className="brand-text">
            <span className="brand-name">Bull City Systems</span>
          </span>
        </a>
        <div className="nav-actions">
          <button
            type="button"
            className={"menu-btn" + (charging ? " charging" : "")}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-haspopup="true"
            onClick={toggleMenu}
          >
            <img
              src="brand/bull-b3-cream.png"
              alt=""
              aria-hidden="true"
              className="menu-bull"
              onAnimationEnd={() => setCharging(false)}
            />
            <span className="menu-btn-label">Menu</span>
          </button>
          <div className="nav-cta">
            <a className="btn btn-primary" href="/book/">
              Book
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
      {open && (
        <div className="site-menu" id="site-menu">
          <nav className="site-menu-links" aria-label="Site">
            {menuLinks.map((l, i) => (
              <a
                key={l.id}
                href={"#" + l.id}
                style={{ animationDelay: (120 + i * 55) + "ms" }}
                onClick={(e) => { e.preventDefault(); goTo(l.id); }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* A1 monogram: the small brand mark for the top bar and footer */
function BCSMonogram({ height = 42 }) {
  return (
    <img src="brand/logo-mark-cream.png" height={height} className="bcs-monogram" alt="" aria-hidden="true" />
  );
}

/* Mark / monogram: simple BCS in a notched square */
function BCSMark({ size = 36 }) {
  return (
    <img src="brand/bull-b3-cream.png" width={Math.round(size * 1.954)} height={size} className="bcs-mark" alt="" aria-hidden="true" />
  );
}

/* ---------- Hero: the bull, the name, one promise, one button ---------- */
function Hero() {
  const ref = useReveal();
  return (
    <section id="top" className="hero">
      <HeroBackdrop />
      <div className="container hero-inner" ref={ref}>
        <div className="hero-meta">
          <span className="eyebrow">Technical design studio · Durham, NC</span>
        </div>

        <BCSMark size={170} />

        <h1 className="h-display hero-title">Bull City Systems</h1>

        <blockquote className="hero-promise">
          "When you hire Bull City Systems, you're my only customer. I walk you
          through it hand in hand, flash to bang, and I don't stop until it's
          done the way you want it."
          <cite>Josef Gray, founder</cite>
        </blockquote>

        <div className="hero-ctas">
          <a className="btn btn-primary" href="/book/">
            Book a consultation <span className="arrow">→</span>
          </a>
        </div>

        <p className="hero-capacity">
          $99 booking deposit, applied in full to your project.
        </p>
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

/* Hero backdrop: blueprint grid + soft warm vignette */
function HeroBackdrop() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-vignette" />
    </div>
  );
}

Object.assign(window, { Nav, Hero, BCSMark, BCSMonogram, useReveal, scrollToId, Tick });
