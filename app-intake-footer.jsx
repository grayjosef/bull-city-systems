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
              <li><a href="tel:+19192839006">(919) 283-9006</a></li>
              <li><span className="t-mute">Durham, North Carolina</span></li>
              <li><a href="/book/">Book a call →</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Network</span>
            <ul>
              <li><a href="https://politicalintegritynetwork.org" target="_blank" rel="noopener noreferrer">Political Integrity Network ↗</a></li>
              <li><a href="https://thequietledger.org" target="_blank" rel="noopener noreferrer">The Quiet Ledger ↗</a></li>
              <li><a href="https://thefittingroom-gh.com" target="_blank" rel="noopener noreferrer">The Fitting Room ↗</a></li>
              <li><span className="t-mute">Built by Bull City Systems</span></li>
              <li><span className="t-mute">Bull City · NC</span></li>
              <li><span className="t-mute">35.99° N · 78.90° W</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2026 Bull City Systems · bullcitysystems.com</span>
          <span className="t-mute">Built in Durham. Built to last.</span>
        </div>

        {/* Universal Bull City signature, Durham flag + powered-by tagline */}
        <BCSignature />
      </div>

      {/* Floating call button - visible on all pages */}
      <a href="tel:+19192839006" className="floating-call" aria-label="Call Bull City Systems now">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="floating-call-text">Call now<br />(919) 283-9006</span>
      </a>
    </footer>
  );
}

if (typeof window !== "undefined") {
  Object.assign(window, { Footer });
}
