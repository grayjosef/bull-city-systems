/* global React */

/* ---------- Apparel: first drop preview ---------- */
function Apparel() {
  const ref = useReveal();
  return (
    <section id="apparel" className="apparel">
      <div className="container reveal" ref={ref}>
        <div className="section-head">
          <span className="numeral">11 / Apparel</span>
        </div>
        <h2 className="h-section">
          Bull City Systems apparel.<br />
          <span className="t-mute">Wear the bull around Durham.</span>
        </h2>
        <p className="lede apparel-lede">
          The studio is getting a uniform. Gear built around the whole bull, the
          ceremonial mark, made for client visits, shop days, and anybody in this
          city who wants to wear a little Durham on their back.
        </p>

        <div className="apparel-grid">
          <figure className="apparel-bull">
            <img src="brand/bull-b3-cream.png?v=b2041" alt="The Bull City Systems bull, the full broadside B3 bull that goes on the apparel" className="apparel-bull-img" />
            <figcaption className="apparel-bull-cap">The whole bull. He is the mark on every piece.</figcaption>
          </figure>

          <div className="apparel-drop">
            <span className="apparel-drop-tag">The first drop, in the works</span>
            <div className="apparel-item">
              <span className="apparel-item-name">The client-visit polo</span>
              <p>The bull on the chest. What the owner wears on site, in your building, doing the work.</p>
            </div>
            <div className="apparel-item">
              <span className="apparel-item-name">The full-bull tee</span>
              <p>The B3 bull broadside and full size. The ceremonial mark, worn loud.</p>
            </div>
            <div className="apparel-item">
              <span className="apparel-item-name">Shop gear and swag</span>
              <p>More ways to carry him: shop gear and swag for the crew and the community.</p>
            </div>
            <p className="apparel-status">
              Still in the works. No dates and no pre-orders. When it is ready, it lands in one place.
            </p>
            <a className="btn btn-brass apparel-cta" href="https://www.etsy.com/shop/AppliedAttention" target="_blank" rel="noopener noreferrer">
              Gear lands in the Applied Attention shop on Etsy <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Apparel });
