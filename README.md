# necmeddincunedioglu.com — Kişisel Web Sitesi

Necmeddin Cunedioğlu'nun kişisel sitesi: yazılar, notlar ve projeler. HTML, CSS ve
JavaScript ile statik olarak geliştirilmiştir; herhangi bir build adımı gerektirmez.

## İçerik

- **Ana Sayfa**: Kısa tanıtım, son yazılar ve günün sözü
- **Yazılar**: Bitmiş yazıların tek akışı; etiketle süzülebilir ve aranabilir
- **Notlar**: Bitmemiş, büyümeye devam eden notlar (olgunluk: fikir / gelişiyor / olgun)
- **Şimdi**: Şu an ne yaptığımı anlatan `/now` sayfası
- **Hakkımda**: Hikaye, deneyim & projeler, eğitim, yetenekler
- **Projelerim**: Filtrelenebilir proje galerisi (Yapay Zeka / Web Uygulaması) ve proje detay sayfaları
- **İletişim**: İletişim bilgileri ve sosyal medya bağlantıları

## Yeni yazı / not eklemek

Tüm içerik listesi tek bir dosyadan okunur: `data/posts.json`.

1. `sablon-yazi.html` dosyasını `yazi-kisa-slug.html` adıyla kopyala.
2. Başlığı, `meta description`, canonical/OG adreslerini ve tarihi güncelle;
   `<meta name="robots" content="noindex">` satırını sil.
3. Gövde metnini `.post-body` içine yaz.
4. `data/posts.json` içindeki `icerikler` listesine kaydı ekle:

```json
{
  "slug": "kisa-slug",
  "url": "yazi-kisa-slug.html",
  "tur": "yazi",
  "baslik": "Başlık",
  "ozet": "Listede görünecek iki cümlelik özet.",
  "tarih": "2026-09-01",
  "etiketler": ["etiket-1", "etiket-2"],
  "sure": 5
}
```

- `tur`: `"yazi"` (bitmiş yazı) veya `"not"` (büyüyen not).
- Notlarda ayrıca `durum` alanı kullanılır: `fikir` | `gelisiyor` | `olgun`,
  istersen `guncelleme` tarihi de eklenebilir.
- Kayıt eklendiği anda ana sayfadaki "Son Yazılar", `yazilar.html` ve `notlar.html`
  listeleri kendiliğinden güncellenir; etiket süzgeci de etiketlerden otomatik üretilir.
5. `python3 tools/uret.py` çalıştır — `sitemap.xml` ve `rss.xml` yeniden üretilir.

## Tasarım

- Renk paleti NC logosundan türetilmiştir: koyu orman yeşili (`#16241d`) + altın/krem (`#a8842e` / `#c9a961`)
- Başlıklarda Playfair Display (serif), metinlerde Poppins
- Açık/koyu tema desteği (`js/theme.js` + `<head>` içindeki FOUC önleyici inline script; sistem temasına da uyar)
- Tamamen responsive

## SEO & Paylaşım

- Her sayfada `meta description`, canonical, Open Graph ve Twitter Card etiketleri
- `img/og-cover.jpg` — sosyal medya paylaşım görseli (1200×630)
- `favicon.png`, `apple-touch-icon.png`
- `sitemap.xml`, `rss.xml` ve `robots.txt` (ilk ikisi `tools/uret.py` ile üretilir)
- Yazı ve not sayfalarında JSON-LD `BlogPosting` şeması
- Ana sayfada JSON-LD `Person` şeması
- Google Analytics (gtag)

## Dosya Yapısı

```
/
├── index.html               # Ana sayfa
├── hakkimda.html            # Hakkımda
├── projelerim.html          # Proje galerisi
├── proje-*.html             # Proje detay sayfaları
├── yazilar.html             # Yazı listesi (etiket süzgeci + arama)
├── notlar.html              # Not listesi (olgunluk etiketli)
├── simdi.html               # /now sayfası
├── yazi-*.html              # Tekil yazı sayfaları
├── not-*.html               # Tekil not sayfaları
├── sablon-yazi.html         # Yeni yazı şablonu (noindex)
├── iletisim.html            # İletişim
├── notlarim.html            # notlar.html'e yönlendirme (eski adres)
├── data/posts.json          # Tüm yazı ve notların listesi
├── tools/uret.py            # sitemap.xml + rss.xml üreteci
├── rss.xml                  # (üretilir — elle düzenleme)
├── favicon.png / apple-touch-icon.png
├── sitemap.xml / robots.txt
├── img/                     # Optimize edilmiş görseller (kapaklar, profil, logo, og)
├── css/
│   ├── style.css            # Palet, tipografi, navbar, hero, featured, footer, dark tema
│   ├── hakkimda.css
│   ├── projelerim.css
│   ├── proje-detay.css
│   ├── iletisim.css
│   └── blog.css             # Yazı/not listeleri, süzgeçler, okuma düzeni, /now
└── js/
    ├── script.js            # Menü, navbar scroll, kart animasyonları, yıl güncelleme
    ├── theme.js             # Tema değiştirici
    ├── quotes.js            # Günün sözü (quotes.json)
    ├── projelerim.js        # Proje filtreleme
    └── posts.js             # data/posts.json'u okuyup listeleri basar; etiket süzgeci
```

## Notlar

- Kaynak görseller (`NCLogo.jpeg`, `NewProfilPhoto.png`) depoda tutulur ama sayfalarda
  optimize edilmiş `img/` kopyaları kullanılır.
- Proje kapakları: canlı sitelerin ekran görüntüleri (PomoStat, UseToolSuite) ve
  YouTube tanıtım videolarının kapakları (NTradeWeb, Fizyoterapi AI).
