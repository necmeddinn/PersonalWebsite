document.addEventListener('DOMContentLoaded', function() {
    // Daily Motivational Quotes
    const quotes = [
        {
            text: "Başarı, her gün küçük adımlar atarak büyük hedeflere ulaşmaktır.",
            author: "Zig Ziglar"
        },
        {
            text: "Hayatta en büyük zafer, hiçbir zaman düşmemek değil, her düştüğünde yeniden ayağa kalkmaktır.",
            author: "Nelson Mandela"
        },
        {
            text: "Başarının sırrı, başlamaktır.",
            author: "Mark Twain"
        },
        {
            text: "Düşünceleriniz olumlu olsun, çünkü düşünceleriniz sözcüklerinize dönüşür. Sözcükleriniz olumlu olsun, çünkü sözcükleriniz davranışlarınıza dönüşür. Davranışlarınız olumlu olsun, çünkü davranışlarınız alışkanlıklarınıza dönüşür. Alışkanlıklarınız olumlu olsun, çünkü alışkanlıklarınız değerlerinize dönüşür. Değerleriniz olumlu olsun, çünkü değerleriniz kaderinize dönüşür.",
            author: "Mahatma Gandhi"
        },
        {
            text: "Hayatın %10'u sana olanlar, %90'ı ise onlara nasıl tepki verdiğindir.",
            author: "Charles R. Swindoll"
        },
        {
            text: "Geçmiş seni üzmesin, gelecek korkutmasın. Şu an burada ol ve tadını çıkar.",
            author: "Buddha"
        },
        {
            text: "Yapabileceğinizi düşündüğünüz veya yapamayacağınızı düşündüğünüz, her iki durumda da haklısınız.",
            author: "Henry Ford"
        },
        {
            text: "Bir şeyi yapamayacağını düşünüyorsan, haklısın demektir. Ama yapabileceğini düşünüyorsan, yine haklısın.",
            author: "Henry Ford"
        },
        {
            text: "Hayat bisiklet sürmek gibidir. Dengenizi korumak için hareket etmeye devam etmelisiniz.",
            author: "Albert Einstein"
        },
        {
            text: "Başarı nihai değildir, başarısızlık ölümcül değildir: Önemli olan devam etme cesaretidir.",
            author: "Winston Churchill"
        },
        {
            text: "Dünyada görmek istediğin değişimin kendisi ol.",
            author: "Mahatma Gandhi"
        },
        {
            text: "Hiçbir şey imkansız değildir, kelimenin kendisi 'Yapabilirim!' diyor.",
            author: "Audrey Hepburn"
        },
        {
            text: "Büyük şeyler küçük başlangıçlardan doğar.",
            author: "T.S. Eliot"
        },
        {
            text: "Hayatta en değerli olan şey, her gün biraz daha bilgili ve biraz daha az bencil olarak uyanmaktır.",
            author: "Abraham Lincoln"
        },
        {
            text: "Eğer daha önce hiç hata yapmadıysanız, yeni şeyler denememişsiniz demektir.",
            author: "Albert Einstein"
        }
    ];
    
    // Function to get a random quote
    function getRandomQuote() {
        // Use the date as a seed for the random quote
        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        
        // Create a simple hash from the date string
        let hash = 0;
        for (let i = 0; i < dateString.length; i++) {
            hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        
        // Use the hash to get a consistent quote for the day
        const index = Math.abs(hash) % quotes.length;
        return quotes[index];
    }
    
    // Display the daily quote
    const quoteElement = document.getElementById('daily-quote');
    const authorElement = document.getElementById('quote-author');
    
    if (quoteElement && authorElement) {
        const dailyQuote = getRandomQuote();
        quoteElement.textContent = dailyQuote.text;
        authorElement.textContent = `- ${dailyQuote.author}`;
    }
    
    // Display current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('tr-TR', options);
    }
    
    // Add animation to quote container
    const quoteContainer = document.querySelector('.quote-container');
    if (quoteContainer) {
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(20px)';
        quoteContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            quoteContainer.style.opacity = '1';
            quoteContainer.style.transform = 'translateY(0)';
        }, 300);
    }
}); 