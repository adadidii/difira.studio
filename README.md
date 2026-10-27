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

## Sebelum publikasi

- Isi placeholder di `studio/index.html`: `CONTRA_URL`, `CONTACT_EMAIL`, `FIVERR_URL`.
- Konfirmasi email kontak (`hello@difira.studio`) dan email rekrutmen (`career@difirastudio.com`).

Hosting: static hosting dengan `index.html` sebagai entry point (saat ini Vercel).
