export default {
  props: {
    level: {
      type: [Number, String],
      default: 2
    },
    id: {
      type: String,
      default: ''
    }
  },
  render(h) {
    const $anchor = h(
      'b-link',
      {
        staticClass: 'anchorjs-link',
        attrs: { to: { hash: `#${this.id}` }, 'aria-label': 'Anchor' }
      },
      [h(false)]
    )
    const $content = h('span', { staticClass: 'bd-content-title' }, [this.$slots.default, $anchor])
    return h(`h${this.level}`, { attrs: { id: this.id, tabindex: '-1' } }, [$content])
  }
}
