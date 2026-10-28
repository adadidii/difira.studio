// Language switch (English default, Bahasa Indonesia optional).
// English lives in the HTML. Elements marked with data-i18n (text), data-i18n-html (markup)
// or data-i18n-attr="attr:key,attr:key" get the Indonesian strings below when ID is chosen.
// The choice is remembered per browser; ?lang=id or ?lang=en in the URL overrides it.
(function () {
  const ID = {
    // Shared
    'meta.title': 'Jasa Pembuatan Software, Website & Video Motion di Semarang — Difira Studio',
    'meta.description': 'Difira Studio menerima jasa pembuatan software SaaS dan sistem bisnis, website, serta video motion untuk usaha di Semarang dan seluruh Indonesia, lengkap dengan SEO, SEM, dan dukungan setelah rilis.',
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
    'hero.title': '<span class="line"><span>Jasa pembuatan software,</span></span><span class="line"><span>website & <em>video motion.</em></span></span>',
    'hero.lead': 'SaaS dan sistem bisnis, company profile, landing page, web app, hingga video produk. Kami kerjakan dari memahami persoalan Anda sampai hasilnya siap dipakai pelanggan.',
    'hero.cta1': 'Lihat layanan kami',
    'hero.cta2': 'Konsultasikan proyek Anda',
    'hero.scroll': 'Gulir',
    'hero.pause': 'Jeda animasi latar',
    'hero.badge1': 'SEO & SEM',
    'hero.badge2': 'Responsif di semua HP',
    'hero.badge3': 'Integrasi WhatsApp',
    'hero.badge4': 'Dukungan setelah rilis',
    'fit.kicker': 'Kenapa tepat bersama kami',
    'fit.title': 'Bukan sekadar tampilan. <em>Masalah bisnis Anda terselesaikan.</em>',
    'fit.lead': 'Banyak proyek berhenti di desain yang menarik. Kami memastikan kebutuhan dan permasalahan bisnis Anda benar-benar terselesaikan, dan pesan Anda tersampaikan dengan baik kepada pelanggan.',
    'fit.plain': 'Sekadar tampilan',
    'fit.plain1': 'Desainnya bagus, tetapi masalahnya tetap ada.',
    'fit.plain2': 'Fitur ditambahkan tanpa alasan yang jelas.',
    'fit.plain3': 'Pelanggan masih bingung dengan apa yang Anda tawarkan.',
    'fit.difira': 'Bersama Difira',
    'fit.difira1': 'Masalah bisnis kami pelajari sebelum apa pun didesain.',
    'fit.difira2': 'Setiap fitur dibuat untuk memperbaiki sesuatu dalam cara kerja Anda.',
    'fit.difira3': 'Isi dan alurnya membantu pelanggan cepat memahami penawaran Anda.',
    'choose.kicker': 'Kenapa memilih kami?',
    'choose.title': 'Profesional, memahami bisnis Anda, <em>dan tetap ada setelah rilis.</em>',
    'choose.lead': 'Kami terbiasa memulai dari membaca permasalahan dan memahami proses bisnis Anda, sehingga hasil yang kami kerjakan sesuai dengan kondisi yang ada.',
    'choose.stat': '±3 tahun',
    'choose.stat.title': 'di dunia merchant support',
    'choose.stat.body': 'Tim kami sudah sekitar tiga tahun mendukung merchant: menjawab inquiry, menangani komplain, dan menyelesaikan service request. Kami terbiasa tetap bisa dihubungi, jadi kami tidak akan menghilang setelah proyek Anda berjalan.',
    'choose.tag2': 'Komplain',
    'choose.c1': 'Memahami proses bisnis',
    'choose.c1b': 'Kami pelajari alur kerja Anda sebelum membangun, sehingga hasilnya cocok dengan kondisi Anda, bukan template umum.',
    'choose.c2': 'SEO dan SEM',
    'choose.c2b': 'Halaman disiapkan agar mudah ditemukan di Google, dan kami dapat membantu iklan pencarian saat Anda siap berpromosi.',
    'choose.c3': 'Dukungan setelah rilis',
    'choose.c3b': 'Perbaikan, pembaruan, dan pertanyaan tetap kami tangani setelah peluncuran, lewat kontak yang sama.',
    'choose.c4': 'Profesional sejak awal',
    'choose.c4b': 'Lingkup, jadwal, dan biaya dituliskan dan disepakati sebelum pekerjaan dimulai.',
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
    'studio.pkg.lead': 'Setiap paket sudah mencakup naskah, motion, dan voiceover. Harga akhir disepakati lewat WhatsApp sebelum pekerjaan dimulai.',
    'studio.pkg.length': 'Durasi',
    'studio.pkg.delivery': 'Pengerjaan',
    'studio.pkg.book': 'Pesan via WhatsApp',
    'studio.pkg.trial': 'Satu video produk berdurasi 15 detik.',
    'studio.pkg.trial.len': '15 detik',
    'studio.pkg.trial.del': '3 hari',
    'studio.pkg.trial.aria': 'Pesan via WhatsApp: paket Trial',
    'studio.pkg.motion': '15 sampai 30 detik, dibuat dari tampilan layar aplikasi Anda.',
    'studio.pkg.motion.len': '15–30 detik',
    'studio.pkg.motion.del': '4 hari',
    'studio.pkg.motion.aria': 'Pesan via WhatsApp: paket Product Motion',
    'studio.pkg.launch': '30 sampai 45 detik, untuk peluncuran produk atau video explainer.',
    'studio.pkg.launch.len': '30–45 detik',
    'studio.pkg.launch.del': '1 minggu',
    'studio.pkg.launch.aria': 'Pesan via WhatsApp: paket Launch & Explainer',
    'studio.pkg.short': 'Empat video setiap bulan.',
    'studio.pkg.videos': 'Video',
    'studio.pkg.short.count': '4 per bulan',
    'studio.pkg.billing': 'Tagihan',
    'studio.pkg.monthly': 'Bulanan',
    'studio.pkg.short.aria': 'Pesan via WhatsApp: Short-Form Pack',
    'studio.pkg.note': 'Harga perkenalan bagi klien pertama.',
    'studio.wa.short': 'https://wa.me/6287761021129?text=Halo%20Difira%20Studio%2C%20saya%20tertarik%20dengan%20Short-Form%20Pack%20(4%20video%20per%20bulan).',
    'studio.wa.launch': 'https://wa.me/6287761021129?text=Halo%20Difira%20Studio%2C%20saya%20tertarik%20dengan%20paket%20Launch%20%26%20Explainer%20(30%E2%80%9345%20detik).',
    'studio.wa.motion': 'https://wa.me/6287761021129?text=Halo%20Difira%20Studio%2C%20saya%20tertarik%20dengan%20paket%20Product%20Motion%20(15%E2%80%9330%20detik).',
    'studio.wa.trial': 'https://wa.me/6287761021129?text=Halo%20Difira%20Studio%2C%20saya%20tertarik%20dengan%20paket%20Trial%20(video%2015%20detik).',
    'studio.wa.general': 'https://wa.me/6287761021129?text=Halo%20Difira%20Studio%2C%20saya%20ingin%20memesan%20video%20produk.',
    'studio.pkg.short.price': 'Rp1jt<small>/bulan</small>',
    'studio.pkg.launch.price': 'Rp500–700rb',
    'studio.pkg.motion.price': 'Rp300rb',
    'studio.pkg.trial.price': 'Rp150rb',
    'studio.cta.wa': 'Pesan via WhatsApp',
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
    'studio.footer.tagline': 'Video produk dan motion graphics untuk software.',

    // Project brief page (/mulai)
    'brief.meta.title': 'Mulai proyek — Difira Studio',
    'brief.meta.description': 'Ceritakan proyek Anda kepada Difira Studio dalam tiga langkah singkat. Jawaban Anda menjadi pesan WhatsApp yang dapat Anda periksa sebelum dikirim.',
    'brief.label': 'Ringkasan proyek',
    'brief.kicker': 'Mulai proyek',
    'brief.title': 'Ceritakan <em>proyek Anda.</em>',
    'brief.lead': 'Tiga langkah singkat, sekitar dua menit. Jawaban Anda akan menjadi pesan WhatsApp yang dapat Anda periksa sebelum dikirim.',
    'brief.step1': 'Kebutuhan',
    'brief.step2': 'Detail',
    'brief.step3': 'Kontak',
    'brief.of1': 'Langkah 1 dari 3',
    'brief.of2': 'Langkah 2 dari 3',
    'brief.of3': 'Langkah 3 dari 3',
    'brief.q1': 'Apa yang perlu kami bantu?',
    'brief.q1hint': 'Pilih satu atau lebih.',
    'brief.need.system': 'Sistem bisnis',
    'brief.need.system.d': 'Kasir, stok, pemesanan, atau aplikasi internal.',
    'brief.need.website': 'Website',
    'brief.need.website.d': 'Landing page atau company profile.',
    'brief.need.webapp': 'Web app',
    'brief.need.webapp.d': 'Aplikasi berbasis browser dengan login dan data.',
    'brief.need.video': 'Video dan motion',
    'brief.need.video.d': 'Video peluncuran, explainer, atau klip pendek.',
    'brief.need.automation': 'Otomasi',
    'brief.need.automation.d': 'Menghubungkan aplikasi yang sudah dipakai dan mengurangi pekerjaan manual.',
    'brief.need.unsure': 'Belum yakin',
    'brief.need.unsure.d': 'Ceritakan persoalannya, kami bantu menentukan arahnya.',
    'brief.q2': 'Ceritakan sedikit lebih rinci.',
    'brief.story': 'Seperti apa situasinya?',
    'brief.story.ph': 'Contoh: kafe kami masih mencatat pesanan di kertas, sehingga hitungan stok di sore hari jarang cocok.',
    'brief.tips.label': 'Hal yang perlu disebutkan',
    'brief.tip1': 'Apa yang belum berjalan baik',
    'brief.tip2': 'Siapa yang akan memakainya',
    'brief.tip3': 'Aplikasi yang sudah dipakai',
    'brief.when': 'Kapan Anda membutuhkannya?',
    'brief.when.asap': 'Dalam satu bulan',
    'brief.when.13': '1–3 bulan',
    'brief.when.3': 'Lebih dari 3 bulan',
    'brief.when.flex': 'Fleksibel',
    'brief.budget': 'Perkiraan anggaran',
    'brief.budget.1': 'Di bawah Rp5 juta',
    'brief.budget.2': 'Rp5–15 juta',
    'brief.budget.3': 'Rp15–50 juta',
    'brief.budget.4': 'Di atas Rp50 juta',
    'brief.budget.5': 'Belum tahu',
    'brief.optional': 'Keduanya boleh dilewati.',
    'brief.q3': 'Bagaimana kami dapat menghubungi Anda?',
    'brief.name': 'Nama Anda',
    'brief.phone': 'Nomor WhatsApp',
    'brief.business': 'Nama usaha',
    'brief.email': 'Email',
    'brief.opt': 'opsional',
    'brief.back': 'Kembali',
    'brief.next': 'Lanjut',
    'brief.send': 'Buka WhatsApp',
    'brief.done.title': 'Pesan Anda sudah siap di WhatsApp.',
    'brief.done.body': 'Tekan kirim di WhatsApp, dan kami akan melanjutkan dari percakapan tersebut. Jika WhatsApp tidak terbuka, gunakan tombol di bawah.',
    'brief.done.open': 'Buka WhatsApp lagi',
    'brief.done.edit': 'Ubah jawaban',
    'brief.noscript': 'Formulir ini memerlukan JavaScript. Anda juga dapat langsung menghubungi kami di wa.me/6287761021129.',
    'brief.preview.label': 'Pratinjau pesan',
    'brief.preview.sub': 'Pratinjau pesan Anda',
    'brief.after.title': 'Setelah ini',
    'brief.after.1': 'Kami membalas lewat WhatsApp',
    'brief.after.1b': 'dengan beberapa pertanyaan untuk memahami persoalannya.',
    'brief.after.2': 'Panggilan singkat bila perlu',
    'brief.after.2b': 'agar kami dapat melihat cara kerja Anda saat ini.',
    'brief.after.3': 'Lingkup dan penawaran tertulis',
    'brief.after.3b': 'sehingga biayanya jelas sebelum pekerjaan dimulai.',
    'brief.direct': 'Lebih suka menulis langsung?',
    'contact.brief': 'Isi ringkasan proyek',

    // 404 page
    'nf.meta.title': 'Halaman tidak ditemukan — Difira Studio',
    'nf.kicker': 'Halaman tidak ditemukan',
    'nf.title': 'Halaman ini <em>tidak tersedia.</em>',
    'nf.lead': 'Tautannya mungkin sudah tidak berlaku, atau alamatnya salah ketik. Silakan lanjutkan ke salah satu halaman berikut.',
    'nf.home': 'Kembali ke beranda',

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
