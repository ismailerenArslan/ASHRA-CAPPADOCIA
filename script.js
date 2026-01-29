// ==================== ASHRA CAPPADOCIA WEBSITE ====================
// Ana JavaScript Dosyası
// =================================================================

// ==================== GLOBAL DEĞİŞKENLER ====================
const body = document.body;
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// ==================== LOADER ANIMATION ====================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Loader kaldırıldıktan sonra scroll'u aktif et
            body.style.overflow = 'auto';
        }, 1500);
    }
});

// ==================== MOBILE MENU TOGGLE ====================
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Menü linklerine tıklandığında menüyü kapat
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Dışarı tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar shadow effect
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
    
    lastScroll = currentScroll;
});

// ==================== PARTICLE CANVAS (Hero Section) ====================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 80;

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Canvas resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// ==================== GALLERY FILTER & LIGHTBOX ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Gallery Filter
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox
if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('h3').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.style.display = 'block';
            body.style.overflow = 'hidden';
        });
    });
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    lightbox.style.display = 'none';
    body.style.overflow = 'auto';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// ==================== FAQ ACCORDION ====================
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ==================== CONTACT FORM VALIDATION ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Basit validasyon
        if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
            showMessage('Lütfen tüm zorunlu alanları doldurun.', 'error');
            return;
        }
        
        // Email validasyonu
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Geçerli bir e-posta adresi girin.', 'error');
            return;
        }
        
        // Simüle edilmiş form gönderimi (Backend olmadığı için)
        showMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        contactForm.reset();
        
        // Gerçek uygulamada burada AJAX ile backend'e gönderilir:
        /*
        fetch('your-backend-url.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showMessage('Mesajınız başarıyla gönderildi!', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showMessage('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        });
        */
    });
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // 5 saniye sonra mesajı gizle
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ==================== SCROLL TO TOP BUTTON ====================
// Scroll to top butonu oluştur
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.setAttribute('aria-label', 'Yukarı çık');
body.appendChild(scrollTopBtn);

// Scroll event
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Click event
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== INTERSECTION OBSERVER (Scroll Animations) ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.feature-card, .room-card, .experience-item, .testimonial-card, .activity-card, .value-card, .award-item, .team-member');

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== FORM DATE RESTRICTIONS ====================
// Check-in ve check-out tarih inputları için minimum tarihi ayarla
const today = new Date().toISOString().split('T')[0];
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

if (checkinInput) {
    checkinInput.setAttribute('min', today);
    
    checkinInput.addEventListener('change', () => {
        const checkinDate = new Date(checkinInput.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        const minCheckout = checkinDate.toISOString().split('T')[0];
        
        if (checkoutInput) {
            checkoutInput.setAttribute('min', minCheckout);
            
            // Eğer checkout tarihi check-in'den önceyse, checkout'u temizle
            if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
                checkoutInput.value = '';
            }
        }
    });
}

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== COUNTER ANIMATION (Stats) ====================
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPlus = finalValue.includes('+');
                const numValue = parseInt(finalValue.replace(/\D/g, ''));
                
                animateCounter(target, numValue, isPlus);
                statObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statObserver.observe(num));
}

function animateCounter(element, target, hasPlus) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = hasPlus ? `${target}+` : target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==================== PREVENT FORM RESUBMISSION ====================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🏨 ASHRA CAPPADOCIA', 'color: #d4af37; font-size: 24px; font-weight: bold;');
console.log('%c⛰️ Kapadokya\'nın büyüsünde konaklayın!', 'color: #666; font-size: 14px;');
console.log('%cWebsite by Professional Developer', 'color: #999; font-size: 12px; font-style: italic;');

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('Bir hata oluştu:', e.error);
});

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`📊 Sayfa yükleme süresi: ${pageLoadTime}ms`);
});

console.log('✅ ASHRA CAPPADOCIA JavaScript yüklendi!');