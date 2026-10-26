/* global React */
/* =================================================================
   WORK: proof. Five projects, one line each, a link.
   Edit WORK below; the component is data-driven.
   ================================================================= */

const WORK = [
  {
    name: "The Fitting Room",
    url: "https://thefittingroom-gh.com",
    what: "Website + booking",
    line: "Find it, see the work, book a fitting. One door, no phone tag.",
    tag: "BE FOUND · LINK",
  },
  {
    name: "The Willow Well",
    url: "https://thewillowwellco.com",
    what: "Website + brand unify",
    line: "Same name, same voice, same hours on every page and listing.",
    tag: "UNIFY · BE FOUND",
  },
  {
    name: "Political Integrity Network",
    url: "https://politicalintegritynetwork.org",
    what: "Civic tool · built and run",
    line: "Government accountability research, published as a working product, not a PDF.",
    tag: "CUSTOM BUILD",
  },
  {
    name: "The Quiet Ledger",
    url: "https://thequietledger.org",
    what: "Civic tool · built and run",
    line: "Every bill graded against the same published standard, and who actually controls it, mapped in the open.",
    tag: "CUSTOM BUILD",
  },
  {
    name: "Money Out of Politics",
    url: "https://moneyoutofpolitics.org",
    what: "Website · relaunch",
    line: "A citizens' movement relaunched on a rebuilt site, built to serve the public.",
    tag: "CUSTOM BUILD",
  },
];

function Work() {
  const ref = useReveal();
  return (
    <section id="work" className="work">
      <div className="container reveal" ref={ref}>
        <div className="section-head">
          <span className="numeral">05 / Work</span>
          <span className="aijs-id">LIVE · TRIANGLE, NC</span>
        </div>
        <h2 className="h-section">
          Shipped.<br />
          <span className="t-mute">Click any of them. They're live.</span>
        </h2>

        <ul className="work-list">
          {WORK.map((w, i) => (
            <li key={w.name} className="work-item">
              <a className="work-link" href={w.url} target="_blank" rel="noopener noreferrer">
                <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="work-main">
                  <span className="work-name">{w.name} <span className="work-ext">↗</span></span>
                  <span className="work-line">{w.line}</span>
                </div>
                <div className="work-meta">
                  <span className="work-what">{w.what}</span>
                  <span className="work-tag">{w.tag}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="work-foot">
          <span className="numeral">Next:</span> yours. Every build ships with the owner as admin on every account and the whole thing written down.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { Work, WORK });
