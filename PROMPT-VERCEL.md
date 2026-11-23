# PROMPT: WEDNESDAY Website, Poster Style + Real Photos, Deployed on Vercel

> Task for a coding agent (GitHub Copilot coding agent, Copilot Chat, Cursor, etc.).
> Read first: `PROMPT.md` (brand brief), `PROMPT-POSTER.md` (poster art direction), `.github/copilot-instructions.md`.
> This file adds: the real photo assets, the second poster, and **Vercel deployment rules that guarantee the photos appear**.

---

## 1. Goal

The static site in `site/` (HTML + CSS + JS, no build step) must:
1. Match the WEDNESDAY WEAR campaign posters' art direction (red organic blobs, cream background, rounded red display type, handwritten "Effortless from 9 to Life.", feature badges, red "Shop Now" button).
2. **Display all real photos listed in Section 2**, on the live Vercel deployment, with no broken images.
3. Stay dependency-free, with no framework and no build tooling beyond `scripts/check-assets.mjs`.

---

## 2. Photo and poster assets (already in the repo, do not rename)

All paths are relative to `site/`. Filenames are lowercase with hyphens (Vercel serves case-sensitive paths).

| File | Content | Intended use |
| --- | --- | --- |
| `assets/photos/poster-effortless-9-to-life.jpg` | Poster B: one hijab model, black pinstripe blazer + wide-leg trousers, kraft coffee cup, cream tote. Large handwritten "Effortless from 9 to Life.", small stacked logo, subtext "Modern casual wear for busy women, from work to beyond.", three round icon badges (hanger, diamond, dress form), "Shop Now →" | Campaign banner; **layout reference for the hero** |
| `assets/photos/poster-relaxed-refined.jpg` | Poster A: four models (sand blazer + jeans, pinstripe set, white shirt + olive trousers + rattan tote, gray tweed set), logo, "Relaxed. Refined. Ready.", cream pill feature bar with "Shop Now" | Campaign banner; second layout reference |
| `assets/photos/look-plaid-tunic.jpg` | Woman in beige hijab, black-and-white plaid long shirt/tunic, iced coffee, white wall with brown wooden shutters (3:4) | Gallery; candidate hero photo |
| `assets/photos/look-green-satin-shirt.jpg` | Woman in pink hijab, oversized olive/lime satin shirt, black wide-leg pants, by tall curtains (3:4) | Gallery |
| `assets/photos/look-white-blouse-polka-skirt.jpg` | Triptych: beige hijab, white puff-sleeve blouse, black polka-dot pleated skirt, black tote (3:4) | Gallery |
| `assets/photos/look-satin-shirt-collage.jpg` | Five-photo collage: brown floral scarf, lime satin shirt, black pants, cafe setting (3:4) | Gallery |
| `assets/logo-wednesday.png` | Stacked wordmark logo | Header, story section |

Photos were re-encoded (about 90-280 KB each, EXIF metadata removed). Keep image dimensions in `width`/`height` attributes to avoid layout shift.

**Important content rules**
- The lime satin shirt, plaid tunic, and polka-dot skirt are **not** part of Collection 001 and are outside the brand palette (Sand, Mocha, Olive, Navy, Off White, Dusty Blue, Dusty Rose, Charcoal). Present them only as "Style Moments". Do not invent product names, prices, sizes, stock, or reviews for them.
- The photos show real people. Do not add names, captions identifying anyone, or alt text that identifies a person. Describe clothing and scene only.
- Do not make claims such as anti-wrinkle, non-transparent, or breathable.

---

## 3. Work to do

