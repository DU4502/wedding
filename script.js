// ==================== ULTRA-PREMIUM WEDDING INVITATION SCRIPT ====================

document.addEventListener('DOMContentLoaded', function() {
    initEnvelopeOpening();
    initSound();
    initCountdown();
    initScrollAnimations();
    initSlideImages();
    initFallingHearts();
    initFireworks();
    initGallerySlideshow();
    initWishesCarousel();
    initFormSubmission();
    initParallax();
    initLetterByLetter();
    initInteractiveEffects();
    initPerformanceOptimizations();
});

// ==================== PREMIUM REALISTIC ENVELOPE OPENING ====================
function initEnvelopeOpening() {
    const overlay = document.getElementById('envelopeOverlay');
    if (!overlay) return;
    
    const openBtn = overlay.querySelector('.envelope-open-btn');
    const envelopeWrapper = overlay.querySelector('.envelope-wrapper');
    const bgMusic = document.getElementById('bgMusic');
    const bodyElement = document.body;
    
    if (!openBtn || !envelopeWrapper) return;
    
    // Show overlay
    bodyElement.classList.add('envelope-open');
    overlay.style.display = 'flex';
    
    // Subtle parallax on mouse move
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    overlay.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
    });
    
    function animateParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        if (envelopeWrapper && !envelopeWrapper.classList.contains('opening')) {
            envelopeWrapper.style.transform = `rotateY(${currentX * 0.5}deg) rotateX(${-currentY * 0.5}deg)`;
        }
        
        requestAnimationFrame(animateParallax);
    }
    animateParallax();
    
    // Button click handler
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🎬 Opening envelope...');
        
        // Disable button
        openBtn.style.pointerEvents = 'none';
        openBtn.style.opacity = '0';
        
        // Allow scroll immediately
        bodyElement.classList.remove('envelope-open');
        
        // Start music
        if (bgMusic) {
            bgMusic.volume = 0;
            bgMusic.play().then(() => {
                fadeInAudio(bgMusic, 0.5, 2000);
            }).catch(() => {});
        }
        
        // ANIMATION SEQUENCE
        // Step 1: Open envelope flap (0-1s)
        setTimeout(() => {
            envelopeWrapper.classList.add('opening');
            createSparkles();
        }, 100);
        
        // Step 2: Card slides out (happens automatically via CSS)
        // Step 3: Blur background (1.5s)
        setTimeout(() => {
            overlay.querySelector('.cinematic-bg').style.filter = 'blur(10px)';
            overlay.querySelector('.cinematic-bg').style.transition = 'filter 0.8s ease-out';
        }, 1500);
        
        // Step 4: Fade to main page (2.5s)
        setTimeout(() => {
            overlay.classList.add('transitioning');
            
            // Show hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.opacity = '0';
                hero.style.transform = 'scale(1.1)';
                hero.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                requestAnimationFrame(() => {
                    hero.style.opacity = '1';
                    hero.style.transform = 'scale(1)';
                });
            }
        }, 2500);
        
        // Step 5: Remove overlay (3.5s)
        setTimeout(() => {
            overlay.style.display = 'none';
            triggerContentAnimations();
        }, 3500);
    });
    
    // Touch support
    openBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        openBtn.click();
    }, { passive: false });
}

