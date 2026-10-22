/* global React */
/* =====================================================================
 * SCREEN DECK: horizontal, one-screen-at-a-time navigation
 * ---------------------------------------------------------------------
 * Each child of <ScreenDeck> is a screen. Only the active screen is
 * visible; neighbors slide in/out horizontally. Each screen scrolls
 * internally if its content is taller than the viewport.
 *
 * Navigation:
 *   - window.goToScreen(id)   jump by section id (e.g. "pricing")
 *   - window.nextScreen() / window.prevScreen()
 *   - ← / → arrow keys, horizontal swipe on touch
 *   - URL hash is kept in sync (#pricing) so deep links + back button work
 *
 * scrollToId() in app-nav-hero.jsx is overridden below so every existing
 * in-page link (nav, footer, CTAs) routes to a screen instead of scrolling.
 * ===================================================================== */

const SCREENS = [
  { id: "top",          label: "Home" },
  { id: "ai-gap",       label: "The gap" },
  { id: "services",     label: "What I do" },
  { id: "ai-jumpstart", label: "AI Jumpstart" },
  { id: "process",      label: "How I work" },
  { id: "work",         label: "Work" },
  { id: "pricing",      label: "Pricing" },
  { id: "why",          label: "Why me" },
  { id: "durham",       label: "Durham" },
  { id: "about",        label: "About" },
  { id: "apparel",      label: "Apparel" },
  { id: "intake",       label: "Start" },
];

function screenIndexFromHash() {
  const h = (window.location.hash || "").replace("#", "");
  const i = SCREENS.findIndex((s) => s.id === h);
  return i >= 0 ? i : 0;
}

function ScreenDeck({ children }) {
  const [active, setActive] = React.useState(screenIndexFromHash);
  const [dir, setDir] = React.useState(1); // 1 = forward (slide left), -1 = back
  const touchX = React.useRef(null);
  const kids = React.Children.toArray(children);

  const go = React.useCallback((next) => {
    setActive((cur) => {
      const n = Math.max(0, Math.min(kids.length - 1, next));
      if (n === cur) return cur;
      setDir(n > cur ? 1 : -1);
      return n;
    });
  }, [kids.length]);

  // expose global navigation + override scrollToId
  React.useEffect(() => {
    window.goToScreen = (id) => {
      const i = SCREENS.findIndex((s) => s.id === id);
      if (i >= 0) go(i);
    };
    window.nextScreen = () => go(active + 1);
    window.prevScreen = () => go(active - 1);
    window.scrollToId = (id) => window.goToScreen(id);
  }, [active, go]);

  // sync hash
  React.useEffect(() => {
    const id = SCREENS[active]?.id || "top";
    if (window.location.hash !== "#" + id) {
      history.replaceState(null, "", "#" + id);
    }
    // reset inner scroll of the new screen
    const el = document.querySelector('.screen[data-screen="' + id + '"]');
    if (el) el.scrollTop = 0;
    document.body.setAttribute("data-screen", id);
  }, [active]);

  // back/forward
  React.useEffect(() => {
    const onHash = () => setActive(screenIndexFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // keyboard
  React.useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft")  go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  // touch swipe
  function onTouchStart(e) { touchX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 60) return;
    if (dx < 0) go(active + 1); else go(active - 1);
  }

  return (
    <div className={"deck deck-dir-" + (dir > 0 ? "fwd" : "back")}
         onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {kids.map((child, i) => {
        const s = SCREENS[i] || { id: "s" + i };
        const state = i === active ? "active" : i < active ? "before" : "after";
        return (
          <div key={s.id}
               className={"screen screen-" + state}
               data-screen={s.id}
               data-screen-label={s.label}
               aria-hidden={i !== active}>
            {child}
          </div>
        );
      })}

      {/* edge arrows */}
      {active > 0 && (
        <button className="deck-arrow deck-arrow-prev" onClick={() => go(active - 1)} aria-label="Previous screen">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      {active < kids.length - 1 && (
        <button className="deck-arrow deck-arrow-next" onClick={() => go(active + 1)} aria-label="Next screen">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      )}

      {/* progress rail */}
      <div className="deck-rail" aria-hidden="true">
        {kids.map((_, i) => (
          <button key={i}
                  className={"deck-dot" + (i === active ? " on" : "")}
                  onClick={() => go(i)}
                  title={SCREENS[i]?.label || ""} />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenDeck, SCREENS });
