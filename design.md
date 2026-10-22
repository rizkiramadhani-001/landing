# design.md — Sistem Desain Landing MUSH

> **Cakupan:** `landing/index.html` · **Versi:** v2.3 (arah sinematik, terimplementasi) · **Diperbarui:** 2026-10-17
> **Status:** desain dan token sinematik v2.2 sudah diterapkan di `input.css`, `index.html`, dan `main.js`.
> **Menutup:** audit `anti-slop/audit-001-2026-10-15.md` finding **R-37** (design direction) dan **R-31** (decision log, lihat §12).
> **Sumber kebenaran token:** `landing/input.css`. Ubah di sana, lalu `npm run build`.

**Cara membaca dokumen ini.** ✅ = sudah diukur atau diverifikasi di kode (contrast dihitung dengan rumus WCAG relatif, hasil uji headless). ⚠️ = temuan yang **sudah diperbaiki** atau keputusan yang masih menunggu persetujuan pemilik desain. Item `[verifikasi]` sudah dicek terhadap `input.css`; hasilnya dicatat di §11.

---

## 0. Ringkasan satu layar

| | |
|---|---|
| Untuk siapa | Pengunjung baru: calon evaluator proposal, bukan grower |
| Tujuan | Paham sistem dalam satu gulir; bisa membedakan data fiktif dari data riil |
| Satu CTA utama | `Buka dasbor` (kuning, satu per section) |
| Nuansa | **Sinematik terkendali**: tiap section adalah adegan, bukan blok (lihat §1.1) |
| Warna | Hijau gelap + satu aksen hijau terang + kuning hanya untuk aksi |
| Tipografi | Satu family system-sans, tanpa webfont |
| Prinsip | Foto = ilustrasi yang jujur · angka besar, bukan paragraf · tiada kontrol dekoratif |
| Batas keras | Tanpa CDN, tanpa testimoni rekaan, tanpa login/cart |

---

## 1. Arah desain

**MUSH** adalah sistem IoT-Robotik yang mengubah sayur off-grade hidroponik menjadi silase premium. Halaman ini dibangun untuk **pengunjung baru** yang harus memahami sistem dalam satu gulir dan bisa membedakan mana yang fiktif dan mana yang data riil.

Tiga keputusan yang membentuk halaman:

1. **Foto jujur.** Repo belum punya aset foto sendiri, jadi slot foto diisi stock berlisensi bebas. Foto stock **tidak boleh menyamar** sebagai dokumentasi lokasi Pagi Farm. Kredit di kaki halaman saja tidak cukup: pengunjung tidak menggulir ke kaki. ✅ Setiap foto stock sudah punya penanda "Foto ilustrasi" (lihat §9).
2. **Data muncul sebagai angka besar.** Suhu, kelembapan, dan lama fermentasi punya slot visual sendiri (lingkaran + pita skala) supaya angka kunci terbaca tanpa menggulir.
3. **Setiap kendali punya tujuan nyata.** Tidak ada tombol dekoratif. Kalau belum ada halaman tujuan, kontrolnya dihapus, bukan dipura-pura jadi tautan.

**Suara:** tenang dan teknis, satu ide per baris, Bahasa Indonesia. Tidak ada testimoni rekaan, statistik karangan, atau CTA yang mengada-ada.

### 1.1 Arah sinematik ✅ (v2.2, sudah diterapkan)

Halaman dibaca seperti film pendek berdurasi satu gulir: **pembuka → konflik → proses → bukti → penutup**. Konflik = sayur off-grade terbuang; resolusi = silase terukur dalam ambang baku.

**Prinsip (urut prioritas):**

1. **Sinematik melayani pemahaman.** Setiap efek harus membantu evaluator mengerti sistem, bukan menghibur. Kalau efek bisa dibuang tanpa mengurangi pemahaman, buang.
2. **Satu gerakan per adegan.** Satu elemen utama yang bergerak; sisanya diam. Dua gerakan bersaing = hilang ritme.
3. **Gelap sebagai layar, terang sebagai lembar.** Adegan naratif (hero, sorot, ambang, kaki) memakai latar malam. Adegan data (rangkaian, data) tetap terang agar tabel dan angka terbaca.
4. **Tanpa membajak gulir.** Pengguna selalu memegang kendali. Tidak ada scroll-jacking, tidak ada pin lebih dari 1,5 tinggi layar, tidak ada autoplay.
5. **Sinematik tidak pernah memalsukan bukti.** Color grading pada foto stock boleh; label "Foto ilustrasi" tetap terlihat (§9). Data contoh tetap ditandai "Data contoh".

**Bahasa visual:**

| Elemen | Perlakuan |
|---|---|
| Slate / timecode | Kicker mono tiap section berformat `ADEGAN 03 / 07 · ALUR`. Hanya penanda urutan, bukan data. |
| Letterbox | Foto hero & sorot memakai bingkai lebar (21:9 di ≥ 1000px, 4:5 di mobile) dengan bilah gelap atas/bawah. |
| Grading | Foto distel satu palet: overlay `hijau-tua` 25–35% (`mix-blend-mode: multiply`) + vinyet radial. Satu pencahayaan untuk semua foto stock. |
| Grain | Tekstur statis (SVG `feTurbulence`, data-URI, opasitas 4–6%) di adegan gelap. **Tidak dianimasikan.** |
| Judul | Skala display lebih besar di adegan gelap, baris pendek, `text-wrap: balance`. Teks muncul per baris (mask reveal), bukan per huruf. |
| Angka | Angka ambang "menghitung" naik ke nilai baku saat terlihat (sekali). Nilai akhir tetap ada di HTML untuk pembaca layar dan tanpa JS. |
| Transisi antar adegan | **Dissolve** (gradien 120–200px antar latar gelap↔terang), bukan garis tegas. |

