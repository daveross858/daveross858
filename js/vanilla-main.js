/*
 * Vanilla JS Main Script - Converted from jQuery
 * Portfolio theme functionality without jQuery dependencies
 */

// Browser compatibility and mobile detection
function detectBrowser() {
    const browser = VanillaJS.getBrowser();
    document.body.classList.add(browser);
    
    if (VanillaJS.isMobile()) {
        document.body.classList.add('mobile');
    }
}

// Window load functionality
VanillaJS.load(function() {
    /* PRELOADER */
    function hidePreloader() {
        const loadingAnimation = document.getElementById('loading-animation');
        const preloader = document.getElementById('preloader');
        
        if (loadingAnimation) {
            VanillaJS.fadeOut(loadingAnimation, 400);
        }
        
        if (preloader) {
            setTimeout(() => {
                VanillaJS.fadeOut(preloader, 800);
            }, 350);
        }
    }
    
    hidePreloader();
});

// Document ready functionality
VanillaJS.ready(function() {
    
    // Browser detection
    detectBrowser();

    /* ANIMATED ELEMENTS */
    function initAnimatedElements() {
        if (VanillaJS.isMobile()) return;
        
        // Simple intersection observer to replace jQuery appear
        const animatedElements = document.querySelectorAll('.animated');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                    const animation = entry.target.dataset.animation;
                    const delay = entry.target.dataset.animationDelay;
                    
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add(animation, 'visible');
                        }, parseInt(delay));
                    } else {
                        entry.target.classList.add(animation, 'visible');
                    }
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }

    /* SIDEBAR NAVIGATION */
    function initSidebar() {
        // Perfect scrollbar replacement - use CSS overflow scrolling
        const psContainer = document.querySelector('.ps-container');
        if (psContainer) {
            psContainer.style.overflowY = 'auto';
        }
        
        // Navigation trigger
        const navTrigger = document.querySelector('.nav-trigger');
        if (navTrigger) {
            navTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const sidebar = document.getElementById('sidebar');
                VanillaJS.toggleClass(sidebar, 'active');
                VanillaJS.toggleClass(this, 'active');
                VanillaJS.toggleClass(document.body, 'active-slide');
            });
        }
    }

    /* NAVIGATION MENU */
    function initNavigation() {
        const sections = document.querySelectorAll('section.on-menu');
        const navLinks = document.querySelectorAll('#main-nav ul li');
        let currentLink = 0;
        
        // Navigation click handlers
        navLinks.forEach((navItem, index) => {
            const link = navItem.querySelector('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetSection = sections[index];
                    if (targetSection) {
                        VanillaJS.smoothScrollTo(targetSection, 1000);
                        
                        // Close sidebar after navigation
                        const sidebar = document.getElementById('sidebar');
                        const navTrigger = document.querySelector('.nav-trigger');
                        VanillaJS.removeClass(sidebar, 'active');
                        VanillaJS.removeClass(navTrigger, 'active');
                        VanillaJS.removeClass(document.body, 'active-slide');
                    }
                });
            }
        });

        // Scroll-based navigation highlighting (replacing waypoints)
        function updateActiveNav() {
            const scrollPos = window.pageYOffset;
            
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollPos;
                const sectionHeight = rect.height;
                
                if (scrollPos >= sectionTop - 100 && scrollPos < sectionTop + sectionHeight - 100) {
                    if (currentLink !== index) {
                        navLinks[currentLink]?.classList.remove('current');
                        navLinks[index]?.classList.add('current');
                        currentLink = index;
                    }
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    }

    /* BACK TO TOP */
    function initBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 200) {
                    VanillaJS.fadeIn(backToTop, 200);
                } else {
                    VanillaJS.fadeOut(backToTop, 200);
                }
            });
            
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                VanillaJS.animate(document.documentElement, { scrollTop: 0 }, 800);
                VanillaJS.animate(document.body, { scrollTop: 0 }, 800);
            });
        }
    }

    /* HOME SECTION */
    function initHomeSection() {
        function setHomeHeight() {
            const home = document.getElementById('home');
            
            if (home && home.classList.contains('fullscreen')) {
                if (!VanillaJS.isMobile()) {
                    home.style.height = VanillaJS.getWindowHeight() + 'px';
                }
            }
        }
        
        setHomeHeight();
        window.addEventListener('resize', setHomeHeight);
        
        // Background handling (replacing backstretch)
        if (document.body.classList.contains('image-background')) {
            document.body.style.backgroundImage = 'url(images/bg_big.jpg)';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
        }
    }

    // Initialize all components
    initAnimatedElements();
    initSidebar();
    initNavigation();
    initBackToTop();
    initHomeSection();
    
    console.log('Vanilla JS portfolio initialized');
});

// Window resize handler
window.addEventListener('resize', function() {
    // Handle any resize-specific logic here
});