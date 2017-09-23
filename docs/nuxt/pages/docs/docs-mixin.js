/*
 * docs-mixin: used by any page under /docs path
 */

// Smooth Scroll handler methods
function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
}
function scrollTo(scroller, to, duration, cb) {
    const start = scroller.scrollTop
    const change = to - start
    const increment = 20;
    let currentTime = 0;
    const animateScroll = function(){
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        scroller.scrollTop = Math.round(val);
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        } else if (cb && typeof cb ==='function') {
            cb();
        }
    };
    animateScroll();
}

// Return an element's offset wrt document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
function offsetTop(el) {
    if (!el.getClientRects().length) {
        return 0;
    }
    const bcr = el.getBoundingClientRect();
    const win = el.ownerDocument.defaultView;
    return bcr.top + win.pageYOffset;
};


export default {
    mounted() {
        this.focusScroll();
    },
    updated() {
        this.focusScroll();
    },
    methods: {
        focusScroll() {
            let hash = this.$route.hash;
            this.$nextTick(() => {
                let el;
                if (hash) {
                    // We use an attribute querySelector rather than getElementByID, as some auto 
                    // generated ID's are invalid, and some may appear more than once
                    el = this.$el.querySelector(`[id="${hash.replace('#','')}"]`);
                    this.scrollIntoView(el);
                }
                if (!el) {
                    el = this.$el.querySelector('h1');
                }
                if (el) {
                   el.tabIndex = -1;
                   el.focus();
                }
            });
        },
        scrollIntoView(el) {
            if (el) {
                // Get the document scrolling element
                const scroller = document.scrollingElement || document.documentElement || document.body;
                // scroll heading into view (minus offset to account for nav top height
                scrollTo(scroller, offsetTop(el) - 70, 100);
            }
        }
    }
}