// Create sparkle particles when card emerges
function createSparkles() {
    const container = document.querySelector('.particle-container');
    if (!container) return;
    
    const particles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.cssText = `
                position: absolute;
                left: ${45 + Math.random() * 10}%;
                top: ${40 + Math.random() * 20}%;
                font-size: ${Math.random() * 15 + 10}px;
                opacity: 0;
                pointer-events: none;
                animation: sparkleFloat ${Math.random() * 1.5 + 1}s ease-out forwards;
            `;
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }, i * 50);
    }
    
    // Add sparkle animation
    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 0;
                    transform: translateY(0) scale(0);
                }
                50% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(1) rotate(180deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Trigger smooth content animations
function triggerContentAnimations() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'heroContentReveal 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    }
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        section.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Create floating particles in background
function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    
    const particles = ['❤️', '💕', '💗', '🌸', '🌹', '✨'];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 15}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            pointer-events: none;
            animation: floatAround ${Math.random() * 10 + 15}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatAround {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Create magical explosion when button clicked
function createMagicalExplosion() {
    const container = document.querySelector('.magical-particles');
    if (!container) return;
    
    const particles = ['❤️', '💕', '💗', '💖', '💘', '✨', '🌟', '⭐', '💫', '🌸', '🌹'];
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            
            const angle = (Math.PI * 2 / particleCount) * i;
            const velocity = Math.random() * 300 + 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                font-size: ${Math.random() * 25 + 20}px;
                pointer-events: none;
                z-index: 10000;
                animation: particleExplode${i} ${Math.random() * 1.5 + 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            `;
            
            // Create unique animation for each particle
            const keyframes = `
                @keyframes particleExplode${i} {
                    0% {
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
                styleSheet.remove();
            }, 3000);
        }, i * 15);
    }
}

// Add particle explosion animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleExplode {
        to {
            transform: translate(
                calc(-50% + ${Math.random() * 400 - 200}px),
                calc(-50% + ${Math.random() * 400 - 200}px)
            ) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
    @keyframes heroZoomIn {
        from {
            transform: scale(1.2);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ==================== AUDIO FADE UTILITY ====================
function fadeInAudio(audio, targetVolume, duration) {
    const steps = 50;
    const stepDuration = duration / steps;
    const volumeIncrement = targetVolume / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(interval);
            audio.volume = targetVolume;
            return;
        }
        audio.volume = Math.min(volumeIncrement * currentStep, targetVolume);
        currentStep++;
    }, stepDuration);
}

function fadeOutAudio(audio, duration) {
    const startVolume = audio.volume;
    const steps = 50;
    const stepDuration = duration / steps;
    const volumeDecrement = startVolume / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(interval);
            audio.pause();
            audio.volume = startVolume;
            return;
        }
        audio.volume = Math.max(startVolume - (volumeDecrement * currentStep), 0);
        currentStep++;
    }, stepDuration);
}

// ==================== SOUND CONTROL WITH PULSE ====================
function initSound() {
    const soundBtn = document.getElementById('soundToggle');
    const bgMusic = document.getElementById('bgMusic');
    const soundOn = soundBtn.querySelector('.sound-on');
    const soundOff = soundBtn.querySelector('.sound-off');
    const soundPulse = soundBtn.querySelector('.sound-pulse');
    let isPlaying = false;

    // Set volume
    bgMusic.volume = 0.5;
    
    // KHÔNG TỰ ĐỘNG PHÁT NHẠC NỮA
    // Nhạc chỉ phát khi nhấn nút "Mở thiệp mời"
    
    // Kiểm tra trạng thái nhạc
    bgMusic.addEventListener('play', function() {
        isPlaying = true;
        soundOn.style.display = 'block';
        soundOff.style.display = 'none';
    });
    
    bgMusic.addEventListener('pause', function() {
        isPlaying = false;
        soundOn.style.display = 'none';
        soundOff.style.display = 'block';
    });
    
    // Hiển thị icon mặc định (tắt)
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';

    // Toggle sound
    soundBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isPlaying) {
            fadeOutAudio(bgMusic, 500);
            soundOn.style.display = 'none';
            soundOff.style.display = 'block';
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                fadeInAudio(bgMusic, 0.5, 500);
                soundOn.style.display = 'block';
                soundOff.style.display = 'none';
                isPlaying = true;
            });
        }
    });
}

// ==================== LETTER-BY-LETTER ANIMATION ====================
function initLetterByLetter() {
    const elements = document.querySelectorAll('.letter-by-letter');
    
    elements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        const letters = text.split('');
        letters.forEach((letter, i) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `letterFadeIn 0.1s ease forwards ${(index * 0.5) + (i * 0.05)}s`;
            element.appendChild(span);
        });
    });
}

