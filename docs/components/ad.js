export default {
  name: 'BVDAd',
  props: {
    id: {
      type: String,
      default: '_carbonads_js'
    },
    url: {
      type: String,
      default: '//cdn.carbonads.com/carbon.js?serve=CE7ITK77&placement=bootstrap-vuejsorg'
    },
    positionAfter: {
      type: String,
      default: null
    }
  },
  mounted() {
    this.setPosition()
  },
  methods: {
    setPosition() {
      if (!this.positionAfter || typeof document === 'undefined') {
        return
      }
      // Move the ad to the correct position, if possible
      const $body = document.body
      const $referenceNode = $body.querySelector(this.positionAfter)
      if ($referenceNode) {
        // IE 11 doesn't support the `node.after()` method, and appears
        // that the polyfill doesn't polyfill this method
        $referenceNode.insertAdjacentElement('afterend', this.$el)
      }
    }
  },
  render(h) {
    return h('script', {
      attrs: {
        id: this.id,
        async: 'async',
        type: 'text/javascript',
        src: this.url
      }
    })
  }
}
