# Project Brief — DeLara Consulting LLC Website

**Client:** DeLara Consulting LLC  
**Type:** Static marketing site  
**Deployment:** GitHub Pages — `https://pocketsod.github.io/DeLara/`  
**Repo:** `https://github.com/PocketSod/DeLara` (branch: `main`)

---

## Objective

Establish a premium digital presence for DeLara Consulting LLC that communicates seniority, trust, and capability to prospective enterprise clients. The site functions as a design exploration ground — multiple landing variants exist simultaneously for selection.

---

## Stack

- Pure HTML/CSS, all styles inline per file
- No build step, no bundler, no framework
- Google Fonts via CDN
- Local dev server: `node serve.mjs` → `http://localhost:3000`

---

## Pages

| File | Theme | Palette Summary | Fonts |
|------|-------|-----------------|-------|
| `index.html` | Swiss editorial (light) | Off-white `#F8F5EF`, red `#BF3020`, charcoal `#2C2B28` | Barlow Condensed + Crimson Pro |
| `landing-2.html` | Dark amber editorial | Brown `#2A1A08`, amber `#C9922A`, cream `#F5EDD8` | Playfair Display + Lato |
| `landing-3.html` | Light editorial stone | Stone/ink/gold | Cormorant Garamond + Outfit |
| `landing-4.html` | Warm editorial split | Cream `#F4ECD6`, ink `#1A1008`, gold `#C9A358` | Libre Baskerville + Jost |
| `landing-5.html` | Dark luxury | Dark `#0F0D0B`, gold `#C9A358`, neon cyan/green/magenta | Playfair Display + Lato |

All pages share a nav page-toggle widget (`1/2/3/4/5`) linking between variants.

---

## Section Structure (all pages)

1. Fixed nav — transparent → frosted on scroll; logo in nav; page-toggle top-right
2. Hero
3. Stats bar — 15+ years, 200+ engagements, 40+ industries, 98% retention
4. Services — 6 cards, 3-col grid
5. Philosophy / About — 2-col
6. Process — 4 steps: Discovery → Diagnosis → Design → Delivery
7. Testimonials — 3 cards
8. CTA — Schedule / Message buttons
9. Footer — 4-col grid

---

## Brand Assets

Folder: `brand_assests/` (intentional misspelling — do not correct)

| File | Use |
|------|-----|
| `brand_assests/logo1.png` | Edison bulb + "DeLara Consulting, LLC" — nav logo, all pages |
| `brand_assests/Logo.png` | Same logo, concrete background — hero feature |
| `brand_assests/Logo2.png` | Source of index.html color derivation (red/charcoal/off-white) |
| `brand_assests/Brand-guide.png` | Full brand guide — read before design decisions |
| `brand_assests/Brand-guide1.png` | Warm amber/gold variant guide |
| `brand_assests/DeLara.png`, `DeLara2.png` | Wordmarks |
| `brand_assests/www.lilyhairstudio.ie_.png` | Layout reference for landing-4 split hero |

---

## Hard Constraints

- Never use `mix-blend-mode: multiply` on logos over dark backgrounds
- Never hand-code SVG logos — always use `brand_assests/logo1.png`
- Never revert to rejected palette: terracotta `#C85C2A` + cream `#F6F0E6`
- Never revert to Cormorant Garamond + Montserrat pairing (except landing-3 where intentional)
- Do not use `placehold.co` where actual brand files exist
- Do not add sections, content, or features not in a reference
- Do not use `transition-all`

---

## Screenshot Workflow

- `screenshot.mjs` is WSL2-only (calls Windows Edge via `/mnt/c/...`)
- Run from WSL2: `node screenshot.mjs http://localhost:3000`
- Output: `./temporary screenshots/screenshot-N.png`
- IntersectionObserver hides content in headless screenshots — force `.visible` before capture