**Anti-pola (ditolak):** hero video, musik/suara, kursor kustom, partikel mengambang, glitch/shake, animasi huruf-per-huruf, parallax di lebih dari satu lapis per adegan, pin horizontal yang menyandera gulir.

---

## 2. Token

### 2.1 Warna

| Token | Hex | Dipakai untuk |
|---|---|---|
| `--color-hijau-tua` | `#0A3A2A` | Nav, hero, kaki, tombol bulat |
| `--color-hijau` | `#0F4A34` | Heading kartu terang, chip, pita |
| `--color-hijau-terang` | `#96E278` | Aksen: kartu grafik, lencana, progres |
| `--color-kuning` | `#F2D520` | **Satu-satunya** CTA utama |
| `--color-kertas` | `#F4F9F1` | Latar halaman |
| `--color-krem` | `#FBFDF7` | Kartu krem (drum) |
| `--color-permukaan` | `#FFFFFF` | Kartu di latar terang |
| `--color-tinta` | `#13382B` | Teks utama |
| `--color-redup` | `#5C7B6D` | Teks sekunder, caption |
| `--color-garis` | `#DCE9DA` | Border hairline (dekoratif saja) |
| `--color-tanah` | `#B4601A` | Status di bawah target |

### 2.2 Matriks contrast ✅ (diukur ulang 2026-10-17)

Tabel lama hanya mengukur satu latar per token. Padahal teks `redup` dan `tanah` muncul di beberapa latar. Matriks lengkap:

| Teks | Latar | Rasio | Teks biasa (4.5) | Teks besar/UI (3.0) |
|---|---|---|---|---|
| `tinta` | `kertas` | 12.08 | ✅ | ✅ |
| `hijau` | `krem` | 10.00 | ✅ | ✅ |
| `hijau-terang` | `hijau-tua` | 8.14 | ✅ | ✅ |
| `kuning` | `hijau-tua` | 8.67 | ✅ | ✅ |
| `hijau-tua` | `kuning` | 8.67 | ✅ | ✅ |
| `hijau-tua` | `hijau-terang` | 8.14 | ✅ | ✅ |
| `redup` | `putih` | 4.66 | ✅ | ✅ |
| `redup` | `krem` | 4.55 | ✅ | ✅ |
| `redup` | **`kertas`** (latar halaman) | **4.36** | ❌ | ✅ |
| `redup` | `hijau-terang` | 2.98 | ❌ | ❌ |
| `tanah` | `putih` | 4.54 | ✅ | ✅ |
| `tanah` | `krem` | 4.43 | ❌ | ✅ |
| `tanah` | **`kertas`** | **4.25** | ❌ | ✅ |
| `garis` | `kertas` | 1.18 | — | ❌ (dekoratif) |

**Temuan (sudah diperbaiki)**

- `redup` di latar `kertas` gagal AA (4.36:1). Padahal caption dan teks sekunder paling sering jatuh di latar halaman.
- `tanah` gagal AA di `kertas` dan `krem` (4.25 / 4.43). Ini warna status "di bawah target", yaitu informasi penting.
- `redup` **dilarang** di atas `hijau-terang` (2.98:1). Kartu grafik hijau terang selalu memakai `hijau-tua` untuk teksnya.

**Perbaikan yang diusulkan (pilih salah satu, lalu ukur ulang):**

| Opsi | Perubahan | Hasil perkiraan |
|---|---|---|
| A (disarankan) | Gelapkan token: `--color-redup: #557566`, `--color-tanah: #A5560F` | Keduanya ≥ 4.5 di `kertas` `[verifikasi dengan skrip]` |
| B | Batasi `redup`/`tanah` hanya di `putih`, dan beri kartu status latar putih | Membatasi layout; caption tetap bermasalah di latar halaman |
| C | Pakai `redup`/`tanah` hanya ≥ 18.66px bold | Terlalu membatasi untuk caption kecil |

Skrip pengukur (jalankan setelah mengubah token):

```bash
python3 - <<'PY'
def L(h):
    c=[int(h.lstrip('#')[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=.03928 else ((x+.055)/1.055)**2.4 for x in c]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    x,y=sorted([L(a),L(b)],reverse=True); return (x+.05)/(y+.05)
print(round(cr("#5C7B6D","#F4F9F1"),2))  # ganti pasangan sesuai kebutuhan
PY
```

### 2.3 Aturan warna

- **Kuning** hanya untuk aksi utama, **satu per section**. Di hero, CTA kedua memakai gaya garis/ghost, bukan kuning.
- **Hijau terang** adalah satu-satunya aksen.
- **Tanah (oranye)** hanya untuk status di luar target, dan **selalu disertai teks/ikon** ("Di bawah target"), tidak mengandalkan warna saja (WCAG 1.4.1).
- `garis` tidak boleh jadi penanda utama kartu (1.18:1 < 3:1). Batas kartu dibuat oleh bayangan, bukan border.
- Tidak ada warna dekoratif lain.

