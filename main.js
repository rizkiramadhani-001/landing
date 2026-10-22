/* Landing MUSH. Data drum contoh dari SEED dasbor, bukan reading live.
   Foto di img/ dari Openverse dan Wikimedia Commons. */

document.body.classList.add("js");

var DRUMS = {
  "B-024": {
    suhu: "41,2", hum: "62%", hari: "9 / 14", pct: "64%",
    bar: 64, ml: "Asam laktat", status: "Dalam target, 40 sampai 45 derajat",
    cap: "Dalam target",
    luar: false, sumber: "RF433 ke ESP32",
    log: [["10:42", "41,2", "62"], ["10:32", "41,1", "62"], ["10:22", "41,3", "61"]]
  },
  "B-025": {
    suhu: "39,4", hum: "68%", hari: "4 / 14", pct: "29%",
    bar: 29, ml: "Asam laktat", status: "Di bawah target, cek tutup drum",
    cap: "Cek drum",
    luar: true, sumber: "RF433 ke ESP32",
    log: [["10:41", "39,4", "68"], ["10:31", "39,2", "67"], ["10:21", "39,5", "68"]]
  }
};
var aktif = "B-024";
var logBerikut = { "B-024": ["10:52", "41,2", "62"], "B-025": ["10:51", "39,3", "68"] };

function el(id) { return document.getElementById(id); }

function gambarLog(barisBaru) {
  var tb = el("demo-tbody");
  tb.textContent = "";
  DRUMS[aktif].log.forEach(function (r, i) {
    var tr = document.createElement("tr");
    if (barisBaru && i === 0) tr.className = "baru";
    [r[0], r[1] + " °C", r[2] + " %"].forEach(function (v, i2) {
      var c = i2 === 0 ? document.createElement("th") : document.createElement("td");
      if (i2 === 0) c.setAttribute("scope", "row");
      c.textContent = v;
      tr.appendChild(c);
    });
    tb.appendChild(tr);
  });
  el("demo-caption").textContent = "Tiga reading terakhir drum " + aktif;
  el("demo-status").textContent = DRUMS[aktif].status;
  el("demo-ml").textContent = DRUMS[aktif].ml;
}

function gambarDrum() {
  var d = DRUMS[aktif];
  el("drum-suhu").textContent = d.suhu;
  el("drum-hum").textContent = d.hum;
  el("drum-hari").textContent = d.hari;
  el("drum-ml").textContent = d.ml;
  el("drum-pct").textContent = d.pct;
  el("drum-sumber").textContent = d.sumber;
  el("drum-bar").style.width = d.bar + "%";
  el("drum-bar-wrap").setAttribute("aria-valuenow", String(d.bar));
  el("drum-id").textContent = "Drum " + aktif;
  var cap = el("drum-stempel");
  cap.textContent = d.cap;
  cap.classList.toggle("luar", d.luar);
  [["btn-b024", "B-024"], ["btn-b025", "B-025"],
   ["demo-b024", "B-024"], ["demo-b025", "B-025"]].forEach(function (p) {
    el(p[0]).setAttribute("aria-pressed", p[1] === aktif ? "true" : "false");
  });
}

function gantiDrum(nama) {
  if (nama === aktif) return;
  aktif = nama;
  el("drum-isi").hidden = true;
  el("drum-galat").hidden = true;
  el("drum-muat").hidden = false;
  el("demo-tabel").hidden = true;
  el("demo-muat").hidden = false;
  el("demo-galat").hidden = true;
  el("demo-kosong-pesan").hidden = true;
  window.setTimeout(function () {
    el("drum-muat").hidden = true;
    el("drum-isi").hidden = false;
    el("demo-muat").hidden = true;
    el("demo-tabel").hidden = false;
    gambarDrum();
    gambarLog();
  }, 450);
}

["btn-b024", "demo-b024"].forEach(function (id) {
  el(id).addEventListener("click", function () { gantiDrum("B-024"); });
});
["btn-b025", "demo-b025"].forEach(function (id) {
  el(id).addEventListener("click", function () { gantiDrum("B-025"); });
});

