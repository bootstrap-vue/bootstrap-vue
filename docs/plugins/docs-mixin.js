/*
 * docs-mixin: used by any page under /docs path
 */
import { scrollTo, offsetTop } from '~/utils'

// @vue/component
export default {
  data() {
    return {
      scrollTimeout: null
    }
  },

  computed: {
    content() {
      return (this.$route.params.slug && this._content[this.$route.params.slug]) || {}
    }
  },

  head() {
    return {
      title: `${(this.meta && this.meta.title) || 'Docs'} - BootstrapVue`
    }
  },

  mounted() {
    clearTimeout(this.scrollTimeout)
    this.scrollTimeout = null
    this.focusScroll()
    this.$root.$emit('setTOC', this.readme, this.meta || null)
  },

  updated() {
    clearTimeout(this.scrollTimeout)
    this.scrollTimeout = null
    this.focusScroll()
  },

  beforeDestroy() {
    this.$root.$emit('setTOC', '')
  },

  methods: {
    focusScroll() {
      let hash = this.$route.hash
      this.$nextTick(() => {
        let el
        if (hash) {
          // We use an attribute querySelector rather than getElementByID, as some auto
          // generated ID's are invalid, and some may appear more than once
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
        // Allow time for v-play to finish rendering
        this.scrollTimeout = setTimeout(() => {
          // scroll heading into view (minus offset to account for nav top height
          scrollTo(scroller, offsetTop(el) - 70, 100)
          this.scrollTimeout = null
        }, 100)
      }
    }
  }
}
