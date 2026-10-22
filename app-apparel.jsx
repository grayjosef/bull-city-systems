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

function ConceptGallery() {
  return (
    <div className="concepts">
      <p className="concept-intro">
        The Bull City Systems apparel line is in production. New boards are on the way.
      </p>
    </div>
  );
}

function Apparel() {
  const ref = useReveal();
  return (
    <section id="apparel" className="apparel">
      <div className="container reveal" ref={ref}>
        <div className="section-head">
          <span className="numeral">Apparel</span>
        </div>
        <h2 className="h-section">Bull City Systems apparel.</h2>
        <ConceptGallery />
      </div>
    </section>
  );
}

Object.assign(window, { Apparel, ShopShelf, ConceptGallery });