// ==================== COUNTDOWN TIMER ====================
function initCountdown() {
    const weddingDate = new Date('2026-02-27T08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<p style="font-size: 2rem; color: var(--gold);">Hôm nay là ngày trọng đại! 🎉</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        animateNumber('days', days);
        animateNumber('hours', hours);
        animateNumber('minutes', minutes);
        animateNumber('seconds', seconds);
    }

    function animateNumber(id, newValue) {
        const element = document.getElementById(id);
        const currentValue = parseInt(element.textContent);
        
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.3) rotateY(360deg)';
            element.textContent = String(newValue).padStart(2, '0');
            setTimeout(() => {
                element.style.transform = 'scale(1) rotateY(0deg)';
            }, 300);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ==================== SLIDE IMAGES ON SCROLL ====================
function initSlideImages() {
    const slideContainers = document.querySelectorAll('.slide-images');
    const isMobile = window.innerWidth <= 768;
    
    // Function để check nếu element trong viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const threshold = isMobile ? 100 : 50;
        
        return (
            rect.top <= windowHeight - threshold &&
            rect.bottom >= threshold
        );
    }
    
    // Function để activate images
    function activateImages(container) {
        const images = container.querySelectorAll('.slide-img');
        images.forEach((img, index) => {
            if (!img.classList.contains('active')) {
                setTimeout(() => {
                    img.classList.add('active');
                }, index * 300);
            }
        });
    }
    
    // Function để check tất cả containers
    function checkSlideImages() {
        slideContainers.forEach(container => {
            if (isInViewport(container)) {
                activateImages(container);
            } else if (!isMobile) {
                // Chỉ remove trên desktop
                const images = container.querySelectorAll('.slide-img');
                images.forEach(img => {
                    img.classList.remove('active');
                });
            }
        });
    }
    
    // Sử dụng IntersectionObserver nếu có hỗ trợ
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0,
            rootMargin: isMobile ? '50px 0px' : '0px 0px'
        };
        
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activateImages(entry.target);
                } else if (!isMobile) {
                    const images = entry.target.querySelectorAll('.slide-img');
                    images.forEach(img => {
                        img.classList.remove('active');
                    });
                }
            });
        }, observerOptions);

        slideContainers.forEach(container => {
            slideObserver.observe(container);
        });
    }
    
    // Fallback: sử dụng scroll event (đặc biệt quan trọng cho mobile)
    let scrollTimeout;
    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkSlideImages, 50);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkSlideImages, { passive: true });
    
    // Check ngay khi load
    setTimeout(checkSlideImages, 100);
    setTimeout(checkSlideImages, 500);
    setTimeout(checkSlideImages, 1000);
}

