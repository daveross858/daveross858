/*
 * Vanilla Portfolio Filter - Isotope Replacement
 * Grid-based portfolio filtering without jQuery/Isotope
 */

class VanillaPortfolio {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.items = this.container.querySelectorAll('.portfolio-item');
        this.filters = document.querySelectorAll('[data-filter]');
        this.currentFilter = '*';
        
        this.options = {
            animationDuration: 750,
            columnWidth: null,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.setupLayout();
        this.bindEvents();
        this.calculateLayout();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    setupLayout() {
        // Setup container
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        
        // Setup items
        this.items.forEach(item => {
            item.style.position = 'absolute';
            item.style.transition = `all ${this.options.animationDuration}ms ease`;
        });
    }
    
    bindEvents() {
        // Filter button clicks
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                
                const filterValue = filter.dataset.filter;
                
                // Update active filter button
                this.filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                this.filter(filterValue);
            });
        });
    }
    
    filter(filterValue) {
        this.currentFilter = filterValue;
        
        // Show/hide items based on filter
        const visibleItems = [];
        
        this.items.forEach(item => {
            const shouldShow = filterValue === '*' || item.classList.contains(filterValue.replace('.', ''));
            
            if (shouldShow) {
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
                visibleItems.push(item);
            } else {
                item.style.opacity = '0';
                item.style.pointerEvents = 'none';
            }
        });
        
        // Recalculate layout for visible items
        setTimeout(() => {
            this.calculateLayout(visibleItems);
        }, 50);
    }
    
    calculateLayout(itemsToLayout = null) {
        const items = itemsToLayout || Array.from(this.items).filter(item => 
            this.currentFilter === '*' || item.classList.contains(this.currentFilter.replace('.', ''))
        );
        
        if (items.length === 0) return;
        
        const containerWidth = this.container.offsetWidth;
        const columns = this.getColumnCount(containerWidth);
        const itemWidth = Math.floor(containerWidth / columns);
        const columnHeights = new Array(columns).fill(0);
        
        items.forEach(item => {
            // Set item width
            item.style.width = itemWidth + 'px';
            
            // Find shortest column
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
            const x = shortestColumnIndex * itemWidth;
            const y = columnHeights[shortestColumnIndex];
            
            // Position item
            item.style.left = x + 'px';
            item.style.top = y + 'px';
            
            // Update column height
            columnHeights[shortestColumnIndex] += item.offsetHeight;
        });
        
        // Set container height
        const maxHeight = Math.max(...columnHeights);
        this.container.style.height = maxHeight + 'px';
    }
    
    getColumnCount(containerWidth = null) {
        const width = containerWidth || this.container.offsetWidth;
        
        if (width > 1199) return 3;
        if (width > 980) return 3;
        if (width > 600) return 2;
        return 1;
    }
    
    handleResize() {
        // Recalculate layout on resize with debouncing
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.calculateLayout();
        }, 250);
    }
    
    // Public method to refresh layout
    refresh() {
        this.calculateLayout();
    }
}

// Portfolio project loader (replacing AJAX functionality)
class ProjectLoader {
    constructor() {
        this.currentProject = null;
        this.isLoading = false;
        this.init();
    }
    
    init() {
        this.setupElements();
        this.bindEvents();
        this.handleHashChange();
        window.addEventListener('hashchange', () => this.handleHashChange());
    }
    
    setupElements() {
        this.projectContainer = document.querySelector('.project-content');
        this.projectLoader = document.querySelector('.project-loader');
        this.projectClose = document.querySelector('.project-close');
        this.projectNav = document.querySelector('.project-navigation');
    }
    
    bindEvents() {
        // Project item clicks
        document.querySelectorAll('.portfolio-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('href');
                window.location.hash = url;
            });
        });
        
        // Close button
        if (this.projectClose) {
            this.projectClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeProject();
            });
        }
        
        // Navigation buttons
        const prevBtn = document.querySelector('.project-prev a');
        const nextBtn = document.querySelector('.project-next a');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateProject('prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateProject('next');
            });
        }
    }
    
    handleHashChange() {
        const hash = window.location.hash;
        const projectRoot = '#!projects/';
        
        if (hash.startsWith(projectRoot)) {
            const projectUrl = hash.replace('#!', '');
            this.loadProject(projectUrl);
        }
    }
    
    async loadProject(url) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoader();
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Project not found');
            
            const content = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const projectPage = doc.querySelector('#project-page');
            
            if (projectPage) {
                this.projectContainer.innerHTML = projectPage.outerHTML;
                this.showProject();
            } else {
                throw new Error('Project content not found');
            }
            
        } catch (error) {
            this.showError('The content cannot be loaded.');
        } finally {
            this.isLoading = false;
            this.hideLoader();
        }
    }
    
    showLoader() {
        if (this.projectLoader) {
            VanillaJS.fadeIn(this.projectLoader, 400);
        }
    }
    
    hideLoader() {
        if (this.projectLoader) {
            setTimeout(() => {
                VanillaJS.fadeOut(this.projectLoader, 400);
            }, 400);
        }
    }
    
    showProject() {
        const portfolio = document.getElementById('portfolio');
        if (portfolio) {
            VanillaJS.smoothScrollTo(portfolio, 800);
        }
        
        // Animate project container
        if (this.projectContainer) {
            const projectHeight = this.projectContainer.scrollHeight;
            VanillaJS.animate(this.projectContainer, {
                opacity: '1',
                height: projectHeight + 'px'
            }, 800);
            
            // Show controls
            if (this.projectClose) VanillaJS.fadeIn(this.projectClose, 400);
            if (this.projectNav) VanillaJS.fadeIn(this.projectNav, 400);
        }
    }
    
    closeProject() {
        window.location.hash = '#_';
        
        if (this.projectContainer) {
            VanillaJS.animate(this.projectContainer, {
                opacity: '0',
                height: '0px'
            }, 800);
        }
        
        if (this.projectClose) VanillaJS.fadeOut(this.projectClose, 400);
        if (this.projectNav) VanillaJS.fadeOut(this.projectNav, 400);
        
        // Scroll back to portfolio
        const portfolio = document.getElementById('portfolio');
        if (portfolio) {
            setTimeout(() => {
                VanillaJS.smoothScrollTo(portfolio, 600);
            }, 200);
        }
    }
    
    showError(message) {
        if (this.projectLoader) {
            this.projectLoader.innerHTML = `<p class="error">${message}</p>`;
            this.projectLoader.classList.add('projectError');
        }
    }
    
    navigateProject(direction) {
        const currentItem = document.querySelector('.portfolio-item.current');
        if (!currentItem) return;
        
        const items = document.querySelectorAll('.portfolio-item');
        const currentIndex = Array.from(items).indexOf(currentItem);
        let targetIndex;
        
        if (direction === 'next') {
            targetIndex = currentIndex + 1;
            if (targetIndex >= items.length) return;
        } else {
            targetIndex = currentIndex - 1;
            if (targetIndex < 0) return;
        }
        
        const targetItem = items[targetIndex];
        const targetLink = targetItem.querySelector('a');
        
        if (targetLink) {
            const url = targetLink.getAttribute('href');
            window.location.hash = url;
        }
    }
}

// Initialize portfolio when DOM is ready
VanillaJS.ready(() => {
    // Initialize portfolio filter
    const portfolioContainer = document.querySelector('.portfolio');
    if (portfolioContainer) {
        window.portfolio = new VanillaPortfolio(portfolioContainer);
    }
    
    // Initialize project loader
    window.projectLoader = new ProjectLoader();
});