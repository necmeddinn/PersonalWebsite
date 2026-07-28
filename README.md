# necmeddincunedioglu.com — Kişisel Web Sitesi

Necmeddin Cunedioğlu'nun kişisel portfolyo sitesi. HTML, CSS ve JavaScript ile
statik olarak geliştirilmiştir; herhangi bir build adımı gerektirmez.

## İçerik

- **Ana Sayfa**: Tanıtım, öne çıkan projeler ve günün sözü
- **Hakkımda**: Hikaye, deneyim & projeler, eğitim, yetenekler
- **Projelerim**: Filtrelenebilir proje galerisi (Yapay Zeka / Web Uygulaması) ve proje detay sayfaları
- **İletişim**: İletişim bilgileri ve sosyal medya bağlantıları

## Tasarım

- Renk paleti NC logosundan türetilmiştir: koyu orman yeşili (`#16241d`) + altın/krem (`#a8842e` / `#c9a961`)
- Başlıklarda Playfair Display (serif), metinlerde Poppins
- Açık/koyu tema desteği (`js/theme.js` + `<head>` içindeki FOUC önleyici inline script; sistem temasına da uyar)
- Tamamen responsive

## SEO & Paylaşım

- Her sayfada `meta description`, canonical, Open Graph ve Twitter Card etiketleri
- `img/og-cover.jpg` — sosyal medya paylaşım görseli (1200×630)
- `favicon.png`, `apple-touch-icon.png`
- `sitemap.xml` ve `robots.txt`
- Ana sayfada JSON-LD `Person` şeması
- Google Analytics (gtag)

## Dosya Yapısı

```
/
├── index.html               # Ana sayfa
├── hakkimda.html            # Hakkımda
├── projelerim.html          # Proje galerisi
├── proje-*.html             # Proje detay sayfaları
├── iletisim.html            # İletişim
├── notlarim.html            # (yayında değil — nav'dan gizli, noindex)
├── favicon.png / apple-touch-icon.png
├── sitemap.xml / robots.txt
├── img/                     # Optimize edilmiş görseller (kapaklar, profil, logo, og)
├── css/
│   ├── style.css            # Palet, tipografi, navbar, hero, featured, footer, dark tema
│   ├── hakkimda.css
│   ├── projelerim.css
│   ├── proje-detay.css
│   ├── iletisim.css
│   └── notlarim.css
└── js/
    ├── script.js            # Menü, navbar scroll, kart animasyonları, yıl güncelleme
    ├── theme.js             # Tema değiştirici
    ├── quotes.js            # Günün sözü (quotes.json)
    └── projelerim.js        # Proje filtreleme
```

## Notlar

- Kaynak görseller (`NCLogo.jpeg`, `NewProfilPhoto.png`) depoda tutulur ama sayfalarda
  optimize edilmiş `img/` kopyaları kullanılır.
- Proje kapakları: canlı sitelerin ekran görüntüleri (PomoStat, UseToolSuite) ve
  YouTube tanıtım videolarının kapakları (NTradeWeb, Fizyoterapi AI).
