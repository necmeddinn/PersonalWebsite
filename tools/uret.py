#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""data/posts.json'dan sitemap.xml ve rss.xml dosyalarını yeniden üretir.

Kullanım (depo kökünde):  python3 tools/uret.py
Yeni bir yazı/not ekledikten sonra çalıştır.
"""
import io
import json
import os
from datetime import datetime, timezone
from xml.sax.saxutils import escape

BASE = "https://necmeddincunedioglu.com/"

# posts.json dışında kalan, elle yönetilen sayfalar ve öncelikleri
SABIT_SAYFALAR = [
    ("", "1.0"),
    ("yazilar.html", "0.9"),
    ("teknik.html", "0.9"),
    ("hakkimda.html", "0.8"),
    ("projelerim.html", "0.8"),
    ("proje-fizyoterapi-ai.html", "0.7"),
    ("proje-ntradeweb.html", "0.7"),
    ("proje-usetoolsuite.html", "0.7"),
    ("proje-pomostat.html", "0.7"),
    ("proje-pratikingilizcem.html", "0.7"),
    ("proje-come-back.html", "0.7"),
    ("proje-plakatanima.html", "0.7"),
]


def kok():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def icerikler():
    yol = os.path.join(kok(), "data", "posts.json")
    with io.open(yol, encoding="utf-8") as f:
        veri = json.load(f)["icerikler"]
    return sorted(veri, key=lambda k: k["tarih"], reverse=True)


def sitemap(kayitlar):
    satirlar = ['<?xml version="1.0" encoding="UTF-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for yol, oncelik in SABIT_SAYFALAR:
        satirlar += ["  <url>", "    <loc>%s%s</loc>" % (BASE, yol),
                     "    <priority>%s</priority>" % oncelik, "  </url>"]
    for k in kayitlar:
        satirlar += ["  <url>", "    <loc>%s%s</loc>" % (BASE, k["url"]),
                     "    <lastmod>%s</lastmod>" % k.get("guncelleme", k["tarih"]),
                     "    <priority>0.8</priority>", "  </url>"]
    satirlar.append("</urlset>")
    return "\n".join(satirlar) + "\n"


def rss(kayitlar):
    simdi = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")
    satirlar = ['<?xml version="1.0" encoding="UTF-8"?>',
                '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
                "  <channel>",
                "    <title>Necmeddin Cunedioğlu</title>",
                "    <link>%s</link>" % BASE,
                "    <description>Yazılım, yapay zeka ve ilgimi çeken diğer konular üzerine yazılar ve notlar.</description>",
                "    <language>tr</language>",
                "    <lastBuildDate>%s</lastBuildDate>" % simdi,
                '    <atom:link href="%srss.xml" rel="self" type="application/rss+xml"/>' % BASE]
    for k in kayitlar:
        tarih = datetime.strptime(k["tarih"], "%Y-%m-%d").strftime("%a, %d %b %Y 09:00:00 +0000")
        tur = "Yazı" if k["tur"] == "yazi" else "Not"
        satirlar += ["    <item>",
                     "      <title>%s</title>" % escape(k["baslik"]),
                     "      <link>%s%s</link>" % (BASE, k["url"]),
                     "      <guid isPermaLink=\"true\">%s%s</guid>" % (BASE, k["url"]),
                     "      <pubDate>%s</pubDate>" % tarih,
                     "      <category>%s</category>" % tur,
                     "      <description>%s</description>" % escape(k["ozet"]),
                     "    </item>"]
    satirlar += ["  </channel>", "</rss>"]
    return "\n".join(satirlar) + "\n"


def main():
    kayitlar = icerikler()
    for ad, uretim in (("sitemap.xml", sitemap), ("rss.xml", rss)):
        yol = os.path.join(kok(), ad)
        with io.open(yol, "w", encoding="utf-8") as f:
            f.write(uretim(kayitlar))
        print("üretildi: %s (%d kayıt)" % (ad, len(kayitlar)))


if __name__ == "__main__":
    main()
