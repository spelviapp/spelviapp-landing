# Spelvi — Landing page

Single-page landing for `spelvi.com`. Static HTML/CSS, no build step.

## Files

- `index.html` — the page
- `styles.css` — single stylesheet, light + dark mode
- `favicon.svg` — inline SVG icon
- `CNAME` — custom domain for GitHub Pages
- `robots.txt` + `sitemap.xml` — basic SEO

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a public repo on GitHub: `spelviapp-landing` (or any name)
2. From this folder:

   ```sh
   git init
   git add .
   git commit -m "initial landing page"
   git branch -M main
   git remote add origin git@github.com:<your-user>/spelviapp-landing.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: `Deploy from a branch` → `main` / `/ (root)`**
4. **Settings → Pages → Custom domain → enter `spelvi.com`** (the `CNAME` file is already in repo, GitHub will pick it up)
5. **Tick "Enforce HTTPS"** once Let's Encrypt has issued the cert (usually within 5–10 minutes)

## DNS at Porkbun

Add these records on `spelvi.com`:

| Type  | Host  | Answer (4 IPs for apex) |
|-------|-------|-------------------------|
| A     | @     | `185.199.108.153`       |
| A     | @     | `185.199.109.153`       |
| A     | @     | `185.199.110.153`       |
| A     | @     | `185.199.111.153`       |
| CNAME | www   | `spelviapp.github.io`   |

After DNS propagates (5–60 min) the site will be at `https://spelvi.com`.

## After it's live

```sh
curl -fsS https://web.archive.org/save/https://spelvi.com
```

This forces an Internet Archive snapshot — proof of "use in commerce" with a timestamp,
useful when filing trademark.
