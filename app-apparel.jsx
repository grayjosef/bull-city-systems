/* global React */

/* ---------- Apparel: first drop preview + live shop shelf ---------- */
function ShopShelf() {
  const listings = window.SHOP_LISTINGS || [];
  if (!listings.length) return null;
  return (
    <div className="shelf">
      <div className="section-head">
        <span className="apparel-drop-tag">In the shop now</span>
      </div>
      <div className="shelf-grid">
        {listings.map((l) => (
          <article className="shelf-card" key={l.id}>
            <a className="shelf-card-media" href={l.url} target="_blank" rel="noopener noreferrer">
              <img src={l.image} alt={l.title} className="shelf-card-img" loading="lazy" />
              <span className="shelf-badge">{l.badge}</span>
            </a>
            <div className="shelf-card-body">
              <h3 className="shelf-card-title">{l.title}</h3>
              <p className="shelf-card-price">{l.price}</p>
              <p className="shelf-card-detail">{l.detail}</p>
              <a className="btn btn-brass shelf-card-btn" href={l.url} target="_blank" rel="noopener noreferrer">
                Get it on Etsy <span className="arrow">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="shelf-note">Live from the Applied Attention shop on Etsy. Checkout runs through Etsy.</p>
    </div>
  );
}

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
            <img src="brand/bull-b3-cream.png?v=b2043" alt="The Bull City Systems bull, the full broadside B3 bull that goes on the apparel" className="apparel-bull-img" />
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

        <ShopShelf />
      </div>
    </section>
  );
}

Object.assign(window, { Apparel, ShopShelf });
