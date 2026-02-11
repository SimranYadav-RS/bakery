// script.js - Updated Navigation (removed banquet reference)

class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        this.nextBtn = document.querySelector('.next');
        this.prevBtn = document.querySelector('.prev');
        
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        this.startAutoSlide();
        
        document.querySelector('.hero').addEventListener('mouseenter', () => this.pauseAutoSlide());
        document.querySelector('.hero').addEventListener('mouseleave', () => this.startAutoSlide());
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    updateSlider() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }
}

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                this.navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        this.updateActiveNav();
        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    updateActiveNav() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === '#home')) {
                link.classList.add('active');
            }
        });
    }
}

class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    submitForm() {
        const formData = new FormData(this.form);
        const name = this.form.querySelector('input[type="text"]').value;
        
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
            this.form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    }
}

class MenuCards {
    constructor() {
        this.cards = document.querySelectorAll('.menu-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
}

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
    new Navigation();
    new ContactForm();
    new MenuCards();
    new ScrollAnimations();
});

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
