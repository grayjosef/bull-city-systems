/* global React */

/* =====================================================================
 * START: two ways in, kept deliberately separate.
 *   A) FREE 30-minute intro call: "check you out and book a call."
 *      Books on Google Calendar (window.BOOKING_URL). No money.
 *   B) PAID 60-minute working session: $99 deposit, applies in full
 *      to any commissioned project. Books through /book (the Worker).
 * The old homepage intake form is gone; these two doors replace it.
 * ===================================================================== */

function Start() {
  const ref = useReveal();
  const freeUrl = (typeof window !== "undefined" && window.BOOKING_URL) || "/book/";
  return (
    <section id="intake" className="start">
      <div className="container reveal" ref={ref}>
        <div className="section-head">
          <span className="numeral">10 / Start</span>
        </div>
        <h2 className="h-section">
          Two ways to start.<br />
          <span className="t-mute">One is free. One puts money down.</span>
        </h2>
        <p className="lede">
          Not sure yet? Take the free call. Ready to get to work? Book the
          working session. Two different doors, on purpose.
        </p>

        <div className="tiers tiers-2">
          <article className="tier">
            <header className="tier-head">
              <h3 className="tier-name">Free intro call</h3>
              <div className="tier-price">
                <span className="tier-sub eyebrow-mute">30 minutes · no cost</span>
                <span className="tier-amt">Free</span>
              </div>
            </header>
            <p className="tier-desc body">
              Check me out before you spend a dime. We talk through what's
              going on with your tech, I tell you straight what I notice,
              and you decide whether we go any further.
            </p>
            <ul className="tier-list">
              <li><span className="tier-tick">+</span>30-minute call</li>
              <li><span className="tier-tick">+</span>Your questions, answered straight</li>
              <li><span className="tier-tick">+</span>What I'd fix first, in plain terms</li>
              <li><span className="tier-tick">+</span>No cost, no obligation</li>
            </ul>
            <a className="btn btn-ghost tier-cta" href={freeUrl} target="_blank" rel="noopener noreferrer">
              Book the free call <span className="arrow">→</span>
            </a>
          </article>

          <article className="tier tier-feature">
            <span className="tier-flag">Money down</span>
            <header className="tier-head">
              <h3 className="tier-name">Working session</h3>
              <div className="tier-price">
                <span className="tier-sub eyebrow-mute">60 minutes · deposit credited in full</span>
                <span className="tier-amt">$99</span>
              </div>
            </header>
            <p className="tier-desc body">
              Ready to work? Put $99 down on a full 60-minute working
              session. We dig into your systems and leave with a real plan.
              The $99 deposit applies in full to any commissioned project.
            </p>
            <ul className="tier-list">
              <li><span className="tier-tick">+</span>60-minute working session</li>
              <li><span className="tier-tick">+</span>$99 deposit, paid up front</li>
              <li><span className="tier-tick">+</span>Applies in full to any commissioned project</li>
              <li><span className="tier-tick">+</span>A plan you keep either way</li>
            </ul>
            <a className="btn btn-primary tier-cta" href="/book/">
              Book the working session <span className="arrow">→</span>
            </a>
          </article>
        </div>

        <p className="pricing-note">
          <span className="numeral">Either way:</span> you can also just call{" "}
          <a href="tel:+19192839006">(919) 283-9006</a> or email{" "}
          <a href="mailto:hello@bullcitysystems.com">hello@bullcitysystems.com</a>.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { Start });
