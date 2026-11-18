# Md Mominur Rahman — Editorial Portfolio

An interactive, magazine-style portfolio for **Md Mominur Rahman**, a final-year Computer Science &
Engineering student at Varendra University, Rajshahi. Built as a single-page React app with three
case-study routes and two playable games, including Tic-Tac-Toe against a minimax computer opponent.

The design language is brutalist/editorial: warm off-white paper (`#F5F3EE`), ink (`#111111`), a single
red accent (`#E5393F`), oversized mixed solid-and-outline typography, hairline rules, registration
marks, film grain, and a small amount of collage.

> **Content honesty note.** Every fact on the site comes from the supplied CV, certificates, or
> information confirmed by the owner. No project, repository, live demo, screenshot, proficiency
> level, or social profile has been invented. Sections simply omit anything that does not exist
> rather than padding the page with dead links. The CV PDF is intentionally **not** published — the
> contact section reads "CV on request".

---

## Stack

| Concern    | Choice                                                   |
| ---------- | -------------------------------------------------------- |
| Framework  | React 18 + Vite 5                                        |
| Routing    | React Router 6 (`BrowserRouter`)                         |
| Styling    | Tailwind CSS 3 + a small set of custom utilities         |
| Motion     | Framer Motion 11                                         |
| Icons      | Lucide React                                             |
| Fonts      | Archivo Variable, IBM Plex Mono, Instrument Serif (Fontsource, self-hosted) |
| Deployment | Any static host; `vercel.json` included for Vercel       |

No CSS-in-JS runtime, no icon sprite, no external font CDN — fonts and images are served from the
build output.

---

