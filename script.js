// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate');

function checkIfInView() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fadeIn');
        }
    });
}

window.addEventListener('scroll', checkIfInView);
window.addEventListener('load', checkIfInView);

// Portfolio filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Add actual filtering logic here
        // This is just for demonstration
        console.log(`Filtering by: ${btn.textContent}`);
    });
});

// Create floating bubbles that follow cursor
document.addEventListener('DOMContentLoaded', function() {
    // Create floating bubbles that follow cursor
    const heroSection = document.querySelector('.hero');
    const contactSection = document.querySelector('.contact');
    
    // Create 10 bubbles for hero section
    for (let i = 0; i < 10; i++) {
        createBubble(heroSection);
    }
    
    // Create 6 bubbles for contact section
    for (let i = 0; i < 6; i++) {
        createBubble(contactSection);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        // Get cursor position
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Move bubbles
        const bubbles = document.querySelectorAll('.cursor-bubble');
        bubbles.forEach((bubble, index) => {
            const section = bubble.closest('section');
            const rect = section.getBoundingClientRect();
            
            // Check if cursor is in the section
            if (mouseY >= rect.top && 
                mouseY <= rect.bottom && 
                mouseX >= rect.left && 
                mouseX <= rect.right) {
                
                // Calculate position within section
                const offsetX = (mouseX - rect.left) / rect.width;
                const offsetY = (mouseY - rect.top) / rect.height;
                
                // Move with delay based on index (creates trailing effect)
                setTimeout(() => {
                    // Use modulus to create varied movement
                    const moveX = (offsetX * rect.width) + (Math.sin(index) * 20);
                    const moveY = (offsetY * rect.height) + (Math.cos(index) * 20);
                    
                    bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    bubble.style.opacity = '0.15';
                }, index * 50);
            }
        });
        
        // Activate abstract elements when cursor is nearby
        const abstractElements = document.querySelectorAll('.abstract-cube, .abstract-circle, .abstract-line');
        abstractElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from cursor to element center
            const distance = Math.sqrt(
                Math.pow(mouseX - centerX, 2) + 
                Math.pow(mouseY - centerY, 2)
            );
            
            // Activate if cursor is within 150px
            if (distance < 150) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
        
        // Highlight stripes when cursor is over sections
        const sections = document.querySelectorAll('.about, .services, .portfolio, .contact');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            if (mouseY >= rect.top && 
                mouseY <= rect.bottom && 
                mouseX >= rect.left && 
                mouseX <= rect.right) {
                section.classList.add('highlight');
            } else {
                section.classList.remove('highlight');
            }
        });
    });
});

// Function to create bubbles
function createBubble(parentElement) {
    const bubble = document.createElement('div');
    bubble.className = 'cursor-bubble';
    
    // Random size between 20 and 80px
    const size = Math.random() * 60 + 20;
    
    // Random initial position within the parent element
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style
    bubble.style.left = `${posX}%`;
    bubble.style.top = `${posY}%`;
    bubble.style.opacity = '0.05';
    
    parentElement.appendChild(bubble);
}
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            // Remove "active" class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Show or hide projects based on category
            portfolioItems.forEach(item => {
                if (category === "all" || item.getAttribute("data-category").includes(category)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});
// Add this at the end of your document.addEventListener('DOMContentLoaded', function() {...}) block

// Contact form submission
// Contact form submission
const contactForm = document.getElementById('contactForm');
    
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        let valid = true;
        const nameInput = this.querySelector('#name');
        const emailInput = this.querySelector('#email');
        const subjectInput = this.querySelector('#subject');
        const messageInput = this.querySelector('#message');
        
        // Remove existing error messages
        const errorMessages = this.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Remove existing success message
        const successMessage = this.querySelector('.success-message');
        if (successMessage) {
            successMessage.remove();
        }
        
        // Validate name
        if (!nameInput.value.trim()) {
            valid = false;
            addErrorMessage(nameInput, 'Please enter your name');
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            valid = false;
            addErrorMessage(emailInput, 'Please enter a valid email address');
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            valid = false;
            addErrorMessage(messageInput, 'Please enter your message');
        }
        
        if (!valid) {
            return;
        }
        
        // Show loading indicator
        const submitButton = this.querySelector('.btn-submit');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Prepare template parameters - matches your template variables
        const templateParams = {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value || 'Portfolio Contact Inquiry',
            message: messageInput.value
        };
        console.log("Sending the following template params:", templateParams);
        // Send email using EmailJS with your correct service and template IDs
        emailjs.send('service_2bitduu', 'template_z7alp14', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message form-error';
                errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
                contactForm.appendChild(errorMessage);
                
                // Restore button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });
    
    // Helper function for displaying error messages
    function addErrorMessage(input, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentNode.appendChild(errorMessage);
        input.classList.add('error');
        
        // Remove error class when input changes
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    }
}