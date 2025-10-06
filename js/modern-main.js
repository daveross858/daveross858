/**
 * Modern Portfolio JavaScript - Vanilla ES6+
 * Replaces jQuery-based functionality with modern vanilla JavaScript
 */

class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        this.initPreloader();
        this.initNavigation();
        this.initScrollEffects();
        this.initPortfolio();
        this.initSkillCharts();
        this.initContactForm();
        this.initSmoothScrolling();
    }

    // Modern Preloader
    initPreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            });
        }
    }

    // Modern Navigation
    initNavigation() {
        const navTrigger = document.querySelector('.nav-trigger');
        const sidebar = document.getElementById('sidebar');
        const navLinks = document.querySelectorAll('#main-nav a');

        // Mobile navigation toggle
        if (navTrigger && sidebar) {
            navTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                sidebar.classList.toggle('active');
            });
        }

        // Smooth scroll navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    
                    // Update active nav item
                    navLinks.forEach(l => l.classList.remove('current'));
                    link.classList.add('current');
                    
                    // Close mobile menu
                    if (sidebar) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        });
    }

    // Modern Scroll Effects with Intersection Observer
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.animated').forEach(el => {
            observer.observe(el);
        });
    }

    // Modern Portfolio with CSS Grid/Flexbox
    initPortfolio() {
        const filterButtons = document.querySelectorAll('.portfolio-filter a');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === '*' || item.classList.contains(filter.replace('.', ''))) {
                        item.style.display = 'block';
                        item.classList.add('animate__animated', 'animate__fadeIn');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Portfolio project navigation
        this.initProjectNavigation();
    }

    // Modern Project Navigation
    initProjectNavigation() {
        const projectItems = document.querySelectorAll('.portfolio-item a');
        
        projectItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');
                if (href.startsWith('#!')) {
                    e.preventDefault();
                    this.loadProject(href.replace('#!', ''));
                }
            });
        });
    }

    // Modern AJAX Project Loading
    async loadProject(projectPath) {
        const projectContainer = document.querySelector('.project-content');
        const projectLoader = document.querySelector('.project-loader');
        
        if (projectLoader) {
            projectLoader.style.display = 'block';
        }

        try {
            const response = await fetch(projectPath);
            if (response.ok) {
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const projectContent = doc.querySelector('#project-page');
                
                if (projectContainer && projectContent) {
                    projectContainer.innerHTML = projectContent.innerHTML;
                    
                    // Scroll to project
                    projectContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        } catch (error) {
            console.error('Error loading project:', error);
            if (projectContainer) {
                projectContainer.innerHTML = '<p class="error">Project could not be loaded.</p>';
            }
        } finally {
            if (projectLoader) {
                projectLoader.style.display = 'none';
            }
        }
    }

    // Modern Skill Charts with Chart.js
    initSkillCharts() {
        const skillCharts = document.querySelectorAll('.chart, .easyPieChart');
        
        skillCharts.forEach(chart => {
            const percent = parseInt(chart.getAttribute('data-percent'));
            
            // Clear existing content (percentage span)
            const existingSpan = chart.querySelector('.percent');
            if (existingSpan) {
                existingSpan.style.display = 'none';
            }
            
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            canvas.style.display = 'block';
            canvas.style.margin = '0 auto';
            chart.appendChild(canvas);
            
            this.createCircularChart(canvas, percent);
        });
    }

    createCircularChart(canvas, percent) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 60;
        
        // Background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 8;
        ctx.stroke();
        
        // Progress circle
        const angle = (percent / 100) * 2 * Math.PI - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Percentage text
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(percent + '%', centerX, centerY + 8);
    }

    // Modern Contact Form
    initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const responseMessage = document.querySelector('.response-message');
                
                try {
                    const response = await fetch('send-mail.php', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const result = await response.text();
                    
                    if (responseMessage) {
                        responseMessage.innerHTML = result;
                        responseMessage.style.display = 'block';
                    }
                    
                    if (response.ok) {
                        contactForm.reset();
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    if (responseMessage) {
                        responseMessage.innerHTML = '<p class="error">There was an error sending your message. Please try again.</p>';
                        responseMessage.style.display = 'block';
                    }
                }
            });
        }
    }

    // Modern Smooth Scrolling
    initSmoothScrolling() {
        // Modern browsers handle this with CSS scroll-behavior: smooth
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Utility function for modern event handling
    on(element, event, handler) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    // Utility function for modern DOM manipulation
    ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
}

// Initialize the modern portfolio
const portfolio = new ModernPortfolio();

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernPortfolio;
}