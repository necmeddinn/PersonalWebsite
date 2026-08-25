// Uzun yazılar için okuma yardımcıları: ilerleme çubuğu, içindekiler takibi
// ve tıklayınca yüklenen YouTube gömmesi. Yalnızca ilgili öğeler sayfada varsa çalışır.
document.addEventListener('DOMContentLoaded', () => {
    ilerlemeCubugu();
    icindekilerTakibi();
    videoGommesi();
});

// Sayfanın ne kadarının okunduğunu üstteki ince çubukla gösterir.
function ilerlemeCubugu() {
    const cubuk = document.querySelector('.reading-progress span');
    const yazi = document.querySelector('.post-body');
    if (!cubuk || !yazi) return;

    let bekliyor = false;

    const guncelle = () => {
        const bas = yazi.offsetTop;
        const boy = yazi.offsetHeight - window.innerHeight * 0.4;
        const gecilen = window.scrollY - bas;
        const oran = boy > 0 ? gecilen / boy : 0;
        cubuk.style.width = Math.min(100, Math.max(0, oran * 100)).toFixed(2) + '%';
        bekliyor = false;
    };

    window.addEventListener('scroll', () => {
        if (bekliyor) return;
        bekliyor = true;
        window.requestAnimationFrame(guncelle);
    }, { passive: true });

    window.addEventListener('resize', guncelle, { passive: true });
    guncelle();
}

// Ekrandaki bölüme karşılık gelen içindekiler bağlantısını işaretler.
function icindekilerTakibi() {
    const toc = document.querySelector('.post-toc');
    if (!toc) return;

    const baglantilar = [...toc.querySelectorAll('a[href^="#"]')];
    const hedefler = baglantilar
        .map((a) => document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))))
        .filter(Boolean);
    if (!hedefler.length) return;

    const isaretle = (kimlik) => {
        baglantilar.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + kimlik);
        });
    };

    const gozlemci = new IntersectionObserver(
        (girisler) => {
            const gorunen = girisler
                .filter((g) => g.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
            if (gorunen) isaretle(gorunen.target.id);
        },
        { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    hedefler.forEach((h) => gozlemci.observe(h));
    isaretle(hedefler[0].id);
}

// Videoyu sayfa açılışında değil, kapak görseline tıklanınca yükler.
function videoGommesi() {
    document.querySelectorAll('.video-embed[data-video]').forEach((kutu) => {
        const dugme = kutu.querySelector('.video-embed-play');
        if (!dugme) return;

        dugme.addEventListener('click', () => {
            const kimlik = kutu.dataset.video;
            const cerceve = document.createElement('iframe');
            cerceve.src =
                'https://www.youtube-nocookie.com/embed/' + kimlik + '?autoplay=1&rel=0';
            cerceve.title = kutu.dataset.baslik || 'Video';
            cerceve.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            cerceve.allowFullscreen = true;
            kutu.replaceChildren(cerceve);
        });
    });
}