el("demo-next").addEventListener("click", function () {
  var d = DRUMS[aktif];
  d.log = [logBerikut[aktif]].concat(d.log).slice(0, 3);
  gambarLog(true);
});

el("btn-coba").addEventListener("click", function () {
  el("drum-galat").hidden = true;
  el("drum-isi").hidden = false;
});
el("demo-gagal").addEventListener("click", function () {
  el("demo-tabel").hidden = true;
  el("demo-kosong-pesan").hidden = true;
  el("demo-galat").hidden = false;
});
el("demo-ulang").addEventListener("click", function () {
  el("demo-galat").hidden = true;
  el("demo-tabel").hidden = false;
});
el("demo-kosong").addEventListener("click", function () {
  el("demo-tabel").hidden = true;
  el("demo-galat").hidden = true;
  el("demo-kosong-pesan").hidden = false;
});
el("demo-pulih").addEventListener("click", function () {
  el("demo-kosong-pesan").hidden = true;
  el("demo-tabel").hidden = false;
});

gambarDrum();
gambarLog();

/* Judul adegan ikutreveal: kelas .muncul ditambahkan SEBELUM observer
   dibuat, kalau tidak judulnya tidak pernah masuk daftar amatan dan
   tetap tersembunyi. */
document.querySelectorAll(".judul-adegan").forEach(function (j) {
  j.classList.add("muncul");
});

/* Muncul saat digulir: satu kali per elemen. Tanpa IntersectionObserver
   atau tanpa JS, isi tetap tampil. */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".muncul"));
  if (!("IntersectionObserver" in window) ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    items.forEach(function (i) { i.classList.add("jalan"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("jalan");
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  items.forEach(function (i) { io.observe(i); });
})();

/* Angka ambang menghitung naik sekali saat terlihat. Nilai akhir sudah
   ada di HTML (40–45 °C dan seterusnya), jadi tanpa JS dan untuk pembaca
   layar angkanya tetap benar. */
(function () {
  var daftar = Array.prototype.slice.call(document.querySelectorAll(".hitung"));
  if (!daftar.length) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function hitung(el) {
    var akhirNum = parseFloat(el.dataset.nilai);
    var asal = el.textContent.trim();
    /* Hanya angka pertama yang dihitung. Sisanya — tanda hubung dan
       satuan, mis. "–45 °C" — harus tetap utuh, kalau tidak rentang
       "40–45 °C" berubah jadi "40 °C" di akhir animasi. */
    var ekor = asal.replace(/^[\d.,]+\s*/, "");
    if (reduce || isNaN(akhirNum)) return;
    var t0 = null;
    function bingkai(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / 1400);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(akhirNum * eased) + ekor;
      if (p < 1) window.requestAnimationFrame(bingkai);
    }
    window.requestAnimationFrame(bingkai);
  }
  if (!("IntersectionObserver" in window) || reduce) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      hitung(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.6 });
  daftar.forEach(function (d) { io.observe(d); });
})();

/* Baris tahap: kartu aktif naik 4px dan garis storyboard terisi sesuai
   posisi gulir. Dipakai di desktop; di mobile kartu penuh lebih kecil
   dan tidak ada garis, jadi tidak perlu. */
(function () {
  var baris = el("alur-baris");
  var garis = el("alur-isi-garis");
  if (!baris || !garis || !window.matchMedia("(min-width: 900px)").matches) return;
  var kartu = Array.prototype.slice.call(baris.querySelectorAll(".kartu-tahap"));
  function perbarui() {
    /* Kalau baris tidak bisa digeser, semua tahap terlihat: garis penuh,
       bukan berhenti di tahap pertama. */
    var bisaGeser = baris.scrollWidth - baris.clientWidth > 2;
    if (!bisaGeser) {
      kartu.forEach(function (k) { k.classList.add("aktif"); });
      garis.style.setProperty("--alur-progres", "100%");
      return;
    }
    /* Kartu diukur dalam koordinat viewport, lalu dipindah ke ruang
       scroll baris supaya perbandingannya satu jenis. */
    var geser = baris.scrollLeft - baris.getBoundingClientRect().left;
    var tengahBaris = baris.scrollLeft + baris.clientWidth / 2;
    var aktif = 0;
    kartu.forEach(function (k, i) {
      var r = k.getBoundingClientRect();
      var tengahKartu = r.left + r.width / 2 + geser;
      if (Math.abs(tengahKartu - tengahBaris) < r.width / 2) aktif = i;
    });
    kartu.forEach(function (k, i) { k.classList.toggle("aktif", i === aktif); });
    garis.style.setProperty("--alur-progres", ((aktif + 1) / kartu.length * 100).toFixed(1) + "%");
  }
  baris.addEventListener("scroll", perbarui, { passive: true });
  window.addEventListener("resize", perbarui);
  perbarui();
})();

