/* global React */

/* =================================================================
   AI JUMPSTART: the service.
   The AI gap section names the problem. This is the hands-on offer
   that closes it for a small business: setup on their accounts, a
   prompt library for their real work, and training that sticks.
   ================================================================= */

const JUMPSTART_GETS = [
  {
    l: "The walk-through",
    d: "I look at how work actually moves through your business: quotes, invoices, emails, follow-ups, scheduling. We find the hours AI can honestly give back.",
    more: "A working session in your shop, not a survey. I map the five to ten tasks eating your week, time them, and rank them by the hours they cost you. You get the map in writing, and it decides what we set up first.",
  },
  {
    l: "Setup on your accounts",
    d: "The right AI tools, configured for your business, on logins you own and control. Nothing held hostage, nothing hidden in a black box.",
    more: "The right AI tools for your trade, configured with your business details, your services, your prices, your voice. Every account in your name, every password in your hand. If I disappeared tomorrow, your system keeps running.",
  },
  {
    l: "Your prompt library",
    d: "Ready-to-use templates written for your real work: estimates, customer emails, review replies, social posts, job summaries. Open, paste, done.",
    more: "Written for your real work and tested on it before you ever rely on them: estimates and quotes, customer emails, follow-up messages, review replies, social posts, job summaries, invoice chasers. Fill in the blanks, done.",
  },
  {
    l: "Training that sticks",
    d: "I train you and your crew on your own tasks, in person across the Triangle or by video, until everyone can run it without me in the room.",
    more: "Two live training sessions for you and your crew, run on your actual jobs, not sample data. Sessions are recorded, so the hire you make six months from now gets the same training.",
  },
  {
    l: "The judgment piece",
    d: "AI is a fast intern, not an oracle. You learn where to trust it, where to check it, and where a human makes the final call. That judgment is the real skill.",
    more: "A plain-English rundown written for your business: what AI may draft and you approve, what it never touches, and the three checks that catch its mistakes before a customer ever sees them.",
  },
  {
    l: "The playbook",
    d: "Everything written down in plain English: tools, logins, templates, steps. The system survives staff turnover, busy seasons, and bad Mondays.",
    more: "One document with everything in it: tools, logins, templates, steps, in order. Plus 30 days of follow-up questions by email while the new habits set in.",
  },
];

function AIJumpstart() {
  const ref = useReveal();
  const [open, setOpen] = React.useState(-1);

  return (
    <section id="ai-jumpstart" className="aijs">
      <div className="container reveal" ref={ref}>
        <div className="section-head">
          <span className="numeral">04 / AI Jumpstart</span>
          <span className="aijs-id">SERVICE · SETUP + TRAINING · TRIANGLE, NC</span>
        </div>

        <h2 className="h-section">
          AI, set up and working<br />
          <span className="t-mute">in your business. Not a demo.</span>
        </h2>

        <p className="lede aijs-lede">
          Every week a new tool launches, and the shops that figure AI out first
          quietly get faster than everyone else on the street. The owners winning
          with it are not technical. They had one person come in, learn how the
          business actually runs, set the tools up right, and teach the crew on
          their own work. That is this service. It is the same play Mark Cuban
          keeps pointing at: companies do not need more AI hype, they need
          somebody who can walk in and implement it.
        </p>

        <p className="aijs-tap-hint">Every card opens. This is exactly what the $999 buys, no fine print:</p>
        <div className="aijs-grid">
          {JUMPSTART_GETS.map((it, i) => (
            <article
              className={"aijs-card" + (open === i ? " aijs-card-open" : "")}
              key={it.l}
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span className="aijs-marker">{open === i ? "\u00d7" : "+"}</span>
              <h3 className="aijs-card-title">{it.l}</h3>
              <p className="aijs-card-body">{it.d}</p>
              {open === i && <p className="aijs-more">{it.more}</p>}
              <span className="aijs-toggle">{open === i ? "Close" : "What you get"}</span>
            </article>
          ))}
        </div>

        <p className="aijs-who">
          Built for auto shops, landscapers, barbers and salons, contractors,
          clinics, and front offices. Any Triangle business drowning in
          paperwork and phone tag.
        </p>

        <div className="aijs-promise">
          <span className="aijs-promise-tag">THE DEAL</span>
          <p className="aijs-promise-text">
            One customer at a time. When you book a Jumpstart, you are my only
            customer until it is set up, trained, and working the way you want
            it, flash to bang. That is how every job here runs.
          </p>
        </div>

        <div className="aijs-price">
          <span className="aijs-price-amount">$999</span>
          <span className="aijs-price-note">
            The complete package, one flat price. No hourly meter, no upsell
            ladder. The $99 booking deposit applies in full.
          </span>
        </div>

        <div className="aijs-cta">
          <a className="aigap-cta-btn" href="/book/">
            <span className="aigap-cta-dot" />
            Book a call <span className="arrow">→</span>
          </a>
          <a className="aijs-phone" href="tel:+19192839006">(919) 283-9006</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AIJumpstart });
