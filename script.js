// ============================================
// PORTFOLIO - MAURICIO CHAILA
// JavaScript Interactions & Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // CURSOR GLOW EFFECT
    // ============================================
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '0.5';
        });
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // MOBILE NAV TOGGLE
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;
    
    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Trigger counters when hero section is in view
    const heroSection = document.querySelector('.hero');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.3
    });
    
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll(
        '.section-header, .about-text, .about-details, .skill-category, .project-card, .contact-text, .contact-links'
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // SKILL TAGS HOVER EFFECT
    // ============================================
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // PROJECT CARDS TILT EFFECT
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    
    if (window.innerWidth > 768) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
    
    // ============================================
    // TYPING EFFECT FOR SUBTITLE (Optional)
    // ============================================
    const subtitle = document.querySelector('.hero-subtitle');
    
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing after initial animations
        setTimeout(typeWriter, 1500);
    }
    
    // ============================================
    // PARALLAX EFFECT FOR ORBS
    // ============================================
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (window.innerWidth > 768 && orbs.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            orbs.forEach((orb, index) => {
                const speed = index === 0 ? 0.3 : 0.2;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }
    
    // ============================================
    // COPY EMAIL FUNCTION
    // ============================================
    const emailLink = document.querySelector('a[href^="mailto:"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Allow default mailto behavior but also copy to clipboard
            const email = this.href.replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                // Show a subtle notification
                const notification = document.createElement('div');
                notification.textContent = 'Email copied!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--accent-gradient);
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            });
        });
    }
    
    // Add slideIn animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
    
    // ============================================
    // LANGUAGE DETECTION REDIRECT
    // ============================================
    // Commented out - enable if you have Spanish version
    /*
    const userLanguage = navigator.language || navigator.userLanguage;
    if (userLanguage.startsWith('es') && !window.location.pathname.includes('/es/')) {
        window.location.href = 'es/index.html';
    }
    */
    
    console.log('Portfolio loaded successfully! 🚀');
});
