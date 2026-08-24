// Yazı ve not listelerini data/posts.json dosyasından okuyup sayfaya basar.
// Kullanım: bir konteynere data-post-list ekle.
//   data-tur="yazi" | "not" | "hepsi"   -> hangi içerik türü listelensin
//   data-limit="5"                       -> en fazla kaç kayıt (yoksa hepsi)
//   data-filtre="true"                   -> etiket süzgeci + arama kutusu bağlansın
// Etiket süzgeci adres çubuğuyla eşleşir: yazilar.html?etiket=python
document.addEventListener('DOMContentLoaded', () => {
    const listeler = document.querySelectorAll('[data-post-list]');
    if (!listeler.length) return;

    fetch('data/posts.json')
        .then((r) => r.json())
        .then((veri) => {
            const icerikler = (veri.icerikler || []).sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
            listeler.forEach((liste) => kur(liste, icerikler));
        })
        .catch(() => {
            listeler.forEach((liste) => {
                liste.innerHTML = '<p class="post-empty">İçerikler yüklenemedi. Sayfayı yenilemeyi deneyebilirsin.</p>';
            });
        });
});

function kur(liste, icerikler) {
    const tur = liste.dataset.tur || 'hepsi';
    const limit = parseInt(liste.dataset.limit || '0', 10);

    let kapsam = icerikler.filter((i) => tur === 'hepsi' || i.tur === tur);
    if (limit > 0) kapsam = kapsam.slice(0, limit);

    // Hiç içerik yoksa: ana sayfada bölümü tamamen gizle, liste sayfasında boş durum göster
    if (!kapsam.length) {
        const bolum = liste.closest('section');
        if (limit > 0 && bolum) {
            bolum.hidden = true;
        } else {
            const suzgec = document.querySelector('.post-filters');
            if (suzgec) suzgec.hidden = true;
            liste.innerHTML =
                '<p class="post-empty">Burası şimdilik boş. İlk içerik hazır olduğunda burada olacak.</p>';
        }
        return;
    }

    const adres = new URLSearchParams(window.location.search);
    let aktifEtiket = adres.get('etiket') || 'hepsi';
    let arama = '';

    // Adres çubuğundaki etiket bu listede yoksa hepsine dön
    const tumEtiketler = [...new Set(kapsam.flatMap((i) => i.etiketler || []))];
    if (aktifEtiket !== 'hepsi' && !tumEtiketler.includes(aktifEtiket)) aktifEtiket = 'hepsi';

    const ciz = () => {
        const gosterilecek = kapsam.filter((i) => {
            const etiketUyar = aktifEtiket === 'hepsi' || (i.etiketler || []).includes(aktifEtiket);
            const metin = (i.baslik + ' ' + i.ozet + ' ' + (i.etiketler || []).join(' ')).toLocaleLowerCase('tr');
            const aramaUyar = !arama || metin.includes(arama);
            return etiketUyar && aramaUyar;
        });

        liste.innerHTML = gosterilecek.length
            ? gosterilecek.map(kart).join('')
            : '<p class="post-empty">Bu süzgeçle eşleşen bir şey yok. Başka bir etiket dene.</p>';
    };

    if (liste.dataset.filtre === 'true') {
        const etiketKutusu = document.querySelector('[data-tag-filter]');
        const aramaKutusu = document.querySelector('#post-search');

        if (etiketKutusu) {
            const etiketler = tumEtiketler.slice().sort((a, b) => a.localeCompare(b, 'tr'));
            const dugmeler = ['hepsi'].concat(etiketler).map((e) => {
                const secili = e === aktifEtiket ? ' active' : '';
                const ad = e === 'hepsi' ? 'Hepsi' : e;
                return `<button class="tag-chip${secili}" type="button" data-etiket="${e}">${ad}</button>`;
            });
            etiketKutusu.innerHTML = dugmeler.join('');

            etiketKutusu.addEventListener('click', (olay) => {
                const dugme = olay.target.closest('.tag-chip');
                if (!dugme) return;
                aktifEtiket = dugme.dataset.etiket;
                etiketKutusu.querySelectorAll('.tag-chip').forEach((d) => d.classList.remove('active'));
                dugme.classList.add('active');
                adresiGuncelle(aktifEtiket);
                ciz();
            });
        }

        if (aramaKutusu) {
            aramaKutusu.addEventListener('input', () => {
                arama = aramaKutusu.value.trim().toLocaleLowerCase('tr');
                ciz();
            });
        }
    }

    ciz();
}

// Seçili etiketi adres çubuğuna yazar; böylece bağlantı paylaşılabilir olur.
function adresiGuncelle(etiket) {
    const url = new URL(window.location.href);
    if (etiket === 'hepsi') {
        url.searchParams.delete('etiket');
    } else {
        url.searchParams.set('etiket', etiket);
    }
    window.history.replaceState({}, '', url);
}

function kart(i) {
    const tarih = new Date(i.tarih).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const durumlar = { fikir: 'Fikir', gelisiyor: 'Gelişiyor', olgun: 'Olgun' };
    const durum = i.durum
        ? `<span class="post-status status-${i.durum}">${durumlar[i.durum] || i.durum}</span>`
        : '';
    const sure = i.sure ? `<span>${i.sure} dk okuma</span>` : '';

    const liste = i.tur === 'teknik' ? 'teknik.html' : 'yazilar.html';
    const etiketler = (i.etiketler || [])
        .map((e) => `<a href="${liste}?etiket=${encodeURIComponent(e)}">${e}</a>`)
        .join('');

    return `
        <article class="post-card">
            <div class="post-meta">
                <time datetime="${i.tarih}">${tarih}</time>
                ${sure}
                ${durum}
            </div>
            <h3><a href="${i.url}">${i.baslik}</a></h3>
            <p>${i.ozet}</p>
            <div class="post-tags post-tags-links">${etiketler}</div>
        </article>`;
}