// ==================== FALLING HEARTS WITH DEPTH ====================
function initFallingHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['❤️', '💕', '💗', '💖', '💘', '🌹', '🌸', '🏵️', '✨', '💐'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.zIndex = Math.floor(Math.random() * 3) + 1;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    setInterval(createHeart, 500);
    
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// ==================== INTERACTIVE EFFECTS ====================
function initInteractiveEffects() {
    // Tap anywhere for heart ripple
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') {
            return;
        }
        createRipple(e.clientX, e.clientY);
    });
    
    // Touch support
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') {
            return;
        }
        const touch = e.touches[0];
        createRipple(touch.clientX, touch.clientY);
    }, { passive: true });
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.innerHTML = '❤️';
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: rippleEffect 1s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== GALLERY SLIDESHOW ====================
function initGallerySlideshow() {
    const track = document.getElementById('galleryTrack');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const dotsContainer = document.getElementById('galleryDots');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isTransitioning = false;
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.gallery-dot');
    
    function updateSlideshow(smooth = true) {
        if (smooth) {
            track.style.transition = 'transform 0.5s ease-in-out';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        if (isTransitioning) return;
        currentIndex = index;
        updateSlideshow();
        resetAutoSlide();
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex++;
        updateSlideshow();
        
        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                currentIndex = 0;
                updateSlideshow(false);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        if (currentIndex === 0) {
            currentIndex = totalSlides - 1;
            updateSlideshow(false);
            setTimeout(() => {
                isTransitioning = false;
            }, 50);
        } else {
            currentIndex--;
            updateSlideshow();
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 2000);
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (diff > swipeThreshold) {
            nextSlide();
            resetAutoSlide();
        } else if (diff < -swipeThreshold) {
            prevSlide();
            resetAutoSlide();
        }
    }
    
    autoSlideInterval = setInterval(nextSlide, 2000);
}

// ==================== WISHES CAROUSEL ====================
function initWishesCarousel() {
    const track = document.getElementById('wishesTrack');
    const prevBtn = document.getElementById('wishesPrev');
    const nextBtn = document.getElementById('wishesNext');
    const dotsContainer = document.getElementById('wishesDots');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    function updateCarousel() {
        const slides = track.querySelectorAll('.wish-card');
        const totalSlides = slides.length;
        
        if (totalSlides === 0) return;
        
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        const dots = dotsContainer.querySelectorAll('.wish-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function createDots() {
        const slides = track.querySelectorAll('.wish-card');
        dotsContainer.innerHTML = '';
        
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'wish-dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    function goToSlide(index) {
        const slides = track.querySelectorAll('.wish-card');
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    function nextSlide() {
        const slides = track.querySelectorAll('.wish-card');
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    function prevSlide() {
        const slides = track.querySelectorAll('.wish-card');
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 4000);
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (diff > swipeThreshold) {
            nextSlide();
            resetAutoSlide();
        } else if (diff < -swipeThreshold) {
            prevSlide();
            resetAutoSlide();
        }
    }
    
    createDots();
    updateCarousel();
    autoSlideInterval = setInterval(nextSlide, 4000);
}

// ==================== FORM SUBMISSION WITH HEART BURST ====================
function initFormSubmission() {
    const rsvpForm = document.getElementById('rsvpForm');
    const wishesTrack = document.getElementById('wishesTrack');
    const guestsGroup = document.getElementById('guestsGroup');
    const guestsInput = document.getElementById('rsvpGuests');
    
    // Troll button
    const noButton = document.querySelector('.attendance-option:last-child');
    let trollCount = 0;
    const maxTrollCount = 20;
    
    function moveNoButton() {
        if (trollCount < maxTrollCount) {
            const maxX = 400;
            const maxY = 300;
            
            const randomX = (Math.random() - 0.5) * maxX;
            const randomY = (Math.random() - 0.5) * maxY;
            
            noButton.style.position = 'relative';
            noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
            noButton.style.transition = 'transform 0.15s ease';
            noButton.style.zIndex = '100';
            
            trollCount++;
            
            if (trollCount === 5) {
                showNotification('Tôi sẽ buồn đó 😔');
            } else if (trollCount === 10) {
                showNotification('Tôi sẽ rất buồn thật đó 😢');
            } else if (trollCount === 15) {
                showNotification('Tôi buồn vì bạn không tới được 💔');
            } else if (trollCount === maxTrollCount) {
                setTimeout(() => {
                    noButton.style.transform = 'translate(0, 0)';
                    showNotification('😢 😢 😢 😢 😢 😢');
                }, 200);
            }
        }
    }
    
    let lastTouchTime = 0;
    
    // Xử lý touch cho mobile - mỗi lần tap = 1 lần nhảy
    noButton.addEventListener('touchend', function(e) {
        const now = Date.now();
        // Tránh double tap
        if (now - lastTouchTime < 300) {
            return;
        }
        lastTouchTime = now;
        
        if (!this.querySelector('input[type="radio"]').checked && trollCount < maxTrollCount) {
            e.preventDefault();
            e.stopPropagation();
            moveNoButton();
        }
    }, { passive: false });
    
    // Chặn touchstart để tránh hiệu ứng mặc định
    noButton.addEventListener('touchstart', function(e) {
        if (!this.querySelector('input[type="radio"]').checked && trollCount < maxTrollCount) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Xử lý click cho desktop - mỗi lần click = 1 lần nhảy
    noButton.addEventListener('click', function(e) {
        if (!this.querySelector('input[type="radio"]').checked && trollCount < maxTrollCount) {
            e.preventDefault();
            e.stopPropagation();
            moveNoButton();
        }
    });
    
    // Show/hide guests input
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                guestsGroup.style.display = 'block';
                guestsInput.required = true;
            } else {
                guestsGroup.style.display = 'none';
                guestsInput.required = false;
                guestsInput.value = '';
                trollCount = 0;
                noButton.style.transform = 'translate(0, 0)';
            }
        });
    });
    
    guestsGroup.style.display = 'none';
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const attendanceChecked = document.querySelector('input[name="attendance"]:checked');
        if (!attendanceChecked) {
            showNotification('⚠️ Vui lòng chọn Tham dự hoặc Không tham dự!');
            return;
        }
        
        const name = document.getElementById('rsvpName').value;
        const attendance = attendanceChecked.value;
        const message = document.getElementById('wishMessage').value;
        
        if (attendance === 'yes' && !document.getElementById('rsvpGuests').value) {
            showNotification('⚠️ Vui lòng nhập số người tham dự!');
            return;
        }
        
        // Heart burst animation
        createHeartBurst(rsvpForm);
        
        if (attendance === 'yes') {
            showNotification(`Cảm ơn ${name} đã xác nhận tham dự! 💕`);
        } else {
            showNotification(`Cảm ơn ${name} đã phản hồi! Rất tiếc bạn không thể tham dự. 💐`);
        }
        
        if (message.trim()) {
            const wishCard = document.createElement('div');
            wishCard.className = 'wish-card';
            wishCard.innerHTML = `
                <p class="wish-content">"${message}"</p>
                <p class="wish-author">- ${name}</p>
            `;
            wishCard.style.opacity = '0';
            wishCard.style.transform = 'scale(0.8)';
            wishesTrack.appendChild(wishCard);
            
            setTimeout(() => {
                wishCard.style.transition = 'all 0.5s ease';
                wishCard.style.opacity = '1';
                wishCard.style.transform = 'scale(1)';
            }, 100);
            
            addWishToTicker(name, message);
            initWishesCarousel();
        }
        
        rsvpForm.reset();
        guestsGroup.style.display = 'none';
        trollCount = 0;
        noButton.style.transform = 'translate(0, 0)';
    });
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: ${Math.random() * 20 + 15}px;
                pointer-events: none;
                z-index: 10000;
                animation: heartBurst ${Math.random() * 1 + 1}s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 30);
    }
}

