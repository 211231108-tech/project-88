# WEDNESDAY: Brand Website

Casual office wear untuk wanita modern. **Relaxed. Refined. Ready.** / *Effortless from 9 to Life.*

Website statis (HTML, CSS, JS) tanpa build step. Begitu diunggah ke GitHub dan Pages diaktifkan, situs langsung tampil.

## Struktur

| Path | Fungsi |
| --- | --- |
| `site/index.html`, `style.css`, `main.js` | Website (10 bagian: hero, filosofi, pesan brand, Collection 001, kategori, standar desain, warna, lookbook, footer) |
| `site/assets/logo-wednesday.png` | Logo |
| `.github/workflows/deploy.yml` | Deploy otomatis ke GitHub Pages setiap push ke `main` |
| `PROMPT.md` | Brief lengkap, untuk pengembangan lanjutan bersama coding agent |
| `.github/copilot-instructions.md`, `.github/ISSUE_TEMPLATE/` | Aturan repo dan template issue untuk Copilot |
| `docs/brand-concept-wednesday.docx` | Dokumen brand concept |

## Cara online dalam 4 langkah

1. Buat repository baru di github.com (tanpa README bawaan).
2. Ekstrak zip, lalu jalankan di folder hasil ekstrak:
   ```bash
   git init
   git add .
   git commit -m "WEDNESDAY website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
   Tanpa terminal: **Add file > Upload files**, seret seluruh isi folder (termasuk `.github`).
3. Di repo: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
4. Buka tab **Actions**, tunggu workflow selesai. Alamat situs: `https://USERNAME.github.io/NAMA-REPO/`.

## Yang perlu Anda ganti

- Gambar produk dan lookbook saat ini ilustrasi SVG di `site/assets/products/`. Ganti dengan foto asli (lihat `docs/photo-brief.md`) dan sesuaikan nama file di `site/main.js`.
- Link Instagram dan WhatsApp di footer `site/index.html`.
- Harga produk (saat ini "segera hadir").
- Kode warna merah `#A80000` di `site/style.css` bila berbeda dari logo asli.

## Prompt tambahan: gaya poster kampanye

`PROMPT-POSTER.md` adalah brief untuk menyelaraskan tampilan website dengan poster kampanye (`docs/reference/poster-wednesday.png`): blob merah, tulisan tangan "Effortless from 9 to Life.", feature bar, dan tombol Shop Now. Gunakan sebagai instruksi Copilot atau salin ke agent lain.

## Deploy ke Vercel

1. Push repo ke GitHub, lalu di vercel.com pilih **Add New > Project** dan impor repo ini.
2. Framework Preset: **Other**. Root Directory: `./`. Biarkan Install Command kosong. `vercel.json` sudah mengatur Output Directory `site` dan Build Command `node scripts/check-assets.mjs`.
3. Klik **Deploy**. Build akan gagal dengan pesan jelas jika ada foto yang hilang atau salah nama, sehingga tidak ada gambar rusak yang lolos ke publik.
4. Foto ada di `site/assets/photos/` (nama file huruf kecil, jangan diganti). Brief untuk agent: `PROMPT-VERCEL.md`.
