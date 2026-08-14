document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active') ? 'true' : 'false');
        });
    }
    
    // Close mobile menu when clicking on a nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add animation for project and note cards
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.project-card, .note-card, .link-card, .featured-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .project-card.visible, .note-card.visible, .link-card.visible, .featured-card.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };
    
    animateOnScroll();
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    }
    
    // Gallery Slider Logic
    const galleryWrapper = document.getElementById('comeback-gallery');
    if (galleryWrapper) {
        const slides = document.querySelectorAll('.gallery-slide');
        const prevBtn = document.getElementById('gallery-prev');
        const nextBtn = document.getElementById('gallery-next');
        const indicators = document.querySelectorAll('#comeback-indicators .indicator');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        function updateGallery() {
            // Update wrapper position
            galleryWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((ind, index) => {
                if (index === currentIndex) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateGallery();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateGallery();
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.getAttribute('data-index'));
                updateGallery();
            });
        });
        
        // Optional: Auto-play the gallery
        // setInterval(nextSlide, 5000);
    }
}); 