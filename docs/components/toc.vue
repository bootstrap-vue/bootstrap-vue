<template>
  <nav
    v-if="toc.toc && toc.toc.length > 0"
    aria-label="Page table of contents"
  >
    <b-nav
      v-b-scrollspy.72
      vertical
      class="m-toc section-nav"
    >
      <b-nav-item
        v-if="toc.title && toc.top"
        :href="toc.top"
        class="toc-entry font-weight-bold mb-2"
        @click="scrollIntoView($event, toc.top)"
      >
        <span v-html="toc.title" />
      </b-nav-item>

      <template v-for="(h2, index) in toc.toc">
        <b-nav
          v-if="isArray(h2) && h2.length > 0"
          :key="index"
          vertical
          class="mb-1"
        >
          <b-nav-item
            v-for="h3 in h2"
            :key="h3.href"
            vertical
            pills
            :href="h3.href"
            class="toc-entry toc-h3 mb-2"
            @click="scrollIntoView($event, h3.href)"
          >
            <span v-html="h3.label" />
          </b-nav-item>
        </b-nav>

        <b-nav-item
          v-else
          :key="h2.href"
          :href="h2.href"
          class="toc-entry toc-h2 mb-2"
          @click="scrollIntoView($event, h2.href)"
        >
          <span v-html="h2.label" />
        </b-nav-item>
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
import { scrollTo, offsetTop, makeTOC } from '~/utils'

// Component logic
export default {
  data() {
    return {
      readme: '',
      meta: null
    }
  },
  computed: {
    toc() {
      return makeTOC(this.readme, this.meta)
    }
  },
  mounted() {
    this.$root.$on('setTOC', (readme, meta) => {
      this.readme = readme
      this.meta = meta || null
    })
  },
  methods: {
    isArray(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]'
    },
    scrollIntoView(e, href) {
      e.preventDefault()
      e.stopPropagation()
      // We use an attribute querySelector rather than getElementByID, as some auto
      // generated ID's are invalid, and some may appear more than once
      const el = href ? document.querySelector(`[id="${href.replace(/#/g, '')}"]`) : null
      if (el) {
        // Get the document scrolling element
        const scroller = document.scrollingElement || document.documentElement || document.body
        // scroll heading into view (minus offset to account for nav top height
        scrollTo(scroller, offsetTop(el) - 70, 100, () => {
          // Set a tab index so we can focus header for a11y support
          el.tabIndex = -1
          // Focus the heading
          el.focus()
        })
      }
    }
  }
}
</script>