### 2.4 Tipografi

Satu family sans (system stack), tiga peran, tanpa webfont dan tanpa CDN.

```css
--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;  /* [verifikasi] cocokkan dengan input.css */
```

| Peran | Ukuran | Weight | Tracking |
|---|---|---|---|
| Judul hero | `clamp(2.4rem, 0.6rem + 3.9vw, 4.2rem)` | 800 | −0.045em |
| Judul section | `clamp(2rem, 1.1rem + 3.6vw, 3.9rem)` | 800 | −0.04em |
| Body | 1rem / 1.65 | 400 | — |
| Label/kicker | 0.72–0.78rem mono, uppercase | 700 | 0.1–0.16em |
| Angka besar | `clamp(2.6rem, …, 3.6rem)`, `font-variant-numeric: tabular-nums` | 800 | −0.04em |

⚠️ **Catatan (tetap berlaku):** label 0.72rem ≈ 11.5px. Ini di bawah kenyamanan baca untuk teks informatif. Pertahankan hanya untuk kicker dekoratif-informatif pendek (≤ 3 kata) dan jangan pakai untuk kalimat. Tambahkan `text-wrap: balance` pada judul dan `text-wrap: pretty` pada paragraf.

### 2.4b Token adegan gelap ✅ (sudah diterapkan)

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--color-malam` | `#061F17` | Latar adegan gelap terdalam, vinyet, scrim |
| `--color-cahaya` | `rgba(150,226,120,.18)` | Cahaya lembut di belakang angka/judul (radial gradient) |
| `--color-redup-gelap` | `#9DB8AA` | Teks sekunder **hanya** di latar gelap |

Contrast (diukur): `kertas` di `malam` 16.17 · `hijau-terang` di `malam` 11.06 · `kuning` di `malam` 11.77 · `redup-gelap` di `malam` 8.12 / di `hijau-tua` 5.98. Semua lolos AA. `malam` vs `hijau-tua` hanya 1.36:1, jadi perbedaannya halus dan **tidak boleh** dipakai untuk membedakan elemen fungsional.

**Teks di atas foto** wajib memakai scrim: gradien `malam` 80% → 0% setinggi blok teks. Ukur kontras terhadap piksel **terterang** di balik teks, bukan rata-rata. Jangan menaruh teks langsung di atas foto tanpa scrim.

### 2.5 Bentuk & ruang

- Radius: 22px (kartu), 20px (kartu pita), 999px (pil, lingkaran, badge).
- Bayangan kartu: `0 10px 28px rgba(10,58,42,.07)`; kartu krem hero lebih dalam.
- Lebar konten: `max-width: 1200px`, padding inline `clamp(18px, 4vw, 40px)`.
- Ritme section: `clamp(64px, 9vw, 120px)` padding blok.
- ✅ **Skala spasi:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px. Jadikan token `--space-*` agar jarak antar-komponen tidak ditebak.

### 2.6 Motion ✅ (token dipakai `input.css`)

| Token | Nilai | Dipakai |
|---|---|---|
| `--dur-cepat` | 150ms | Hover, fokus, toggle |
| `--dur-sedang` | 300ms | Ganti drum, ganti foto sorot |
| `--dur-lambat` | 600ms | Reveal `.muncul` → `.jalan` |
| `--ease-keluar` | `cubic-bezier(.2,.7,.2,1)` | Semua transisi masuk |
| `--dur-adegan` | 900ms | Reveal judul adegan gelap, dissolve foto |
| `--dur-hitung` | 1400ms | Angka ambang menghitung naik |
| `--ease-film` | `cubic-bezier(.16,1,.3,1)` | Reveal sinematik (cepat di awal, mendarat halus) |
| `--stagger` | 90ms | Jeda antar baris judul / antar kartu |

Aturan: animasikan hanya `transform`, `opacity`, dan `clip-path`. Dengan `prefers-reduced-motion: reduce`, semua durasi menjadi 0 dan Lenis/Rellax tidak diinisialisasi.

### 2.7 Lapisan (z-index) ✅

`konten 0` · `kartu mengambang 10` · `nav sticky 50` · `skip link 100`. Jangan ada nilai z-index liar di luar skala ini.

---

## 3. Struktur halaman

Urutan intentional — hook → bukti → proses → angka → data → storytelling → CTA. Di v2.2 tiap section juga adalah satu **adegan** (§3.1):

```
nav (sticky, gelap)
hero      → headline 2 baris + foto + 2 CTA
rangkaian → 2 kartu: drum readout (interaktif) + kartu grafik hijau
sorot     → judul + paragraf, foto besar, thumbnail switcher
alur      → 4 kartu tahap, geser horizontal (R01–R04)
ambang    → 3 lingkaran angka baku (40–45°C, 55–70%, 7–14 hari)
data      → tabel log interaktif + pita skala gauge
catatan   → 4 kartu catatan lapangan
kaki      → wordmark besar + 4 kolom + kredit
```

### 3.1 Peta adegan ✅ (sudah diterapkan)

