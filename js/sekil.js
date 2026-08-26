// Teknik yazılardaki etkileşimli şekiller. Her işlev yalnızca kendi öğesi
// sayfada varsa çalışır; bu dosyayı her yazıya eklemek zararsızdır.
document.addEventListener('DOMContentLoaded', () => {
    soyutlamaMerdiveni();
    amdahlGrafigi();
    kalibrasyonTesti();
});

// Katmanlardan biri açık kalacak şekilde çalışan akordiyon.
function soyutlamaMerdiveni() {
    const kutu = document.querySelector('[data-katmanlar]');
    if (!kutu) return;

    const dugmeler = [...kutu.querySelectorAll('.layer-toggle')];

    const ac = (dugme) => {
        dugmeler.forEach((d) => {
            const acik = d === dugme;
            d.setAttribute('aria-expanded', String(acik));
            d.closest('.layer').dataset.acik = String(acik);
            document.getElementById(d.getAttribute('aria-controls')).hidden = !acik;
        });
    };

    dugmeler.forEach((d) => {
        d.addEventListener('click', () => {
            // Açık olana tekrar tıklamak kapatmaz; hep bir katman görünür kalsın.
            if (d.getAttribute('aria-expanded') !== 'true') ac(d);
        });
    });

    ac(dugmeler[0]);
}

// Amdahl yasası: S(n) = 1 / ((1 - p) + p / n)
function amdahlGrafigi() {
    const kutu = document.querySelector('[data-amdahl]');
    if (!kutu) return;

    const kaydirac = kutu.querySelector('input[type="range"]');
    const oranEtiketi = kutu.querySelector('[data-oran]');
    const egri = kutu.querySelector('.chart-curve');
    const sinirCizgi = kutu.querySelector('.chart-limit');
    const sinirEtiket = kutu.querySelector('[data-sinir-etiket]');
    const ozet = kutu.querySelector('[data-ozet]');
    const cikti = {
        tavan: kutu.querySelector('[data-cikti="tavan"]'),
        altmisDort: kutu.querySelector('[data-cikti="64"]'),
        verim: kutu.querySelector('[data-cikti="verim"]'),
    };

    // Çizim alanı (viewBox 0 0 640 260 ile uyumlu)
    const X0 = 44, X1 = 616, Y0 = 26, Y1 = 214;
    const ENCOK = 64;
    const LOG_ENCOK = Math.log2(ENCOK);

    const hizlanma = (p, n) => 1 / (1 - p + p / n);
    const x = (n) => X0 + (Math.log2(n) / LOG_ENCOK) * (X1 - X0);

    const ciz = () => {
        const p = Number(kaydirac.value) / 100;
        const tavan = 1 / (1 - p);
        const y = (s) => Y1 - ((s - 1) / (tavan - 1)) * (Y1 - Y0);

        let d = '';
        for (let i = 0; i <= 120; i++) {
            const n = Math.pow(2, (i / 120) * LOG_ENCOK);
            d += (i ? ' L' : 'M') + x(n).toFixed(1) + ' ' + y(hizlanma(p, n)).toFixed(1);
        }
        egri.setAttribute('d', d);

        sinirCizgi.setAttribute('y1', Y0);
        sinirCizgi.setAttribute('y2', Y0);
        sinirEtiket.textContent = tavan.toFixed(1) + '× teorik üst sınır';

        const s64 = hizlanma(p, ENCOK);
        oranEtiketi.textContent = '%' + kaydirac.value;
        cikti.tavan.textContent = tavan.toFixed(1) + '×';
        cikti.altmisDort.textContent = s64.toFixed(1) + '×';
        cikti.verim.textContent = '%' + ((s64 / ENCOK) * 100).toFixed(0);

        ozet.textContent =
            'Paralelleşebilen oran %' + kaydirac.value + ' iken 64 çekirdek ' +
            s64.toFixed(1) + '× hızlanma veriyor. Sonsuz çekirdekle bile ' +
            tavan.toFixed(1) + '× sınırını geçemiyorsun.';
    };

    kaydirac.addEventListener('input', ciz);
    ciz();
}

