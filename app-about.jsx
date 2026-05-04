/* global React */
const { useState: useStateA } = React;

/* ---------- About the Owner ---------- */
function About() {
  const ref = useReveal();
  return (
    <section id="about" className="about">
      <div className="container about-grid reveal" ref={ref}>
        <div className="about-portrait">
          <div className="portrait-frame portrait-photo">
            <img src="owner-headshot.jpg" alt="Founder, Bull City Systems — Durham, NC" className="portrait-img" />
            <div className="portrait-stamp">
              <span className="portrait-stamp-dot" />
              <span>VERIFIED · DURHAM, NC</span>
            </div>
            <div className="portrait-tag">
              <span className="numeral">FOUNDER</span>
              <span className="portrait-name">Bull City Systems</span>
            </div>
          </div>
        </div>

        <div className="about-body">
          <div className="section-head">
            <span className="numeral">09 / About the owner</span>
            {/* numeral kept; section reads cleaner with About staying just before intake */}
          </div>
          <h2 className="h-section about-title">
            Local first.<br />
            <span className="t-mute">Technical second. Both, always.</span>
          </h2>
          <p className="lede about-lede">
            Bull City Systems is run by a Durham-based veteran and community organizer.
            Outside of client work, his focus is on the people and institutions that make
            this place actually work — local activism, civic infrastructure, and the slow,
            unglamorous work of building accountable local power.
          </p>
          <p className="body about-copy">
            He's the founder of <a className="ext-link" href="https://moneyoutofpolitics.org" target="_blank" rel="noopener noreferrer">Money Out of Politics</a>{" "}
            <span className="ext-arrow">↗</span>, a nonprofit dedicated to reducing the influence of money
            in American elections. The same operating principles drive Bull City Systems:
            transparency in pricing, accountability in delivery, and a refusal to dress up
            simple work as something it isn't.
          </p>

          <ul className="about-pills">
            <li className="vet-pill"><span className="pill-check" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 L4.2 7.4 L8 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span className="t-vet">Veteran-owned</span></li>
            <li><span className="pill-check" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 L4.2 7.4 L8 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Durham resident</li>
            <li><span className="pill-check" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 L4.2 7.4 L8 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Community organizer</li>
            <li><span className="pill-check" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 L4.2 7.4 L8 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Nonprofit founder</li>
          </ul>

          <a className="btn btn-brass about-cta" href="https://moneyoutofpolitics.org" target="_blank" rel="noopener noreferrer">
            Visit Money Out of Politics <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
