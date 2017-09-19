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
                            class="toc-entry toc-h3 mb-1"
                            @click="scrollIntoView($event, h3.href)"
                ><span v-html="h3.label"></span></b-nav-item>
            </b-nav>
            <b-nav-item v-else 
                        :key="h2.href"
                        :href="h2.href"
                        class="toc-entry toc-h2 mb-1"
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
</style>

<script>
export default {
    data() {
        return {
            toc: [],
            readme: ''
        }
    },
    methods: {
        isArray(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
        },
        update(readme) {
            if (!readme) {
                this.toc = [];
                return;
            }
            if (readme === this.readme) {
                return;
            }
            const toc = [];
            // Grab all the H2 and H3 tags with ID's from readme
            const headings = readme.match(/<h[23].*? id="[^"]+".+?<\/h\d>/g) || [];
            let h2Idx = 0;
            headings.forEach(heading => {
                // Pase teh link, label and heading level
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
            this.toc = toc;
        },
        scrollIntoView(e, href) {
            e.preventDefault();
            e.stopPropagation();
            const el = href ? document.querySelector(href) : null;
            if (el) {
                // scroll heding into view (minus offset to account for nav top height
                (document.documentElement || document.body).scrollTop = el.offsetTop - 75;
                // Set a tab index and then focus header for a11y support
                el.tabIndex = -1;
                el.focus();
            }
        }
    },
    created() {
        this.$root.$on('bv-docs::update::toc', this.update);
    },
    beforeDestroy() {
        this.$root.$off('bv-docs::update::toc', this.update);
    }
}
</script>
