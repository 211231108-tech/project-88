# Repository instructions for Copilot

This repository builds the website for **WEDNESDAY**, a women's casual office wear brand (Relaxed. Refined. Ready.).

- The full task brief is in `PROMPT.md`. Read it before making changes.
- Brand reference: `docs/brand-concept-wednesday.docx`. Logo: `site/assets/logo-wednesday.png`.
- Stack: static HTML + CSS + JS in `site/` (no build step), deployed to GitHub Pages via `.github/workflows/deploy.yml`. Keep it dependency-free unless asked.
- Site language: Bahasa Indonesia; keep English taglines as written.
- Style: clean, minimalist, relaxed, not formal. Brand red is an accent only; the page is mostly cream and earthy neutrals.
- Never invent claims, prices, reviews or stock. Do not claim anti-wrinkle, non-transparent or breathable as proven benefits.
- Keep code typed, accessible (WCAG AA) and mobile-first.
- Deployment target is Vercel (static, `outputDirectory: site`). Photos live in `site/assets/photos/`; reference them with relative, lowercase paths as plain `<img>` tags. Run `node scripts/check-assets.mjs` before committing. See `PROMPT-VERCEL.md`.
