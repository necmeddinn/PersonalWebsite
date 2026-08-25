// Teknik yazılardaki etkileşimli şekiller. Her işlev yalnızca kendi öğesi
// sayfada varsa çalışır; bu dosyayı her yazıya eklemek zararsızdır.
document.addEventListener('DOMContentLoaded', () => {
    soyutlamaMerdiveni();
    amdahlGrafigi();
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