const heartBurstStyle = document.createElement('style');
heartBurstStyle.textContent = `
    @keyframes heartBurst {
        to {
            transform: translate(
                ${Math.random() * 400 - 200}px,
                ${Math.random() * 400 - 200}px
            ) rotate(${Math.random() * 720}deg) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartBurstStyle);

// ==================== ADD WISH TO TICKER ====================
function addWishToTicker(name, message) {
    const tickerContent = document.getElementById('tickerContent');
    
    const wishSpan = document.createElement('span');
    wishSpan.innerHTML = `💌 ${name}: "${message}"`;
    
    const allSpans = tickerContent.querySelectorAll('span');
    
    if (allSpans.length >= 4) {
        allSpans[3].insertAdjacentElement('afterend', wishSpan);
    } else {
        tickerContent.appendChild(wishSpan);
    }
    
    const totalSpans = tickerContent.querySelectorAll('span');
    if (totalSpans.length > 20) {
        totalSpans[19].remove();
    }
}

// ==================== NOTIFICATION ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, white 0%, #f1f8e9 100%);
        padding: 30px 50px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        font-size: 1.3rem;
        color: var(--secondary-color);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 2px solid var(--gold);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    const hero = document.querySelector('.hero');
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ==================== FIREWORKS EFFECT ====================
function initFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 998;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let fireworks = [];
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff85a1', '#ffc75f', '#845ec2'];
    
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * (canvas.height * 0.5) + 50;
            this.speed = 3 + Math.random() * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.trail = [];
        }
        
        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 10) this.trail.shift();
            
            this.y -= this.speed;
            
            if (this.y <= this.targetY) {
                this.explode();
                return false;
            }
            return true;
        }
        
        explode() {
            const particleCount = 50 + Math.floor(Math.random() * 30);
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 / particleCount) * i;
                const speed = 2 + Math.random() * 3;
                particles.push(new Particle(this.x, this.y, angle, speed, this.color));
            }
        }
        
        draw() {
            for (let i = 0; i < this.trail.length; i++) {
                const alpha = i / this.trail.length;
                ctx.beginPath();
                ctx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
                ctx.fill();
            }
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    class Particle {
        constructor(x, y, angle, speed, color) {
            this.x = x;
            this.y = y;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.color = color;
            this.alpha = 1;
            this.decay = 0.015 + Math.random() * 0.01;
            this.gravity = 0.05;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.vx *= 0.99;
            this.alpha -= this.decay;
            return this.alpha > 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace(')', `, ${this.alpha})`).replace('rgb', 'rgba');
            ctx.fill();
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        fireworks = fireworks.filter(fw => {
            fw.draw();
            return fw.update();
        });
        
        particles = particles.filter(p => {
            p.draw();
            return p.update();
        });
        
        requestAnimationFrame(animate);
    }
    
    function launchFirework() {
        if (Math.random() < 0.3) {
            fireworks.push(new Firework());
        }
    }
    
    setInterval(launchFirework, 800);
    animate();
    
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => fireworks.push(new Firework()), i * 300);
        }
    }, 1000);
}

// ==================== CONFETTI ON FOOTER ====================
function createConfetti() {
    const colors = ['#d4af37', '#e8c4a0', '#ff6b6b', '#ffd93d', '#6bcb77'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            createConfetti();
            footerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const footer = document.querySelector('.footer');
if (footer) footerObserver.observe(footer);

// ==================== PERFORMANCE OPTIMIZATIONS ====================
function initPerformanceOptimizations() {
    // Pause animations when tab is inactive
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('tab-inactive');
        } else {
            document.body.classList.remove('tab-inactive');
        }
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Reduce motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.body.style.setProperty('--animation-duration', '0.01ms');
    }
}

// ==================== INITIALIZE FIREWORKS ====================
initFireworks();

// ==================== MOBILE UX OPTIMIZATIONS ====================

// Detect mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Detect low-end device
const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;

// Initialize mobile-specific features
if (isMobile) {
    initMobileOptimizations();
    initTouchInteractions();
    initMobileAudio();
    initHapticFeedback();
    initSwipeGestures();
}

// ==================== MOBILE OPTIMIZATIONS ====================
function initMobileOptimizations() {
    // Reduce particle count on mobile
    const heartsContainer = document.getElementById('hearts-container');
    if (heartsContainer) {
        const originalCreateHeart = window.createHeart;
        window.heartInterval = isLowEndDevice ? 1000 : 700; // Slower on low-end
        window.maxHearts = isLowEndDevice ? 10 : 20;
    }
    
    // Disable heavy effects on low-end devices
    if (isLowEndDevice) {
        document.querySelector('.light-rays')?.remove();
        document.querySelector('.film-grain')?.remove();
        const canvas = document.getElementById('fireworks-canvas');
        if (canvas) canvas.remove();
    }
    
    // Optimize animations for mobile
    document.documentElement.style.setProperty('--animation-duration', isMobile ? '0.4s' : '0.6s');
    
    // Fix iOS viewport height
    if (isIOS) {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH);
    }
    
    // Prevent zoom on double-tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 150);
    }, { passive: true });
}

// ==================== TOUCH INTERACTIONS ====================
function initTouchInteractions() {
    // Long-press heart pulse effect
    const interactiveElements = document.querySelectorAll('.person-image, .event-card, .wish-card');
    
    interactiveElements.forEach(element => {
        let pressTimer;
        
        element.addEventListener('touchstart', function(e) {
            pressTimer = setTimeout(() => {
                createLongPressEffect(e.touches[0].clientX, e.touches[0].clientY);
                // Vibrate if supported
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 500);
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            clearTimeout(pressTimer);
        });
        
        element.addEventListener('touchmove', function() {
            clearTimeout(pressTimer);
        });
    });
    
    // Tap to reveal text animation
    const revealElements = document.querySelectorAll('.invitation-text, .person .quote');
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 300);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(element);
    });
}

function createLongPressEffect(x, y) {
    const pulse = document.createElement('div');
    pulse.innerHTML = '💕';
    pulse.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 30px;
        pointer-events: none;
        z-index: 10000;
        animation: longPressPulse 1s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(pulse);
    
    setTimeout(() => pulse.remove(), 1000);
}

const longPressStyle = document.createElement('style');
longPressStyle.textContent = `
    @keyframes longPressPulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(longPressStyle);

