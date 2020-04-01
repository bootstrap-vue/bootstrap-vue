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
  computed: {
    src() {
      return `${this.url}?serve=${this.serve}&placement=${this.placement}`
    }
  },
  render(h) {
    return h('aside', { staticClass: 'bv-carbon-ad' }, [
      h('client-only', [
        h('script', {
          attrs: {
            id: this.id,
            async: 'async',
            type: 'text/javascript',
            src: this.src
          }
        })
      ])
    ])
  }
}
