/* cek-angka — guard sinkronisasi angka antara landing dan dasbor.
   "Angka wajib sinkron" tanpa pengecekan otomatis akan menyimpang
   (design.md §8). Jalankan: npm run cek-angka */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const cfg = fs.readFileSync(
  path.join(root, "..", "mush-dashboard", "js", "config.js"),
  "utf8"
);

let gagal = 0;
function cek(nama, sumber, harusAda) {
  const ada = sumber.some((s) => html.includes(s));
  if (!ada) {
    console.log(`  GAGAL  ${nama} — tidak ditemukan di index.html: ${harusAda.join(" | ")}`);
    gagal++;
  } else {
    console.log(`  ok     ${nama}`);
  }
}

/* Ambang baku, diambil dari config.js dasbor (sumber kebenaran). */
const [suhuMin, suhuMax] = cfg.match(/suhu:\s*\[(\d+),\s*(\d+)\]/).slice(1).map(Number);
const [humMin, humMax] = cfg.match(/hum:\s*\[(\d+),\s*(\d+)\]/).slice(1).map(Number);
const hariTotal = Number(cfg.match(/fermentDays:\s*(\d+)/)[1]);
const hariMin = 7;

const fmt = (n) => String(n).replace(".", ",");
const strip = (s) => s.replace(/[–-]/g, "-");

console.log("Angka ambang dari mush-dashboard/js/config.js:");
cek("suhu", [`${suhuMin}`, `${suhuMax}`], [`${suhuMin}`, `${suhuMax}`]);
cek("kelembapan", [`${humMin}`, `${humMax}`], [`${humMin}`, `${humMax}`]);
cek("lama fermentasi", [`${hariMin}`, `${hariTotal}`], [`${hariMin}`, `${hariTotal}`]);

/* Drum contoh harus sama dengan SEED dasbor. */
const suhuB024 = cfg.match(/B-024"?:?\s*\{[^}]*?suhu:\s*([\d.]+)/);
const suhuB025 = cfg.match(/B-025"?:?\s*\{[^}]*?suhu:\s*([\d.]+)/);
if (suhuB024) cek("suhu B-024", [fmt(suhuB024[1])], [fmt(suhuB024[1])]);
if (suhuB025) cek("suhu B-025", [fmt(suhuB025[1])], [fmt(suhuB025[1])]);

/* Versi kontrak harus sama. */
const versiCfg = cfg.match(/version:\s*"([^"]+)"/) || cfg.match(/v(\d+\.\d+)/);
if (versiCfg) {
  const v = versiCfg[1] || versiCfg[0];
  cek("versi kontrak", [v], [v]);
}

/* Selisih 0,1 derajat tetap gagal: ambang tidak boleh meleset. */
if (Math.abs(suhuMin - 40) > 0 || Math.abs(suhuMax - 45) > 0) {
  console.log(`  GAGAL  suhu di luar 40-45 (dapat ${suhuMin}-${suhuMax})`);
  gagal++;
}
if (Math.abs(humMin - 55) > 0 || Math.abs(humMax - 70) > 0) {
  console.log(`  GAGAL  kelembapan di luar 55-70 (dapat ${humMin}-${humMax})`);
  gagal++;
}

console.log(gagal ? `\n${gagal} angka tidak sinkron.` : "\nSemua angka sinkron.");
process.exit(gagal ? 1 : 0);