// ==================== MOBILE AUDIO ====================
function initMobileAudio() {
    const bgMusic = document.getElementById('bgMusic');
    const soundBtn = document.getElementById('soundToggle');
    
    // Ensure music only starts after user interaction on mobile
    let hasInteracted = false;
    
    const startAudioOnInteraction = () => {
        if (!hasInteracted && bgMusic) {
            hasInteracted = true;
            bgMusic.play().then(() => {
                fadeInAudio(bgMusic, 0.4, 1000); // Lower volume on mobile
            }).catch(() => {});
        }
    };
    
    // Listen for first interaction
    ['touchstart', 'click'].forEach(event => {
        document.addEventListener(event, startAudioOnInteraction, { once: true, passive: true });
    });
    
    // Make sound button more prominent on mobile
    if (soundBtn && isMobile) {
        soundBtn.style.width = '52px';
        soundBtn.style.height = '52px';
        soundBtn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
}

// ==================== HAPTIC FEEDBACK (CSS-based) ====================
function initHapticFeedback() {
    // Visual haptic feedback for buttons
    const buttons = document.querySelectorAll('button, .map-btn, .submit-btn, .attendance-option');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            // Vibrate if supported
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
    
    // Submit button special feedback
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            if (navigator.vibrate) {
                navigator.vibrate([50, 30, 50]); // Pattern vibration
            }
        });
    }
}

