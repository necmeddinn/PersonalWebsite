document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    // Add animation for appearing cards
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
    
    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '1';
            
            const links = this.querySelectorAll('.project-links a');
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '0';
            
            const links = this.querySelectorAll('.project-links a');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        });
    });
}); 