| # | Section | Latar | Perlakuan sinematik | Satu gerakan |
|---|---|---|---|---|
| 01 | hero | malam | Foto letterbox + grading + vinyet; judul 2 baris reveal per baris; CTA kuning | Foto zoom pelan 1,00→1,06 saat gulir |
| 02 | rangkaian | terang | Tetap bersih: kartu drum + grafik. Tanpa grading. | Batang grafik tumbuh sekali |
| 03 | sorot | malam | Foto besar full-bleed, scrim, thumbnail sebagai "film strip" | Ganti foto = dissolve 300ms |
| 04 | alur | hijau-tua | Kartu R01–R04 geser; garis tipis menghubungkan tahap seperti storyboard | Kartu aktif naik 4px + garis terisi |
| 05 | ambang | malam | Tiga lingkaran dengan cahaya lembut di belakang; angka menghitung naik | Hitung naik (sekali) |
| 06 | data | terang | Tabel dan pita skala: **tanpa efek**. Keterbacaan menang. | Baris baru masuk 150ms |
| 07 | catatan | terang | Grid kartu foto; grading ringan | Stagger kartu 90ms |
| 08 | kaki | malam | Wordmark full-bleed seperti end credit; kredit foto sebagai daftar | Parallax lambat pada wordmark |

Pola gelap-terang-gelap sengaja: adegan gelap = narasi, adegan terang = data yang harus dibaca.

### Breakpoint

| Lebar | Perubahan layout |
|---|---|
| < 720px | 1 kolom di semua section |
| 720–899px | Catatan 2 kolom; sisanya 1 kolom |
| 900–999px | Rangkaian 2 kolom, lingkaran 3 kolom, pita & log 2 kolom |
| ≥ 1000px | Hero 2 kolom (teks 52% / foto 48%), data 2 kolom |
| 720–1079px | Catatan 2 kolom |
| ≥ 1080px | Catatan 4 kolom, menu nav pill tampil |

Nav di bawah 1080px: menu disembunyikan, tombol CTA tetap ada.

> **Catatan:** versi lama menulis "< 900px semua section 1 kolom" sekaligus "720–1079px catatan 2 kolom", yang saling bertentangan, dan menulis "< 900px nav menu disembunyikan" padahal menu baru tampil di ≥ 1080px. Tabel di atas menyatukan keduanya. `[verifikasi]` terhadap media query di `input.css`; jika kode berbeda, **kode menang** dan tabel ini harus diubah.

Baris `alur` selalu bisa digeser horizontal di semua lebar (grid `auto-flow: column` + scroll snap). Empat kartu tidak pernah dipaksa 4 kolom sempit.

---

## 4. Komponen

Semua kelas ada di `@layer components` `input.css`.

| Komponen | Peran |
|---|---|
| `.bungkus` | Container 1200px + padding |
| `.nav` + `.merek` + `.nav-menu` | Navigasi sticky; `.nav-menu a.aktif` menandai section terlihat |
| `.judul-besar` / `.judul` | Skala judul hero & section |
| `.bingkai` | Frame foto rounded + `object-fit: cover` |
| `.tombol-kuning` | CTA utama (pil) |
| `.tombol-garis` | CTA sekunder ghost |
| `.tombol-putar` | Tombol bundar (lompat ke alur) |
| `.tombol-bulat` | Navigasi carousel bundar, aktif/tidak aktif |
| `.tombol-kecil` / `.taut` / `.taik` | Kontrol kecil, link teks, link kartu |
| `.kartu-krem` | Kartu drum readout di bawah hero |
| `.kartu-hijau` | Kartu grafik batang hijau terang |
| `.grafik` | 7 batang, batang ke-6 disorot (di luar target) |
| `.lingkaran` + `.lingkaran-nilai` | Lingkaran angka baku |
| `.kartu-tahap` + `.chip` | Kartu proses R01–R04 |
| `.kartu-log` + `.log` | Tabel reading + kontrol demo |
| `.pita` + `.penanda` + `.bendera` | Skala gauge dengan pita target & penanda |
| `.kartu-catatan` + `.avatar` | Kartu catatan lapangan |
| `.kaki-kata` | Wordmark `MUSH Pagi Farm` full-bleed |
| `.muncul` | Reveal-on-scroll, hanya aktif saat `body.js` |

### 4.1 Matriks state ✅ (hover/fokus/aktif ada di `input.css`)

Dokumen lama tidak mendefinisikan state. Minimum yang harus ada untuk komponen interaktif:

| Komponen | Hover | Fokus | Aktif/ditekan | Disabled | Catatan |
|---|---|---|---|---|---|
| `.tombol-kuning` | Sedikit lebih gelap, naik 1px | Outline 3px | Turun 1px | Tidak dipakai (hapus tombol) | — |
| `.tombol-garis` | Latar 8% putih | Outline 3px | — | — | — |
| `.tombol-bulat` | Latar mengisi | Outline 3px | Skala .96 | Opasitas .4, `disabled`, `aria-disabled` | Disabled di ujung alur |
| Drum switch | Latar tipis | Outline 3px | `aria-pressed="true"` + latar penuh | — | Kondisi aktif tidak mengandalkan warna saja |
| Thumbnail sorot | Naik 2px | Outline 3px | Cincin `hijau-terang` + `aria-current` | — | — |

`[verifikasi]` apakah hover/aktif sudah ada di CSS; kalau belum, tambahkan sebelum rilis berikutnya.

---

## 5. Interaksi

