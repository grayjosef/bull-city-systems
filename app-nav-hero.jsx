/* global React */
const { useState, useEffect, useRef } = React;

/* ---------- Booking URL: single source of truth ---------- */
const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2oW6zGqgKv8Rc7MhWwjGwq_zvMrIMGln-B2QrGf9AmiCaY1z1fYYJSec81tN5cVAFp2T1lv6i9";

/* Expose to other JSX modules loaded after this one */
if (typeof window !== "undefined") window.BOOKING_URL = BOOKING_URL;

/* ---------- Hash routing: one topic per page ---------- */
const BCS_PAGES = [
  { id: "home",     hash: "#/",         label: "Home" },
  { id: "services", hash: "#/services", label: "What we do" },
  { id: "pricing",  hash: "#/pricing",  label: "Pricing" },
  { id: "about",    hash: "#/about",    label: "About" },
  { id: "apparel",  hash: "#/apparel",  label: "Apparel" },
  { id: "contact",  hash: "#/contact",  label: "Contact" },
];
const BCS_LEGACY_HASHES = {
  "top": "home", "problem": "home",
  "services": "services", "why": "about", "process": "services",
  "pricing": "pricing", "about": "about", "durham": "about",
  "apparel": "apparel", "intake": "contact",
};
function bcsParseRoute() {
  const raw = window.location.hash.replace(/^#/, "");
  if (raw === "" || raw === "/") return "home";
  const byPath = BCS_PAGES.find((p) => p.hash === "#" + raw);
  if (byPath) return byPath.id;
  if (BCS_LEGACY_HASHES[raw]) return BCS_LEGACY_HASHES[raw];
  return "home";
}
if (typeof window !== "undefined") {
  window.BCS_PAGES = BCS_PAGES;
  window.bcsParseRoute = bcsParseRoute;
}

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

/* Smooth scroll to id (kept for in-page anchors inside the intake form) */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------- Nav ----------
   Header brand: the full B3 bull, big (118px, the pre-redesign standard),
   FROZEN. No animation on the header bull, ever, and no scroll shrink.
   The menu is run by a separate little bull: on open he hooks the menu
   with his horn, throws it back over his body, and the menu rolls out
   as a free full-width strip under the bar. Not a boxed panel. */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState("closed"); /* closed | open | closing */
  const [throwing, setThrowing] = useState(false);
  const [route, setRoute] = useState(() => bcsParseRoute());
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHash = () => {
      setRoute(bcsParseRoute());
      setMenuState("closed");
      setThrowing(false);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (menuState !== "open") return;
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuState]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuState("open");
    if (!reducedMotion()) setThrowing(true);
  };
  const closeMenu = () => {
    setThrowing(false);
    if (reducedMotion()) { setMenuState("closed"); return; }
    setMenuState("closing");
    closeTimer.current = setTimeout(() => setMenuState("closed"), 260);
  };
  const toggleMenu = () => {
    if (menuState === "open") closeMenu();
    else openMenu();
  };

  const menuShown = menuState === "open" || menuState === "closing";

  return (
    <header className={"nav" + (scrolled ? " nav-scrolled" : "") + (menuShown ? " nav-menu-open" : "")}>
      <div className="container nav-inner">
        <a href="#/" className="brand" aria-label="Bull City Systems, home">
          <BCSMark size={118} />
          <span className="brand-text">
            <span className="brand-name">Bull City Systems</span>
          </span>
        </a>
        <div className="nav-actions">
          <button
            type="button"
            className={"menu-btn" + (throwing ? " throwing" : "")}
            aria-expanded={menuState === "open"}
            aria-controls="site-menu"
            aria-haspopup="true"
            onClick={toggleMenu}
          >
            <img
              src="brand/bull-b3-cream.png"
              alt=""
              aria-hidden="true"
              className="menu-bull"
              onAnimationEnd={() => setThrowing(false)}
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
      {menuShown && (
        <div className={"site-menu" + (menuState === "closing" ? " rolling-up" : "")} id="site-menu">
          <nav className="site-menu-links" aria-label="Site">
            {BCS_PAGES.map((p, i) => (
              <a
                key={p.id}
                href={p.hash}
                className="site-menu-link"
                style={{ animationDelay: (340 + i * 60) + "ms" }}
                aria-current={route === p.id ? "page" : undefined}
                onClick={() => closeMenu()}
              >
                {p.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* The B3 bull. In the header he renders at 118px tall and never moves. */
function BCSMark({ size = 36 }) {
  return (
    <img src="brand/bull-b3-cream.png" width={Math.round(size * 1.954)} height={size} className="bcs-mark" alt="" aria-hidden="true" />
  );
}

/* ---------- Hero (Home): the name, the promise once, one button ---------- */
function Hero() {
  const ref = useReveal();
  return (
    <section id="top" className="hero">
      <HeroBackdrop />
      <div className="container hero-inner" ref={ref}>
        <div className="hero-meta">
          <span className="eyebrow">Technical design studio · Durham, NC</span>
        </div>

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
      </div>
    </section>
  );
}

/* ---------- Home: short what-we-do summary (detail lives on its page) ---------- */
const HOME_SUMMARY = [
  { title: "Custom software", note: "Internal tools, portals, dashboards." },
  { title: "AI automation & integration", note: "Including the AI Jumpstart." },
  { title: "Websites", note: "Design, build, and launch." },
  { title: "Online stores", note: "Checkout that fits how you sell." },
];

function HomeSummary() {
  const ref = useReveal();
  return (
    <section className="home-summary">
      <div className="container reveal" ref={ref}>
        <div className="section-head">
          <span className="numeral">What we do</span>
        </div>
        <div className="home-summary-list">
          {HOME_SUMMARY.map((s) => (
            <a key={s.title} href="#/services" className="home-summary-row">
              <span className="home-summary-title">{s.title}</span>
              <span className="home-summary-note">{s.note}</span>
              <span className="home-summary-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
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

Object.assign(window, { Nav, Hero, HomeSummary, BCSMark, useReveal, scrollToId, Tick });
