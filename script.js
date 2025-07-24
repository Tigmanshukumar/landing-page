// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enroll Now buttons scroll to pricing section
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

   

    // Get both Enroll Now buttons
    const heroEnrollBtn = document.querySelector('.shadow__btn');
    const floatingEnrollBtn = document.querySelector('.floating-cta .hover-button');
    const pricingSection = document.querySelector('#pricing');
    
    // Add click event to hero section button
    if (heroEnrollBtn && pricingSection) {
        heroEnrollBtn.addEventListener('click', () => {
            pricingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Add click event to floating button
    if (floatingEnrollBtn && pricingSection) {
        floatingEnrollBtn.addEventListener('click', () => {
            pricingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});



// Floating shapes animation enhancement
const shapes = document.querySelectorAll('.shape');
shapes.forEach(shape => {
    shape.style.animationDuration = `${20 + Math.random() * 10}s`;
});

// Sticky header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Show/hide floating CTA
    const floatingCta = document.querySelector('.floating-cta');
    if (currentScroll > 500) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }

    // Header shadow effect
    if (currentScroll > 0) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = content.classList.contains('active');

        // Close all accordion items
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            content.classList.add('active');
        }
    });
});

// FAQ functionality
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = answer.classList.contains('active');

        // Close all FAQ answers
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked answer if it wasn't active
        if (!isActive) {
            answer.classList.add('active');
        }
    });
});

// Countdown timer
function updateCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // Set target 30 days from now

    const updateTimer = () => {
        const currentDate = new Date();
        const difference = targetDate - currentDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}

updateCountdown();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .mentor-content, .accordion-item, .pricing-card, .features h2, .pricing h2');
animateElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Testimonials slider touch support
const slider = document.querySelector('.testimonials-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

// Initialize AOS-like scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.benefit-card, .testimonial-card, .accordion-item, .faq-item');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(element);
    });
});
