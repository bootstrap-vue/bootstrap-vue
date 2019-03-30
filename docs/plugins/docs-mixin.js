/*
 * docs-mixin: used by any page under /docs path
 */
import { scrollTo, offsetTop } from '~/utils'
import { bvDescription } from '~/content'

// @vue/component
export default {
  data() {
    return {
      scrollTimeout: null
    }
  },

  computed: {
    content() {
      // NOTE: is this computed prop used anymore?
      return (this.$route.params.slug && this._content[this.$route.params.slug]) || {}
    },
    metaTitle() {
      const routeName = this.$route.name
      let title = 'Docs'
      let section = ''
      if (this.meta && this.meta.title) {
        title = this.meta.title
      }
      if (routeName === 'docs-components-slug') {
        section = 'Components'
      } else if (routeName === 'docs-directives-slug') {
        section = 'Directives'
      } else if (routeName === 'docs-reference-slug') {
        section = 'Reference'
      } else if (routeName === 'docs-misc-slug') {
        section = 'Misc'
      }
      return [title, section, 'BootstrapVue'].filter(Boolean).join(' | ')
    },
    metaDescription() {
      if (this.meta && this.meta.description) {
        return { hid: 'description', name: 'description', content: this.meta.description }
      } else if (bvDescription) {
        return { hid: 'description', name: 'description', content: bvDescription }
      }
      return null
    }
  },

  head() {
    return {
      title: this.metaTitle,
      meta: this.metaDescription ? [this.metaDescription] : []
    }
  },

  mounted() {
    clearTimeout(this.scrollTimeout)
    this.scrollTimeout = null
    this.focusScroll()
    this.$nextTick(() => {
      this.$root.$emit('setTOC', this.readme || '', this.meta || null)
    })
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
