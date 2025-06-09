// Theme Toggling Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    
    // Apply the saved theme or default to light theme
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save the theme preference
        localStorage.setItem('theme', newTheme);
    });
}); 