| Interaksi | Perilaku | Guard |
|---|---|---|
| Drum B-024 / B-025 | Ganti readout hero + tabel log, stamp berubah, bar & `aria-valuenow` ikut | — |
| "Reading berikutnya" | Prepend satu baris ke tabel | Maks. 3 baris |
| "Simulasikan gangguan" | Sembunyikan tabel, tampilkan `.galat` + Coba lagi | — |
| "Kosongkan log" | Tampilkan `.kosong` + Muat ulang contoh | — |
| Thumbnail sorot | Ganti `src` + `alt` foto besar | — |
| Panah alur | `scrollBy` satu lebar kartu, disable di ujung | `disabled` saat tak ada sisa |
| Nav aktif | IntersectionObserver menandai section di tengah layar | rootMargin −45%/−50% |
| Smooth scroll | Lenis + offset agar judul tak tertutup nav | Mati saat reduced-motion |
| Reveal | `.muncul` → `.jalan` sekali saat terlihat | threshold 0.12, unobserve setelah sekali |
| Parallax kaki | Rellax pada `.kaki-kata` | Mati saat reduced-motion |

**Aturan kendali:** tidak ada kontrol yang tidak melakukan sesuatu. Tombol "Baca →" pada kartu tahap sengaja dihapus karena tidak ada halaman tujuan. Kartu catatan memakai "Buka dasbor" yang mengarah ke halaman nyata.

**Perbaikan (sudah diterapkan):**

- ✅ Offset Lenis dibaca dari tinggi nav asli saat runtime (`nav.getBoundingClientRect().height + 20`), bukan angka tetap.
- ✅ Pesan `.galat` dan `.kosong` diberi `role="status"` supaya perubahan isi tabel terbaca pembaca layar.
- ✅ Rellax dihapus; parallax wordmark pindah ke CSS scroll-driven dan `.kaki` memakai `overflow: clip` supaya tidak memunculkan scrollbar horizontal.

---

### 5.1 Koreografi sinematik ✅ (CSS scroll-driven + IO + rAF)

**Teknik (urut preferensi):**

1. **CSS scroll-driven animation** (`animation-timeline: view()`) di dalam `@supports`. Tanpa JS dan tanpa pustaka, jalan di thread kompositor.
2. **IntersectionObserver** + kelas (`.muncul` → `.jalan`) sebagai fallback yang sudah ada.
3. **Lenis** hanya untuk kehalusan gulir, bukan untuk menggerakkan adegan.
4. GSAP/ScrollTrigger **tetap tidak dipakai** (lihat D-06). Jangan dihidupkan kembali untuk v2.2.

**Aturan koreografi:**

- Masuk: `opacity 0→1` + `translateY(24px→0)` atau `clip-path: inset(0 0 100% 0)→inset(0)`; durasi `--dur-adegan`, easing `--ease-film`.
- Keluar: tidak dianimasikan. Cukup gulir lewat. Menganimasikan elemen keluar menambah beban tanpa makna.
- Zoom foto maksimum 6%, parallax maksimum 40px. Lebih dari itu membuat mual dan memotong subjek.
- Pin (menempel) hanya satu: adegan 05 (ambang), maksimum 1,5 tinggi layar, dan **dimatikan < 900px**.
- Angka menghitung dengan `requestAnimationFrame`, `font-variant-numeric: tabular-nums` agar lebar tidak bergetar, dan berhenti tepat di nilai baku (40–45°C, 55–70%, 7–14 hari).
- Tidak ada animasi yang berulang tanpa batas. Semua berjalan sekali.

**Reduced motion (wajib, setara dengan versi bergerak):**

| Efek | Saat `prefers-reduced-motion: reduce` |
|---|---|
| Reveal judul / kartu | Langsung tampil, tanpa transisi |
| Zoom / parallax foto | Foto statis di skala 1,00 |
| Angka menghitung | Langsung tampil di nilai akhir |
| Pin adegan 05 | Tidak ada pin, tata letak biasa |
| Grain, grading, vinyet | **Tetap** (statis, tidak bergerak) |

---

## 6. State & ketahanan

- **Tanpa JS halaman tetap utuh.** Animasi reveal hanya aktif kalau `body.js` ada (di-set oleh `main.js`), jadi gagal JS tidak membuat konten kosong.
- ✅ **Kontrol demo tanpa JS.** Drum switch, "Reading berikutnya", "Simulasikan gangguan", "Kosongkan log", thumbnail, dan panah alur disembunyikan tanpa JS lewat `body:not(.js) [data-butuh-js] { display: none }`. Tampilan statis (B-024, 41,2 °C, 62%, Asam laktat, 64%) tetap terbaca dan lengkap.
- **prefers-reduced-motion** mematikan Lenis, Rellax, dan transisi reveal.
- **Data contoh ditandai jujur.** Teks "contoh dari SEED dasbor, bukan reading live" ada di section `data` dan di footer; label "Data contoh" tidak pernah hilang.
- **Sinematik gagal dengan anggun.** Tanpa JS atau tanpa dukungan `animation-timeline`, semua adegan tampil dalam keadaan akhirnya (judul penuh, angka final, foto statis). Tidak ada elemen yang `opacity: 0` sebagai kondisi awal kecuali `body.js` ada.
- **Anggaran performa sinematik:** grain ≤ 2 KB (data-URI), tanpa tambahan JS pustaka, tanpa video. Efek `mix-blend-mode`/`filter: blur` dipakai hemat dan diuji di perangkat menengah; jangan menumpuk `backdrop-filter` di banyak elemen.
- **Tanpa CDN.** Font = system stack, gambar = file lokal di `img/`, vendor = `vendor/*.min.js` lokal. Halaman jalan offline.
- ✅ **Selesai:** `vendor/gsap.min.js`, `vendor/ScrollTrigger.min.js`, dan `vendor/rellax.min.js` dihapus; dependensi `gsap` dan `rellax` dicabut dari `package.json`. Only Lenis yang tersisa.