1. **Hero (poster B layout, built in real HTML/CSS, not a flat image):**
   - Desktop: two columns. Left: a rounded photo frame using `assets/photos/look-plaid-tunic.jpg` (`object-fit: cover`, `object-position: center 25%`) with a red blob behind and a small hand-drawn "spark" stroke accent. Right: small stacked logo wordmark, "Relaxed. Refined. Ready.", big handwritten "Effortless from 9 to Life." (Google Font *Caveat*, red, rotated about -6 deg, with SVG swoosh underline), subtext, three circular icon badges (hanger "All-Day Comfort", diamond "Timeless Design", dress form "Versatile Style") as inline SVG, and a red pill button "Shop Now →" linking to `#koleksi`.
   - Mobile: photo on top, text below, badges in a 3-column row, full-width button.
   - Blobs: inline SVG, `aria-hidden="true"`, absolutely positioned, never causing horizontal scroll.
   - Do not put poster images behind the hero text (they already contain text).
2. **Campaign section** (`#kampanye`): both posters side by side (stacked on mobile). Already present; keep and polish.
3. **Gallery** (`#galeri`, "Style Moments"): the four `look-*.jpg` photos in a responsive grid (4 / 2 / 1 columns), rounded corners, captions as in `site/index.html`, optional lightbox using plain JS (`<dialog>` element), keyboard accessible, closes on Esc.
4. **Palette and fonts:** `--red` about `#A50A0A`, `--cream` about `#F3EBE0`, `--brown-gray` about `#6B5A52`; Fredoka (display), DM Sans (body), Caveat (handwriting).
5. Keep all existing sections (story, key messages, Collection 001 with color switching, categories, standards, colors, lookbook, footer).

---

## 4. Vercel deployment rules (this is what guarantees the photos show)

- Deploy the repo root as a **static site**: `vercel.json` already sets `framework: null`, `outputDirectory: "site"`, `buildCommand: "node scripts/check-assets.mjs"`. In Vercel: Framework Preset **Other**, Root Directory `./`, leave Install Command empty. Do not add React/Next/Vite.
- **Every image must be a plain `<img src="assets/photos/...">` (or CSS `url()`) with a relative path, written statically in `index.html` or `style.css`.** Do not build photo URLs with JavaScript string tricks, and do not depend on JS to display the key photos (hero, campaign, gallery).
- Filenames must stay lowercase, no spaces, no uppercase letters. Reference them with the exact same case.
- Never reference files outside `site/` (for example `docs/` or the repo root); they are not published.
- `scripts/check-assets.mjs` must keep passing. It scans `index.html`, `style.css`, `main.js` for `assets/...` references and fails the Vercel build if any file is missing, misnamed, or empty. If you add new images, add them under `site/assets/photos/` and run `node scripts/check-assets.mjs` before committing.
- Each `<img>` has meaningful `alt`, `width`, `height`, `decoding="async"`; below-the-fold images use `loading="lazy"`; the hero image uses `loading="eager"` and `fetchpriority="high"`.
- Keep the GitHub Pages workflow working (relative paths work on both Vercel and Pages) or remove `.github/workflows/deploy.yml` if the team only uses Vercel; ask before deleting.

---

## 5. Acceptance criteria

- [ ] On the Vercel preview URL, every `<img>` returns HTTP 200 and renders (verify with `curl -I https://<preview>/assets/photos/<file>.jpg`, or the browser Network tab)
- [ ] `node scripts/check-assets.mjs` prints "0 problem(s)" and the Vercel build passes
- [ ] Hero matches poster B composition with real HTML text, blobs, badges, and button; no duplicated baked-in poster text
- [ ] Campaign section shows both posters; gallery shows all four photos
- [ ] No horizontal scroll from 360 px to 1440 px; text contrast passes WCAG AA
- [ ] Lighthouse 90+ for Performance, Accessibility, Best Practices, SEO (total photos under about 1.5 MB)
- [ ] Existing features still work (color switching on products, mobile menu, scroll reveal)
- [ ] No new dependencies, no framework

## 6. Constraints

- Do not change the brand name, taglines, or logo treatment.
- Do not add checkout, login, or backend features.
- Do not recompress or rename the supplied photos without asking.
- Ask before removing existing sections.
