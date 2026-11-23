# PROMPT: Align the WEDNESDAY Website with the Campaign Poster

> Task for a coding agent (GitHub Copilot coding agent, Copilot Chat, etc.).
> Reference image: `docs/reference/poster-wednesday.png` (optimized copy in `site/assets/photos/poster-relaxed-refined.jpg`).
> Read `PROMPT.md` and `.github/copilot-instructions.md` first. Their brand rules still apply; this file adds the poster's art direction.

---

## 1. Goal

The website in `site/` (static HTML + CSS + JS, no build step) must visually match the **WEDNESDAY WEAR "Relaxed. Refined. Ready." campaign poster**. Rebuild the **hero** and supporting sections in that poster style, keep the existing sections, and keep everything dependency-free and deployable to GitHub Pages through `.github/workflows/deploy.yml`.

---

## 2. What the poster shows (art direction)

**Canvas and palette**
- Warm cream background (about `#F3EBE0`), deep red accents (about `#A50A0A`), brown-gray body text (about `#6B5A52`).
- Large **organic red blobs** (flat, solid, rounded, wavy edges) bleeding off the edges: top-left corner, right-middle edge, bottom-left, bottom-right. Build them as inline SVG or CSS `border-radius`, not as images.
- Mood: warm, friendly, editorial, modest, professional but relaxed.

**Typography**
- Logo: stacked lowercase rounded wordmark `wed / nes / day / wear` in red, with the small badge "FASHION STORE EST.2025" under it (use the existing logo or the CSS wordmark).
- Tagline **"Relaxed. Refined. Ready."** in bold rounded red display type (Fredoka, weight 700).
- Subtext: "Modern casual wear for everyday work and beyond." in a clean sans (DM Sans), brown-gray, centered, two lines.
- Campaign line **"Effortless from 9 to Life."** in a **handwritten script** (e.g. Google Font *Caveat* or *Reenie Beanie*), red, slightly rotated (about -10 deg), with a hand-drawn curved underline swoosh. Placed at the top-right of the hero.
- Small red "spark" strokes (three short lines) next to the left model as a decorative accent.

**Layout of the hero (desktop, 4:5-like composition)**
1. Logo centered at the top, tagline and subtext directly below it.
2. Handwritten campaign line at the upper right.
3. Four models in a staggered row, overlapping slightly, front model lowest and largest, filling the middle and lower part of the hero.
4. A **cream pill-shaped feature bar** overlapping the bottom of the models, containing three icon + label items separated by thin red vertical dividers, then a red pill button and a letter-spaced caption:
   - feather icon: "All-Day Comfort"
   - hanger icon: "Versatile Style"
   - diamond icon: "Timeless Design"
   - Button: **"Shop Now ◇"** (red pill, cream text), links to `#koleksi`
   - Caption under the button: "WEDNESDAY WEAR" in small, wide-letter-spaced red capitals
   - Icons are simple red outline line icons: draw them as inline SVG.

**Models and outfits shown (use as the styling direction for lookbook and photo briefs)**
1. Oversized beige/sand blazer over a white tee with light jeans, holding a coffee cup.
2. Black pinstripe relaxed blazer + wide-leg pinstripe trousers with a cream ribbed tank (front, seated pose).
3. Oversized white shirt, sleeves rolled, with olive high-waist trousers and a woven rattan tote.
4. Gray textured tweed short-sleeve jacket with pearl-style buttons and a matching wrap skirt over a white tank.

---

## 3. Implementation requirements

1. **Hero:** replace the current hero in `site/index.html` and `site/style.css` with the poster-style hero above.
   - Use `site/assets/photos/poster-relaxed-refined.jpg` as the hero visual on mobile (full-width, rounded, with the feature bar and Shop Now button below it as real HTML).
   - On desktop, rebuild the layout as real HTML/CSS (text, blobs, feature bar, button) around a cropped model photo area. Until separate model photos exist, use the poster image as the background of that area via `object-fit: cover` and `object-position`, and do **not** duplicate the poster's own text on top of it (avoid double text; crop or mask the text area, or use a plain image of the models once available). Leave a clearly marked `TODO` for replacing it with separate model photos.
2. **Blobs:** reusable SVG blob component(s) placed with absolute positioning, `aria-hidden="true"`, no impact on layout or scroll.
3. **Feature bar:** semantic HTML (`<ul>` with three `<li>`), inline SVG icons with `aria-hidden`, labels as real text.
4. **Handwritten line:** real text (not an image), rotated with CSS transform, underline as inline SVG path.
5. **Colors and fonts:** update CSS variables to the poster palette (`--red`, `--cream`, `--brown-gray`). Add the handwriting font to the Google Fonts link. Keep body text WCAG AA on cream.
6. **Lookbook:** replace the 3 placeholder looks with 4 looks matching the outfits in Section 2 (names suggestion: "Coffee Run", "Pinstripe Power", "Rolled Sleeves", "Tweed Set"). Keep clear placeholders for photos until real images are added to `site/assets/`.
7. **Collection 001:** keep the 6 existing products. Because the poster introduces blazers, olive trousers and tweed, add a short "Coming next" note or a small "Modern Outerwear" teaser block for the relaxed blazer, without inventing prices, stock, or product claims.
8. **Responsiveness:** mobile first (360 px up). On mobile the blobs shrink, the model area stacks under the logo, and the feature bar becomes a 3-column compact row (icons above labels) followed by the full-width Shop Now button.
9. **Performance and accessibility:** compress or resize the poster image into WebP/JPEG variants if possible (keep the PNG as source), `loading="lazy"` below the fold, meaningful `alt` text, visible focus states, respect `prefers-reduced-motion`.

---

## 4. Copy (Bahasa Indonesia first, taglines stay English)

- Keep English: *Relaxed. Refined. Ready.* / *Effortless from 9 to Life.* / "Modern casual wear for everyday work and beyond."
- Button: "Shop Now" (keep) or "Lihat Koleksi" as a secondary text link.
- Feature labels: keep English as on the poster (All-Day Comfort, Versatile Style, Timeless Design), with an Indonesian one-line description in the tooltip or below on desktop only.
- Do not claim anti-wrinkle, non-transparent, or breathable as proven. No fake prices, reviews, or stock.

---

## 5. Acceptance criteria

- [ ] Hero visually matches the poster composition: logo, tagline, subtext, handwritten campaign line, four models, feature pill bar, red Shop Now button, red blobs
- [ ] Blobs, icons, text, and button are real HTML/SVG/CSS, not baked into one flat image (except the model photo area)
- [ ] Palette and fonts updated; text contrast passes AA
- [ ] Works from 360 px to 1440 px+ with no horizontal scroll
- [ ] Lookbook shows 4 looks matching the poster outfits (placeholders allowed)
- [ ] Existing sections and the 6 Collection 001 products still work, including color switching
- [ ] No new dependencies or build step; the `deploy.yml` workflow still publishes `site/`
- [ ] Lighthouse 90+ for Accessibility, Best Practices, SEO

## 6. Constraints

- Do not change the brand name, taglines, or logo treatment.
- Do not add checkout, login, or backend features.
- Ask before replacing the existing logo file or removing existing sections.