---

## 7. Aksesibilitas

- `<html lang="id">`. `[verifikasi]`
- Skip link `.lewati` ke `#ringkasan`, fokus terlihat.
- `a/button:focus-visible` → cincin ganda: luar kuning 2px + dalam `hijau-tua` 2px. ✅ Terbaca di atas `kertas` maupun di atas `malam` (kuning sendirian hanya ~1.6:1 di kertas).
- Semua target ≥ 44px tinggi (tombol 44–52px, thumbnail 76px).
- Semua `<img>` punya `alt` + `width`/`height` (anti layout-shift); foto dekoratif memakai `alt=""`.
- Landmark lengkap: `header/nav`, `main`, `section[aria-labelledby]`, `footer`.
- Satu `h1`; hierarki heading turun tanpa lompat.
- Drum readout: `role="status" aria-live="polite"`; progress: `role="progressbar"` + `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, dan nama aksesibel. `[verifikasi]`
- Ikon saja selalu punya `aria-label` (tombol putar, panah carousel, thumbnail).
- Status berwarna selalu disertai teks (lihat §2.3).
- **Adegan gelap:** semua teks ≥ 4.5:1 terhadap piksel terterang di belakangnya (scrim wajib, §2.4b). Grain dan vinyet tidak boleh menurunkan kontras di bawah ambang.
- **Gerakan:** tidak ada kilatan > 3 kali/detik; zoom/parallax dalam batas §5.1. Konten penting tidak boleh hanya muncul lewat gerakan; nilai angka selalu ada di DOM.
- Slate `ADEGAN 03 / 07` bersifat dekoratif-informatif: boleh `aria-hidden="true"` agar pembaca layar tidak membacakan nomor adegan di tiap section.
- Carousel `alur`: area scroll yang bisa difokus harus punya `tabindex="0"`, `role="region"`, dan `aria-label` agar pengguna keyboard bisa menggulir.

**Hasil uji headless sebelumnya:** 0 tombol tanpa nama aksesibel, 0 gambar rusak, 0 anchor mati, 0 overflow horizontal di 320–1920px.

> **Batas klaim.** Uji headless tidak menangkap urutan fokus atau perilaku pembaca layar; contrast ditutup di §2.2 dan kontras foto di §11. Uji keyboard-only manual dan pemindaian axe/Lighthouse masih belum dijalankan.

---

## 8. Aturan copy

- Bahasa Indonesia, kalimat pendek, tanpa buzzword ("revolusioner", "game changer", "mudah digunakan").
- **Angka wajib sinkron** dengan `AGENTS.md` dan `mush-dashboard/js/config.js`: 40–45°C, 55–70% Rh, 7–14 hari, poll 10 detik, timeout 8 detik, kontrak v3.1.
- Drum contoh: **B-024** (hari 9/14, 41,2°C, 62%, Asam laktat, dalam target) dan **B-025** (hari 4/14, 39,4°C, 68%, Cek drum). Jangan menambah drum baru di landing tanpa mengubah config dasbor.
- Tidak ada testimoni, ulasan, atau angka pengguna rekaan. Section yang biasanya berisi testimoni diisi tiga lingkaran angka baku.
- Istilah: "silase", "off-grade", "drum", "batch", "ambang". Jangan campur "slage"/"silaj".
- Format angka: koma desimal (41,2°C), spasi sebelum satuan persen **tidak** dipakai (62%), rentang pakai en dash (40–45°C).
- ✅ **Guard sinkronisasi:** `npm run cek-angka` (`tools/cek-angka.js`) membaca ambang dan suhu drum dari `mush-dashboard/js/config.js`, lalu gagal bila tidak cocok dengan `index.html`. Status: PASS.

---

## 9. Foto

- Sumber: Openverse + Wikimedia Commons, lisensi CC0 / PDM / CC BY.
- Metadata per file di `img/CREDITS.json` (judul, kreator, lisensi, URL).
- Kredit umum dicetak di kaki halaman.
- Ukuran: hero 900×1150 (4:5), sorot 900×1200 (3:4), kartu proses & catatan 700×520 (4:3), thumbnail 400×400 (1:1).
- Kalau foto asli Pagi Farm tersedia, taruh di `img/` dengan nama yang sama dan perbarui `CREDITS.json` + baris kredit kaki.
- Lisensi BY/PDM wajib menyebut kreator di `CREDITS.json`.

**Tambahan (sudah diterapkan):**

- ✅ **Penanda terlihat.** Setiap foto stock diberi label kecil "Foto ilustrasi" (pil di sudut bingkai atau `<figcaption>`), supaya pengunjung tidak mengira itu Pagi Farm. Hilangkan label hanya saat foto diganti foto asli.
- **Format & berat.** Sajikan WebP/AVIF dengan fallback JPEG via `<picture>`. Anggaran: hero ≤ 150 KB, foto lain ≤ 90 KB, total gambar di atas fold ≤ 300 KB. `[verifikasi]` ukuran saat ini.
- **Pemuatan.** Foto hero: `fetchpriority="high"`, tanpa `loading="lazy"`. Foto lainnya: `loading="lazy"` + `decoding="async"`.
- **Alt jujur.** Alt mendeskripsikan isi gambar ("Tangan memegang daun selada di rak hidroponik"), bukan mengklaim lokasi ("Greenhouse Pagi Farm").

---

## 10. Performa & SEO ✅

| Target | Nilai | Cara cek |
|---|---|---|
| LCP | ≤ 2,5 s (4G lambat) | Lighthouse mobile — **belum dijalankan**, aset sudah disiapkan (hero AVIF 52 KB, `fetchpriority="high"`) |
| CLS | ≤ 0,1 | Semua `<img>` punya `width`/`height` → CLS intrinsik 0 (Lighthouse belum dijalankan) |
| Total JS | ≤ 60 KB gzip | ✅ **8,7 KB** (Lenis 5,3 + main 3,6) — GSAP & Rellax dihapus |
| `style.css` | ≤ 30 KB gzip | ✅ **7,9 KB** |

Meta minimum: `<title>`, `meta description`, `og:title`, `og:description`, `og:image` (foto ilustrasi atau wordmark, bukan klaim palsu), `theme-color` `#0A3A2A`, dan `canonical` bila sudah dihosting.

