/* global React */
const { useState: useStateW, useEffect: useEffectW, useRef: useRefW } = React;

/* =====================================================
   Persistent Durham Flag: pinned to viewport
   ===================================================== */
function DurhamFlagBadge() {
  const [open, setOpen] = useStateW(false);
  return (
    <div className={"flag-badge" + (open ? " flag-open" : "")}>
      <button className="flag-btn"
              onClick={() => setOpen((v) => !v)}
              aria-label="Durham, NC flag"
              title="Durham, NC">
        <DurhamFlagSVG />
        <span className="flag-pulse" />
      </button>
      {open && (
        <div className="flag-panel" onClick={() => setOpen(false)}>
          <div className="flag-panel-inner" onClick={(e) => e.stopPropagation()}>
            <span className="numeral">DURHAM, NC</span>
            <DurhamFlagSVG large />
            <ul className="flag-meaning">
              <li><span className="fm-sw" style={{ background: "#1F4A8A" }} />Royal blue: courage</li>
              <li><span className="fm-sw" style={{ background: "#B83A28" }} />Red: action &amp; progress</li>
              <li><span className="fm-sw" style={{ background: "#C8932E" }} />Gold: quality in growth</li>
              <li><span className="fm-sw" style={{ background: "#ECE5D6" }} />White: high ideals</li>
            </ul>
            <p className="flag-foot">Seven stars · The Pleiades · The New Spirit of Durham</p>
            <button className="flag-close" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DurhamFlagSVG({ large }) {
  const w = large ? 240 : 44;
  const h = large ? 156 : 28;
  return (
    <svg width={w} height={h} viewBox="0 0 240 156" className="durham-flag-svg" aria-hidden="true">
      <rect x="0" y="0" width="150" height="156" fill="#1F4A8A" />
      <rect x="150" y="0"   width="90" height="52" fill="#B83A28" />
      <rect x="150" y="52"  width="90" height="52" fill="#ECE5D6" />
      <rect x="150" y="104" width="90" height="52" fill="#C8932E" />
      <g fill="#ECE5D6">
        <Star cx="55"  cy="50" r="6" />
        <Star cx="90"  cy="38" r="5" />
        <Star cx="38"  cy="80" r="4" />
        <Star cx="80"  cy="78" r="6" />
        <Star cx="115" cy="68" r="4" />
        <Star cx="60"  cy="110" r="5" />
        <Star cx="105" cy="115" r="4" />
      </g>
      <rect x="0.5" y="0.5" width="239" height="155" fill="none" stroke="#0B0D11" strokeWidth="1" />
    </svg>
  );
}

function Star({ cx, cy, r }) {
  const CX = parseFloat(cx), CY = parseFloat(cy), R = parseFloat(r);
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? R : R * 0.42;
    const x = CX + Math.cos(angle) * rad;
    const y = CY + Math.sin(angle) * rad;
    points.push(x.toFixed(2) + "," + y.toFixed(2));
  }
  return <polygon points={points.join(" ")} />;
}

Object.assign(window, { DurhamFlagBadge, DurhamFlagSVG });
