/* ================================
   DROPDOWN: MENU LAINNYA (TOGGLE)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const trigger = document.querySelector(".dropdown-trigger");

  if (dropdown && trigger) {
    // === Toggle: klik buka, klik lagi tutup ===
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("active");
    });

    // === Tutup jika klik di luar dropdown ===
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }
});

/* ==========================
   TAB TENTANG (SEJARAH - VISI - MISI)
========================== */
function openTab(tabId) {
  // ambil semua tab
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  // hilangkan semua content & tombol aktif
  tabs.forEach((tab) => tab.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  // tampilkan tab yang diklik
  document.getElementById(tabId).classList.add("active");

  // aktifkan tombol yang diklik
  event.target.classList.add("active");
}

function openAbout(id) {
  const modal = document.getElementById("aboutModal");
  const text = document.getElementById("modalText");

  let content = "";

  if (id === 1) {
    content = `
            <p>
            <h2> <h2 <p style="text-align: center;"> Ekstrakurikuler PMR </h2 </p>

<h3>1. Ekstrakurikuler</h3>
<p style="margin-left: 20px;">
Kegiatan ekstrakurikuler merupakan bagian integral dari sistem pendidikan di sekolah yang berfungsi untuk mengembangkan potensi peserta didik di luar kegiatan intrakurikuler. Melalui kegiatan ini, siswa dapat menyalurkan minat, bakat, serta mengembangkan kepribadian dan keterampilan sosial. Menurut Permendikbud Nomor 62 Tahun 2014 tentang Kegiatan Ekstrakurikuler pada Pendidikan Dasar dan Menengah, kegiatan ekstrakurikuler bertujuan untuk mengembangkan potensi, bakat, minat, kemampuan, kepribadian, kerja sama, dan kemandirian peserta didik secara optimal guna mendukung pencapaian tujuan pendidikan nasional.
Dengan demikian, kegiatan Palang Merah Remaja (PMR) termasuk dalam kegiatan ekstrakurikuler yang bersifat pilihan, dan menjadi wadah pembinaan karakter kepedulian, tanggung jawab sosial, serta kemampuan dalam bidang kemanusiaan.
</p>

<h3>2. Palang Merah Remaja</h3>
<p style="margin-left: 20px;">
Palang Merah Remaja (PMR) merupakan wadah pembinaan generasi muda di bawah naungan Palang Merah Indonesia (PMI) yang bertujuan menanamkan semangat kemanusiaan, kepedulian sosial, serta kesiapsiagaan dalam menghadapi situasi darurat.
Menurut Pedoman Dasar Palang Merah Indonesia (PMI, 2011), PMR adalah wadah pembinaan dan pengembangan anggota remaja PMI yang berperan sebagai relawan muda dalam upaya peningkatan kesehatan, kepedulian terhadap sesama, serta penguatan karakter kemanusiaan di lingkungan sekolah maupun masyarakat.
PMR memiliki tiga tingkatan, yaitu PMR Mula (SD/MI), PMR Madya (SMP/MTs), dan PMR Wira (SMA/SMK/MA). PMR Madya berfokus pada pembentukan karakter remaja yang tangguh, peduli, dan siap membantu masyarakat dalam bidang pertolongan pertama, kesehatan remaja, serta kegiatan sosial kemanusiaan.
PMR Madya adalah tingkatan PMR yang setara dengan pelajar Sekolah Menengah Pertama (usia 12-15 tahun). PMR memiliki peran penting sebagai kader relawan masa depan dan merupakan salah satu kekuatan PMI dalam melaksanakan kegiatan kemanusiaan.
</p>
<h3>3. Dasar Hukum</h3>
<p style="margin-left: 20px;">
Kegiatan Palang Merah Remaja memiliki dasar hukum yang kuat baik dari sisi pendidikan maupun organisasi kemanusiaan. Adapun dasar hukum tersebut antara lain:
</p>
<ol type=“a” <p style="margin-left: 45px;">
<li>Undang-Undang Republik Indonesia Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional, yang menyatakan bahwa pendidikan bertujuan mengembangkan potensi peserta didik agar menjadi manusia yang beriman, bertakwa, berakhlak mulia, berilmu, cakap, kreatif, mandiri, serta menjadi warga negara yang demokratis dan bertanggung jawab. Hal ini sejalan dengan tujuan kegiatan PMR dalam membentuk peserta didik yang berkarakter kemanusiaan, disiplin, dan peduli terhadap sesama.</li>
<li>Peraturan Pemerintah Republik Indonesia Nomor 19 Tahun 2005 tentang Standar Nasional Pendidikan sebagaimana telah beberapa kali diubah, terakhir dengan Peraturan Pemerintah Nomor 13 Tahun 2015, yang mengatur bahwa kegiatan ekstrakurikuler merupakan bagian dari kegiatan pendidikan untuk mengembangkan potensi peserta didik sesuai minat dan bakatnya di luar kegiatan intrakurikuler.</li>
<li>Peraturan Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor 62 Tahun 2014 tentang Kegiatan Ekstrakurikuler pada Pendidikan Dasar dan Menengah, yang menyebutkan bahwa kegiatan ekstrakurikuler bertujuan mengembangkan potensi, bakat, minat, kemampuan, kepribadian, kerja sama, dan kemandirian peserta didik. PMR termasuk dalam kegiatan ekstrakurikuler pilihan yang dilaksanakan di bawah pembinaan sekolah.</li>
<li>Undang-Undang Republik Indonesia Nomor 1 Tahun 2018 tentang Kepalangmerahan, yang menjadi dasar hukum keberadaan Palang Merah Indonesia (PMI) sebagai satu-satunya organisasi kepalangmerahan di Indonesia. Dalam undang-undang ini dijelaskan bahwa PMI berperan melakukan pembinaan generasi muda melalui wadah Palang Merah Remaja (PMR).</li>
<li>Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Palang Merah Indonesia Tahun 2019, yang mengatur bahwa Palang Merah Remaja (PMR) merupakan bagian dari pembinaan relawan muda PMI yang bertugas mengembangkan semangat kemanusiaan dan solidaritas sosial di kalangan remaja sekolah.</li>
</ol </p>

            </p>
        `;
  }

  if (id === 2) {
    content = `
            <h2 <p style="text-align: center;"> Visi </h2 </p>
<p style="text-align: center;"> Terwujudnya anggota PMR Madya yang beriman, berkarakter, berpengetahuan,
terampil, peduli, dan bertanggung jawab dalam menerapkan nilai-nilai
kepalangmerahan di lingkungan sekolah dan masyarakat.</p>
            
            </p>
        `;
  }

  if (id === 3) {
    content = `
            <h2 <h2 <p style="text-align: center;"> Misi </h2 </p>
            <p>
<ol type=“1”>
<li>Menumbuhkan sikap kepedulian dan kemanusiaan di kalangan remaja melalui kegiatan kepalangmerahan.</li>
<li>Mengembangkan pengetahuan dan keterampilan dalam bidang pertolongan pertama, kesehatan, dan kesiapsiagaan bencana.</li>
<li>Membentuk jiwa kepemimpinan, tanggung jawab, dan kerja sama antaranggota melalui kegiatan organisasi PMR.</li>
<li>Mendorong penerapan prinsip-prinsip Palang Merah dan Bulan Sabit Merah dalam kehidupan sehari-hari di sekolah.</li>
<li>Menjadikan anggota PMR Madya sebagai teladan dalam perilaku hidup bersih, sehat, dan berjiwa sosial.</li>
</ol>
            </p>
        `;
  }

  text.innerHTML = content;
  modal.style.display = "block";
}

function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}

