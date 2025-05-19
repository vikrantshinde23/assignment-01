// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('.section');
const header = document.querySelector('header');

// Toggle Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Highlight the active nav link on scroll
window.addEventListener('scroll', () => {
    // Get current scroll position
    let scrollPosition = window.scrollY + header.offsetHeight;
    
    // Check which section is in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            
            // Remove 'active' class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add 'active' class to corresponding link
            document.querySelector(`nav ul li a[href="#${id}"]`).classList.add('active');
        }
    });
});

// Animate elements when they come into view
const animateOnScroll = () => {
    // Get elements to animate
    const elements = document.querySelectorAll('.info-card, .achievement-card, .goals-card, .personal-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.info-card, .achievement-card, .goals-card, .personal-card');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animations on page load
    setTimeout(animateOnScroll, 300);
});

// Run animations on scroll
window.addEventListener('scroll', animateOnScroll);

// Form validation for contact form (if added later)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
};

// Dynamic year for copyright in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Theme switcher (if added later)
const themeSwitch = document.querySelector('.theme-switch');
if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save theme preference in local storage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Image lazy loading
const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
    });
};

// Execute lazy loading on page load
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add typing animation to welcome heading (optional feature)
const typingAnimation = () => {
    const welcomeHeading = document.querySelector('#welcome h2');
    if (!welcomeHeading) return;
    
    const text = welcomeHeading.textContent;
    welcomeHeading.textContent = '';
    welcomeHeading.style.borderRight = '0.1em solid var(--primary-color)';
    welcomeHeading.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
    welcomeHeading.style.whiteSpace = 'nowrap';
    welcomeHeading.style.overflow = 'hidden';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            welcomeHeading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove border and animation after typing is complete
            setTimeout(() => {
                welcomeHeading.style.borderRight = 'none';
                welcomeHeading.style.animation = 'none';
            }, 1500);
        }
    };
    
    typeWriter();
};

// Initialize typing animation after a short delay
// Uncomment this to enable the effect
// setTimeout(typingAnimation, 500);