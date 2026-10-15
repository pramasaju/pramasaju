/* ================================
   NAVIGASI: menu mobile & dropdown "Lainnya"
================================ */
function toggleMenu() {
  var nav = document.getElementById("navMenu");
  if (nav) nav.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelector(".dropdown");
  var trigger = document.querySelector(".dropdown-trigger");
  if (!dropdown || !trigger) return;

  // Klik buka, klik lagi tutup
  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });
  // Tutup jika klik di luar dropdown
  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) dropdown.classList.remove("active");
  });
});

/* ================================
   POPUP "BACA SELENGKAPNYA" (Tentang / Visi / Misi)
   Isi diambil dari panel admin (js/cms.js). Jika server tidak
   dapat dihubungi, yang tampil adalah ringkasan pada kartu.
================================ */
function openAbout(key) {
  var modal = document.getElementById("aboutModal");
  var text = document.getElementById("modalText");
  var list = (window.CMS && window.CMS.data && window.CMS.data.tentang) || [];
  var item = list.filter(function (t) { return t.Kunci === key; })[0];
  var html = "";

  if (item) {
    html = '<h2 style="text-align:center">' + window.CMS.esc(item.Judul) + "</h2>" +
      '<div class="rich">' + window.CMS.sanitize(item.Isi || "<p>" + window.CMS.esc(item.Ringkasan) + "</p>") + "</div>";
  } else {
    var card = document.querySelector('.about-card[data-key="' + key + '"]');
    if (card) {
      html = '<h2 style="text-align:center">' + card.querySelector("h3").innerHTML + "</h2>" +
        "<p>" + card.querySelector("p").innerHTML + "</p>";
    }
  }
  text.innerHTML = html;
  modal.style.display = "block";
}

function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}

window.addEventListener("click", function (e) {
  var modal = document.getElementById("aboutModal");
  if (modal && e.target === modal) modal.style.display = "none";
});
