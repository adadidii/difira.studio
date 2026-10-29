# Difira Studio

Website company profile Difira Studio, software house dari PT Difira Karya Nusantara
(Kudu, Genuk, Kota Semarang).

## Menjalankan

Project ini HTML, CSS, dan JavaScript tanpa build step. Jalankan server statis dari root repo,
misalnya `python3 -m http.server 8080`, lalu buka `http://localhost:8080`.
(Membuka `index.html` langsung juga bisa, tapi grid portfolio di `/studio` butuh server.)

## Isi project

- `index.html`: halaman utama: hero video, pendekatan, showcase produk (TehPOS, Perhalus, video short-form), tiga layanan, alur pengerjaan, perusahaan, FAQ, kontak.
- `studio/index.html` + `studio.js`: halaman layanan video & motion (`/studio`).
- `karir.html`: lowongan kerja.
- `404.html`: halaman untuk alamat yang tidak ada (Vercel memakainya otomatis). Semua path di dalamnya absolut
  karena halaman ini bisa tampil di alamat sedalam apa pun.
- `mulai/index.html` + `brief.js`: form "Mulai proyek" (`/mulai`) tiga langkah. Jawaban disusun menjadi pesan
  WhatsApp ke nomor di `WA_NUMBER` (`brief.js`), dengan pratinjau langsung di samping form. Tidak ada server;
  draf yang belum terkirim disimpan di browser pengunjung saja.
- `styles.css`: design system dan layout responsif untuk semua halaman. Setiap section memakai class
  `theme-dark` atau `theme-light`; warnanya diatur lewat token CSS di kedua class itu.
- `app.js`: menu mobile, header yang menyesuaikan tema section di bawahnya, animasi scroll (kartu showcase
  bertumpuk, timeline proses), video hero dan video contoh.
- `i18n.js`: tombol bahasa EN/ID. Teks bahasa Inggris ada di HTML; terjemahan Indonesia ada di objek `ID`
  di file ini. Elemen yang diterjemahkan ditandai `data-i18n`, `data-i18n-html`, atau `data-i18n-attr`.
  Default English; pilihan disimpan di browser, dan `?lang=id` di URL memaksa Bahasa Indonesia.
- `media/`: video loop hero (desktop 16:9, mobile 9:16) dan poster-nya. Dibuat ulang dengan
  `npm run render:hero` di `portfolio-videos/`.