---

## 11. Verifikasi

```bash
cd landing
npm run build                    # tailwind -> style.css
python3 -m http.server 8811      # dari root repo: http://localhost:8811/landing/
```

Checklist sebelum kirim:

- [ ] `npm run build` tanpa error, `style.css` ter-update.
- [ ] 0 error di console; drum switch & 4 state demo berfungsi.
- [ ] 0 overflow horizontal di 320 / 360 / 768 / 1440px.
- [ ] Semua gambar termuat (0 `naturalWidth === 0`).
- [ ] `prefers-reduced-motion`: tanpa smooth scroll, konten tetap tampil.
- [ ] Tanpa JS: konten terbaca **dan** kontrol demo tersembunyi (§6).
- [ ] Sinematik: tiap adegan hanya satu gerakan utama; tidak ada pin di < 900px.
- [ ] Reduced motion: semua baris tabel §5.1 terpenuhi; angka ambang langsung final.
- [ ] Teks di atas foto: kontras ≥ 4.5:1 terhadap piksel terterang (scrim terpasang).
- [ ] Performa: LCP hero tetap ≤ 2,5 s dengan grading + grain aktif; tidak ada jank di perangkat menengah.
- [ ] Contrast: semua pasangan teks ≥ 4.5:1 sesuai matriks §2.2.
- [ ] Uji keyboard-only: urutan fokus logis, carousel bisa digulir.
- [ ] Angka di HTML cocok dengan `config.js` (§8).
- [ ] Setiap foto stock punya label "Foto ilustrasi" (§9).

**Catatan hasil terakhir (2026-10-17):** item 1–6 PASS pada redesign v2 (headless Chrome 1440px + CDP emulation 320/360/768/1920px). Item 7–10 **belum diuji**; item 7 sudah dihitung dan **menemukan 2 token gagal** (lihat §2.2).

Catat tiap putaran uji dengan format ini:

| Tanggal | Penguji / alat | Commit | Hasil | Temuan |
|---|---|---|---|---|
| 2026-10-17 | Headless Chrome + CDP | — | Item 1–6 PASS | — |
| 2026-10-17 | Skrip contrast (§2.2) | — | 2 token gagal | `redup`, `tanah` di `kertas` |

---

## 12. Log keputusan (menutup R-31)

| ID | Tanggal | Keputusan | Alternatif ditolak | Alasan |
|---|---|---|---|---|
| D-01 | 2026-10-17 | Foto stock berlisensi untuk semua slot foto | Ilustrasi SVG buatan sendiri (v1) | Foto memberi konteks nyata; SVG v1 terbaca "dekoratif" |
| D-02 | 2026-10-17 | Satu CTA kuning per section | Beberapa CTA berwarna | Menjaga hierarki aksi; evaluator butuh satu langkah jelas |
| D-03 | 2026-10-17 | Border hairline + bayangan, bukan border tebal | Border 3:1 | Border tebal terasa berat; bayangan memberi batas tanpa gaya kotak |
| D-04 | 2026-10-17 | Tiga lingkaran angka baku menggantikan testimoni | Testimoni rekaan | Tidak ada pengguna nyata; angka baku riil dan terverifikasi |
| D-05 | 2026-10-17 | System font stack, tanpa webfont/CDN | Webfont via CDN | Jalan offline, tanpa pelacakan, tanpa FOUT |
| D-06 | 2026-10-17 | Halaman scroll biasa | 7 slide sinematik GSAP (v1) | Lebih ringan, lebih mudah diakses, lebih mudah dirawat |
| D-07 | 2026-10-17 | Hapus tombol "Baca →" pada kartu tahap | Biarkan sebagai tautan mati | Tanpa tujuan nyata = kontrol dekoratif |
| D-09 | 2026-10-17 | Arah sinematik terkendali (adegan, grading, letterbox, grain statis, hitung angka) | Tetap v2 datar; atau kembali ke v1 7-slide penuh | Memberi ritme dan ingatan tanpa mengorbankan keterbacaan; adegan data sengaja dibiarkan polos |
| D-10 | 2026-10-17 | Teknik gerak: CSS scroll-driven + IntersectionObserver, tanpa GSAP | Hidupkan GSAP/ScrollTrigger lagi | Menjaga keputusan D-06: ringan, tahan gagal, mudah dirawat |
| D-11 | 2026-10-17 | Pola latar gelap (narasi) / terang (data) berselang-seling | Seluruh halaman gelap | Tabel dan angka lebih terbaca di terang; gelap dipakai untuk emosi, bukan untuk data |
| D-08 | 2026-10-17 | Gelapkan `redup` → `#557566` dan `tanah` → `#A5560F` (§2.2 opsi A) | Batasi ke latar putih (opsi B) | Dua token gagal AA di latar halaman; digelapkan sekali menutup semua latar tanpa mengubah layout |

