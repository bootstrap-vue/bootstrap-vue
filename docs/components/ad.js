export default {
  name: 'BVAd',
  props: {
    id: {
      type: String,
      default: '_carbonads_js'
    },
    url: {
      type: String,
      default: '//cdn.carbonads.com/carbon.js?serve=CE7ITK77&placement=bootstrap-vuejsorg'
    }
  },
  render(h) {
    return h('client-only', [
      h('div', { staticClass: 'bv-ad' }, [
        h('script', {
          attrs: {
            id: this.id,
            async: 'async',
            type: 'text/javascript',
            src: this.url
          }
        })
      ])
    ])
  }
}
