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
    headTitle() {
      const routeName = this.$route.name
      let title = ''
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
    headMeta() {
      const meta = [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.headTitle
        }
      ]
      if (this.meta && this.meta.description) {
        const desc = this.meta.description
        meta.push({
          hid: 'description',
          name: 'description',
          content: desc
        })
        meta.push({
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: desc
        })
      } else if (bvDescription) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: bvDescription
        })
      }
      return meta
    }
  },

  head() {
    return {
      title: this.headTitle,
      meta: this.headMeta
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
