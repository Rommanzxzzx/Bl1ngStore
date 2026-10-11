document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. INICIALIZAR ICONOS VECTORIALES LUCIDE
       ========================================================================= */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* =========================================================================
       2. FONDO INTERACTIVO DE RED TÁCTICA (CANVAS PARTICLES)
       ========================================================================= */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.6 + 0.6,
                color: Math.random() > 0.45 ? 'rgba(0, 210, 255,' : 'rgba(255, 255, 255,'
            });
        }

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function animateTacticalNetwork() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color + '0.65)';
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#00d2ff';
                ctx.fill();
                ctx.shadowBlur = 0;

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < 115) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 210, 255, ${0.14 * (1 - dist / 115)})`;
                        ctx.lineWidth = 0.65;
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 90) {
                        const force = (90 - dist) / 90;
                        p.x += (dx / dist) * force * 1.2;
                        p.y += (dy / dist) * force * 1.2;
                    }
                }
            }

            requestAnimationFrame(animateTacticalNetwork);
        }

        animateTacticalNetwork();
    }

    /* =========================================================================
       3. EFECTO 3D TILT TÁCTICO FLUIDO (SIN BUGS NI JITTER)
       ========================================================================= */
    const heroRight = document.querySelector('.hero-right');
    const tiltCard = document.getElementById('hero-tilt-card');

    if (heroRight && tiltCard) {
        let isHovering = false;
        let animationFrameId = null;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let currentRotateX = 0;
        let currentRotateY = 0;

        function updateTilt() {
            if (!isHovering) {
                currentRotateX += (0 - currentRotateX) * 0.12;
                currentRotateY += (0 - currentRotateY) * 0.12;
                tiltCard.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(1, 1, 1)`;

                if (Math.abs(currentRotateX) > 0.04 || Math.abs(currentRotateY) > 0.04) {
                    animationFrameId = requestAnimationFrame(updateTilt);
                } else {
                    tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                    animationFrameId = null;
                }
                return;
            }

            currentRotateX += (targetRotateX - currentRotateX) * 0.12;
            currentRotateY += (targetRotateY - currentRotateY) * 0.12;

            tiltCard.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            animationFrameId = requestAnimationFrame(updateTilt);
        }

        heroRight.addEventListener('mouseenter', () => {
            isHovering = true;
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateTilt);
            }
        });

        heroRight.addEventListener('mousemove', (e) => {
            const rect = heroRight.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            targetRotateX = ((y - centerY) / centerY) * -8;
            targetRotateY = ((x - centerX) / centerX) * 8;

            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateTilt);
            }
        });

        heroRight.addEventListener('mouseleave', () => {
            isHovering = false;
            targetRotateX = 0;
            targetRotateY = 0;
        });
    }

    /* =========================================================================
       4. CICLO DE EVENT LOG (LIVE FEED TICKER)
       ========================================================================= */
    const feedItems = document.querySelectorAll('.feed-item');
    if (feedItems.length > 0) {
        let currentFeedIndex = 0;
        setInterval(() => {
            feedItems[currentFeedIndex].classList.remove('active');
            currentFeedIndex = (currentFeedIndex + 1) % feedItems.length;
            feedItems[currentFeedIndex].classList.add('active');
        }, 3600);
    }

    /* =========================================================================
       5. TELEMETRÍA DE PING EN VIVO (SIMULACIÓN REALISTA)
       ========================================================================= */
    const pingDisplay = document.querySelector('.terminal-ping');
    if (pingDisplay) {
        setInterval(() => {
            const randomPing = Math.floor(Math.random() * 6) + 7; // 7ms a 12ms
            pingDisplay.textContent = `PING: 0${randomPing}ms`;
        }, 4000);
    }

    /* =========================================================================
       6. NAVBAR SCROLL & ACTIVE SECTION OBSERVER
       ========================================================================= */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        if (scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 130;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    /* =========================================================================
       7. MENÚ MÓVIL
       ========================================================================= */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('.mob-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    /* =========================================================================
       8. CONTADORES NUMÉRICOS ANIMADOS (MÉTRICAS TÁCTICAS)
       ========================================================================= */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = easeProgress * target;

                if (isDecimal) {
                    stat.textContent = currentVal.toFixed(1);
                } else {
                    stat.textContent = Math.floor(currentVal);
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = isDecimal ? target.toFixed(1) : target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    /* =========================================================================
       9. OBSERVADOR DE SCROLL (FADE IN)
       ========================================================================= */
    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                const statsMatrix = document.querySelector('.hero-stats-matrix');
                if (!hasAnimatedStats && (entry.target === statsMatrix || entry.target.contains(statsMatrix))) {
                    hasAnimatedStats = true;
                    animateStats();
                }

                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    setTimeout(() => {
        if (!hasAnimatedStats) {
            hasAnimatedStats = true;
            animateStats();
        }
    }, 350);

    /* =========================================================================
       10. FILTRADO TÁCTICO DE PRODUCTOS
       ========================================================================= */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.tactical-product-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterVal = tab.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

                if (filterVal === 'all' || category === filterVal) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    /* =========================================================================
       11. FAQ ACCORDION CON BRACKETS [+] Y [-]
       ========================================================================= */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        const toggleBracket = item.querySelector('.faq-toggle-bracket');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cierra los demás acordeones
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherBracket = otherItem.querySelector('.faq-toggle-bracket');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    if (otherBracket) otherBracket.textContent = '[+]';
                }
            });

            // Toggle actual
            if (!isActive) {
                item.classList.add('active');
                answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
                if (toggleBracket) toggleBracket.textContent = '[-]';
            } else {
                item.classList.remove('active');
                answerDiv.style.maxHeight = null;
                if (toggleBracket) toggleBracket.textContent = '[+]';
            }
        });
    });

});