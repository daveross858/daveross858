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
    }
};

// Global aliases for easier transition
var $ = VanillaJS.$;
var ready = VanillaJS.ready;
var load = VanillaJS.load;

console.log('VanillaJS utilities loaded successfully');