// "Kendini tart" testi: okuyucu hem cevabını hem ne kadar emin olduğunu seçer,
// sonuçta ikisi karşılaştırılır. Amaç doğru sayısı değil, emin olma ile bilme
// arasındaki farkı görünür kılmak.
function kalibrasyonTesti() {
    const kutu = document.querySelector('[data-kalibrasyon]');
    if (!kutu) return;

    const sorular = [...kutu.querySelectorAll('.quiz-item')];
    const dugme = kutu.querySelector('.quiz-go');
    const sonucAlani = kutu.querySelector('.quiz-result');

    // Bir gruptaki düğmelerden yalnızca biri seçili kalsın.
    const grupBagla = (grup) => {
        if (!grup) return;
        grup.addEventListener('click', (olay) => {
            const secilen = olay.target.closest('button');
            if (!secilen || secilen.disabled) return;
            grup.querySelectorAll('button').forEach((d) => {
                d.setAttribute('aria-pressed', String(d === secilen));
            });
        });
    };

    sorular.forEach((s) => {
        grupBagla(s.querySelector('.quiz-cevap'));
        grupBagla(s.querySelector('.quiz-emin'));
    });

    const secili = (grup) => grup && grup.querySelector('button[aria-pressed="true"]');

    dugme.addEventListener('click', () => {
        const eksik = sorular.filter(
            (s) => !secili(s.querySelector('.quiz-cevap')) || !secili(s.querySelector('.quiz-emin'))
        );
        if (eksik.length) {
            sonucAlani.textContent =
                'Sonucu görmek için her soruda hem cevabını hem de ne kadar emin olduğunu seç.';
            eksik[0].scrollIntoView({ block: 'center' });
            return;
        }

        let dogruSayisi = 0;
        let eminAma = 0;
        let eminSayisi = 0;

        sorular.forEach((s) => {
            const anahtar = s.dataset.dogru;
            const cevapGrubu = s.querySelector('.quiz-cevap');
            const verilen = secili(cevapGrubu);
            const emin = Number(secili(s.querySelector('.quiz-emin')).dataset.emin);
            const dogruMu = verilen.dataset.cevap === anahtar;

            if (dogruMu) dogruSayisi++;
            if (emin === 3) {
                eminSayisi++;
                if (!dogruMu) eminAma++;
            }

            s.dataset.sonuc = dogruMu ? 'dogru' : 'yanlis';
            cevapGrubu.querySelector('button[data-cevap="' + anahtar + '"]').dataset.anahtar = '1';
            s.querySelectorAll('button').forEach((d) => (d.disabled = true));
            s.querySelector('.quiz-exp').hidden = false;
        });

        let mesaj = sorular.length + ' sorudan ' + dogruSayisi + ' tanesinde haklıydın. ';
        if (eminAma > 0) {
            mesaj += '"Eminim" dediğin ' + eminSayisi + ' soruda ' + eminAma +
                ' kez yanılmışsın \u2014 üstbilişin ölçtüğü şey tam olarak bu boşluk.';
        } else if (eminSayisi === 0) {
            mesaj += 'Hiçbirinde "eminim" demedin; temkinli olmak da bir kalibrasyon biçimi.';
        } else if (dogruSayisi === sorular.length) {
            mesaj += 'Emin olduğun yerlerde haklıydın. Kalibrasyonun iyi görünüyor.';
        } else {
            mesaj += 'Emin olduğun yerlerde yanılmamışsın; yanıldığın yerlerde zaten emin değildin. ' +
                'Aradaki bu uyum, iyi bir işaret.';
        }

        sonucAlani.textContent = mesaj;
        dugme.disabled = true;
        dugme.textContent = 'Cevaplar açıldı';
    });
}
