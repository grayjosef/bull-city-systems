/* global React */
/* =================================================================
   THE GAP: one problem screen. Replaces Problem + AI Gap.
   Two columns: what's broken in the shop today (left) vs what the
   same tools can do when they're wired together (right).
   No fake percentages. One true claim. One CTA.
   ================================================================= */

const GAP_NOW = [
  { l: "A website that embarrasses you",   d: "Old dates, broken links, no booking button. The first thing a new customer sees." },
  { l: "Phone tag and email ping-pong",     d: "Every booking is a negotiation. Every quote is retyped." },
  { l: "The same thing typed twice",        d: "Schedule on the website, schedule in the booking app, schedule in your head." },
  { l: "AI as a fancy spell-checker",       d: "A chat tab open in the browser. Nothing wired into how the work actually moves." },
];

const GAP_BUILT = [
  { l: "One place to be found",             d: "Google, site, booking link, and listings all pointing at the same door." },
  { l: "Booking that runs itself",          d: "Your calendar is the source of truth. Customers book; you find out." },
  { l: "Tools that talk",                   d: "Site shows the live schedule. Inbox drafts the reply. Monday digest writes itself." },
  { l: "AI where you approve the result",   d: "Reads the lead, scores it, drafts the answer. You hit send. It never cancels a customer." },
];

function AIGap() {
  const ref = useReveal();
  return (
    <section id="ai-gap" className="aigap">
      <div className="aigap-grid-bg" aria-hidden="true" />

      <div className="container reveal" ref={ref}>
        <div className="section-head aigap-head">
          <span className="numeral">02 / The gap</span>
        </div>

        <h2 className="h-section aigap-title">
          Most small businesses run on tools<br />
          <span className="aigap-italic">that have never been introduced to each other.</span>
        </h2>

        <p className="lede aigap-lede">
          The website, the booking app, the inbox, the calendar, the AI tab. Each one works.
          None of them talk. So the owner is the integration layer, and the integration layer
          is tired. The fix is not more software. It is wiring what you already have so it
          runs without you in the loop.
        </p>

        <div className="aigap-cols">
          <article className="aigap-col aigap-col--shallow">
            <header className="aigap-col-head">
              <span className="aigap-col-eyebrow">Today</span>
              <h3 className="aigap-col-title">What the shop looks like now</h3>
            </header>
            <ul className="aigap-list">
              {GAP_NOW.map((it) => (
                <li key={it.l}>
                  <span className="aigap-marker aigap-marker--shallow">-</span>
                  <div>
                    <span className="aigap-it-l">{it.l}</span>
                    <span className="aigap-it-d">{it.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <span className="aigap-versus" aria-hidden="true">
            <span>TO</span>
          </span>

          <article className="aigap-col aigap-col--deep">
            <header className="aigap-col-head">
              <span className="aigap-col-eyebrow">After</span>
              <h3 className="aigap-col-title">What the same tools do when they're wired</h3>
            </header>
            <ul className="aigap-list">
              {GAP_BUILT.map((it) => (
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

        <div className="aigap-cta">
          <div className="aigap-cta-rule" />
          <h3 className="aigap-cta-text">
            <span className="t-mute">The promise:</span><br />
            <span className="aigap-cta-strong">Easy to find. Same everywhere. Nothing typed twice. One place you control.</span>
          </h3>
          <a className="aigap-cta-btn" href="/book/">
            <span className="aigap-cta-dot" />
            Book a call <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AIGap });
