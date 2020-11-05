/*
 * docs-mixin: used by any page under /docs path
 */
import { updateMetaTOC, scrollTo, offsetTop } from '~/utils'
import { bvDescription, nav } from '~/content'

const TOC_CACHE = {}

// @vue/component
export default {
  head() {
    return {
      title: this.headTitle,
      meta: this.headMeta
    }
  },
  computed: {
    headTitle() {
      const routeName = this.$route.name
      let title = ''
      let section = ''
      if (this.meta && this.meta.title) {
        title = this.meta.title
      }
      if (/^docs-components/.test(routeName)) {
        section = 'Components'
      } else if (/^docs-directives/.test(routeName)) {
        section = 'Directives'
      } else if (/^docs-reference/.test(routeName)) {
        section = 'Reference'
      }
      return [title, section, 'BootstrapVue'].filter(Boolean).join(' | ')
    },
    headMeta() {
      const section = this.$route.name.split('-')[1]
      const sectionMeta = section ? nav.find(n => n.base === `${section}/`) : null
      const description =
        this.meta && this.meta.description
          ? this.meta.description
          : sectionMeta && sectionMeta.description
            ? sectionMeta.description
            : bvDescription
      const meta = [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.headTitle
        }
      ]
      if (description) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: description
        })
        meta.push({
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: description
        })
      }
      return meta
    }
  },
  created() {
    // Create private non-reactive props
    this.$_filterTimer = null

    // In a `$nextTick()` to ensure `toc.vue` is created first
    this.$nextTick(() => {
      const key = `${this.$route.name}_${this.$route.params.slug || ''}`
      const toc =
        TOC_CACHE[key] || (TOC_CACHE[key] = updateMetaTOC(this.baseTOC || {}, this.meta || null))
      this.$root.$emit('docs-set-toc', toc)
    })
  },
  mounted() {
    this.clearScrollTimeout()
    this.focusScroll()
  },
  updated() {
    this.clearScrollTimeout()
    this.focusScroll()
  },
  beforeDestroy() {
    this.clearScrollTimeout()
  },
  methods: {
    clearScrollTimeout() {
      clearTimeout(this.$_scrollTimeout)
      this.$_scrollTimeout = null
    },
    focusScroll() {
      const hash = this.$route.hash
      this.$nextTick(() => {
        let el
        if (hash) {
          // We use an attribute `querySelector()` rather than `getElementByID()`,
          // as some auto-generated ID's are invalid or not unique
          el = this.$el.querySelector(`[id="${hash.replace('#', '')}"]`)
          this.scrollIntoView(el)
        }
        if (!el) {
          el = this.$el.querySelector('h1')
        }
        if (el) {
          el.tabIndex = -1
          el.focus()
        }
      })
    },
    scrollIntoView(el) {
      if (el) {
        // Get the document scrolling element
        const scroller = document.scrollingElement || document.documentElement || document.body
        this.clearScrollTimeout()
        // Allow time for v-play to finish rendering
        this.$_scrollTimeout = setTimeout(() => {
          // Scroll heading into view (minus offset to account for nav top height)
          scrollTo(scroller, offsetTop(el) - 70, 100)
        }, 100)
      }
    }
  }
}