/* Bilah progres baca di atas nav. */
(function () {
  var bar = el("progres");
  function progres() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0).toFixed(3) + ")";
  }
  window.addEventListener("scroll", progres, { passive: true });
  window.addEventListener("resize", progres);
  progres();
})();

/* Lenis untuk gulir halus. Offset anchor dihitung dari navbar bila ada
   (v2.3); sejak navbar dihapus (v2.4) cukup ruang napas kecil. */
var lenis = null;
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof window.Lenis !== "function") return;
  lenis = new window.Lenis({ duration: 1.2, smoothWheel: true });
  (function raf(t) {
    lenis.raf(t);
    window.requestAnimationFrame(raf);
  })(0);
  /* Tanpa navbar, offset anchor hanya menyisakan ruang napas kecil di
     atas judul — bukan mengurangi tinggi bar yang sudah tidak ada. */
  function offsetNav() {
    var nav = document.querySelector(".nav");
    return nav ? -(nav.getBoundingClientRect().height + 20) : -24;
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: offsetNav() });
    });
  });
})();

el("btn-putar").addEventListener("click", function () {
  var t = el("alur");
  if (lenis) lenis.scrollTo(t, { offset: -88 });
  else t.scrollIntoView();
});

/* Sorot: thumbnail menukar foto besar dengan dissolve 300ms. Foto lama
   pudar dulu supaya perubahannya terbaca sebagai potongan film, bukan
   lompatan. */
(function () {
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".thumb"));
  var foto = el("sorot-foto");
  var bingkai = foto ? foto.closest(".letterbox") : null;
  if (!foto) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ganti = function (t) {
    foto.parentElement.querySelectorAll("source").forEach(function (source) {
      source.remove();
    });
    thumbs.forEach(function (x) {
      x.classList.remove("aktif");
      x.setAttribute("aria-pressed", "false");
    });
    t.classList.add("aktif");
    t.setAttribute("aria-pressed", "true");
    if (!bingkai || reduce) {
      foto.src = t.dataset.foto;
      foto.alt = t.dataset.alt;
      return;
    }
    bingkai.classList.add("pudar");
    window.setTimeout(function () {
      foto.src = t.dataset.foto;
      foto.alt = t.dataset.alt;
      bingkai.classList.remove("pudar");
    }, 300);
  };
  thumbs.forEach(function (t) {
    t.addEventListener("click", function () { ganti(t); });
  });
})();

/* Alur: tombol prev/next menggeser baris kartu. Nonaktif di ujung. */
(function () {
  var baris = el("alur-baris");
  var prev = el("alur-prev");
  var next = el("alur-next");
  if (!baris) return;
  function geser(arah) {
    var kartu = baris.querySelector(".kartu-tahap");
    var lebar = kartu ? kartu.getBoundingClientRect().width + 20 : baris.clientWidth * 0.8;
    baris.scrollBy({ left: arah * lebar, behavior: "smooth" });
  }
  function perbarui() {
    var maks = baris.scrollWidth - baris.clientWidth - 2;
    prev.disabled = baris.scrollLeft <= 2;
    next.disabled = baris.scrollLeft >= maks;
  }
  prev.addEventListener("click", function () { geser(-1); });
  next.addEventListener("click", function () { geser(1); });
  baris.addEventListener("scroll", perbarui, { passive: true });
  window.addEventListener("resize", perbarui);
  perbarui();
})();
