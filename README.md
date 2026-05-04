# Bull City Systems

Marketing site for **Bull City Systems** — a veteran-owned technical studio serving Durham and the Triangle. A studio of Arc & Anchor.

🌐 **Live:** [bullcitysystems.com](https://bullcitysystems.com)

## What this is

A static, single-page React landing page. The JSX is currently compiled in the browser via `@babel/standalone` — fast to ship, slow on first paint. See **Future improvements** below for the precompile path.

## Stack

- **React 18** (loaded from unpkg)
- **Babel Standalone** (in-browser JSX compilation)
- **Vanilla CSS** with custom properties (no Tailwind, no preprocessors)
- **Cloudflare Pages** for hosting
- **No build step**

## Local development

No install needed. Just serve the directory:

```bash
# Python (built-in)
python3 -m http.server 8000

# or Node
npx serve .

# or VS Code
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000`.

## File map

| File                          | What it is                                                |
| ----------------------------- | --------------------------------------------------------- |
| `index.html`                  | Entry point. Loads React, Babel, fonts, then composes app |
| `styles.css`                  | Design tokens (colors, type, spacing) + base styles       |
| `sections.css`                | Section-level styles — hero, services, pricing, etc.      |
| `sections-v2.css`             | Refinements / overrides for sections                      |
| `welcome.css`                 | Welcome intro animation styles                            |
| `app-welcome.jsx`             | Opening "WelcomeIntro" animation                          |
| `app-nav-hero.jsx`            | Top nav + hero section                                    |
| `app-ai-gap.jsx`              | "AI gap" framing section                                  |
| `app-sections-1.jsx`          | Problem, Services, Why                                    |
| `app-sections-2.jsx`          | Pricing, Process, Durham                                  |
| `app-about.jsx`               | About the owner                                           |
| `app-intake-footer.jsx`       | Multi-step intake form, footer, Durham flag badge         |
| `owner-headshot.jpg`          | Founder photo (used in About section)                     |
| `_headers`                    | Cloudflare Pages cache + security headers                 |

## Deploy

See [`DEPLOY.md`](./DEPLOY.md) for first-time Cloudflare Pages + Porkbun setup.

After initial setup, deploys are automatic on every push to `main`.

## Form submission

The intake form currently shows a success state but **does not actually send anywhere yet**. The submission handler is in `app-intake-footer.jsx` — search for the `onSubmit` handler.

To wire it up, you have two clean options:

1. **Cloudflare Pages Function** (`functions/intake.js`) that forwards to email or a Google Sheet via webhook.
2. **External form service** (Formspree, Basin, Web3Forms) — change the form's `action` URL and you're done.

Either route should send notifications to **info@bullcitysystems.com**.

## Future improvements

- **Precompile the JSX** so the site doesn't ship Babel to every visitor (~500KB savings, much faster first paint). Easiest path: small `esbuild` script that compiles each `.jsx` to `.js`, then update `index.html` to load `.js` and drop the Babel script. ~30 minute job.
- **Wire up the intake form** to actually deliver leads (see above).
- **Add a Calendar booking link** for the "Book a consultation" CTA. Currently both CTAs scroll to the intake form.
- **Add favicon + Open Graph image**.

## License

All rights reserved. © Bull City Systems / Arc & Anchor.