// ==================== SWIPE GESTURES ====================
function initSwipeGestures() {
    // Swipe up on hero to continue
    const hero = document.querySelector('.hero');
    let touchStartY = 0;
    let touchEndY = 0;
    
    hero.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    hero.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleHeroSwipe();
    }, { passive: true });
    
    function handleHeroSwipe() {
        const swipeDistance = touchStartY - touchEndY;
        const swipeThreshold = 50;
        
        if (swipeDistance > swipeThreshold) {
            // Swipe up detected - scroll to next section
            const countdownSection = document.querySelector('.countdown-section');
            if (countdownSection) {
                countdownSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Visual feedback
                createSwipeIndicator();
            }
        }
    }
    
    function createSwipeIndicator() {
        const indicator = document.createElement('div');
        indicator.innerHTML = '↓';
        indicator.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            color: white;
            pointer-events: none;
            z-index: 1000;
            animation: swipeIndicatorFade 1s ease-out forwards;
        `;
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), 1000);
    }
}

const swipeStyle = document.createElement('style');
swipeStyle.textContent = `
    @keyframes swipeIndicatorFade {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
        }
    }
    
    /* Smooth scrolling on mobile */
    html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
    }
    
    /* Prevent overscroll bounce on iOS */
    body {
        overscroll-behavior-y: none;
    }
    
    /* Optimize touch scrolling */
    .gallery-slideshow,
    .wishes-carousel {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
    }
