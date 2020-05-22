// @vue/component
export default {
  name: 'BVCarbonAd',
  props: {
    id: {
      type: String,
      default: '_carbonads_js'
    },
    url: {
      type: String,
      default: '//cdn.carbonads.com/carbon.js'
    },
    serve: {
      type: String,
      default: 'CE7ITK77'
    },
    placement: {
      type: String,
      default: 'bootstrap-vuejsorg'
    }
  },
  data() {
    return {
      mounted: false
    }
  },
  computed: {
    src() {
      return `${this.url}?serve=${this.serve}&placement=${this.placement}`
    }
  },
  mounted() {
    // Remove any leftover Carbonads scripts from the `<head>`
    const $nodes = document.querySelectorAll('head > script[id="_carbonads_projs"]')
    for (const $node of $nodes) {
      try {
        $node.parentNode.removeChild($node)
      } catch {}
    }

    // Show the new ad
    this.$nextTick(() => {
      requestAnimationFrame(() => {
        this.mounted = true
      })
    })
  },
  beforeDestroy() {
    this.mounted = false
  },
  render(h) {
    let $script = h()
    if (this.mounted) {
      $script = h('script', {
        attrs: {
          id: this.id,
          async: 'async',
          type: 'text/javascript',
          src: this.src
        }
      })
    }
    return h('aside', { staticClass: 'bv-carbon-ad' }, [$script])
  }
}
