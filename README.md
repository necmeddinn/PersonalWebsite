# necmeddincunedioglu.com — Kişisel Web Sitesi

Necmeddin Cunedioğlu'nun kişisel sitesi: yazılar, notlar ve projeler. HTML, CSS ve
JavaScript ile statik olarak geliştirilmiştir; herhangi bir build adımı gerektirmez.

## İçerik

- **Ana Sayfa**: Kısa tanıtım, son yazılar (içerik varsa) ve hızlı erişim kartları
- **Yazılar**: Teknik olmayan yazıların akışı; etiketle süzülebilir ve aranabilir
- **Teknik**: Yazılım tarafındaki yazılar ve notlar; aynı süzgeç/arama düzeni
- **Hakkımda**: Hikaye, deneyim & projeler, eğitim, yetenekler
- **Projelerim**: Filtrelenebilir proje galerisi (Yapay Zeka / Web Uygulaması) ve proje detay sayfaları

İletişim kanalları ayrı bir sayfada değil, her sayfanın altındaki footer'da.

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

- `tur`: `"yazi"` (Yazılar sayfası) veya `"teknik"` (Teknik sayfası).
- İsteğe bağlı `durum` alanı içeriğin olgunluğunu gösterir: `fikir` | `gelisiyor` | `olgun`.
  `guncelleme` tarihi de eklenebilir.
- Kayıt eklendiği anda ana sayfadaki "Son Yazılar", `yazilar.html` ve `notlar.html`
  listeleri kendiliğinden güncellenir; etiket süzgeci de etiketlerden otomatik üretilir.
- İçerik listesi boşken ana sayfadaki "Son Yazılar" bölümü kendiliğinden gizlenir.
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
├── teknik.html              # Teknik içerik listesi (aynı düzen)
├── yazi-*.html              # Tekil içerik sayfaları (şablondan üretilir)
├── sablon-yazi.html         # Yeni yazı şablonu (noindex)
├── notlarim.html            # teknik.html'e yönlendirme (eski adres)
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
│   └── blog.css             # Yazı/not listeleri, süzgeçler, okuma düzeni, /now
└── js/
    ├── script.js            # Menü, navbar scroll, kart animasyonları, yıl güncelleme
    ├── theme.js             # Tema değiştirici
    ├── quotes.js            # Günün sözü (quotes.json)
    ├── projelerim.js        # Proje filtreleme
    └── posts.js             # data/posts.json'u okuyup listeleri basar; etiket süzgeci, boş durum
```

## Notlar

- Sitede kişisel fotoğraf kullanılmıyor; görsel kimlik NC logosu ve yeşil/altın palet üzerinden kurulu.
- Proje kapakları: canlı sitelerin ekran görüntüleri (PomoStat, UseToolSuite) ve
  YouTube tanıtım videolarının kapakları (NTradeWeb, Fizyoterapi AI).
