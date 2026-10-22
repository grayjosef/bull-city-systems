/* global React */
const { useState: useStateA } = React;

/* ---------- About: one short block ---------- */
function About() {
  const ref = useReveal();
  return (
    <section id="about" className="about">
      <div className="container about-grid reveal" ref={ref}>
        <div className="about-portrait">
          <div className="portrait-frame portrait-photo">
            <img src="owner-headshot.jpg" alt="Josef Gray, founder of Bull City Systems, Durham, NC" className="portrait-img" />
            <div className="portrait-stamp">
              <span className="portrait-stamp-dot" />
              <span>DURHAM, NC</span>
            </div>
            <div className="portrait-tag">
              <span className="numeral">FOUNDER</span>
              <span className="portrait-name">Josef Gray</span>
            </div>
          </div>
        </div>

        <div className="about-body">
          <div className="section-head">
            <span className="numeral">03 / About</span>
          </div>
          <h2 className="h-section about-title">About.</h2>
          <p className="lede about-lede">
            I'm Josef Gray, founder of Bull City Systems, a Black-owned
            technical design studio in Durham, North Carolina.
          </p>
          <p className="body about-copy">
            The studio is one-man by design. The person you book is the person
            who scopes the work, builds it, and hands back the keys: no account
            managers, no handoffs, no offshore relay. When something needs
            doing, you know exactly whose desk it is on.
          </p>

          <ul className="about-pills">
            <li><span className="pill-check" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 L4.2 7.4 L8 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Black-owned</li>
            <li><span className="pill-check" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 L4.2 7.4 L8 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Durham, NC</li>
            <li><span className="pill-check" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 L4.2 7.4 L8 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>One-man by design</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
