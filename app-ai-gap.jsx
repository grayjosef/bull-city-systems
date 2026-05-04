/* global React */
const { useState: useStateAI, useEffect: useEffectAI, useRef: useRefAI } = React;

/* =================================================================
   AI GAP — the framing problem.
   Most companies use AI as a spell-checker. The capability is 10x
   what they're using. We close the gap.
   ================================================================= */

const SHALLOW = [
  { l: "Spell-check & rewrite",  d: "Drafting emails one paragraph at a time" },
  { l: "Generic chatbot widget", d: "A floating bubble that sends users to a FAQ" },
  { l: "Summarize a meeting",    d: "Pasted into a doc, never read again" },
  { l: "Image generation",       d: "For a slide deck or a one-off blog post" },
];

const DEEP = [
  { l: "Intake that thinks",          d: "Reads the lead, scores it, routes to the right person, drafts the reply" },
  { l: "Internal copilots over your docs", d: "Your team asks a question, gets the actual answer from your SOPs and tickets" },
  { l: "Support that closes itself",  d: "Drafts replies grounded in your real KB and product, escalates only when needed" },
  { l: "Operational agents",          d: "Watches a queue, takes action, writes back to the system. Not chat — work." },
];

/* Animated counter used in the capability meter */
function useCount(target, durationMs = 1600, start = false) {
  const [v, setV] = useStateAI(0);
  useEffectAI(() => {
    if (!start) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return v;
}

function AIGap() {
  const ref = useReveal();
  const [revealed, setRevealed] = useStateAI(false);
  const meterRef = useRefAI(null);

  useEffectAI(() => {
    if (!meterRef.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setRevealed(true); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(meterRef.current);
    return () => io.disconnect();
  }, []);

  const used   = useCount(12, 1500, revealed);
  const avail  = useCount(100, 1800, revealed);

  return (
    <section id="ai-gap" className="aigap">
      <div className="aigap-grid-bg" aria-hidden="true" />

      <div className="container reveal" ref={ref}>
        <div className="section-head aigap-head">
          <span className="numeral">03 / The AI gap</span>
          <span className="aigap-id">SIGINT · CAPABILITY DELTA · 2026Q2</span>
        </div>

        <h2 className="h-section aigap-title">
          Most companies use AI<br />
          <span className="aigap-italic">to maybe a tenth of what it can do.</span>
        </h2>

        <p className="lede aigap-lede">
          The gap between <em className="t-bone">AI capability</em> and{" "}
          <em className="t-bone">AI <span className="t-vet-plain">actually deployed</span></em> in
          small and mid-sized businesses is the largest unrecognized competitive
          disadvantage in your market right now. It widens every week. The companies
          that close it become structurally faster, cheaper, and harder to compete
          with — quietly, and before anyone announces it.
        </p>

        {/* CAPABILITY METER */}
        <div className="aigap-meter" ref={meterRef}>
          <div className="meter-row">
            <div className="meter-label">
              <span className="meter-tag meter-tag--low">YOUR STACK</span>
              <span className="meter-amt">~{used}<span className="meter-pct">%</span></span>
              <span className="meter-sub">of available AI capability in production</span>
            </div>
            <div className="meter-bar">
              <span
                className="meter-fill meter-fill--low"
                style={{ width: revealed ? "12%" : "0%" }}
              />
              <span className="meter-tick" style={{ left: "12%" }} />
            </div>
          </div>

          <div className="meter-row">
            <div className="meter-label">
              <span className="meter-tag meter-tag--high">AVAILABLE TODAY</span>
              <span className="meter-amt">{avail}<span className="meter-pct">%</span></span>
              <span className="meter-sub">production-grade integrations that exist right now</span>
            </div>
            <div className="meter-bar">
              <span
                className="meter-fill meter-fill--high"
                style={{ width: revealed ? "100%" : "0%" }}
              />
            </div>
          </div>

          <div className="meter-delta">
            <span className="delta-rule" />
            <span className="delta-label">
              <span className="delta-num">88<span className="delta-pct">%</span></span>
              <span className="delta-text">unrealized — the gap your competitors are filling</span>
            </span>
            <span className="delta-rule" />
          </div>
        </div>

        {/* COMPARISON COLUMNS */}
        <div className="aigap-cols">
          <article className="aigap-col aigap-col--shallow">
            <header className="aigap-col-head">
              <span className="aigap-col-eyebrow">The shallow end</span>
              <h3 className="aigap-col-title">What most teams use AI for</h3>
            </header>
            <ul className="aigap-list">
              {SHALLOW.map((it) => (
                <li key={it.l}>
                  <span className="aigap-marker aigap-marker--shallow">—</span>
                  <div>
                    <span className="aigap-it-l">{it.l}</span>
                    <span className="aigap-it-d">{it.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <span className="aigap-versus" aria-hidden="true">
            <span>VS.</span>
          </span>

          <article className="aigap-col aigap-col--deep">
            <header className="aigap-col-head">
              <span className="aigap-col-eyebrow">What we build</span>
              <h3 className="aigap-col-title">What it can actually do for you</h3>
            </header>
            <ul className="aigap-list">
              {DEEP.map((it) => (
                <li key={it.l}>
                  <span className="aigap-marker aigap-marker--deep">+</span>
                  <div>
                    <span className="aigap-it-l">{it.l}</span>
                    <span className="aigap-it-d">{it.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* CTA STRIP */}
        <div className="aigap-cta">
          <div className="aigap-cta-rule" />
          <h3 className="aigap-cta-text">
            <span className="t-mute">We close the gap.</span><br />
            <span className="aigap-cta-strong">Real AI integrations, in your real systems, doing real work.</span>
          </h3>
          <a
            className="aigap-cta-btn"
            href={"mailto:info@bullcitysystems.com?subject=" + encodeURIComponent("AI integration — discovery") + "&body=" + encodeURIComponent("Hi —\n\nI'd like to talk about AI integrations for our business. Quick context:\n\n— What we use AI for today:\n— Where we know we should be using it but aren't:\n— A workflow we'd love to automate end-to-end:\n\nThanks.\n")}
          >
            <span className="aigap-cta-dot" />
            Email for a discovery call <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AIGap });
