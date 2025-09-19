# Thrive Light

Accessible, fast, SEO-first website built with Next.js App Router, TypeScript, TailwindCSS, MDX blog, Netlify deploy, and optional Vercel.

## One-command setup

```bash
# from thrive-light/
npm install
npm run build && npm run export  # static export to ./out for Netlify
```

- Production folder: `out/`
- Local dev: `npm run dev` then open http://localhost:3000

## Deploy

### Netlify (preferred)
1. Create new site from Git in Netlify and select your repo.
2. Build command: `npm run build && npm run export`
3. Publish directory: `out`
4. Add environment variables (Settings → Environment):
   - `SITE_URL` = `https://thrivelight.com`
   - `SENDGRID_API_KEY` (optional for email fallback)
   - `CONTACT_TO_EMAIL` (e.g. `hello@thrivelight.com`)
5. Forms: Contact form is automatically handled by Netlify Forms.

`netlify.toml` is already configured:
- Redirects `/api/*` → Netlify Functions.
- Security headers (HSTS, CSP, X-Frame-Options, etc.).
- Long-cache for static assets.

### Vercel (alternative)
- Import repo to Vercel → Framework: Next.js.
- For static export, enable `Output: Static` or serve SSR. We recommend Netlify for this SSG export.
- `vercel.json` includes basic security headers.

### Windsurf Deploy (example)
- Use Windsurf deploy UI to publish the static `out/` folder to `my-app.windsurf.build`.
- Example URL: `https://thrive-light.windsurf.build` (replace with your chosen subdomain).

## Domain, DNS & SSL
1. Buy domain (Namecheap / GoDaddy / Cloudflare).
2. Add custom domain in Netlify Site settings.
3. Configure DNS:
   - If using Netlify DNS: set your registrar nameservers to Netlify.
   - If external DNS: add records
     - Root `@`: `A` → Netlify load balancer IPs (or `ALIAS`/`ANAME` per provider)
     - `www`: `CNAME` → `your-site.netlify.app`
4. Enable HTTPS (Let’s Encrypt) in Netlify after DNS propagates.

Example records:
- Root: `@` → CNAME to `your-site.netlify.app` (Cloudflare supports CNAME flattening) OR use Netlify nameservers.
- `www` → CNAME `your-site.netlify.app`.

Troubleshooting:
- Check CAA records allow Let’s Encrypt.
- Lower TTL to speed propagation.
- Verify: `nslookup thrivelight.com`, `dig CNAME www.thrivelight.com +short`.

## Project structure

```
thrive-light/
├─ app/                 # Next.js App Router pages
│  ├─ layout.tsx        # Global HTML layout, SEO + PWA tags
│  ├─ globals.css       # Tailwind base styles
│  ├─ page.tsx          # Home page (Hero, Services, Testimonials, Pricing)
│  ├─ blog/
│  │  ├─ page.tsx       # Blog list
│  │  └─ [slug]/page.tsx# Blog post (MDX)
│  ├─ contact/page.tsx  # Contact page (Netlify Forms)
│  ├─ services/page.tsx # Services page
│  ├─ pricing/page.tsx  # Pricing page
│  ├─ privacy/page.tsx  # Privacy Policy template
│  ├─ terms/page.tsx    # Terms template
│  └─ not-found.tsx     # 404
├─ components/          # UI library (Header, Footer, Hero, etc.)
├─ content/posts/       # Blog posts (MDX)
├─ lib/mdx.ts           # MDX utilities (FS + gray-matter)
├─ netlify/functions/   # `send-email` function (SendGrid fallback)
├─ public/              # Static assets, PWA manifest, icons, CMS config
├─ next-seo.config.ts   # SEO defaults
├─ next-sitemap.config.js # Sitemap/robots at build
├─ netlify.toml         # Build, headers, redirects
├─ vercel.json          # Optional Vercel headers
├─ tsconfig.json        # TypeScript config
├─ tailwind.config.ts   # Tailwind theme with brand colors
├─ jest.config.js       # Unit test setup
└─ README.md            # You are here
```

## MDX blog
- Posts live in `content/posts/*.mdx` with frontmatter:

```mdx
---
title: "My Post"
date: "2025-09-01"
excerpt: "One-line summary"
cover: "/images/cover.jpg"
tags: [tag1, tag2]
---

# Content here
```

How to add a post:
- Copy an existing file in `content/posts/` and edit fields + body.
- Commit and push; Netlify deploy will publish it.

Optional CMS (Netlify CMS):
- Visit `/admin/` (enable Identity + Git Gateway in Netlify) to add posts without Git.

## Contact / Email
- Netlify Forms processes the contact form.
- Fallback email via Netlify Function `netlify/functions/send-email.ts` using `SENDGRID_API_KEY` and `CONTACT_TO_EMAIL`.

## SEO, PWA & Performance
- Meta tags via `next-seo` and `app/layout.tsx`.
- Sitemap + robots via `next-sitemap` (runs in `npm run build`).
- PWA: `public/manifest.json` + icons. Replace `public/favicon.svg` and add real PNG icons in `public/icons/`.
- Caching headers configured in `netlify.toml`.
- Lighthouse target: > 90 on mobile & desktop.

## Testing & QA
- Unit tests: Jest + React Testing Library (`__tests__/`).
- Manual responsive checklist:
  - Mobile 320–480px, tablet 768px, desktop ≥1024px.
  - Test orientation, focus states, keyboard navigation, screen reader landmarks.
- Accessibility checklist:
  - Skip link works.
  - Proper landmarks (`header`, `main`, `footer`).
  - Labels for all inputs.
  - Color contrast AA.

## Security & Privacy
- Security headers in `netlify.toml`.
- Privacy and Terms templates at `/privacy` and `/terms`.
- Do not commit secrets. Use `.env` and set vars in Netlify.

## Client TODOs
- Replace `public/logo.svg`, favicon, and icons in `public/icons/`.
- Update brand colors in `tailwind.config.ts`.
- Update hero copy in `components/Hero.tsx`.
- Set `CONTACT_TO_EMAIL` in environment variables.
- Replace placeholder images in `public/images/`.

## Scripts
- `npm run dev` – local development.
- `npm run build` – Next build + generate sitemap/robots.
- `npm run export` – static export to `out/`.
- `npm run test` – run unit tests.
- `npm run type-check` – TypeScript validation.

## GitHub Actions CI
- Workflow in `.github/workflows/ci.yml` runs type-check, tests, and build on every PR/push to `main`.

## License
Proprietary – © Thrive Light. All rights reserved.
