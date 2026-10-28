// Language switch (English default, Bahasa Indonesia optional).
// English lives in the HTML. Elements marked with data-i18n (text), data-i18n-html (markup)
// or data-i18n-attr="attr:key,attr:key" get the Indonesian strings below when ID is chosen.
// The choice is remembered per browser; ?lang=id or ?lang=en in the URL overrides it.
(function () {
  const ID = {
    // Shared
    'meta.title': 'Difira Studio — Software yang bicara dari hati',
    'meta.description': 'Difira Studio adalah software house di Semarang yang membuat perangkat lunak, website, dan video produk untuk usaha.',
    'nav.skip': 'Lewati ke konten',
    'nav.label': 'Navigasi utama',
    'nav.language': 'Bahasa',
    'nav.work': 'Karya',
    'nav.studio': 'Studio Video',
    'nav.careers': 'Karir',
    'nav.services': 'Layanan',
    'nav.process': 'Proses',
    'nav.cta': 'Mulai proyek',
    'footer.tagline': 'Software yang bicara dari hati.',
    'footer.explore': 'Jelajahi',
    'footer.contact': 'Kontak',

    // Home
    'hero.kicker': 'Software house · Semarang, Indonesia',
    'hero.title': '<span class="line"><span>Software yang bicara</span></span><span class="line"><span>dari <em>hati.</em></span></span>',
    'hero.lead': 'Kami membuat perangkat lunak, website, dan video produk. Sebagian besar klien datang kepada kami dengan persoalan operasional yang sudah lama mengganggu, misalnya pencatatan kasir yang tidak rapi atau jadwal pemesanan yang sering terlewat.',
    'hero.cta1': 'Lihat karya kami',
    'hero.cta2': 'Konsultasi dengan kami',
    'hero.scroll': 'Gulir',
    'hero.pause': 'Jeda animasi latar',
    'approach.kicker': 'Pendekatan kami',
    'approach.statement': 'Sebagian besar pekerjaan kami dilakukan sebelum kode ditulis. Kami menemui orang yang nantinya akan menggunakan sistem tersebut, mengamati cara mereka bekerja, dan terus bertanya hingga akar masalahnya jelas.',
    'approach.s1.title': 'Mendengarkan pengguna',
    'approach.s1.body': 'Kami berbicara lebih dahulu dengan kasir, staf administrasi, dan pemilik usaha, kemudian baru membahas fitur.',
    'approach.s2.title': 'Menemukan penyebab',
    'approach.s2.body': 'Kasir yang lambat, misalnya, bisa saja disebabkan oleh pencatatan stok. Karena itu, kami memeriksa penyebabnya sebelum mulai membangun.',
    'approach.s3.title': 'Membangun yang diperlukan',
    'approach.s3.body': 'Kami memulai dari bagian yang paling dibutuhkan, menjalankannya, lalu menambahkan fitur setelah sistem benar-benar digunakan.',
    'show.kicker': 'Karya kami',
    'show.title': 'Produk yang kami buat <em class="glow">dan kelola sendiri.</em>',
    'show.lead': 'Karena kami sendiri yang mengelolanya, pembaruan, laporan bug, dan pertanyaan dari pengguna juga kami tangani secara langsung.',
    'show.visit': 'Kunjungi situs',
    'show.tehpos.tag': 'Software · Kasir',
    'show.tehpos.body': 'Aplikasi kasir untuk toko dan kafe kecil yang mencakup pencatatan transaksi hingga laporan harian.',
    'show.tehpos.video': 'Video produk TehPOS',
    'show.perhalus.tag': 'SaaS · Alat menulis',
    'show.perhalus.body': 'Layanan untuk menilai sejauh mana sebuah tulisan berbahasa Indonesia terasa seperti buatan AI, lalu menulis ulang tulisan tersebut agar terbaca wajar. Setiap perubahan ditampilkan berdampingan dengan teks aslinya.',
    'show.perhalus.video': 'Video produk Perhalus',
    'show.video.tag': 'Studio video · Short-form',
    'show.video.title': 'Tips keamanan ponsel',
    'show.video.body': 'Video vertikal berdurasi 30 detik mengenai tiga pengaturan ponsel yang sebaiknya diaktifkan sebelum ponsel hilang atau dicuri. Naskah, animasi, dan pengisi suaranya kami kerjakan sendiri.',
    'show.video.cta': 'Lihat studio video',
    'show.video.video': 'Video tips keamanan ponsel',
    'show.more': 'Dalam pengembangan',
    'svc.s.i1': 'Sistem bisnis custom',
    'svc.s.i2': 'SaaS & tools internal',
    'svc.s.i3': 'Otomasi & integrasi',
    'svc.s.cta': 'Ceritakan kebutuhan sistem Anda',
    'svc.w.o1s': '1 halaman',
    'svc.w.o3': 'Company profile',
    'svc.w.o3s': 'multi-halaman',
    'svc.w.o2s': 'login & data',
    'process.kicker': 'Proses',
    'process.title': 'Tahapan <em class="glow">proyek.</em>',
    'process.lead': 'Setiap proyek berjalan dalam lima tahap, dan hasil dari setiap tahap dapat Anda tinjau.',
    'process.1': 'Konsultasi awal',
    'process.1b': 'Sampaikan persoalan yang sedang Anda hadapi. Apabila persoalan tersebut ternyata tidak memerlukan perangkat lunak, kami akan menyampaikannya secara terus terang.',
    'process.2': 'Lingkup dan biaya',
    'process.2b': 'Kami menuliskan bagian yang akan dibangun lebih dahulu, perkiraan lama pengerjaan, dan biayanya.',
    'process.3': 'Desain',
    'process.3b': 'Anda dapat meninjau dan menyetujui rancangan tampilan sebelum kami mulai menulis kode.',
    'process.4': 'Pengerjaan',
    'process.4b': 'Pekerjaan kami bagi ke dalam beberapa putaran singkat, dan hasilnya kami tunjukkan langsung pada perangkat yang sebenarnya.',
    'process.5': 'Peluncuran dan pendampingan',
    'process.5b': 'Setelah peluncuran, kami menyerahkan seluruh akses kepada Anda dan tetap membantu apabila diperlukan perbaikan.',
    'faq.title': 'Pertanyaan yang sering <em>diajukan.</em>',
    'faq.lead': 'Apabila jawaban yang Anda cari belum tersedia, silakan bertanya melalui WhatsApp.',
    'faq.cta': 'Bertanya melalui WhatsApp',
    'faq.q1': 'Berapa biaya sebuah proyek?',
    'faq.a1': 'Biaya bergantung pada lingkup pekerjaan. Setelah konsultasi, kami mengirimkan penawaran tertulis sehingga biayanya sudah jelas sebelum pekerjaan dimulai.',
    'faq.q2': 'Berapa lama pengerjaannya?',
    'faq.a2': 'Landing page umumnya selesai dalam satu sampai dua minggu. Sistem yang lebih besar memerlukan waktu lebih lama sehingga kami membaginya ke dalam beberapa tahap. Jadwal lengkapnya tercantum dalam penawaran.',
    'faq.q3': 'Apakah Difira Studio melayani klien di luar Semarang?',
    'faq.a3': 'Ya. Kantor kami berada di Semarang, tetapi sebagian besar pekerjaan kami lakukan secara daring.',
    'faq.q4': 'Apakah tersedia dukungan setelah peluncuran?',
    'faq.a4': 'Ya. Kami memperbaiki bug, menjaga sistem tetap mutakhir, dan menambahkan fitur ketika Anda membutuhkannya.',
    'faq.q5': 'Apakah Difira Studio hanya membuat perangkat lunak?',
    'faq.a5': 'Tidak. Kami juga membuat website, serta video produk melalui studio video kami.',
    'work.kicker': 'Layanan',
    'work.title': 'Layanan yang <em>kami sediakan.</em>',
    'work.lead': 'Kami membuat perangkat lunak untuk kebutuhan operasional, website agar usaha Anda mudah ditemukan, serta video yang menjelaskan produk Anda.',
    'work.live': 'Live',
    'work.s.title': 'Software',
    'work.s.body': 'Aplikasi kasir, sistem internal, dan SaaS untuk usaha kecil.',
    'work.s.jadwalkan': 'Booking online untuk usaha jasa',
    'work.s.cuan': 'Mesin konten dan alur publikasi',
    'work.v.title': 'Video dan motion',
    'work.v.body': 'Video peluncuran, explainer produk, dan klip pendek untuk media sosial yang dibuat dari tampilan aplikasi Anda yang sebenarnya.',
    'work.v.i1': 'Video peluncuran & explainer',
    'work.v.i2': 'Product motion dari layar aplikasi Anda',
    'work.v.i3': 'Paket short-form',
    'work.v.cta': 'Kunjungi studio',
    'work.w.title': 'Website dan web app',
    'work.w.body': 'Kami merancang, membangun, dan meluncurkan website Anda, kemudian mengaturnya agar tim Anda dapat memperbarui isinya sendiri.',
    'work.w.o1': 'Landing page',
    'work.w.o2': 'Web app',
    'work.w.cta': 'Rencanakan website',
    'marquee.1': 'Software',
    'marquee.2': 'Website',
    'marquee.3': 'Video & motion',
    'marquee.4': 'Desain produk',
    'marquee.5': 'Otomasi',
    'about.kicker': 'Tentang',
    'about.title': 'Software house kecil <em>di Semarang.</em>',
    'about.p1': 'Difira Studio adalah software house dari PT Difira Karya Nusantara.',
    'about.p2': 'Kami membantu usaha kecil dan menengah merapikan pekerjaan sehari-hari yang masih dilakukan secara manual, mulai dari kasir dan pemesanan hingga laporan mingguan.',
    'about.f1': 'Perusahaan',
    'about.f2': 'Kantor',
    'about.f3': 'Bidang',
    'about.f3v': 'Software, website, video & motion',
    'about.careers': 'Kami sedang membuka lowongan. Lihat posisi yang tersedia',
    'contact.kicker': 'Memiliki rencana proyek?',
    'contact.title': 'Ceritakan <em>kebutuhan Anda.</em>',
    'contact.body': 'Kirimkan pesan singkat mengenai usaha Anda dan persoalan yang sedang dihadapi. Kami akan membalas dengan usulan langkah pertama yang akan kami ambil.',

    // Video studio page
    'studio.meta.title': 'Difira Studio — Video produk dan motion graphics untuk software',
    'studio.meta.description': 'Studio video yang dijalankan oleh pembuat produk perangkat lunak, untuk video explainer dan motion graphics yang jelas.',
    'studio.nav.home': 'Beranda Difira',
    'studio.nav.work': 'Karya',
    'studio.nav.packages': 'Paket',
    'studio.pkg.popular': 'Paling lengkap',
    'studio.nav.process': 'Proses',
    'studio.nav.about': 'Tentang',
    'studio.cta.contra': 'Pesan di Contra',
    'studio.hero.kicker': 'Video produk · Motion graphics',
    'studio.hero.title': 'Studio video yang dijalankan oleh <em>pembuat produk.</em>',
    'studio.hero.lead': 'Video explainer dan motion graphics untuk produk perangkat lunak.',
    'studio.hero.cta1': 'Lihat paket',
    'studio.reel.soon': 'Showreel akan segera tersedia',
    'studio.work.kicker': 'Karya pilihan',
    'studio.work.title': 'Video <em>terbaru.</em>',
    'studio.work.lead': 'Video produk dan motion yang dibuat dari tampilan layar produk yang sebenarnya.',
    'studio.pkg.kicker': 'Paket',
    'studio.pkg.title': 'Pilih paket yang <em>sesuai.</em>',
    'studio.pkg.lead': 'Setiap paket memiliki lingkup dan harga yang tetap, serta sudah mencakup naskah, motion, dan voiceover.',
    'studio.pkg.length': 'Durasi',
    'studio.pkg.delivery': 'Pengerjaan',
    'studio.pkg.book': 'Pesan di Contra',
    'studio.pkg.trial': 'Satu video produk berdurasi 15 detik.',
    'studio.pkg.trial.len': '15 detik',
    'studio.pkg.trial.del': '3 hari',
    'studio.pkg.trial.aria': 'Pesan di Contra: paket Trial',
    'studio.pkg.motion': '15 sampai 30 detik, dibuat dari tampilan layar aplikasi Anda.',
    'studio.pkg.motion.len': '15–30 detik',
    'studio.pkg.motion.del': '4 hari',
    'studio.pkg.motion.aria': 'Pesan di Contra: paket Product Motion',
    'studio.pkg.launch': '30 sampai 45 detik, untuk peluncuran produk atau video explainer.',
    'studio.pkg.launch.len': '30–45 detik',
    'studio.pkg.launch.del': '1 minggu',
    'studio.pkg.launch.aria': 'Pesan di Contra: paket Launch & Explainer',
    'studio.pkg.month': '/bulan',
    'studio.pkg.short': 'Empat video setiap bulan.',
    'studio.pkg.videos': 'Video',
    'studio.pkg.short.count': '4 per bulan',
    'studio.pkg.billing': 'Tagihan',
    'studio.pkg.monthly': 'Bulanan',
    'studio.pkg.short.aria': 'Pesan di Contra: Short-Form Pack',
    'studio.pkg.note': 'Harga perkenalan bagi klien pertama.',
    'studio.steps.kicker': 'Cara kerja',
    'studio.steps.title': 'Tiga langkah yang dikerjakan <em>oleh satu orang.</em>',
    'studio.steps.lead': 'Anda berkomunikasi langsung dengan orang yang membuat video, sejak brief diterima hingga file akhir diserahkan.',
    'studio.steps.1': 'Kirimkan brief dan tampilan layar',
    'studio.steps.1b': 'Jelaskan fungsi produk Anda dan siapa penggunanya, lalu kirimkan rekaman layar atau file desain.',
    'studio.steps.2': 'Saya menulis naskah, menganimasikan, dan mengisi suaranya',
    'studio.steps.2b': 'Naskah, motion, dan voiceover saya kerjakan sendiri dari awal hingga akhir.',
    'studio.steps.3': 'Anda menerima file MP4 final dengan dua kali kesempatan revisi',
    'studio.steps.3b': 'File siap diunggah ke situs, halaman peluncuran, atau media sosial.',
    'studio.about.kicker': 'Tentang',
    'studio.about.title': 'Dibuat oleh pendiri perusahaan perangkat lunak yang merilis produknya sendiri (TehPOS), sehingga setiap video menjelaskan apa yang <em>benar-benar</em> dilakukan oleh produk Anda.',
    'studio.about.f1': 'Berbasis di Semarang, Indonesia',
    'studio.about.f2': 'Bekerja secara jarak jauh dengan tim pengembang perangkat lunak',
    'studio.about.tehpos': 'Lihat TehPOS',
    'studio.about.home': 'Beranda Difira Studio',
    'studio.contact.kicker': 'Mulai proyek',
    'studio.contact.title': 'Memiliki produk yang perlu <em>dijelaskan?</em>',
    'studio.contact.body': 'Kirimkan brief singkat beserta beberapa tangkapan layar. Kami akan membalas dengan rekomendasi paket yang sesuai.',
    'studio.contact.email': 'Kirimkan email',
    'studio.footer.tagline': 'Video produk dan motion graphics untuk software.',

    // Careers page
    'careers.meta.title': 'Karir — Difira Studio',
    'careers.meta.description': 'Bergabunglah dengan Difira Studio untuk membangun perangkat lunak yang menyelesaikan masalah nyata. Posisi terbuka di Semarang.',
    'careers.cta': 'Kirimkan CV',
    'careers.see': 'Lihat posisi yang tersedia',
    'careers.kicker': 'Karir di Difira Studio',
    'careers.title': 'Membangun perangkat lunak yang <em>benar-benar digunakan.</em>',
    'careers.lead': 'Kami adalah tim kecil di Semarang yang mengerjakan produk sendiri dan proyek klien. Sejak awal, Anda akan terlibat langsung dalam merilis pekerjaan yang nyata.',
    'careers.values.label': 'Cara bekerja di Difira Studio',
    'careers.v1': 'Menuntaskan pekerjaan.',
    'careers.v1b': 'Kami bertanggung jawab atas pekerjaan hingga selesai dan terbuka terhadap masukan.',
    'careers.v2': 'Merilis, kemudian menyempurnakan.',
    'careers.v2b': 'Kami lebih memilih merilis bagian yang kecil lalu memperbaikinya daripada menunggu hasil yang sempurna.',
    'careers.v3': 'Mendengarkan pengguna.',
    'careers.v3b': 'Keputusan yang baik lahir dari pengamatan langsung terhadap cara orang menggunakan produk.',
    'careers.open.title': 'Posisi yang <em>sedang dibuka.</em>',
    'careers.open.meta': '3 POSISI · WFO SEMARANG',
    'careers.fulltime': 'Full-time',
    'careers.onsite': 'WFO Semarang',
    'careers.note.kicker': 'Belum menemukan posisi yang sesuai?',
    'careers.note.title': 'Silakan tetap memperkenalkan diri.',
    'careers.note.body': 'Apabila Anda memiliki rasa ingin tahu yang tinggi dan bekerja dengan teliti, silakan kirimkan pesan kepada kami.',
  };

  const STORAGE_KEY = 'difira-lang';
  const originals = new Map();

  function storedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function initialLang() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl === 'id' || fromUrl === 'en') return fromUrl;
    return storedLang() === 'id' ? 'id' : 'en';
  }

  function original(el) {
    if (!originals.has(el)) originals.set(el, { text: el.textContent, html: el.innerHTML, attrs: {} });
    return originals.get(el);
  }

  function apply(lang) {
    const useId = lang === 'id';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-attr]').forEach(el => {
      const o = original(el);
      const textKey = el.getAttribute('data-i18n');
      if (textKey) {
        const next = useId && ID[textKey] ? ID[textKey] : o.text;
        if (el.textContent !== next) el.textContent = next;
      }
      const htmlKey = el.getAttribute('data-i18n-html');
      if (htmlKey) {
        const next = useId && ID[htmlKey] ? ID[htmlKey] : o.html;
        if (el.innerHTML !== next) el.innerHTML = next;
      }
      const attrSpec = el.getAttribute('data-i18n-attr');
      if (attrSpec) {
        attrSpec.split(',').forEach(pair => {
          const [attr, key] = pair.split(':').map(s => s.trim());
          if (!(attr in o.attrs)) o.attrs[attr] = el.getAttribute(attr);
          el.setAttribute(attr, useId && ID[key] ? ID[key] : o.attrs[attr]);
        });
      }
    });
    document.querySelectorAll('.lang-switch [data-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
    document.dispatchEvent(new CustomEvent('difira:lang', { detail: lang }));
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
    apply(lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-switch [data-lang]').forEach(button => {
      button.addEventListener('click', () => setLang(button.dataset.lang));
    });
    const lang = initialLang();
    if (lang !== 'en') apply(lang);
  });

  window.difiraLang = { apply: setLang, current: () => document.documentElement.lang };
})();
