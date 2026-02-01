// CYBER_RESUME.JS - FINAL OPTIMIZED

document.addEventListener('DOMContentLoaded', function() {
    initBootSequence();
    initSmoothScrolling();
    initTypingEffects();
    initGlitchEffects();
    initCursorEffect();
    initProjectInteractions();
    initContactForm();
    initScrollRevealAnimations();
    initDustEffect();
    initSkillSystem();
    initSmartNav();
    initDownloadSystem();
    initCertModal();
    
    console.log('%c CYBER_RESUME.SYSTEM READY ', 'background: #00ffff; color: #000; font-size: 16px; padding: 5px;');
});

// BOOT
function initBootSequence() {
    const bootSequence = document.getElementById('boot-sequence');
    const mainInterface = document.getElementById('main-interface');
    if (bootSequence && mainInterface) {
        setTimeout(() => {
            bootSequence.style.opacity = '0';
            setTimeout(() => {
                bootSequence.style.display = 'none';
                mainInterface.classList.add('active');
            }, 1000);
        }, 3000);
    }
}

// SMOOTH SCROLL
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav-terminal')?.offsetHeight || 60;
                window.scrollTo({
                    top: target.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// OPTIMIZED SKILLS (0% -> 90%)
function initSkillSystem() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const skillBars = document.querySelectorAll('.skill-fill');
    const skillPercents = document.querySelectorAll('.skill-percent');

    skillBars.forEach(bar => {
        bar.style.setProperty('--target-width', (bar.getAttribute('data-level') / 100));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);

    function animateSkills() {
        skillBars.forEach((bar, index) => {
            setTimeout(() => bar.classList.add('active'), index * 100);
        });
        skillPercents.forEach((counter, index) => {
            let target = 0;
            const bar = counter.closest('.skill-item').querySelector('.skill-fill');
            if (bar) target = +bar.getAttribute('data-level');
            if (!target) return;

            setTimeout(() => {
                const duration = 1500;
                const start = performance.now();
                function step(time) {
                    const progress = Math.min((time - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 4);
                    counter.textContent = Math.floor(ease * target) + '%';
                    if (progress < 1) requestAnimationFrame(step);
                    else counter.textContent = target + '%';
                }
                requestAnimationFrame(step);
            }, index * 100);
        });
    }
}

// SCROLL REVEAL
function initScrollRevealAnimations() {
    const elements = document.querySelectorAll('.skill-item, .timeline-item, .project-card, .node-item, .cert-card');
    elements.forEach(el => {
        el.classList.add('reveal');
        el.classList.add('reveal-fade-up');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// DUST EFFECT (OPTIMIZED - NO SCROLL LAG)
function initDustEffect() {
    if (window.innerWidth <= 768) return;
    
    // Stop dust during scrolling to prevent lag
    let isScrolling;
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => isScrolling = false, 100);
    }, { passive: true });

    document.querySelectorAll('.project-card, .skill-item, .cert-card').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            if (isScrolling) return; 

            const burst = document.createElement('div');
            burst.style.position = 'fixed';
            burst.style.left = e.clientX + 'px';
            burst.style.top = e.clientY + 'px';
            burst.style.width = '10px'; burst.style.height = '10px';
            burst.style.background = 'transparent';
            burst.style.boxShadow = '0 0 20px 10px rgba(0,255,255,0.4)';
            burst.style.borderRadius = '50%';
            burst.style.pointerEvents = 'none';
            burst.style.zIndex = '9998';
            document.body.appendChild(burst);
            
            burst.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(4)', opacity: 0 }
            ], { duration: 500 }).onfinish = () => burst.remove();
        });
    });
}

// TYPING
function initTypingEffects() {
    const el = document.querySelector('.typing-text');
    if (!el) return;
    const text = el.getAttribute('data-text');
    
    // DELAY START BY 1.5 SECONDS
    setTimeout(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
            el.textContent = text.substring(0, i + 1);
            i++;
            if (i >= text.length) clearInterval(typeInterval);
        }, 30);
    }, 1500); // <--- Increased delay
}

