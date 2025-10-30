/*
 * Vanilla JS Components - Specialized functionality
 * Charts, forms, and UI components without jQuery dependencies
 */

// Contact Form Handler
class ContactForm {
    constructor(formSelector) {
        this.form = typeof formSelector === 'string' ? document.querySelector(formSelector) : formSelector;
        this.responseMessage = document.querySelector('.response-message');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    async handleSubmit() {
        const requiredFields = this.form.querySelectorAll('.required');
        const formData = new FormData(this.form);
        const formAction = this.form.getAttribute('action');
        
        // Clear previous errors
        requiredFields.forEach(field => field.classList.remove('input-error'));
        
        // Validate required fields
        let isValid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('input-error');
                isValid = false;
            }
        });
        
        // Validate email
        const emailField = this.form.querySelector('.contact-form-email');
        if (emailField && !this.validateEmail(emailField.value)) {
            emailField.classList.add('input-error');
            isValid = false;
        }
        
        if (!isValid) return;
        
        try {
            const response = await VanillaJS.post(formAction, formData);
            this.showResponse(response);
            this.clearForm();
        } catch (error) {
            this.showResponse('Error sending message. Please try again.');
        }
    }
    
    validateEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    
    showResponse(message) {
        if (this.responseMessage) {
            this.responseMessage.textContent = message;
            this.responseMessage.style.display = 'block';
            
            setTimeout(() => {
                VanillaJS.animate(this.responseMessage, { opacity: 0 }, 400, 'ease', () => {
                    this.responseMessage.style.display = 'none';
                    this.responseMessage.style.opacity = '1';
                });
            }, 5000);
        }
    }
    
    clearForm() {
        const requiredFields = this.form.querySelectorAll('.required');
        requiredFields.forEach(field => field.value = '');
    }
}

// Pie Chart Component (EasyPieChart replacement)
class PieChart {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = {
            size: 160,
            animate: 2000,
            lineWidth: 2,
            barColor: '#470f0e',
            trackColor: '#eeeeee',
            ...options
        };
        
        this.percent = parseInt(this.element.dataset.percent) || 0;
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.animate();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        const size = this.options.size;
        
        canvas.width = size;
        canvas.height = size;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        
        this.element.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    
    draw(percentage) {
        const ctx = this.ctx;
        const size = this.options.size;
        const center = size / 2;
        const radius = (size - this.options.lineWidth) / 2;
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (2 * Math.PI * percentage / 100);
        
        // Clear canvas
        ctx.clearRect(0, 0, size, size);
        
        // Draw background track
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.options.trackColor;
        ctx.lineWidth = this.options.lineWidth;
        ctx.stroke();
        
        // Draw progress arc
        if (percentage > 0) {
            ctx.beginPath();
            ctx.arc(center, center, radius, startAngle, endAngle);
            ctx.strokeStyle = this.options.barColor;
            ctx.lineWidth = this.options.lineWidth;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }
    
    animate() {
        const start = performance.now();
        const duration = this.options.animate;
        const targetPercent = this.percent;
        
        const animateStep = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const currentPercent = progress * targetPercent;
            
            this.draw(currentPercent);
            
            // Update text
            const percentSpan = this.element.querySelector('.percent');
            if (percentSpan) {
                percentSpan.textContent = Math.round(currentPercent);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animateStep);
            }
        };
        
        requestAnimationFrame(animateStep);
    }
}

// FitVids replacement for responsive videos
class FitVids {
    constructor(selector = '.video-container') {
        this.containers = document.querySelectorAll(selector);
        this.init();
    }
    
    init() {
        this.containers.forEach(container => {
            this.makeResponsive(container);
        });
    }
    
    makeResponsive(container) {
        const video = container.querySelector('video, iframe, embed, object');
        
        if (video) {
            const width = video.getAttribute('width') || video.offsetWidth;
            const height = video.getAttribute('height') || video.offsetHeight;
            
            if (width && height) {
                const aspectRatio = (height / width) * 100;
                
                container.style.position = 'relative';
                container.style.paddingBottom = aspectRatio + '%';
                container.style.height = '0';
                container.style.overflow = 'hidden';
                
                video.style.position = 'absolute';
                video.style.top = '0';
                video.style.left = '0';
                video.style.width = '100%';
                video.style.height = '100%';
            }
        }
    }
}

// Simple Lightbox (PrettyPhoto replacement)
class SimpleLightbox {
    constructor(selector = 'a[data-rel^="prettyPhoto"]') {
        this.links = document.querySelectorAll(selector);
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        this.createOverlay();
        this.bindEvents();
    }
    
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'lightbox-overlay';
        this.overlay.innerHTML = `
            <div class="lightbox-container">
                <div class="lightbox-content">
                    <img class="lightbox-image" />
                    <div class="lightbox-text"></div>
                </div>
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&lt;</button>
                <button class="lightbox-next">&gt;</button>
            </div>
        `;
        
        document.body.appendChild(this.overlay);
        
        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.85);
                display: none;
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            .lightbox-container {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-image {
                max-width: 100%;
                max-height: 80vh;
                display: block;
            }
            .lightbox-close, .lightbox-prev, .lightbox-next {
                position: absolute;
                background: rgba(255,255,255,0.2);
                color: white;
                border: none;
                font-size: 24px;
                padding: 10px;
                cursor: pointer;
            }
            .lightbox-close { top: 10px; right: 10px; }
            .lightbox-prev { top: 50%; left: 10px; transform: translateY(-50%); }
            .lightbox-next { top: 50%; right: 10px; transform: translateY(-50%); }
        `;
        document.head.appendChild(style);
    }
    
    bindEvents() {
        this.links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
        });
        
        // Close events
        this.overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        
        // Navigation
        this.overlay.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        this.overlay.querySelector('.lightbox-next').addEventListener('click', () => this.next());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.overlay.style.display === 'flex') {
                if (e.key === 'Escape') this.close();
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            }
        });
    }
    
    open(index) {
        this.currentIndex = index;
        const link = this.links[index];
        const img = this.overlay.querySelector('.lightbox-image');
        
        img.src = link.href;
        img.alt = link.getAttribute('title') || '';
        
        this.overlay.style.display = 'flex';
    }
    
    close() {
        this.overlay.style.display = 'none';
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.links.length) % this.links.length;
        this.open(this.currentIndex);
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.links.length;
        this.open(this.currentIndex);
    }
}

// Initialize all components
VanillaJS.ready(() => {
    // Initialize contact form
    new ContactForm('.contact-form');
    
    // Initialize pie charts
    document.querySelectorAll('.chart').forEach(chart => {
        new PieChart(chart);
    });
    
    // Initialize responsive videos
    new FitVids();
    
    // Initialize lightbox
    new SimpleLightbox();
    
    console.log('Vanilla JS components initialized');
});