window.onclick = function (e) {
  const modal = document.getElementById("aboutModal");
  if (e.target === modal) modal.style.display = "none";
};

// DATA BERITA
const newsData = {
  1: {
    title:
      "Menumbuhkan Jiwa Kepemimpinan dan Kemanusiaan melalui Youth Camp Red Cross PMR Kabupaten Karanganyar",
    image: "img/youthcamp.jpg",
    content: `
            Senin, 12 Agustus 2024

            Kegiatan ekstrakurikuler di sekolah memiliki peran penting dalam membentuk karakter dan kepribadian peserta didik. Salah satu organisasi yang berperan besar dalam menanamkan nilai-nilai kemanusiaan dan kepedulian sosial adalah Palang Merah Remaja (PMR). Melalui berbagai kegiatan pelatihan dan pengabdian, anggota PMR dilatih untuk menjadi remaja yang tanggap, berempati, serta siap membantu sesama.
            Sebagai wujud nyata dari semangat tersebut, PMR SMP Negeri 1 Jumapolo (PRAMASAJU) turut berpartisipasi dalam kegiatan Youth Camp Red Cross PMR Se-Kabupaten Karanganyar, yang diselenggarakan pada Rabu-Kamis, 7-8 Agustus 2024 di Bumi Perkemahan “Kampoeng Karet” Ngargoyoso, Karanganyar.
            Kegiatan Youth Camp ini merupakan ajang pembinaan dan lomba kepalangmerahan tingkat Mula, Madya, dan Wira yang diikuti oleh berbagai sekolah se-Kabupaten Karanganyar. Dalam kegiatan tersebut diselenggarakan berbagai agenda edukatif seperti Workshop, Materi Gerakan, Materi Ayo Siaga Bencana (ASB), dan Materi Pertolongan Pertama (PP). Seluruh kegiatan tersebut bertujuan untuk memperluas wawasan peserta mengenai tugas kemanusiaan serta meningkatkan keterampilan mereka dalam menghadapi situasi darurat.
            PRAMASAJU mengirimkan perwakilan terbaiknya untuk mengikuti berbagai cabang kegiatan. Selain menjadi ajang untuk menampilkan kemampuan di bidang kepalangmerahan, kegiatan ini juga menjadi sarana mempererat hubungan antaranggota PMR dari berbagai sekolah. Semangat sportivitas dan kebersamaan terlihat jelas selama kegiatan berlangsung di area perkemahan sejak tanggal 7 s.d. 8 Agustus 2024.
            Secara edukatif, kegiatan Youth Camp Red Cross memberikan dampak positif dalam pengembangan karakter remaja. Peserta tidak hanya memperoleh keterampilan teknis seperti pertolongan pertama dan kesiapsiagaan bencana, tetapi juga belajar tentang kerja sama tim, kedisiplinan, dan tanggung jawab sosial. Hal ini sejalan dengan tujuan utama PMR, yaitu membentuk generasi muda yang berjiwa kemanusiaan, tangguh, dan siap menjadi relawan masa depan.
            Melalui partisipasi dalam kegiatan ini, diharapkan anggota PMR SMP Negeri 1 Jumapolo semakin termotivasi untuk terus belajar, berlatih, dan mengamalkan nilai-nilai kemanusiaan dalam kehidupan sehari-hari, sehingga mampu menjadi inspirasi bagi lingkungan sekitar.

        `,
  },
  2: {
    title:
      "Semangat Kemanusiaan di Kalangan Remaja: Kiprah PMR SMPN 1 Jumapolo dalam Frosity#6 2024",
    image: "img/frosity6.jpg",
    content: `
            Senin, 9 September 2024
            Palang Merah Remaja (PMR) merupakan wadah pembinaan generasi muda dalam menumbuhkan rasa kemanusiaan, kepedulian sosial, dan keterampilan hidup. Melalui kegiatan yang bersifat edukatif dan kompetitif, para anggota PMR dilatih untuk memiliki jiwa tangguh, empati tinggi, serta mampu berkontribusi bagi masyarakat. Salah satu bentuk nyata dari upaya tersebut tampak pada kegiatan FROSITY 2024 (From Smansakra To Society) yang diselenggarakan oleh PMR Wira SMA Negeri 1 Karanganyar pada Sabtu, 7 September 2024.
            Dalam kegiatan ini, PMR SMP Negeri 1 Jumapolo (PRAMASAJU) turut berpartisipasi sebagai wujud semangat dan dedikasi dalam bidang kepalangmerahan. Ajang ini mempertemukan para anggota PMR tingkat Madya dan Wira dari berbagai sekolah di wilayah eks-Karesidenan Surakarta untuk berkompetisi dalam beberapa cabang lomba, seperti Cerdas Cermat, Pertolongan Pertama, Pendidikan Remaja Sebaya, Lukis Pot, dan Fotografi.
            Kegiatan seperti FROSITY memiliki nilai edukatif yang tinggi. Melalui lomba-lomba tersebut, peserta tidak hanya mengasah kemampuan berpikir kritis dan keterampilan teknis, tetapi juga menumbuhkan kerja sama tim, komunikasi efektif, dan jiwa sosial. Nilai-nilai ini sejalan dengan prinsip dasar gerakan Palang Merah yang menekankan pentingnya kemanusiaan, kesukarelaan, dan persaudaraan universal.  Acara berlangsung dengan penuh semangat di lingkungan SMA Negeri 1 Karanganyar sejak pukul 07.00 WIB hingga selesai. Para peserta terlihat antusias mengikuti seluruh rangkaian kegiatan dengan menjunjung tinggi sportivitas.
            Partisipasi PRAMASAJU dalam kegiatan ini mencerminkan peran penting organisasi PMR di tingkat sekolah dalam membentuk karakter generasi muda yang peduli, tangguh, dan berjiwa sosial. Diharapkan melalui pengalaman tersebut, anggota PMR SMP Negeri 1 Jumapolo semakin termotivasi untuk terus belajar dan berkontribusi nyata dalam bidang kemanusiaan, sesuai dengan semangat “From Smansakra To Society” yang diusung kegiatan FROSITY 2024.

        `,
  },
  3: {
    title:
      "SEMANGAT RELAWAN MUDA: PRAMASAJU RAIH JUARA II DI AJANG GOJILA 2025",
    image: "img/gojila.jpg",
    content: `
            Senin, 17 Februari 2025
            Palang Merah Remaja (PMR) merupakan wadah pembinaan generasi muda dalam menumbuhkan semangat kemanusiaan, kepedulian sosial, dan tanggung jawab terhadap sesama. Melalui berbagai kegiatan pelatihan dan lomba, anggota PMR dilatih untuk menjadi pribadi yang tangguh, terampil, dan siap menjadi relawan muda yang berjiwa sosial tinggi.
            Salah satu bukti nyata dari semangat tersebut ditunjukkan oleh PMR SMP Negeri 1 Jumapolo (PRAMASAJU) dalam ajang GOJILA (Gelora Jiwa Relawan Muda) 2025, yang diselenggarakan oleh PMR Wira SMK Bintang Nusantara Karanganyar pada Jumat, 14 Februari 2025.
            Kegiatan GOJILA merupakan kompetisi kepalangmerahan tingkat Madya yang diikuti oleh berbagai sekolah dari se-Kabupaten Karanganyar. Berbagai cabang lomba yang dipertandingkan antara lain Lomba Cerdas Cermat, Pertolongan Pertama, Youth Station, dan Drama Kepalangmerahan. Melalui lomba-lomba tersebut, peserta dituntut untuk tidak hanya menunjukkan keterampilan teknis, tetapi juga kerja sama, kedisiplinan, dan semangat kemanusiaan.
            Dalam kegiatan tersebut, PRAMASAJU mengirimkan perwakilan terbaiknya untuk berpartisipasi di setiap cabang lomba. Acara berlangsung meriah di lingkungan SMK Bintang Nusantara Karanganyar sejak pukul 06.00 WIB hingga selesai. Para peserta menunjukkan antusiasme tinggi dan menjunjung sportivitas sepanjang kegiatan berlangsung.
            Kerja keras dan dedikasi anggota PMR SMP Negeri 1 Jumapolo membuahkan hasil membanggakan — PRAMASAJU berhasil meraih Juara II dalam Lomba Pertolongan Pertama (PP). Prestasi ini menjadi bukti semangat, ketekunan, dan kemampuan para anggota dalam menerapkan pengetahuan kepalangmerahan secara nyata.
            Kepala sekolah serta pembina PMR memberikan apresiasi dan harapan agar keberhasilan ini menjadi motivasi bagi seluruh siswa untuk terus mengembangkan potensi diri, baik di bidang akademik maupun nonakademik.
            Dengan mengikuti kegiatan GOJILA 2025, anggota PMR SMP Negeri 1 Jumapolo diharapkan semakin termotivasi untuk terus belajar, berlatih, dan mengamalkan nilai-nilai kemanusiaan yang menjadi dasar gerakan Palang Merah Remaja. Keberhasilan ini menjadi langkah nyata PRAMASAJU dalam menumbuhkan “Gelora Jiwa Relawan Muda” di kalangan generasi penerus bangsa.

        `,
  },
  4: {
    title: "MENUMBUHKAN JIWA KEMANUSIAAN MELALUI AJANG FROSITY#7 2025",
    image: "img/frosity7.jpg",
    content: `
            Senin, 15 September 2025
            Kegiatan ekstrakurikuler di sekolah memiliki peran penting dalam membentuk karakter dan kepribadian peserta didik. Salah satu organisasi yang berfokus pada pengembangan nilai kemanusiaan adalah Palang Merah Remaja (PMR). Melalui berbagai pelatihan dan kegiatan, PMR tidak hanya melatih keterampilan kepalangmerahan, tetapi juga menumbuhkan empati, kerja sama, dan tanggung jawab sosial.
            Salah satu wujud nyata dari pengembangan karakter tersebut terlihat dalam keikutsertaan PMR SMP Negeri 1 Jumapolo (PRAMASAJU) pada kegiatan FROSITY #7 2025 (From Smansakra To Society) yang diselenggarakan oleh PMR Wira SMA Negeri 1 Karanganyar pada Sabtu, 13 September 2025.
            Ajang FROSITY merupakan kompetisi kepalangmerahan tingkat Madya dan Wira yang diikuti oleh berbagai sekolah dari wilayah eks-Karesidenan Surakarta. Dalam kegiatan ini terdapat berbagai cabang lomba seperti Cerdas Cermat, Pertolongan Pertama, Pendidikan Remaja Sebaya, Lukis Totebag, dan Poster. Seluruh cabang lomba dirancang untuk mengasah kemampuan intelektual, keterampilan praktik, serta kreativitas peserta dalam bidang kemanusiaan.
            Partisipasi PRAMASAJU dalam kegiatan ini menunjukkan semangat dan dedikasi tinggi para anggotanya. Selain sebagai ajang untuk menampilkan kemampuan dan hasil latihan, kegiatan seperti FROSITY juga menjadi wadah mempererat silaturahmi antaranggota PMR dari berbagai sekolah. Semangat kebersamaan dan sportivitas tampak jelas sepanjang kegiatan yang berlangsung di lingkungan SMA Negeri 1 Karanganyar.
            Dari sisi edukatif, kegiatan seperti ini berkontribusi besar terhadap pembentukan karakter generasi muda. Melalui lomba-lomba yang menuntut kerja sama tim, ketelitian, dan kepedulian sosial, siswa belajar untuk berperan aktif dalam menolong sesama. Hal ini sejalan dengan tujuan PMR, yaitu membentuk remaja yang berjiwa kemanusiaan, tangguh, dan siap berkontribusi bagi masyarakat.
            Dengan keikutsertaan dalam FROSITY #7 2025, diharapkan anggota PMR SMP Negeri 1 Jumapolo semakin termotivasi untuk terus mengembangkan diri, menanamkan nilai-nilai kemanusiaan, dan menerapkan semangat tolong-menolong di kehidupan sehari-hari.


        `,
  },
};

// LOAD DETAIL BERITA DI news.html
if (window.location.pathname.includes("news.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const news = newsData[id];

  if (news) {
    document.getElementById("detailTitle").textContent = news.title;
    document.getElementById("detailImage").src = news.image;
    document.getElementById("detailContent").innerHTML = news.content.replace(
      /\n/g,
      "<br>"
    );
  }
}

// Fungsi menampilkan detail berita
function loadDetailNews() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id || !newsData[id]) return;

  const news = newsData[id];

  document.getElementById("detailTitle").textContent = news.title;
  document.getElementById("detailImage").src = news.image;

  // Memecah paragraf berdasarkan baris kosong
  const paragraphs = news.content
    .trim()
    .split(/\n+/)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("");

  document.getElementById("detailContent").innerHTML = paragraphs;
}

document.addEventListener("DOMContentLoaded", loadDetailNews);
