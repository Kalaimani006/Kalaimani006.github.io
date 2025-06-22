/**
 * Custom Animation Library for Portfolio Website
 * Includes scroll animations, hover effects, and more
 */

class AnimateOnScroll {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-animate]');
        this.threshold = 0.2;
        this.init();
    }

    init() {
        if (this.animatedElements.length > 0) {
            this.createObserver();
            this.animateOnLoad();
        }
    }

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.threshold
        });

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateElement(element) {
        const animation = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-animate-delay') || 0;
        
        element.style.animationDelay = `${delay}ms`;
        element.classList.add('animate__animated', `animate__${animation}`);
        
        // Remove animation class after it completes to allow re-animation
        element.addEventListener('animationend', () => {
            element.classList.remove('animate__animated', `animate__${animation}`);
        });
    }

    animateOnLoad() {
        // Animate elements that are already in view on page load
        this.animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
            
            if (isVisible) {
                this.animateElement(element);
            }
        });
    }
}

class HoverAnimations {
    constructor() {
        this.hoverElements = document.querySelectorAll('[data-hover]');
        this.init();
    }

    init() {
        this.hoverElements.forEach(element => {
            const hoverEffect = element.getAttribute('data-hover');
            
            element.addEventListener('mouseenter', () => {
                this.applyHoverEffect(element, hoverEffect);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHoverEffect(element, hoverEffect);
            });
        });
    }

    applyHoverEffect(element, effect) {
        switch(effect) {
            case 'grow':
                element.style.transform = 'scale(1.05)';
                break;
            case 'shake':
                element.classList.add('hover__shake');
                break;
            case 'glow':
                element.classList.add('animate__glow');
                break;
            case 'pulse':
                element.classList.add('animate__pulse');
                break;
            default:
                element.style.transform = 'scale(1.03)';
        }
    }

    removeHoverEffect(element, effect) {
        switch(effect) {
            case 'grow':
                element.style.transform = 'scale(1)';
                break;
            case 'shake':
                element.classList.remove('hover__shake');
                break;
            case 'glow':
                element.classList.remove('animate__glow');
                break;
            case 'pulse':
                element.classList.remove('animate__pulse');
                break;
            default:
                element.style.transform = 'scale(1)';
        }
    }
}

class ButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-effect');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimateOnScroll();
    new HoverAnimations();
    new ButtonEffects();
    
    // Add any additional animation initializations here
});

// Export for modular use (if needed)
export { AnimateOnScroll, HoverAnimations, ButtonEffects };