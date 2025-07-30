// Flight Mode Chat - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initBackToTop();
    initHeaderScroll();
    initAnimationOnScroll();
    initGalleryLightbox();
    initFloatingElements();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px) saturate(180%)';
            header.style.borderBottomColor = 'rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.15)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation on scroll
function initAnimationOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.style.animationFillMode = 'both';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step-card, .use-case-card, .gallery-item');
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Gallery lightbox effect
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            
            // Create lightbox
            const lightbox = createLightbox(img.src, overlay.innerHTML);
            document.body.appendChild(lightbox);
            
            // Animate in
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)';
            }, 10);
        });
    });
}

function createLightbox(imageSrc, overlayContent) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imageSrc}" alt="Gallery Image">
            <div class="lightbox-info">${overlayContent}</div>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
    `;
    
    const info = lightbox.querySelector('.lightbox-info');
    info.style.cssText = `
        padding: 24px;
        color: #333;
    `;
    
    // Close functionality
    function closeLightbox() {
        lightbox.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
            closeLightbox();
        }
    });
    
    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    return lightbox;
}

// Enhanced floating elements
function initFloatingElements() {
    const floatingChats = document.querySelectorAll('.floating-chat');
    
    floatingChats.forEach((chat, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            
            chat.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
        
        // Add click interaction
        chat.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                this.style.animation = `float 6s ease-in-out infinite`;
                this.style.animationDelay = `${index * 2}s`;
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Add button ripple effect
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const phoneImage = document.querySelector('.phone-mockup');
    const floatingSignals = document.querySelector('.floating-signals');
    
    if (hero && scrolled < hero.offsetHeight) {
        const rate = scrolled * -0.3;
        const ratePhone = scrolled * -0.1;
        
        if (phoneImage) {
            phoneImage.style.transform = `translateY(${ratePhone}px)`;
        }
        
        if (floatingSignals) {
            floatingSignals.style.transform = `translate(-50%, -50%) translateY(${rate}px)`;
        }
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.animation = 'fadeInUp 0.8s ease-out forwards';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '0';
            img.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(function() {
    // Any intensive scroll operations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add intersection observer for performance
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

// Observe sections for performance optimizations
document.querySelectorAll('section').forEach(section => {
    performanceObserver.observe(section);
});

console.log('🛩️ Flight Mode Chat website loaded successfully!');