/*
  cms.js — mengambil data dari panel admin (Google Apps Script) dan menampilkannya di website.
  - Isi bawaan di file HTML tetap tampil lebih dulu / jika server tidak bisa dihubungi.
  - Data terakhir disimpan di perangkat pengunjung sehingga halaman terbuka cepat.
*/
(function () {
  "use strict";

  var API = (window.CMS_API || "").trim();
  var CACHE_KEY = "pramasaju_cms_v1";
  var page = document.body.getAttribute("data-page") || "";
  var CMS = (window.CMS = { data: null, api: API });

  /* ───────── Utilitas ───────── */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function safeUrl(u) {
    u = String(u || "").trim();
    return /^\s*(javascript|vbscript):/i.test(u) ? "" : u;
  }
  function fmtDate(s) {
    var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return s || "";
    return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString("id-ID",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }
  /** Bersihkan HTML dari editor admin: buang skrip & atribut berbahaya */
  function sanitize(html) {
    var doc = new DOMParser().parseFromString("<div>" + String(html || "") + "</div>", "text/html");
    var root = doc.body.firstChild;
    $$("script,style,iframe,object,embed,link,meta,form,base", root).forEach(function (n) { n.remove(); });
    $$("*", root).forEach(function (el) {
      Array.prototype.slice.call(el.attributes).forEach(function (a) {
        var n = a.name.toLowerCase();
        if (n.indexOf("on") === 0 || n === "style" || ((n === "href" || n === "src") && /^\s*(javascript|data):/i.test(a.value))) {
          el.removeAttribute(a.name);
        }
      });
      if (el.tagName === "A") { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer"); }
    });
    return root.innerHTML;
  }
  function getJSON(url) {
    return fetch(url).then(function (r) { return r.json(); });
  }
  function readCache(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (e) { return null; }
  }
  function writeCache(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* penyimpanan penuh/diblokir */ }
  }
  function qs(name) { return new URLSearchParams(location.search).get(name); }

  /* ───────── Pengaturan umum (kontak, logo, footer, dll) ───────── */
  function applyConfig(c) {
    if (!c) return;
    $$("[data-cfg]").forEach(function (el) {
      var v = c[el.getAttribute("data-cfg")];
      if (v !== undefined && v !== "") el.innerHTML = esc(v).replace(/\n/g, "<br>");
    });
    $$("[data-cfg-href]").forEach(function (el) {
      var v = safeUrl(c[el.getAttribute("data-cfg-href")]);
      if (v) el.setAttribute("href", (el.getAttribute("data-cfg-prefix") || "") + v);
      else if (el.hasAttribute("data-cfg-hide")) el.style.display = "none";
    });
    $$("[data-cfg-src]").forEach(function (el) {
      var v = safeUrl(c[el.getAttribute("data-cfg-src")]);
      if (v) el.setAttribute("src", v);
    });
    $$("[data-cfg-footer]").forEach(function (el) {
      if (c.footerTeks) el.textContent = "© " + new Date().getFullYear() + " " + c.footerTeks;
    });
  }

  /* ───────── Slider beranda ───────── */
  var sliderTimer = null, slideNow = 0, sliderSig = "";
  function renderSlider(list) {
    var box = $(".slider");
    if (!box || !list || !list.length) return;
    var sig = list.map(function (s) { return s.Gambar; }).join("|");
    if (sig === sliderSig) return;
    sliderSig = sig;
    box.innerHTML = list.map(function (s, i) {
      return '<div class="slide' + (i === 0 ? " active" : "") + '" style="background-image:url(\'' +
        esc(safeUrl(s.Gambar)).replace(/'/g, "%27") + "')\"></div>";
    }).join("");
    slideNow = 0;
    clearInterval(sliderTimer);
    if (list.length > 1) {
      sliderTimer = setInterval(function () {
        var sl = $$(".slide", box);
        if (!sl.length) return;
        sl[slideNow].classList.remove("active");
        slideNow = (slideNow + 1) % sl.length;
        sl[slideNow].classList.add("active");
      }, 5000);
    }
  }

  /* ───────── Komponen tampilan ───────── */
  function newsCard(b) {
    return '<div class="news-card">' +
      (b.Gambar ? '<img src="' + esc(safeUrl(b.Gambar)) + '" class="news-img" alt="' + esc(b.Judul) + '" loading="lazy">' : "") +
      '<h3 class="news-title">' + esc(b.Judul) + "</h3>" +
      '<div class="news-date">' + esc(fmtDate(b.Tanggal)) + "</div>" +
      '<p class="news-desc">' + esc(b.Ringkasan) + "</p>" +
      '<a href="news.html?id=' + encodeURIComponent(b.ID) + '" class="btn-read">Baca Selengkapnya</a></div>';
  }

  function renderAbout(list) {
    var grid = $("#aboutGrid");
    if (!grid || !list || !list.length) return;
    grid.innerHTML = list.map(function (t) {
      return '<div class="about-card"><h3>' + esc(t.Judul) + "</h3><p>" + esc(t.Ringkasan) +
        '</p><button class="more-btn" onclick="openAbout(\'' + esc(t.Kunci) + '\')">Baca Selengkapnya</button></div>';
    }).join("");
  }

  function renderActivities(list) {
    var grid = $("#activityGrid");
    if (!grid || !list) return;
    grid.innerHTML = list.map(function (k) {
      return '<a class="activity-card" href="kegiatan.html?id=' + encodeURIComponent(k.ID) + '">' +
        (k.Cover ? '<img src="' + esc(safeUrl(k.Cover)) + '" alt="' + esc(k.Judul) + '" loading="lazy">' : "") +
        '<div class="ac-body"><h3>' + esc(k.Judul) + "</h3><p>" + esc(k.Ringkasan) + "</p></div></a>";
    }).join("");
  }

  function photoGrid(el, photos, altPrefix) {
    if (!el) return;
    if (!photos.length) { el.innerHTML = '<p class="status-msg">Belum ada foto.</p>'; return; }
    el.innerHTML = photos.map(function (p, i) {
      return '<figure class="gallery-item" data-i="' + i + '"><img src="' + esc(safeUrl(p.Gambar)) + '" alt="' +
        esc(p.Caption || altPrefix + " " + (i + 1)) + '" loading="lazy">' +
        (p.Caption ? "<figcaption>" + esc(p.Caption) + "</figcaption>" : "") + "</figure>";
    }).join("");
    el.onclick = function (e) {
      var f = e.target.closest(".gallery-item");
      if (f) lightbox(photos, +f.getAttribute("data-i"));
    };
  }

  /* ───────── Lightbox ───────── */
  function lightbox(photos, i) {
    var box = document.createElement("div");
    box.className = "lb";
    box.innerHTML = '<button class="lb-x" aria-label="Tutup">×</button><button class="lb-p" aria-label="Sebelumnya">‹</button>' +
      '<img alt=""><button class="lb-n" aria-label="Berikutnya">›</button><div class="lb-c"></div>';
    document.body.appendChild(box);
    function show() {
      $("img", box).src = safeUrl(photos[i].Gambar);
      $(".lb-c", box).textContent = (photos[i].Caption ? photos[i].Caption + " — " : "") + (i + 1) + " / " + photos.length;
    }
    function go(d) { i = (i + d + photos.length) % photos.length; show(); }
    function close() { box.remove(); document.removeEventListener("keydown", key); }
    function key(e) { if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") go(-1); else if (e.key === "ArrowRight") go(1); }
    $(".lb-x", box).onclick = close;
    $(".lb-p", box).onclick = function () { go(-1); };
    $(".lb-n", box).onclick = function () { go(1); };
    box.onclick = function (e) { if (e.target === box) close(); };
    document.addEventListener("keydown", key);
    show();
  }

  /* ───────── Video ───────── */
  function videoEmbed(u, title) {
    u = safeUrl(u);
    var m;
    if (!/^https?:\/\//i.test(u)) return "";
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/))) {
      return '<iframe src="https://www.youtube.com/embed/' + m[1] + '" title="' + esc(title) + '" allowfullscreen loading="lazy"></iframe>';
    }
    if ((m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/))) {
      return '<iframe src="https://drive.google.com/file/d/' + m[1] + '/preview" title="' + esc(title) + '" allowfullscreen loading="lazy"></iframe>';
    }
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(u)) return '<video controls preload="metadata" src="' + esc(u) + '"></video>';
    return '<a class="video-link" href="' + esc(u) + '" target="_blank" rel="noopener">Tonton video ↗</a>';
  }

  /* ───────── Render per halaman ───────── */
  var NEWS_PAGE = 9, newsShown = 0;
  function renderNewsList(list) {
    var grid = $("#newsGrid");
    if (!grid || !list) return;
    var limit = page === "index" ? 6 : null;
    if (limit) {
      grid.innerHTML = list.slice(0, limit).map(newsCard).join("");
      return;
    }
    newsShown = Math.max(newsShown, NEWS_PAGE);
    grid.innerHTML = list.slice(0, newsShown).map(newsCard).join("") || '<p class="status-msg">Belum ada berita.</p>';
    var more = $("#moreNews");
    if (more) {
      more.style.display = list.length > newsShown ? "inline-block" : "none";
      more.onclick = function () { newsShown += NEWS_PAGE; renderNewsList(list); };
    }
  }

  function render(d) {
    CMS.data = d;
    applyConfig(d.config);
    switch (page) {
      case "index":
        renderSlider(d.slider);
        renderAbout(d.tentang);
        renderNewsList(d.berita);
        renderActivities(d.kegiatan);
        break;
      case "berita":
        renderNewsList(d.berita);
        break;
      case "news":
        renderNewsMeta(d);
        break;
      case "kegiatan": {
        var k = (d.kegiatan || []).filter(function (x) { return x.ID === qs("id"); })[0];
        var ld = $("#kgLoading");
        if (ld) ld.style.display = "none";
        if (!k) { $("#kgContent").innerHTML = '<p class="status-msg">Kegiatan tidak ditemukan.</p>'; $("#kgContent").style.display = "block"; break; }
        document.title = k.Judul + " — PRAMASAJU";
        $("#kgTitle").textContent = k.Judul;
        if (k.Cover) { var h = $(".header"); h.style.backgroundImage = "linear-gradient(rgba(0,40,100,.55),rgba(0,40,100,.55)), url('" + esc(safeUrl(k.Cover)).replace(/'/g, "%27") + "')"; }
        $("#kgDesc").innerHTML = sanitize(k.Deskripsi) || "<p>Belum ada deskripsi.</p>";
        photoGrid($("#kgAlbum"), (d.foto || []).filter(function (p) { return p.Album === k.ID; }), "Foto");
        $("#kgContent").style.display = "block";
        break;
      }
      case "galeri-foto":
        photoGrid($("#photoGrid"), (d.foto || []).filter(function (p) { return p.Album === "galeri"; }), "Foto");
        break;
      case "galeri-video": {
        var g = $("#videoGrid");
        g.innerHTML = (d.video || []).map(function (v) {
          return '<div class="video-card">' + videoEmbed(v.URL, v.Judul) + "<h3>" + esc(v.Judul) + "</h3></div>";
        }).join("") || '<p class="status-msg">Belum ada video.</p>';
        break;
      }
      case "organisasi":
        // gambar diatur lewat data-cfg-src="strukturUrl"
        break;
      case "pendaftaran": {
        var closed = d.config && d.config.pendaftaranBuka === "Tidak";
        var f = $("#pendaftaranForm"), n = $("#formClosed");
        if (f) f.style.display = closed ? "none" : "";
        if (n) { n.style.display = closed ? "block" : "none"; }
        break;
      }
    }
  }

  /* ───────── Detail berita ───────── */
  var newsMeta = null;
  function renderNewsMeta(d) {
    var id = qs("id");
    newsMeta = (d.berita || []).filter(function (b) { return b.ID === id; })[0] || null;
    if (newsMeta && !$("#detailContent").innerHTML.trim()) showNews(newsMeta, true);
  }
  function showNews(b, partial) {
    document.title = b.Judul + " — PRAMASAJU";
    $("#detailTitle").textContent = b.Judul;
    var img = $("#detailImage");
    if (b.Gambar) { img.src = safeUrl(b.Gambar); img.style.display = ""; } else img.style.display = "none";
    $("#detailDate").textContent = fmtDate(b.Tanggal);
    if (!partial) $("#detailContent").innerHTML = sanitize(b.Isi);
    else if (!$("#detailContent").innerHTML.trim()) $("#detailContent").innerHTML = '<p class="status-msg">Memuat isi berita...</p>';
  }
  function loadNewsDetail() {
    var id = qs("id");
    if (!id) { $("#detailContent").innerHTML = '<p class="status-msg">Berita tidak ditemukan.</p>'; return; }
    var key = "pramasaju_news_" + id;
    var c = readCache(key);
    if (c) showNews(c, false);
    if (!API) { if (!c) $("#detailContent").innerHTML = '<p class="status-msg">Server belum dihubungkan.</p>'; return; }
    getJSON(API + "?action=berita&id=" + encodeURIComponent(id)).then(function (r) {
      if (r && r.success) { writeCache(key, r.data); showNews(r.data, false); }
      else if (!c) $("#detailContent").innerHTML = '<p class="status-msg">Berita tidak ditemukan atau belum diterbitkan.</p>';
    }).catch(function () {
      if (!c) $("#detailContent").innerHTML = '<p class="status-msg">Gagal memuat berita. Periksa koneksi internet lalu muat ulang halaman.</p>';
    });
  }

  /* ───────── Kirim form ───────── */
  CMS.submitForm = function (form, type, okTitle, okText) {
    function alertBox(o) { if (window.Swal) window.Swal.fire(o); else window.alert(o.text); }
    if (!API) { alertBox({ title: "Belum terhubung", text: "Alamat server belum diatur pada js/config.js.", icon: "error" }); return; }
    var btn = form.querySelector("button[type=submit]");
    var old = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Mengirim..."; }
    var fd = new FormData(form);
    fd.append("_form", type);
    // mode no-cors: sama seperti form lama Anda (terbukti jalan di Apps Script).
    // Jika jaringan putus, fetch akan gagal dan pengunjung diberi tahu.
    fetch(API, { method: "POST", mode: "no-cors", body: fd })
      .then(function () { alertBox({ title: okTitle, text: okText, icon: "success" }); form.reset(); })
      .catch(function () { alertBox({ title: "Gagal mengirim", text: "Periksa koneksi internet Anda lalu coba lagi.", icon: "error" }); })
      .then(function () { if (btn) { btn.disabled = false; btn.textContent = old; } });
  };
  CMS.sanitize = sanitize;
  CMS.esc = esc;

  /* ───────── Mulai ───────── */
  function start() {
    if (page === "news") loadNewsDetail();
    var cached = readCache(CACHE_KEY);
    var cachedSig = "";
    function failMsg(msg) {
      var l = $("#kgLoading");
      if (l && !CMS.data) l.textContent = msg;
    }
    if (cached) { cachedSig = JSON.stringify(cached); render(cached); }
    if (!API) { failMsg("Server belum dihubungkan (lihat js/config.js)."); return; }
    getJSON(API + "?action=public").then(function (r) {
      if (!r || !r.success) throw new Error((r && r.message) || "Respons tidak valid");
      var sig = JSON.stringify(r.data);
      writeCache(CACHE_KEY, r.data);
      if (sig !== cachedSig) render(r.data);
    }).catch(function (e) {
      if (window.console) console.warn("[CMS] Memakai isi bawaan:", e.message);
      failMsg("Gagal memuat. Periksa koneksi internet lalu muat ulang halaman.");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
