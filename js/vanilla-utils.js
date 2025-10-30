/*
 * Vanilla JS Portfolio - jQuery Replacement
 * Converting Luna portfolio theme from jQuery to vanilla JavaScript
 * Compatible with older browsers (ES5 syntax)
 */

console.log('Loading VanillaJS utilities...');

// jQuery replacement utilities - Compatible with older browsers
var VanillaJS = {
    
    // jQuery $ replacement
    $: function(selector) {
        if (typeof selector === 'string') {
            var elements = document.querySelectorAll(selector);
            return elements.length === 1 ? elements[0] : Array.prototype.slice.call(elements);
        }
        return selector;
    },

    // jQuery ready replacement
    ready: function(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    },

    // jQuery load replacement
    load: function(callback) {
        if (document.readyState === 'complete') {
            callback();
        } else {
            window.addEventListener('load', callback);
        }
    },

    // jQuery addClass replacement
    addClass: function(element, className) {
        if (Array.isArray ? Array.isArray(element) : Object.prototype.toString.call(element) === '[object Array]') {
            for (var i = 0; i < element.length; i++) {
                element[i].classList.add(className);
            }
        } else if (element) {
            element.classList.add(className);
        }
    },

    // jQuery removeClass replacement
    removeClass: function(element, className) {
        if (Array.isArray ? Array.isArray(element) : Object.prototype.toString.call(element) === '[object Array]') {
            for (var i = 0; i < element.length; i++) {
                element[i].classList.remove(className);
            }
        } else if (element) {
            element.classList.remove(className);
        }
    },

    // jQuery toggleClass replacement
    toggleClass: function(element, className) {
        if (Array.isArray ? Array.isArray(element) : Object.prototype.toString.call(element) === '[object Array]') {
            for (var i = 0; i < element.length; i++) {
                element[i].classList.toggle(className);
            }
        } else if (element) {
            element.classList.toggle(className);
        }
    },

    // jQuery hasClass replacement
    hasClass: function(element, className) {
        return element && element.classList.contains(className);
    },

    // jQuery fadeIn replacement
    fadeIn: function(element, duration, callback) {
        if (!element) return;
        
        duration = duration || 400;
        element.style.opacity = 0;
        element.style.display = 'block';
        
        var start = Date.now();
        
        function animate() {
            var elapsed = Date.now() - start;
            var progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                setTimeout(animate, 16);
            } else if (callback) {
                callback();
            }
        }
        
        animate();
    },

    // jQuery fadeOut replacement
    fadeOut: function(element, duration, callback) {
        if (!element) return;
        
        duration = duration || 400;
        var start = Date.now();
        var startOpacity = parseFloat(window.getComputedStyle(element).opacity) || 1;
        
        function animate() {
            var elapsed = Date.now() - start;
            var progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = startOpacity * (1 - progress);
            
            if (progress < 1) {
                setTimeout(animate, 16);
            } else {
                element.style.display = 'none';
                if (callback) callback();
            }
        }
        
        animate();
    },

    // Smooth scroll to element
    smoothScrollTo: function(element, duration) {
        if (!element) return;
        
        duration = duration || 1000;
        var targetPosition = element.offsetTop;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var start = Date.now();
        
        function animate() {
            var elapsed = Date.now() - start;
            var progress = Math.min(elapsed / duration, 1);
            var easeInOutQuad = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            
            window.scrollTo(0, startPosition + distance * easeInOutQuad);
            
            if (progress < 1) {
                setTimeout(animate, 16);
            }
        }
        
        animate();
    },

    // Get browser information
    getBrowser: function() {
        var userAgent = navigator.userAgent;
        var browsers = {
            chrome: /chrome/i,
            safari: /safari/i,
            firefox: /firefox/i,
            ie: /internet explorer/i,
            edge: /edge/i
        };
        
        for (var browser in browsers) {
            if (browsers[browser].test(userAgent)) {
                return browser;
            }
        }
        return 'unknown';
    },

    // Check if mobile device
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Get window height
    getWindowHeight: function() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },

    // Animate element properties
    animate: function(element, properties, duration, callback) {
        if (!element) return;
        
        duration = duration || 400;
        var start = Date.now();
        var initialValues = {};
        
        // Get initial values
        for (var prop in properties) {
            if (prop === 'scrollTop') {
                initialValues[prop] = element.scrollTop || 0;
            } else {
                initialValues[prop] = parseFloat(window.getComputedStyle(element)[prop]) || 0;
            }
        }
        
        function animate() {
            var elapsed = Date.now() - start;
            var progress = Math.min(elapsed / duration, 1);
            var easeInOutQuad = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            
            for (var prop in properties) {
                var startValue = initialValues[prop];
                var endValue = properties[prop];
                var currentValue = startValue + (endValue - startValue) * easeInOutQuad;
                
                if (prop === 'scrollTop') {
                    element.scrollTop = currentValue;
                } else {
                    element.style[prop] = currentValue + (typeof endValue === 'number' ? 'px' : '');
                }
            }
            
            if (progress < 1) {
                setTimeout(animate, 16);
            } else if (callback) {
                callback();
            }
        }
        
        animate();
    }
};

// Global aliases for easier transition
var $ = VanillaJS.$;
var ready = VanillaJS.ready;
var load = VanillaJS.load;

console.log('VanillaJS utilities loaded successfully');
