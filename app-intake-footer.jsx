/* global React */
/* ---------------------------------------------------------------------------
 * app-intake-footer.jsx
 *
 * The Intake component now lives in app-intake-v2.jsx (new multi-service form
 * with conditional sub-forms and 72-hour confirmation). This file holds
 * the Footer + BCSignature mounting only.
 * ------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <hr className="rule" />
        <div className="footer-grid">
          <div className="footer-brand">
            <BCSMark size={44} />
            <div>
              <div className="footer-name">Bull City Systems</div>
              <div className="footer-sub"><span className="t-vet">Veteran-owned</span> technical studio<br />serving Durham and the Triangle</div>
              <div className="footer-arc">An Arc &amp; Anchor studio</div>
            </div>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Studio</span>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToId("services"); }}>Services</a></li>
              <li><a href="#why" onClick={(e) => { e.preventDefault(); scrollToId("why"); }}>Why us</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToId("pricing"); }}>Pricing</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollToId("process"); }}>Process</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToId("about"); }}>About the owner</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Contact</span>
            <ul>
              <li><a href="mailto:hello@bullcitysystems.com">hello@bullcitysystems.com</a></li>
              <li><a href="mailto:quotes@bullcitysystems.com">quotes@bullcitysystems.com</a></li>
              <li><span className="t-mute">Durham, North Carolina</span></li>
              <li><a href="#intake" onClick={(e) => { e.preventDefault(); scrollToId("intake"); }}>Free project review →</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Community</span>
            <ul>
              <li><a href="https://moneyoutofpolitics.org" target="_blank" rel="noopener noreferrer">Money Out of Politics ↗</a></li>
              <li><span className="t-mute">A nonprofit by the founder</span></li>
              <li><span className="t-mute">Bull City · NC</span></li>
              <li><span className="t-mute">35.99° N · 78.90° W</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2026 Bull City Systems · bullcitysystems.com</span>
          <span className="t-mute">Built in Durham. Built to last.</span>
        </div>

        {/* Universal Bull City signature — Durham flag + powered-by tagline */}
        <BCSignature />
      </div>
    </footer>
  );
}

if (typeof window !== "undefined") {
  Object.assign(window, { Footer });
}