## Quick start

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build and local preview:

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ (default http://localhost:4173)
```

The production build is the source of truth — always check `npm run preview` before deploying,
because client-side routes (`/work/frootdash`) only work through the SPA rewrite described below.

---

## Routes

| Path            | Page                                                        |
| --------------- | ----------------------------------------------------------- |
| `/`             | Home — all sections, anchor navigation (`#about`, `#work`…) |
| `/work/:slug`   | Case study: `frootdash`, `games`, `graphics-coursework`      |
| anything else   | Styled 404 with links back into the site                     |

Case-study pages set their own `<title>`, meta description, and social tags via
`src/hooks/useDocumentMeta.js`.

---

## Project structure

```
src/
  components/     Header, Footer, CertificateModal, ScrollManager, grain, cursor, reveal…
  data/           ALL editable content (see below)
  games/          TicTacToe.jsx, Snake.jsx
  hooks/          useDocumentMeta, useScrollSpy, useMediaQuery, useLockBodyScroll
  pages/          Home.jsx, ProjectPage.jsx, NotFound.jsx
  sections/       Hero, About, Skills, Work, Certificates, Experience, Arcade, Contact
  styles/         index.css — design tokens, editorial utilities, print/contrast rules
  utils/          cn.js
public/
  images/         portraits, OG cover, favicon
  projects/       FrootDash screenshots extracted from the supplied project report
  certificates/   4 previews (.webp), 4 full JPEGs, 4 PDFs, plus the original 4-page set PDF
scripts/
  process-assets.py   one-off asset pipeline (Python, not required to run the site)
vercel.json       SPA rewrite + cache headers
```

---

## Editing content

Everything you would normally want to change lives in `src/data/`. No component edits needed.

| File                     | Contains                                                              |
| ------------------------ | --------------------------------------------------------------------- |
| `src/data/site.js`       | Name, role, location, email, nav labels, GitHub/LinkedIn URLs and handles |
| `src/data/projects.js`   | Four projects: slug, title, summary, problem, stack, links, case-study copy |
| `src/data/certificates.js` | Certificate metadata, PDF paths, filters, gallery ordering          |
| `src/data/skills.js`     | Skill groups and the honest proficiency wording                       |
| `src/data/experience.js` | Education and experience timeline entries                             |

### Social links

`src/data/site.js` holds the profile URLs and the handles shown in the contact rows:

```js
links: {
  github: 'https://github.com/Roronoa-Zori',
  githubHandle: 'Roronoa-Zori',
  linkedin: 'https://www.linkedin.com/in/md-mominur-rahman-2672ba44b/',
  linkedinHandle: 'md-mominur-rahman',
}
```

They appear in the contact section, the mobile menu and the footer. Set a value to an empty string
to hide that row.

### Project links

Same pattern in `src/data/projects.js`: `links.live` and `links.github` are only rendered when they
contain a real URL. FrootDash and the Graphics coursework have neither, so those rows and the whole
Links panel on their case-study pages are omitted rather than shown as "not supplied".

### Replacing images

- Portraits: `public/images/portrait-hero.webp`, `portrait-about.webp`, `portrait-detail.webp`.
- Project captures: `public/projects/*.webp`.
- Social card: `public/images/og-cover.jpg` (1200 × 630).
- Games/Graphics covers are **generated artwork** (`src/components/ProjectArtwork.jsx`), clearly
  labelled as illustrative because no real captures were supplied. If you have real screenshots,
  replace the poster component with an `<img>` and drop the disclaimers in `Work.jsx` /
  `ProjectPage.jsx`.

`scripts/process-assets.py` documents how the shipped images were produced (resizing, cropping,
WebP encoding, PDF rasterising). It is a record of the pipeline, not a build step — the site builds
without Python installed.

---

## Certificates

Four scanned certificates are published in full:

| Document | PDF |
| --- | --- |
| AI for Immersive Technology — BDSET, 25 Jun 2026 (288 h, Cert No. BDSET-RAJ-488) | `/certificates/ai-immersive-technology.pdf` |
| LaunchPad AI Hackathon 2026 — Build segment, 20 Aug 2026 | `/certificates/launchpad-hackathon-build.pdf` |
| LaunchPad AI Hackathon 2026 — Research segment, 20 Aug 2026 | `/certificates/launchpad-hackathon-research.pdf` |
| Tech Debate 4.0 — participation, 15 Oct (no year printed on the document) | `/certificates/tech-debate-4.pdf` |

The untouched four-page scan set is preserved at `/certificates/certificate-set-original.pdf` and is
downloadable from the Credentials section. In-app previews open the individual PDFs in a modal
iframe with open/download/next/previous, keyboard focus trapping, and Escape to close.

The Tech Debate certificate does not print a year, so the gallery shows `15 OCT` exactly as supplied
by the owner and does not guess the year.

### The CV is private by design

The CV PDF is **not** in `public/` and is not linked anywhere. `.gitignore` additionally blocks
common CV filenames (`Mominur_CV.pdf`, `cv.pdf`, `private/`, …) so an accidental copy cannot be
committed. Share it on request instead.

---

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Vite**. Build command `npm run build`. Output directory `dist`.
4. Deploy.

`vercel.json` already provides:

- an SPA rewrite (`/(.*)` → `/index.html`) so `/work/frootdash` survives a refresh,
- immutable caching for hashed assets,
- one-week caching for certificate PDFs.

No environment variables are required.

### Any other static host

Run `npm run build` and upload `dist/`. You **must** configure a catch-all rewrite to
`/index.html`, otherwise deep links 404. Equivalent rules:

- **Netlify** — `_redirects`: `/*  /index.html  200`
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` (or use an action that does).
- **Nginx** — `try_files $uri $uri/ /index.html;`

Note that GitHub Pages serves from a subpath (`/repo-name/`). Set `base` in `vite.config.js` and use
a hash router, or host on a domain root instead. Vercel/Netlify root deployments need no changes.

### After the first deploy: absolute URLs

Two things are intentionally left relative until a real domain exists:

1. **Canonical link** — `index.html` contains a commented placeholder. Add
   `<link rel="canonical" href="https://your-domain.example/" />`.
2. **Open Graph / Twitter images** — currently `/images/og-cover.jpg`. Most social scrapers require
   an absolute URL, so change both `og:image` and `twitter:image` to
   `https://your-domain.example/images/og-cover.jpg`.

Update `public/robots.txt` with the deployed sitemap URL if you add one.

---

## Accessibility & performance

Verified against the production build with Lighthouse (desktop) and an automated Puppeteer suite:

- **Accessibility 1.0**, **Best Practices 1.0**, **SEO 1.0**.
- Contrast-checked palette on a warm off-white paper (`#F5F3EE`): small red text on paper uses
  `red-text` (`#C0272D`), small red on ink uses `red-bright` (`#F25C63`); muted ink/paper tokens are
  tuned to clear WCAG AA.
- Full keyboard support: skip link, visible focus rings, focus-trapped certificate modal, Escape to
  close, arrow keys for the games.
- `prefers-reduced-motion` disables parallax, marquee, float, and entrance animations.
- Semantic landmarks, one `<h1>` per page, labelled controls, `sr-only` context on image links.
- No horizontal overflow at 390 / 768 / 1024 / 1440 px.
- Production JS ≈ 408 kB (≈ 125 kB gzipped); fonts and images are self-hosted and lazy-loaded below
  the fold.

The automated QA scripts (`puppeteer-core` against headless Edge) live outside the repository and
are not part of the dependency tree, so `npm install` stays lean.

---

## Known constraints

- Project repositories and live demos exist only where a URL was actually supplied; the UI hides
  the rest instead of showing dead buttons.
- The Games and Graphics coursework covers are generated artwork, labelled as such; no screenshots
  of those projects were provided.
- The Tech Debate date is shown without a year because the document does not print one.
- Certificates are scans of paper documents; the modal shows the original PDFs rather than
  retyped text.
- Snake stores its best score in `localStorage`; nothing else is persisted and there are no cookies,
  analytics, or third-party trackers.

---

## Credits

Design and build: custom, for Md Mominur Rahman. Typefaces: Archivo (Omnibus-Type),
IBM Plex Mono (IBM), Instrument Serif (Instrument) — all SIL Open Font License, self-hosted via
Fontsource. Icons: Lucide (ISC). Certificate content remains the property of the issuing bodies.