// GLITCH
function initGlitchEffects() {
    document.querySelectorAll('.name-glitch').forEach(el => {
        setInterval(() => {
            el.style.animation = 'none';
            setTimeout(() => el.style.animation = '', 10);
        }, 5000);
    });
}

// CURSOR
function initCursorEffect() {
    if (window.innerWidth <= 768) return;
    let timer;
    document.addEventListener('mousemove', (e) => {
        if (!timer) {
            timer = setTimeout(() => {
                createParticle(e.clientX, e.clientY);
                timer = null;
            }, 50);
        }
    });

    function createParticle(x, y) {
        const p = document.createElement('div');
        p.className = 'cursor-particle';
        p.style.left = x + 'px'; p.style.top = y + 'px';
        p.style.position = 'fixed'; p.style.width = '3px'; p.style.height = '3px';
        p.style.background = '#00ffff'; p.style.pointerEvents = 'none'; p.style.zIndex = '9999';
        p.style.borderRadius = '50%';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 30;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 1000, easing: 'ease-out' }).onfinish = () => p.remove();
        
        document.body.appendChild(p);
    }
}

// INTERACTIONS
function initProjectInteractions() {
    document.querySelectorAll('.cyber-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(0, 0, 0, 0.3)'; 
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            console.log('Redirecting to secure repository...');
        });
    });
}

function initContactForm() {
    document.querySelectorAll('.node-item').forEach(node => {
        node.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) window.open(link.href, '_blank');
        });
    });
}
// SMART NAVIGATION (Hide on down, Show on up)
function initSmartNav() {
    const nav = document.querySelector('.nav-terminal');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Ignore negative scrolling (like rubber-banding on Mac)
        if (currentScrollY < 0) return;

        // If scrolling down AND passed the top area
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            nav.classList.add('nav-hidden');
        } 
        // If scrolling up
        else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// DOWNLOAD SYSTEM SIMULATION
function initDownloadSystem() {
    const btn = document.getElementById('download-link');
    const btnText = btn.querySelector('.btn-text');
    
    if (!btn) return;

    btn.addEventListener('click', function(e) {
        // If already downloading, stop
        if (btn.classList.contains('downloading')) return;

        // 1. Prevent immediate download
        e.preventDefault();
        
        // 2. Start Visual Effect
        btn.classList.add('downloading');
        const originalText = btnText.textContent;
        btnText.textContent = "EXTRACTING_DATA...";
        
        // 3. Wait for "Loading Bar" animation (1.5s)
        setTimeout(() => {
            // 4. Trigger Real Download
            window.location.href = btn.href;
            
            // 5. Success State
            btnText.textContent = "DOWNLOAD_COMPLETE";
            btn.style.borderColor = "#00ff00"; // Green
            btn.style.color = "#00ff00";
            
            // 6. Reset after 3 seconds
            setTimeout(() => {
                btn.classList.remove('downloading');
                btnText.textContent = originalText;
                btn.style.borderColor = "";
                btn.style.color = "";
            }, 3000);
            
        }, 1500); // Matches CSS transition time
    });
}

// CERTIFICATE MODAL SYSTEM
function initCertModal() {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const triggers = document.querySelectorAll('.cert-verify-btn');

    if (!modal) return;

    // Open Modal
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = btn.getAttribute('data-img');
            
            // Set image and show modal
            modalImg.src = imgSrc;
            modal.classList.add('active');
        });
    });

    // Close Function
    const closeModal = () => {
        modal.classList.remove('active');
        // Clear src after delay to prevent flashing old image next time
        setTimeout(() => { modalImg.src = ''; }, 300);
    };

    // Close on Button Click
    closeBtn.addEventListener('click', closeModal);

    // Close on Background Click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}