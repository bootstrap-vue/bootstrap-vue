<template>
    <nav v-if="toc && toc.length > 0" aria-label="Page table of contents">
        <b-nav vertical
               v-b-scrollspy.75
               class="m-toc section-nav">
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
import components from '~/../components';
import directives from '~/../directives';
import reference from '~/../reference';
import layout from '~/../layout';
import setup from '~/../README.md';
import changelog from '~/../../CHANGELOG.md';
import contributing from '~/../../CONTRIBUTING.md';

function processHeadings(readme) {
    if (!readme) {
        return [];
    }
    const toc = [];
    // Grab all the H2 and H3 tags with ID's from readme
    const headings = readme.match(/<h[23].*? id="[^"]+".+?<\/h\d>/g) || [];
    let h2Idx = 0;
    headings.forEach(heading => {
        // Pass the link, label and heading level
        const matches = heading.match(/^<(h[23]).*? id="([^"]+)"[^>]*>(.+?)<\/h\d>$/);
        const tag = matches[1];
        const href = `#${matches[2]}`;
        // Remove any HTML markup in the label
        const label = matches[3].replace(/<[^>]+>/g, '');
        if (tag === 'h2') {
            toc.push({ href, label });
            h2Idx = toc.length;
        } else if (tag === 'h3') {
            toc[h2Idx] = toc[h2Idx] || [];
            toc[h2Idx].push({ href, label });
        }
    });
    return toc;
}

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

// Buildthe complete TOC library
const TOC = {};
TOC['/docs/'] =  processHeadings(setup);
TOC['/docs/layout/'] = processHeadings(layout.readme);
Object.keys(components).forEach(page => {
    TOC[`/docs/components/${page}/`] = processHeadings(components[page].readme);
});
Object.keys(directives).forEach(page => {
    TOC[`/docs/directives/${page}/`] = processHeadings(directives[page].readme);
});
Object.keys(reference).forEach(page => {
    TOC[`/docs/reference/${page}/`] = processHeadings(reference[page].readme);
});
TOC[`/docs/misc/contributing/`] = processHeadings(contributing);
// We removethe h3 headings, since hey have teh same repeated IDs and don't work
TOC[`/docs/misc/changelog/`] = processHeadings(changelog.replace(/<h3.+?<\/h3>/g, ''));


// Component logic
export default {
    data() {
        return { };
    },
    computed: {
        toc() {
            let path = this.$route.path || '';
            path = /\/$/.test(path) ? path : `${path}/`;
            return TOC[path] || [];
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
                scrollTo(scroller, el.offsetTop -70, 100, () => {
                    // Set a tab index so we can focus header for a11y support
                    el.tabIndex = -1;
                    // Focus the element
                    el.focus();
                });
            }
        }
    }
}
</script>