**Catatan workaround `overflow: clip`.** Watermark `sisi-teks` sempat bocor sampai luar viewport sampai 29px. Memperbaikinya dengan `overflow: hidden` di `.adegan-malam` justru mematikan `position: sticky` di adegan 05 — `hidden` membuat section jadi scroll container. Solusinya `overflow: clip`, yang memotong visual tanpa membuat scroll container. Diuji: pin menahan 450px, overflow 0 di enam lebar.

**Catatan D-08:** keputusan ini diambil untuk menjalankan v2.2, tapi mengubah warna sekunder yang terlihat di halaman. Kalau pemilik desain lebih suka opsi B (batasi ke latar putih), cukup kembalikan dua token itu di `input.css` dan jalankan ulang skrip kontras §2.2.

## 12b. Deviasi dari spesifikasi


| Spec | Kenyataan | Alasan |
|---|---|---|
| Letterbox 21:9 untuk hero **dan** sorot | Hero 21:9 (aset `hero-lebar.jpg` 1800×772 asli). Sorot 21:9 desktop / 3:2 mobile dari `r03.jpg` 700×520 | Tidak ada aset landscape ≥ 1100px yang relevan untuk sorot di katalog bebas; memaksa 21:9 berarti menaikkan foto 700px jadi ~1800px dan membuatnya pecah. keputusan: pakai rasio asli foto, jangan perbesar |
| Pin pada adegan 05 | ✅ Diterapkan: `position: sticky`, section 150vh, hanya ≥900px, mati saat reduced-motion | Ini satu-satunya pin yang diizinkan §5.1; diukur menahan 450px gulir |
| Batas rasio 21:9 untuk sorot | Tetap 21:9 desktop dari aset 700×520 | **DEV-1** di atas |
| Rellax untuk parallax wordmark | Diganti CSS scroll-driven (`animation-timeline: view()`) | §5.1 menaruh CSS scroll-driven di urutan preferensi; Rellax dihapus agar satu pemilik gerak

---

## 13. Di luar cakupan

- Halaman **login / signup / cart**: tidak ada; proyek ini one-page informatif.
- **Multi-bahasa**: landing hanya Bahasa Indonesia.
- **Blog penuh**: section "Catatan" adalah 4 ringkasan dengan tautan ke dasbor, bukan CMS.
- **Hero video, audio, dan cursor/partikel kustom**: tidak ada aset video; sinematik dicapai lewat foto, grading, dan gerak CSS saja.
- **Mode gelap**: halaman sudah berlatar hijau gelap di nav/hero/kaki; tema gelap penuh belum direncanakan.

---

## 14. Sejarah

- **v2.3 (2026-10-17):** v2.2 diimplementasikan penuh. Token malam/cahaya/redup-gelap, skala spasi, token gerak, skala z-index; pola 7 adegan gelap-terang berselang; letterbox 21:9 + grading + scrim; grain statis per adegan; dissolve antar adegan; slate timecode; mask reveal per baris; hitung-naik angka ambang; garis storyboard + kartu aktif; CSS scroll-driven (zoom foto, parallax wordmark, tumbuh batang); `data-butuh-js`; fokus cincin ganda; `npm run cek-angka`; WebP/AVIF + penanda "Foto ilustrasi"; GSAP & Rellax dihapus. Semua ⚠️ v2.2 ditutup kecuali D-08 yang diterapkan atas nama pemilik.
- **v2.2 (2026-10-17):** arah sinematik terkendali. Tambah §1.1 (prinsip, bahasa visual, anti-pola), §2.4b (token adegan gelap, contrast diukur), token motion sinematik, §3.1 peta 8 adegan, §5.1 koreografi + tabel reduced-motion, guard ketahanan dan aksesibilitas, keputusan D-09 s/d D-11. Semua belum diimplementasikan di kode; ini kontrak desain.
- **v2.1 (2026-10-17):** audit dokumen. Tambah matriks contrast lengkap (menemukan 2 token gagal AA), perbaikan tabel breakpoint yang kontradiktif, matriks state, token motion/spasi/z-index (usulan), bagian performa & SEO, log keputusan, penanda foto ilustrasi, guard progressive enhancement untuk kontrol demo.
- **v2 (2026-10-17):** redesign total mengikuti referensi visual Grove: nav pill, hero tipografi besar, kartu statistik, section foto, kartu tahap, lingkaran angka, grid catatan, kaki wordmark. Foto stock berlisensi.
- **v1:** 7 slide sinematik gelap (hero gelap + rel GSAP + rail titik) dengan ilustrasi SVG buatan sendiri. Hanya logika drum dan tabel demo yang dipindah ke v2.
