/* global React */
const { useState: useStateW, useEffect: useEffectW, useRef: useRefW } = React;

/* =================================================================
   WELCOME INTRO v3 — bull charges in, slings flag, wordmark stamps
   Storyboard:
     P1 (0–800)    Black. Far horizon line. Mono ID ticker types.
                   Distant rumble (visual: ground line trembles).
     P2 (800–2200) Bull charges in from RIGHT against gold sun.
                   Speed lines, dust kick, slight camera shake on stop.
     P3 (2200–3300) Bull stops centered. Flag pole in mouth.
                    Bull tosses head — flag UNFURLS violently from
                    its mouth, snapping open to fill the sky.
                    Seven stars settle on the blue field.
     P4 (3300–4400) Wordmark "BULL CITY / SYSTEMS" stamps in over
                    flag, with letterpress thunk + red SYSTEMS.
                    Subtitle: "Built by an Airborne Ranger.
                    Built for Durham." appears.
     P5 (4400–5200) Composition compresses into bottom-left flag
                    badge position; site rises into view.
   ================================================================= */
function WelcomeIntro() {
  const [phase, setPhase] = useStateW(0);
  const [done, setDone] = useStateW(() => {
    try { return sessionStorage.getItem("bcs-intro-seen") === "1"; }
    catch { return false; }
  });

  useEffectW(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase(1),  100); // ID ticker on
    const t2 = setTimeout(() => setPhase(2),  900); // bull enters
    const t3 = setTimeout(() => setPhase(3), 2300); // flag unfurls
    const t4 = setTimeout(() => setPhase(4), 3400); // wordmark stamps
    const t5 = setTimeout(() => setPhase(5), 4500); // compress out
    const t6 = setTimeout(() => finish(),    5300);
    function onKey(e) { if (e.key === "Escape") finish(); }
    window.addEventListener("keydown", onKey);
    return () => {
      [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  function finish() {
    try { sessionStorage.setItem("bcs-intro-seen", "1"); } catch {}
    document.body.style.overflow = "";
    setDone(true);
  }

  if (done) return null;

  return (
    <div className={"welcome welcome-p" + phase + (phase >= 5 ? " welcome-out" : "")}
         onClick={finish}
         role="button"
         aria-label="Skip intro">

      {/* CAMERA — everything inside shakes on impact */}
      <div className="welcome-cam">

        {/* Distant horizon + sun */}
        <div className="welcome-horizon">
          <div className="welcome-sun" />
          <div className="welcome-ground" />
          <div className="welcome-ground-line" />
        </div>

        {/* Speed lines that streak past as bull charges */}
        <div className="welcome-speed">
          {[...Array(14)].map((_, i) => (
            <span key={i} className="speed-line" style={{
              top: (10 + i * 6) + "%",
              animationDelay: (i * 60) + "ms",
              width: (40 + (i % 5) * 10) + "%",
            }} />
          ))}
        </div>

        {/* Dust kick at hooves */}
        <div className="welcome-dust">
          {[...Array(18)].map((_, i) => (
            <span key={i} className="dust-puff" style={{
              left: (45 + (Math.random() * 20) - 10) + "%",
              animationDelay: (i * 70) + "ms",
              width: (30 + Math.random() * 50) + "px",
              height: (30 + Math.random() * 50) + "px",
            }} />
          ))}
        </div>

        {/* THE BULL */}
        <div className="welcome-bull-wrap">
          <BullSVG />
          {/* The flag is a child of the bull-wrap so it emerges from the mouth */}
          <div className="welcome-flag-emit">
            <div className="flag-pole" />
            <div className="flag-cloth">
              <div className="fc-blue">
                <svg className="fc-stars" viewBox="0 0 150 156" preserveAspectRatio="none" aria-hidden="true">
                  <g fill="#ECE5D6">
                    <Star cx="55"  cy="50"  r="6" />
                    <Star cx="92"  cy="38"  r="5" />
                    <Star cx="38"  cy="78"  r="4" />
                    <Star cx="80"  cy="76"  r="6" />
                    <Star cx="118" cy="68"  r="4" />
                    <Star cx="60"  cy="112" r="5" />
                    <Star cx="108" cy="118" r="4" />
                  </g>
                </svg>
              </div>
              <div className="fc-stripes">
                <span className="fc-red" />
                <span className="fc-white" />
                <span className="fc-gold" />
              </div>
              {/* billow shading */}
              <div className="fc-shade" />
            </div>
          </div>
        </div>

        {/* WORDMARK — stamps in after flag is open */}
        <div className="welcome-wordmark">
          <span className="ww-eyebrow">SFC J. GRAY · 3/75 · DURHAM, NC</span>
          <h1 className="ww-title">
            <span className="ww-line ww-l1">BULL CITY</span>
            <span className="ww-line ww-l2">SYSTEMS</span>
          </h1>
          <span className="ww-tag">Built by an Airborne Ranger. Built for Durham.</span>
        </div>

        {/* mono ticker bottom-left */}
        <div className="welcome-id">
          <span className="id-tick">▌</span>
          <span className="id-line" />
        </div>
      </div>

      <button className="welcome-skip" onClick={(e) => { e.stopPropagation(); finish(); }}>
        Skip <span className="arrow">→</span>
      </button>
    </div>
  );
}

/* ----------------------------------------------------------------
   BULL SVG — silhouette, properly proportioned, mouth open w/ pole
   ---------------------------------------------------------------- */
function BullSVG() {
  return (
    <svg className="bull-svg" viewBox="0 0 720 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="bull-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"  stopColor="#1B1206" />
          <stop offset="55%" stopColor="#3A2510" />
          <stop offset="100%" stopColor="#0F0A05" />
        </linearGradient>
        <radialGradient id="bull-rim" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#C8932E" stopOpacity="0" />
          <stop offset="100%" stopColor="#C8932E" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* shadow under bull */}
      <ellipse cx="360" cy="408" rx="190" ry="14" fill="rgba(0,0,0,0.55)" />

      {/* HORNS — drawn first so the head goes over their roots */}
      <g className="bull-horns" fill="#ECE5D6" stroke="#0B0D11" strokeWidth="2" strokeLinejoin="round">
        <path d="M250,118 C 220,98 192,78 176,52 C 178,72 196,98 218,116 L 232,128 Z" />
        <path d="M412,118 C 442,98 470,78 486,52 C 484,72 466,98 444,116 L 430,128 Z" />
      </g>

      {/* HEAD + BODY — single composite path (bull facing left, charging) */}
      <g className="bull-body">
        <path
          fill="url(#bull-fill)"
          stroke="#C8932E"
          strokeWidth="3"
          strokeLinejoin="round"
          d="M168,206
             C 158,188 162,162 184,148
             C 202,138 224,142 236,154
             L 250,140
             L 270,134
             L 300,128
             L 332,126
             L 364,128
             L 396,134
             L 422,142
             L 440,156
             C 456,148 478,150 488,164
             C 502,184 494,210 472,216
             L 462,228
             C 480,242 492,262 496,288
             L 496,330
             C 496,352 484,374 462,388
             L 458,420
             L 432,420
             L 428,402
             L 392,402
             L 388,420
             L 360,420
             L 356,402
             L 320,402
             L 316,420
             L 286,420
             L 282,402
             L 248,402
             L 244,420
             L 218,420
             L 218,388
             C 196,374 184,352 184,330
             L 184,256
             C 184,238 192,220 206,210
             Z" />

        {/* eye */}
        <circle className="bull-eye" cx="208" cy="186" r="4.5" fill="#B83A28" />
        {/* nostril */}
        <ellipse cx="184" cy="206" rx="3" ry="1.8" fill="#0B0D11" />
        {/* nose ring */}
        <circle className="bull-ring" cx="186" cy="220" r="11"
                fill="none" stroke="#C8932E" strokeWidth="2.6" />
        {/* mouth gap (where flag pole emerges) — small dark slit */}
        <path d="M170,224 Q 158,228 168,236 Q 178,232 184,228 Z" fill="#0B0D11" />

        {/* shoulder hump */}
        <path
          className="bull-detail"
          d="M260,154 C 290,140 340,138 380,148"
          fill="none" stroke="#C8932E" strokeWidth="1.4" opacity="0.6" />
        {/* hide line down flank */}
        <path
          className="bull-detail"
          d="M310,180 C 340,200 360,250 358,310"
          fill="none" stroke="rgba(200,147,46,0.35)" strokeWidth="1" />
        {/* leg separations */}
        <line x1="262" y1="350" x2="262" y2="402" stroke="#0B0D11" strokeWidth="2.5" />
        <line x1="332" y1="358" x2="332" y2="402" stroke="#0B0D11" strokeWidth="2.5" />
        <line x1="402" y1="358" x2="402" y2="402" stroke="#0B0D11" strokeWidth="2.5" />

        {/* tail — flicks behind */}
        <path
          d="M496,294 C 530,304 542,326 522,356 L 514,348 C 530,330 520,312 496,308 Z"
          fill="url(#bull-fill)" stroke="#ECE5D6" strokeWidth="2.5" strokeLinejoin="round" />
      </g>

      {/* gold rim light along the back */}
      <path
        d="M250,140 L 270,134 L 300,128 L 332,126 L 364,128 L 396,134 L 422,142"
        fill="none" stroke="#FBD774" strokeWidth="3.5" opacity="1" strokeLinecap="round" />
    </svg>
  );
}

/* =====================================================
   Persistent Durham Flag — pinned to viewport
   ===================================================== */
function DurhamFlagBadge() {
  const [open, setOpen] = useStateW(false);
  return (
    <div className={"flag-badge" + (open ? " flag-open" : "")}>
      <button className="flag-btn"
              onClick={() => setOpen((v) => !v)}
              aria-label="Durham, NC — flag"
              title="Durham, NC">
        <DurhamFlagSVG />
        <span className="flag-pulse" />
      </button>
      {open && (
        <div className="flag-panel" onClick={() => setOpen(false)}>
          <div className="flag-panel-inner" onClick={(e) => e.stopPropagation()}>
            <span className="numeral">DURHAM, NC</span>
            <DurhamFlagSVG large />
            <ul className="flag-meaning">
              <li><span className="fm-sw" style={{ background: "#1F4A8A" }} />Royal blue — courage</li>
              <li><span className="fm-sw" style={{ background: "#B83A28" }} />Red — action &amp; progress</li>
              <li><span className="fm-sw" style={{ background: "#C8932E" }} />Gold — quality in growth</li>
              <li><span className="fm-sw" style={{ background: "#ECE5D6" }} />White — high ideals</li>
            </ul>
            <p className="flag-foot">Seven stars · The Pleiades · The New Spirit of Durham</p>
            <button className="flag-close" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DurhamFlagSVG({ large }) {
  const w = large ? 240 : 44;
  const h = large ? 156 : 28;
  return (
    <svg width={w} height={h} viewBox="0 0 240 156" className="durham-flag-svg" aria-hidden="true">
      <rect x="0" y="0" width="150" height="156" fill="#1F4A8A" />
      <rect x="150" y="0"   width="90" height="52" fill="#B83A28" />
      <rect x="150" y="52"  width="90" height="52" fill="#ECE5D6" />
      <rect x="150" y="104" width="90" height="52" fill="#C8932E" />
      <g fill="#ECE5D6">
        <Star cx="55"  cy="50" r="6" />
        <Star cx="90"  cy="38" r="5" />
        <Star cx="38"  cy="80" r="4" />
        <Star cx="80"  cy="78" r="6" />
        <Star cx="115" cy="68" r="4" />
        <Star cx="60"  cy="110" r="5" />
        <Star cx="105" cy="115" r="4" />
      </g>
      <rect x="0.5" y="0.5" width="239" height="155" fill="none" stroke="#0B0D11" strokeWidth="1" />
    </svg>
  );
}

function Star({ cx, cy, r }) {
  const CX = parseFloat(cx), CY = parseFloat(cy), R = parseFloat(r);
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? R : R * 0.42;
    const x = CX + Math.cos(angle) * rad;
    const y = CY + Math.sin(angle) * rad;
    points.push(x.toFixed(2) + "," + y.toFixed(2));
  }
  return <polygon points={points.join(" ")} />;
}

Object.assign(window, { WelcomeIntro, DurhamFlagBadge, DurhamFlagSVG });
