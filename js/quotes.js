document.addEventListener('DOMContentLoaded', function() {
    // Fallback quotes (used if JSON yüklenemezse)
    const fallbackQuotes = [
        {
            text: "Başarı, her gün küçük adımlar atarak büyük hedeflere ulaşmaktır.",
            author: "Zig Ziglar"
        },
        {
            text: "Hayatta en büyük zafer, hiçbir zaman düşmemek değil, her düştüğünde yeniden ayağa kalkmaktır.",
            author: "Nelson Mandela"
        }
    ];

    async function loadQuotes() {
        try {
            const response = await fetch('./quotes.json');
            if (!response.ok) {
                throw new Error('Quotes JSON is not reachable');
            }
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Quotes JSON has invalid format');
            }
            return data;
        } catch (error) {
            console.error('Günün Sözü verileri yüklenemedi, fallback kullanılacak:', error);
            return fallbackQuotes;
        }
    }
    
    // Function to get a date-based quote
    function getRandomQuote(quotes) {
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
    
    const quoteElement = document.getElementById('daily-quote');
    const authorElement = document.getElementById('quote-author');
    const quoteContainer = document.querySelector('.quote-container');
    
    // Display current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('tr-TR', options);
    }
    
    if (quoteContainer) {
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(20px)';
        quoteContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }

    // Quotes'i yükle ve ardından Günün Sözü + animasyonu başlat
    (async function initDailyQuote() {
        const quotes = await loadQuotes();

        if (quoteElement && authorElement && Array.isArray(quotes) && quotes.length > 0) {
            const dailyQuote = getRandomQuote(quotes);
            quoteElement.textContent = dailyQuote.text;
            authorElement.textContent = `- ${dailyQuote.author}`;
        }

        if (quoteContainer) {
            setTimeout(() => {
                quoteContainer.style.opacity = '1';
                quoteContainer.style.transform = 'translateY(0)';
            }, 300);
        }
    })();
}); 