# Deploying bullcitysystems.com

Three phases. Do them in order. ~20 minutes total once you have accounts.

- **Phase 1** — Push the code to GitHub
- **Phase 2** — Connect Cloudflare Pages to the repo
- **Phase 3** — Move the domain from Porkbun to Cloudflare and attach it to the site

---

## Phase 1 — Push to GitHub

You said the repo is `https://github.com/grayjosef/bull-city-systems`. From the directory containing these files:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/grayjosef/bull-city-systems.git
git push -u origin main
```

If GitHub asks for credentials and rejects your password, you need a Personal Access Token: github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate. Give it `repo` scope. Use that as the password.

If the repo already has files (e.g., a default README), pull first:

```bash
git pull origin main --allow-unrelated-histories
# resolve any conflicts, then:
git push -u origin main
```

---

## Phase 2 — Cloudflare Pages

1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
2. Authorize Cloudflare to access your GitHub. Pick `grayjosef/bull-city-systems`.
3. Configure the build:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` (or leave blank)
   - **Root directory:** *(leave blank)*
4. Click **Save and Deploy**.

First build takes ~30 seconds. You'll get a URL like `bull-city-systems.pages.dev` — open it and verify the site looks right.

Every subsequent `git push` to `main` auto-deploys. PRs get preview URLs.

---

## Phase 3 — Domain: Porkbun → Cloudflare

You bought `bullcitysystems.com` on Porkbun and want it on Cloudflare. Two ways to do this. **Option A is what Cloudflare expects** and gives you their CDN, SSL, DDoS protection, etc. for free.

### Option A — Move DNS to Cloudflare (recommended)

**Step 1: Add the domain to Cloudflare.**

1. Cloudflare dashboard → **Add a domain** → enter `bullcitysystems.com`.
2. Pick the **Free** plan.
3. Cloudflare scans your existing DNS records. There likely won't be any meaningful ones since the domain is new — that's fine.
4. Cloudflare gives you **2 nameservers**, e.g.:
   ```
   alice.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```
   Copy these. Yours will be different — use the ones Cloudflare actually shows you.

**Step 2: Update nameservers at Porkbun.**

1. Log in to **porkbun.com** → **Account** → **Domain Management**.
2. Find `bullcitysystems.com` → click **Details** (or the gear icon) → **Authoritative Nameservers**.
3. Replace Porkbun's default nameservers with Cloudflare's two.
4. Save.

**Step 3: Wait for propagation.**

Cloudflare emails you when nameservers are confirmed. Usually 5 minutes to a few hours. You can check with:

```bash
dig NS bullcitysystems.com
```

Once it shows the Cloudflare nameservers, you're good.

**Step 4: Attach the domain to your Pages project.**

1. Cloudflare dashboard → **Workers & Pages** → click your `bull-city-systems` project.
2. **Custom domains** tab → **Set up a custom domain**.
3. Enter `bullcitysystems.com`. Cloudflare will auto-create the DNS records since you control DNS now.
4. Repeat for `www.bullcitysystems.com` (Cloudflare will set up a redirect to the apex).
5. SSL provisions automatically — usually within a couple minutes.

Done. Visit https://bullcitysystems.com — it's live.

### Option B — Keep DNS at Porkbun

Only do this if you have a specific reason to keep DNS at Porkbun (e.g., other Porkbun-managed services).

1. In Cloudflare Pages → your project → **Custom domains** → add `bullcitysystems.com`. Cloudflare will give you a CNAME target like `bull-city-systems.pages.dev`.
2. In Porkbun DNS, add:
   - **CNAME** `www` → `bull-city-systems.pages.dev`
   - For the apex (root), Porkbun supports **ALIAS** records: **ALIAS** `@` → `bull-city-systems.pages.dev`. (If your registrar doesn't support ALIAS, this route doesn't work — use Option A.)

You won't get Cloudflare's CDN/security at the edge, only Pages itself.

---

## Sanity checklist

After everything:

- [ ] `https://bullcitysystems.com` loads the site
- [ ] `https://www.bullcitysystems.com` redirects to apex (or vice versa, your call)
- [ ] SSL padlock shows in the browser
- [ ] Pushing to `main` auto-deploys (try a tiny commit and watch the build)
- [ ] Mobile view looks right (use real phone, not just devtools)

---

## Troubleshooting

**"Site shows a blank page after deploy."**
Open browser devtools → Console. Most likely a JSX file failed to load. Check the Network tab for 404s. Probable cause: a file wasn't committed (run `git status` locally) or a path is wrong.

**"My push got rejected because the remote has commits."**
GitHub auto-creates a README when you make a repo. Either:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```
…or force-push if the remote has nothing you want:
```bash
git push -u origin main --force
```

**"Nameservers haven't propagated after 24 hours."**
Double-check Porkbun saved the nameserver change. Some registrars require an extra confirmation email or a "click to apply" button.

**"Custom domain shows 'pending' in Cloudflare Pages forever."**
Usually means nameservers haven't fully propagated yet, or the DNS records weren't created. In Cloudflare's DNS tab for the domain, you should see records pointing to your Pages project — if not, remove and re-add the custom domain in Pages.

**"How do I see what's actually being served?"**
```bash
curl -I https://bullcitysystems.com
```
Headers will show whether Cloudflare is serving it (`server: cloudflare`).
