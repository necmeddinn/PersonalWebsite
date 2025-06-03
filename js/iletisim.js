document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Create success and error message elements
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.';
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.textContent = 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        
        // Add messages after the form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        contactForm.parentNode.insertBefore(errorMessage, contactForm.nextSibling);
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            // Name validation
            if (nameField.value.trim() === '') {
                showError(nameField, 'İsim alanı boş bırakılamaz');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            // Email validation
            if (emailField.value.trim() === '') {
                showError(emailField, 'E-posta alanı boş bırakılamaz');
                isValid = false;
            } else if (!isValidEmail(emailField.value)) {
                showError(emailField, 'Geçerli bir e-posta adresi giriniz');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            // Subject validation
            if (subjectField.value.trim() === '') {
                showError(subjectField, 'Konu alanı boş bırakılamaz');
                isValid = false;
            } else {
                removeError(subjectField);
            }
            
            // Message validation
            if (messageField.value.trim() === '') {
                showError(messageField, 'Mesaj alanı boş bırakılamaz');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Normally, you would submit the form to a server here
                // For demo purposes, we'll just show a success message
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show error
    function showError(field, message) {
        // Remove any existing error
        removeError(field);
        
        // Add error class to the field
        field.classList.add('error');
        
        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    // Helper function to remove error
    function removeError(field) {
        field.classList.remove('error');
        
        // Remove any existing error message
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Helper function to show success message
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
        
        // Insert success message before the form
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Add CSS for success message
        const style = document.createElement('style');
        style.textContent = `
            .success-message {
                background-color: #d4edda;
                color: #155724;
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 5px;
                text-align: center;
            }
            
            .error-message {
                color: #dc3545;
                font-size: 0.8rem;
                margin-top: 0.25rem;
            }
            
            .error {
                border-color: #dc3545 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    // Add animation to contact info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Stagger the animations
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}); 