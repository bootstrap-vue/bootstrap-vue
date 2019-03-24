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
      'a',
      {
        staticClass: 'anchorjs-link',
        attrs: { href: `#${this.id}`, 'aria-label': 'Anchor' }
      },
      [h(false)]
    )
    return h(`h${this.level}`, { attrs: { id: this.id } }, [this.$slots.default, $anchor])
  }
}
