# MUSH / Landing Page

Halaman statis MUSH Pagi Farm: sistem IoT-robotik yang mengubah sayur off-grade
hidroponik menjadi silase premium. Tujuh adegan (ringkasan, rangkaian, sorot,
alur, ambang, data, catatan) memakai HTML, CSS Tailwind, dan JavaScript vanilla
tanpa framework JS.

## Jalankan

```bash
npm install
npm run build
python3 -m http.server 8000
```

Buka <http://localhost:8000>. Sajikan lewat HTTP, bukan `file://`, agar aset dan
animasi bekerja.

`style.css` adalah hasil build Tailwind dari `input.css` dan ikut di-commit.
Jalankan `npm run build` setiap kali `input.css` diubah.

## Struktur

| Path | Isi |
|---|---|
| `index.html` | Seluruh markup dan konten halaman |
| `input.css` | Sumber Tailwind; token desain di `design.md` |
| `style.css` | Hasil build, dipakai langsung oleh `index.html` |
| `main.js` | Data drum contoh, reveal, tabel demo, menu |
| `cinematic.js` | Animasi foto GSAP ScrollTrigger |
| `vendor/` | GSAP, ScrollTrigger, dan Lenis versi lokal |
| `img/` | Foto hero dan dokumentasi (AVIF/WebP/JPG) |
| `tools/cek-angka.js` | Penjaga sinkronisasi angka dengan dasbor |
| `design.md` | Sistem desain dan catatan keputusan |

## Data

Angka drum (`B-024`, `B-025`) adalah data contoh dari seed dasbor, bukan bacaan
sensor langsung. Sumber kebenaran ambang ada di `src/config.js` pada proyek
`mush-react` dan `js/config.js` pada `mush-dashboard`.

`npm run cek-angka` membandingkan angka di `index.html` dengan
`../mush-dashboard/js/config.js`. Perintah ini memerlukan kedua repo di-checkout
berdampingan:

```
FARM/
  landing/
  mush-dashboard/
```

## Catatan

- Tanpa CDN: animasi dan gambar dimuat dari repo.
- Animasi menghormati `prefers-reduced-motion`.
- Tautan "Buka dasbor" di footer menuju `../mush-dashboard/index.html`, sehingga
  dasbor perlu berada di folder bersebelahan saat pratinjau lokal.
