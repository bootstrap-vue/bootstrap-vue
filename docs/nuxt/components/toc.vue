<template>
    <nav v-if="toc && toc.length > 0" aria-label="Page table of contents">
        <b-nav vertical
               v-b-scrollspy.70
               class="m-toc section-nav">

            <b-nav-item v-if="title && top" 
                        :href="top"
                        class="toc-entry font-weight-bold mb-2"
                        @click="scrollIntoView($event, top)"
            ><span v-html="title"></span></b-nav-item>

            <template v-for="h2 in toc">

                <b-nav v-if="isArray(h2) && h2.length > 0" vertical class="mb-1">
                    <b-nav-item vertical pills v-for="h3 in h2"
                                :key="h3.href"
                                :href="h3.href"
                                class="toc-entry toc-h3 mb-2"
                                @click="scrollIntoView($event, h3.href)"
                    ><span v-html="h3.label"></span></b-nav-item>
                </b-nav>

                <b-nav-item v-else 
                            :key="h2.href"
                            :href="h2.href"
                            class="toc-entry toc-h2 mb-2"
                            @click="scrollIntoView($event, h2.href)"
            ><span v-html="h2.label"></span></b-nav-item>

          </template>

        </b-nav>
    </nav>
</template>

<style scoped>
    .m-toc.section-nav .nav-link {
         line-height: 1.2;
    }

    .m-toc.section-nav .toc-entry a {
        padding-left: 12px;
        padding-left: 0.75rem;
    }

    .m-toc.section-nav .nav-link.active {
         color: #563d7c;
         background: transparent;
    }

    .m-toc.section-nav > .nav-item + .nav,
    .m-toc.section-nav > .nav-link + .nav {
         display: none;
    }

    .m-toc.section-nav > .nav-item.active + .nav,                                                                                          
    .m-toc.section-nav > .nav-link.active + .nav {                                                                                         
         display: flex !important;                                                                                                         
    }                                                                                                                                      
</style>

<script>
import site from '~/..';

// Smooth Scroll handler methods
function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
}
function scrollTo(element, to, duration, cb) {
    const start = element.scrollTop
    const change = to - start
    const increment = 20;
    let currentTime = 0;
    const animateScroll = function(){        
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = Math.round(val);
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        } else {
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


// Component logic
export default {
    data() {
        return { };
    },
    computed: {
        site: () => site,
        path() {
            let path = this.$route.path || '';
            path = /\/$/.test(path) ? path : `${path}/`;
            return path;
        },
        title() {
            return this.site.toc[this.path].title || '';
        },
        top() {
            return this.site.toc[this.path].top || '';
        },
        toc() {
            return this.site.toc[this.path].toc || [];
        }
    },
    methods: {
        isArray(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
        },
        scrollIntoView(e, href) {
            e.preventDefault();
            e.stopPropagation();
            const el = href ? document.querySelector(href) : null;
            if (el) {
                // Get the document scrolling element
                const scroller = document.scrollingElement || document.documentElement || document.body;
                // scroll heading into view (minus offset to account for nav top height
                scrollTo(scroller, offsetTop(el) - 70, 100, () => {
                    // Set a tab index so we can focus header for a11y support
                    el.tabIndex = -1;
                    // Focus the heading
                    el.focus();
                });
            }
        }
    }
}
</script>