`;
document.head.appendChild(swipeStyle);

// ==================== MOBILE PERFORMANCE MONITORING ====================
function initMobilePerformance() {
    // Detect battery level and adjust effects
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2 || battery.charging === false) {
                // Low battery - reduce effects
                document.body.classList.add('low-battery-mode');
                
                // Disable heavy animations
                document.querySelectorAll('.heart').forEach(heart => {
                    heart.style.animationDuration = '8s'; // Slower
                });
                
                // Remove fireworks
                const canvas = document.getElementById('fireworks-canvas');
                if (canvas) canvas.remove();
            }
        });
    }
    
    // Monitor frame rate
    let lastTime = performance.now();
    let frames = 0;
    let fps = 60;
    
    function measureFPS() {
        const currentTime = performance.now();
        frames++;
        
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
            
            // If FPS drops below 30, reduce effects
            if (fps < 30) {
                document.body.classList.add('low-performance-mode');
                
                // Reduce particle count
                const hearts = document.querySelectorAll('.heart');
                hearts.forEach((heart, index) => {
                    if (index % 2 === 0) heart.remove();
                });
            }
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    if (isMobile) {
        requestAnimationFrame(measureFPS);
    }
}

// ==================== MOBILE FORM ENHANCEMENTS ====================
function initMobileFormEnhancements() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add focus indicator
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
        
        // Prevent zoom on iOS
        if (isIOS) {
            input.style.fontSize = '16px';
        }
    });
    
    // Auto-scroll to input when keyboard appears
    if (isMobile) {
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300); // Wait for keyboard animation
            });
        });
    }
}

// Add mobile form styles
const mobileFormStyle = document.createElement('style');
mobileFormStyle.textContent = `
    .input-focused {
        transform: scale(1.02);
        transition: transform 0.2s ease;
    }
    
    @media (max-width: 768px) {
        /* Optimize for mobile keyboard */
        .rsvp-form {
            margin-bottom: 100px; /* Space for keyboard */
        }
        
        /* Sticky submit button on mobile */
        .submit-btn {
            position: sticky;
            bottom: 20px;
            z-index: 100;
        }
    }
    
    /* Low battery mode styles */
    .low-battery-mode .light-rays,
    .low-battery-mode .film-grain,
    .low-battery-mode #fireworks-canvas {
        display: none !important;
    }
    
    .low-battery-mode .heart {
        animation-duration: 10s !important;
    }
    
    /* Low performance mode */
    .low-performance-mode .slide-img,
    .low-performance-mode .heart:nth-child(n+10) {
        display: none !important;
    }
`;
document.head.appendChild(mobileFormStyle);

// Initialize mobile form enhancements
if (isMobile) {
    initMobileFormEnhancements();
    initMobilePerformance();
}

// ==================== MOBILE ORIENTATION CHANGE ====================
window.addEventListener('orientationchange', function() {
    // Recalculate viewport height
    setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100);
});

// ==================== MOBILE NETWORK DETECTION ====================
if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        // Reduce quality on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');
            
            // Disable heavy effects
            document.querySelector('.light-rays')?.remove();
            document.querySelector('.film-grain')?.remove();
            document.getElementById('fireworks-canvas')?.remove();
        }
    }
}

// Log mobile optimization status
if (isMobile) {
    console.log('🎬 Mobile Optimizations Active');
    console.log('📱 Device:', isIOS ? 'iOS' : isAndroid ? 'Android' : 'Other');
    console.log('⚡ Performance:', isLowEndDevice ? 'Low-end mode' : 'Standard mode');
    console.log('👆 Touch:', isTouchDevice ? 'Enabled' : 'Disabled');
}
