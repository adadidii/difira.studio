// Language switch (English default, Bahasa Indonesia optional).
// English lives in the HTML. Elements marked with data-i18n (text), data-i18n-html (markup)
// or data-i18n-attr="attr:key,attr:key" get the Indonesian strings below when ID is chosen.
// The choice is remembered per browser; ?lang=id or ?lang=en in the URL overrides it.
(function () {
  const ID = {
    // Shared
    'meta.title': 'Difira Studio — Software yang bicara dari hati',
    'meta.description': 'Difira Studio adalah software house di Semarang. Kami mendengarkan dulu, mencari akar masalah, lalu membangun software, website, dan video produk yang pas.',
    'nav.skip': 'Lewati ke konten',
    'nav.label': 'Navigasi utama',
    'nav.language': 'Bahasa',
    'nav.work': 'Karya',
    'nav.approach': 'Pendekatan',
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
    'hero.beat1': 'Mendengar dengan hati',
    'hero.beat2': 'Temukan akar masalah',
    'hero.beat3': 'Bangun yang pas',
    'hero.lead': 'Kami mendengarkan dulu, mencari akar masalahnya, lalu membangun software, website, dan video produk yang pas untuk bisnismu.',
    'hero.cta1': 'Lihat karya kami',
    'hero.cta2': 'Konsultasi gratis',
    'hero.scroll': 'Gulir',
    'hero.pause': 'Jeda animasi latar',
    'approach.kicker': 'Pendekatan kami',
    'approach.statement': 'Software yang baik dimulai jauh sebelum baris kode pertama. Kami mendengarkan dengan saksama, menggali sampai ketemu akar masalahnya, lalu membangun hanya yang benar-benar pas.',
    'approach.s1.title': 'Mendengar dengan hati',
    'approach.s1.body': 'Kami mulai dari orang yang akan memakainya, bukan dari daftar fitur.',
    'approach.s2.title': 'Temukan akar masalah',
    'approach.s2.body': 'Kami melihat melewati gejala, sampai ke masalah yang sebenarnya.',
    'approach.s3.title': 'Bangun yang pas',
    'approach.s3.body': 'Solusi yang sederhana dan andal, seukuran bisnismu.',
    'show.kicker': 'Karya pilihan',
    'show.title': 'Produk yang kami bangun <em class="glow">dan masih kami jalankan.</em>',
    'show.lead': 'Produk kami sendiri sudah live dan dipakai setiap hari, jadi kami tahu apa yang dibutuhkan agar software tetap berjalan setelah diluncurkan.',
    'show.visit': 'Kunjungi situs',
    'show.tehpos.tag': 'Software · Kasir',
    'show.tehpos.body': 'Aplikasi kasir untuk toko dan kafe kecil, dari transaksi sampai laporan harian.',
    'show.tehpos.video': 'Video produk TehPOS',
    'show.perhalus.tag': 'SaaS · Alat menulis',
    'show.perhalus.body': 'Teks antarmuka yang terbaca seperti ditulis manusia. Tempel teksmu, lihat hasil tulis ulangnya langsung, lalu bandingkan sebelum dan sesudahnya.',
    'show.perhalus.video': 'Video produk Perhalus',
    'show.video.tag': 'Studio video · Short-form',
    'show.video.title': 'Tips keamanan HP',
    'show.video.body': 'Explainer vertikal: tiga pengaturan HP yang perlu dinyalakan sebelum HP dicuri. Naskah, animasi, dan suaranya dikerjakan studio video kami.',
    'show.video.cta': 'Lihat studio video',
    'show.video.video': 'Video tips keamanan HP',
    'show.more': 'Dalam pengembangan',
    'svc.s.i1': 'Sistem bisnis custom',
    'svc.s.i2': 'SaaS & tools internal',
    'svc.s.i3': 'Otomasi & integrasi',
    'svc.s.cta': 'Diskusikan sistemmu',
    'svc.w.o1s': '1 halaman',
    'svc.w.o3': 'Company profile',
    'svc.w.o3s': 'multi-halaman',
    'svc.w.o2s': 'login & data',
    'process.kicker': 'Cara kami bekerja',
    'process.title': 'Dari obrolan pertama <em class="glow">sampai hari peluncuran.</em>',
    'process.lead': 'Alur yang jelas tanpa kejutan. Kamu melihat hasil kerja di setiap tahap dan selalu tahu langkah berikutnya.',
    'process.1': 'Konsultasi gratis',
    'process.1b': 'Ceritakan apa yang tidak berjalan. Kami mendengarkan, bertanya, dan jujur bilang apakah software memang solusinya.',
    'process.2': 'Lingkup & penawaran',
    'process.2b': 'Kami memetakan akar masalah, menyepakati apa yang dibangun duluan, lalu mengirim lingkup, jadwal, dan harga yang jelas.',
    'process.3': 'Desain',
    'process.3b': 'Kamu melihat tampilan layarnya sebelum kami menulis kode, selagi perubahan masih cepat dan murah.',
    'process.4': 'Bangun & uji',
    'process.4b': 'Kami membangun dalam siklus pendek, menunjukkan progres di sepanjang jalan, dan menguji di perangkat asli.',
    'process.5': 'Luncurkan & rawat',
    'process.5b': 'Kami meluncurkan, menyerahkan semuanya, dan tetap ada untuk perbaikan serta pengembangan berikutnya.',
    'faq.title': 'Pertanyaan yang <em>sering muncul.</em>',
    'faq.lead': 'Ada hal lain yang ingin ditanyakan? Kirim pesan dan kami jawab langsung.',
    'faq.cta': 'Tanya via WhatsApp',
    'faq.q1': 'Berapa biaya sebuah proyek?',
    'faq.a1': 'Tergantung kebutuhanmu. Setelah konsultasi pertama yang gratis, kami mengirim lingkup kerja tertulis dan penawaran harga, jadi kamu tahu harganya sebelum pekerjaan dimulai.',
    'faq.q2': 'Berapa lama pengerjaannya?',
    'faq.a2': 'Landing page biasanya satu sampai dua minggu. Web app dan sistem custom butuh waktu lebih lama, jadi kami rencanakan bertahap dan memberi jadwal bersama penawarannya.',
    'faq.q3': 'Apakah bisa untuk klien di luar Semarang?',
    'faq.a3': 'Bisa. Kantor kami di Semarang, dan kami bekerja jarak jauh dengan klien di seluruh Indonesia maupun luar negeri.',
    'faq.q4': 'Apakah ada bantuan setelah peluncuran?',
    'faq.a4': 'Ada. Kami memperbaiki masalah, menjaga semuanya tetap terbarui, dan membangun pengembangan berikutnya saat kamu siap.',
    'faq.q5': 'Apakah hanya membuat software?',
    'faq.a5': 'Tidak. Kami juga mendesain dan membangun website, serta membuat video produk dan motion graphics lewat studio video kami.',
    'work.kicker': 'Yang kami buat',
    'work.title': 'Tiga cara kami <em>bisa membantu.</em>',
    'work.lead': 'Software untuk operasional harian, website yang bekerja sebagaimana mestinya, dan video yang menjelaskan produkmu dengan jelas.',
    'work.live': 'Live',
    'work.dev': 'Dalam pengembangan',
    'work.s.label': 'Software',
    'work.s.title': 'Software & produk',
    'work.s.body': 'Kasir, sistem operasional, dan SaaS, dibangun sesuai cara kerja bisnis kecil yang sebenarnya.',
    'work.s.tehpos': 'Kasir untuk kafe dan toko',
    'work.s.perhalus': 'Teks antarmuka yang terbaca seperti ditulis manusia',
    'work.s.jadwalkan': 'Booking online untuk usaha jasa',
    'work.s.cuan': 'Mesin konten dan alur publikasi',
    'work.v.label': 'Video & motion',
    'work.v.title': 'Studio video & motion',
    'work.v.body': 'Video peluncuran, explainer produk, dan motion short-form untuk tim software di seluruh dunia.',
    'work.v.i1': 'Video peluncuran & explainer',
    'work.v.i2': 'Product motion dari layar aplikasimu',
    'work.v.i3': 'Paket short-form',
    'work.v.cta': 'Kunjungi studio',
    'work.v.video': 'Video peluncuran TehPOS, contoh karya studio',
    'work.w.label': 'Website',
    'work.w.title': 'Website, dari satu halaman sampai aplikasi penuh',
    'work.w.body': 'Dirancang, dibangun, dan diluncurkan dari awal sampai akhir, lalu mudah diperbarui oleh timmu.',
    'work.w.o1': 'Landing page',
    'work.w.o1b': 'Satu halaman fokus yang mengubah pengunjung jadi calon pelanggan.',
    'work.w.o2': 'Web app',
    'work.w.o2b': 'Login, dashboard, dan data yang tumbuh bersama bisnismu.',
    'work.w.cta': 'Rencanakan websitemu',
    'marquee.1': 'Software',
    'marquee.2': 'Website',
    'marquee.3': 'Video & motion',
    'marquee.4': 'Desain produk',
    'marquee.5': 'Otomasi',
    'about.kicker': 'Perusahaan',
    'about.title': 'Dibangun di Semarang, untuk bisnis yang ingin semuanya <em>berjalan lancar.</em>',
    'about.p1': 'Difira Studio adalah software house dari PT Difira Karya Nusantara.',
    'about.p2': 'Kami fokus pada masalah sehari-hari yang sering dianggap sepele, seperti kasir yang berantakan, jadwal yang terlewat, atau pekerjaan berulang, lalu mengubahnya menjadi software yang sederhana dan bisa diandalkan.',
    'about.f1': 'Perusahaan',
    'about.f2': 'Kantor',
    'about.f3': 'Bidang',
    'about.f3v': 'Software, website, video & motion',
    'about.careers': 'Kami sedang merekrut, lihat posisi terbuka',
    'contact.kicker': 'Punya proyek?',
    'contact.title': 'Mari temukan solusi yang <em>pas.</em>',
    'contact.body': 'Ceritakan masalah yang ingin kamu selesaikan. Kami akan membalas dengan langkah berikutnya yang jujur.',

    // Video studio page
    'studio.meta.title': 'Difira Studio — Video produk dan motion graphics untuk software',
    'studio.meta.description': 'Studio video yang dijalankan oleh pembuat produk. Explainer yang jelas dan motion graphics untuk software.',
    'studio.nav.home': 'Beranda Difira',
    'studio.nav.work': 'Karya',
    'studio.nav.packages': 'Paket',
    'studio.pkg.popular': 'Paling lengkap',
    'studio.nav.process': 'Proses',
    'studio.nav.about': 'Tentang',
    'studio.cta.contra': 'Pesan di Contra',
    'studio.hero.kicker': 'Video produk · Motion graphics',
    'studio.hero.title': 'Studio video yang dijalankan oleh <em>pembuat produk.</em>',
    'studio.hero.lead': 'Explainer yang jelas dan motion graphics untuk software.',
    'studio.hero.cta1': 'Lihat paket',
    'studio.reel.soon': 'Showreel segera hadir',
    'studio.work.kicker': 'Karya pilihan',
    'studio.work.title': 'Video <em>terbaru.</em>',
    'studio.work.lead': 'Video produk dan motion, dibuat dari layar produk yang asli.',
    'studio.pkg.kicker': 'Paket',
    'studio.pkg.title': 'Pilih titik <em>awal.</em>',
    'studio.pkg.lead': 'Lingkup tetap, harga tetap. Setiap paket sudah termasuk naskah, motion, dan voiceover.',
    'studio.pkg.length': 'Durasi',
    'studio.pkg.delivery': 'Pengerjaan',
    'studio.pkg.book': 'Pesan di Contra',
    'studio.pkg.trial': 'Satu video produk 15 detik.',
    'studio.pkg.trial.len': '15 detik',
    'studio.pkg.trial.del': '3 hari',
    'studio.pkg.trial.aria': 'Pesan di Contra: paket Trial',
    'studio.pkg.motion': '15 sampai 30 detik, dibuat dari layar aplikasimu.',
    'studio.pkg.motion.len': '15–30 detik',
    'studio.pkg.motion.del': '4 hari',
    'studio.pkg.motion.aria': 'Pesan di Contra: paket Product Motion',
    'studio.pkg.launch': '30 sampai 45 detik untuk peluncuran atau explainer.',
    'studio.pkg.launch.len': '30–45 detik',
    'studio.pkg.launch.del': '1 minggu',
    'studio.pkg.launch.aria': 'Pesan di Contra: paket Launch & Explainer',
    'studio.pkg.month': '/bulan',
    'studio.pkg.short': '4 video per bulan.',
    'studio.pkg.videos': 'Video',
    'studio.pkg.short.count': '4 per bulan',
    'studio.pkg.billing': 'Tagihan',
    'studio.pkg.monthly': 'Bulanan',
    'studio.pkg.short.aria': 'Pesan di Contra: Short-Form Pack',
    'studio.pkg.note': 'Harga perkenalan untuk klien awal.',
    'studio.steps.kicker': 'Cara kerja',
    'studio.steps.title': 'Tiga langkah, <em>satu orang.</em>',
    'studio.steps.lead': 'Kamu berbicara langsung dengan orang yang membuat videonya, dari brief sampai file akhir.',
    'studio.steps.1': 'Kirim brief dan tampilan layar',
    'studio.steps.1b': 'Ceritakan fungsi produkmu, untuk siapa, dan kirim rekaman layar atau file desain.',
    'studio.steps.2': 'Saya menulis naskah, menganimasikan, dan mengisi suaranya',
    'studio.steps.2b': 'Naskah, motion, dan voiceover, dikerjakan dari awal sampai akhir.',
    'studio.steps.3': 'Kamu menerima MP4 final plus 2 putaran revisi',
    'studio.steps.3b': 'Siap diunggah ke situs, halaman peluncuran, atau media sosial.',
    'studio.about.kicker': 'Tentang',
    'studio.about.title': 'Dibuat oleh founder software yang merilis produknya sendiri (TehPOS), jadi setiap video menjelaskan apa yang <em>benar-benar</em> dilakukan produkmu.',
    'studio.about.f1': 'Berbasis di Semarang, Indonesia',
    'studio.about.f2': 'Bekerja jarak jauh dengan tim software',
    'studio.about.tehpos': 'Lihat TehPOS',
    'studio.about.home': 'Beranda Difira Studio',
    'studio.contact.kicker': 'Mulai proyek',
    'studio.contact.title': 'Punya produk yang perlu <em>dijelaskan?</em>',
    'studio.contact.body': 'Kirim brief singkat dan beberapa tangkapan layar. Kamu akan menerima balasan dengan paket yang pas.',
    'studio.contact.email': 'Kirim email',
    'studio.footer.tagline': 'Video produk dan motion graphics untuk software.',

    // Careers page
    'careers.meta.title': 'Karir — Difira Studio',
    'careers.meta.description': 'Bergabung dengan Difira Studio dan bangun software yang menyelesaikan masalah nyata. Posisi terbuka di Semarang.',
    'careers.cta': 'Kirim CV',
    'careers.see': 'Lihat posisi terbuka',
    'careers.kicker': 'Karir di Difira Studio',
    'careers.title': 'Kerja yang <em>ada artinya.</em>',
    'careers.lead': 'Bergabunglah dengan tim kecil yang membangun software untuk menyelesaikan masalah nyata, dengan ruang untuk berpikir, mencoba, dan bertumbuh.',
    'careers.values.label': 'Cara bekerja di Difira Studio',
    'careers.v1': 'Ownership, bukan ego.',
    'careers.v1b': 'Pegang pekerjaan sampai tuntas, sambil tetap terbuka pada masukan.',
    'careers.v2': 'Belajar lewat shipping.',
    'careers.v2b': 'Kami lebih suka merilis, mengukur, lalu memperbaiki bersama.',
    'careers.v3': 'Dekat dengan pengguna.',
    'careers.v3b': 'Keputusan terbaik datang dari memahami orang yang memakai produk.',
    'careers.open.title': 'Posisi yang <em>sedang dibuka.</em>',
    'careers.open.meta': '3 POSISI · WFO SEMARANG',
    'careers.fulltime': 'Full-time',
    'careers.onsite': 'WFO Semarang',
    'careers.note.kicker': 'Belum menemukan peranmu?',
    'careers.note.title': 'Tetap kenalan dulu.',
    'careers.note.body': 'Kami selalu ingin bertemu orang yang penasaran, peduli pada detail, dan ingin membuat sesuatu yang berguna.',
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
