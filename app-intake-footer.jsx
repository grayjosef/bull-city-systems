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
            <BCSMonogram height={40} />
            <div>
              <div className="footer-name">Bull City Systems</div>
              <div className="footer-sub">Technical design studio<br />serving Durham and the Triangle</div>
            </div>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Studio</span>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToId("services"); }}>What we do</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToId("pricing"); }}>Pricing</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToId("about"); }}>About</a></li>
              <li><a href="#apparel" onClick={(e) => { e.preventDefault(); scrollToId("apparel"); }}>Apparel</a></li>
              <li><a href="#intake" onClick={(e) => { e.preventDefault(); scrollToId("intake"); }}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Contact</span>
            <ul>
              <li><a href="mailto:hello@bullcitysystems.com">hello@bullcitysystems.com</a></li>
              <li><a href="tel:+19192839006">(919) 283-9006</a></li>
              <li><span className="t-mute">Durham, North Carolina</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="eyebrow-mute">Network</span>
            <ul>
              <li><a href="https://www.linkedin.com/company/bull-city-systems" target="_blank" rel="noopener noreferrer">Bull City Systems on LinkedIn ↗</a></li>
              <li><a href="https://politicalintegritynetwork.org" target="_blank" rel="noopener noreferrer">Political Integrity Network ↗</a></li>
              <li><a href="https://thequietledger.org" target="_blank" rel="noopener noreferrer">The Quiet Ledger ↗</a></li>
              <li><a href="https://thefittingroom-gh.com" target="_blank" rel="noopener noreferrer">The Fitting Room ↗</a></li>
              <li><a href="https://thewillowwellco.com" target="_blank" rel="noopener noreferrer">The Willow Well ↗</a></li>
              <li><span className="t-mute">Built by Bull City Systems</span></li>
              <li><span className="t-mute">Bull City · NC</span></li>
              <li><span className="t-mute">35.99° N · 78.90° W</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-etsy">
          <a href="https://www.etsy.com/shop/AppliedAttention" target="_blank" rel="noopener noreferrer" aria-label="Applied Attention on Etsy">
            <img src="brand/etsy-shop-qr.png?v=b2050" alt="QR code for the Applied Attention shop on Etsy" className="footer-etsy-qr" width={104} height={104} />
          </a>
          <div className="footer-etsy-copy">
            <p>Wearing the gear? Scan to find it.</p>
            <a href="https://www.etsy.com/shop/AppliedAttention" target="_blank" rel="noopener noreferrer">Applied Attention on Etsy ↗</a>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2026 Bull City Systems · bullcitysystems.com</span>
          <span className="t-mute">Built in Durham. Built to last.</span>
        </div>

        {/* Universal Bull City signature, Durham flag + powered-by tagline */}
        <BCSignature />
      </div>
    </footer>
  );
}

if (typeof window !== "undefined") {
  Object.assign(window, { Footer });
}