- `portfolio/`: video portfolio untuk `/studio`, diatur lewat `portfolio/portfolio.json`.
- `portfolio-videos/`: project Remotion untuk semua video (lihat README di dalamnya).
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icons/`, `site.webmanifest`: ikon browser dan PWA.
- `scripts/perhalus.mjs`: menilai dan memoles teks Bahasa Indonesia di `i18n.js` lewat [Perhalus](https://perhalus.com).
- `hibah/index.html` + `hibah.js`: halaman kampanye Hibah Digital Difira 2026 (`/hibah`, Bahasa Indonesia saja) dengan
  formulir pendaftaran lima langkah. `scripts/hibah-apps-script.gs`: penerima pendaftaran di Google Sheets.

## Hibah Digital Difira 2026

Teks kampanye berasal dari folder `hibah-digital-2026/` di luar repo (S&K, FAQ, konten website) dan dipakai apa adanya.

**Jadwal otomatis (WIB).** `app.js` menentukan fase dari jam pengunjung: belum dibuka (sebelum 29 Okt 13.45), dibuka
(29 Okt 17.00 – 5 Nov 17.00), ditutup (sampai 10 Nov 00.00), dan sudah diumumkan (mulai 10 Nov). Papan pengumuman di
atas semua halaman, pop-up beranda (sekali per pengunjung, hanya saat dibuka), info di hero `/hibah`, dan formulir
mengikuti fase ini. Server juga menolak pendaftaran di luar jam buka. Untuk mencoba fase lain tanpa menunggu, tambahkan
`?hibah_now=2026-11-05T17:00:00%2B07:00` ke alamat halaman mana pun.

**Menyambungkan formulir ke Google Sheets** (sekali, sekitar 5 menit):

1. Buat Google Sheet baru, misalnya "Pendaftar Hibah Digital Difira 2026".
2. Di Sheet itu: Extensions → Apps Script. Hapus isi `Code.gs`, tempel seluruh isi `scripts/hibah-apps-script.gs`, simpan.
3. Deploy → New deployment → pilih jenis **Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy, lalu
   izinkan aksesnya dengan akun Google yang memiliki Sheet.
4. Salin **Web app URL** (berakhiran `/exec`) ke `HIBAH_ENDPOINT` di bagian atas `hibah.js`.
5. Uji: buka URL itu di browser; harus muncul `{"ok":true,...}`. Lalu kirim satu pendaftaran percobaan dari `/hibah`,
   cek barisnya di tab "Pendaftar", dan hapus baris percobaan itu (nomor berikutnya tetap berlanjut).

Setiap pendaftaran menjadi satu baris dengan nomor `HDD-0001` dan seterusnya, waktu WIB, dan kolom "Duplikat WA"
yang terisi "Ya" kalau nomor WhatsApp yang sama sudah pernah mendaftar. **Ekspor:** File → Download → CSV atau Excel,
atau langsung bagikan Sheet ke tim seleksi. Jika script diubah, deploy ulang lewat Deploy → Manage deployments → Edit
→ Version: New version, supaya URL tetap sama.

**Perlindungan spam:** kolom jebakan (honeypot) yang tidak terlihat manusia, batas waktu isi minimal 20 detik, batas
panjang setiap jawaban (di form dan di server), pemeriksaan isian wajib per kategori, satu nomor WhatsApp yang sama
dalam 10 menit dianggap kirim ulang dan mendapat nomor yang sama, serta isian berawalan `=`, `+`, `-`, atau `@`
disimpan sebagai teks agar tidak dijalankan sebagai rumus di Sheets.

**Menguji formulir tanpa Sheet:** `?hibah_mock=1` berpura-pura berhasil (nomor HDD-0001), `?hibah_mock=fail`
berpura-pura gagal.

## Memoles copy Bahasa Indonesia dengan Perhalus

Perhalus menilai seberapa terasa AI sebuah teks Indonesia, lalu menulis ulang supaya terbaca wajar. Copy bahasa
Inggris di HTML tetap diedit manual, karena Perhalus hanya untuk Bahasa Indonesia.

1. Buat API key di https://perhalus.com/app/developer, lalu simpan di `.env` di root repo (sudah di-ignore git):
   `PERHALUS_API_KEY=ph_live_...`. Jangan taruh kunci ini di kode browser atau di commit.
2. `node scripts/perhalus.mjs --dry-run`: lihat teks mana yang akan dikirim dan berapa karakternya. Tidak memanggil API.
3. `node scripts/perhalus.mjs`: menilai dan memoles. Hasilnya, termasuk skor sebelum dan sesudah, disimpan di
   `scripts/perhalus-report.json`. Pakai `--keys faq.a1,faq.a2` untuk teks tertentu saja, atau `--mode nilai`
   untuk menilai tanpa menulis ulang.
4. Periksa report-nya, lalu `node scripts/perhalus.mjs --apply` untuk memasukkan hasil poles ke `i18n.js`.

Setiap panggilan memotong saldo pemilik kunci per karakter. Karena itu, script hanya mengirim teks 40–5.000 karakter
tanpa HTML, dan melewati teks yang sudah ada di report kecuali diberi `--force`. Judul pendek dan teks ber-HTML
tetap diedit manual. Tesnya memakai respons palsu, jadi tidak memanggil API: `node --test scripts/perhalus.test.mjs`.

## Sebelum publikasi

- Halaman `/studio` memakai WhatsApp untuk semua pemesanan, dengan pesan yang sudah terisi per paket
  (`studio.wa.*` di `i18n.js` untuk versi Indonesia). Contra, email, dan Fiverr sengaja tidak dipakai dulu.
- Konfirmasi email kontak (`hello@difira.studio`) dan email rekrutmen (`career@difirastudio.com`).

Hosting: static hosting dengan `index.html` sebagai entry point (saat ini Vercel).
