import { mergeData } from 'vue-functional-data-merge'

export default {
  name: 'BDVAnchoredHeading',
  functional: true,
  props: {
    id: {
      type: String,
      default: ''
    },
    level: {
      type: [Number, String],
      default: 2
    }
  },
  render(h, { props, data, children }) {
    const $anchor = h(
      'b-link',
      {
        staticClass: 'anchorjs-link',
        attrs: { to: { hash: `#${props.id}` }, 'aria-label': 'Anchor' }
      },
      [h(false)]
    )
    const $content = h('span', { staticClass: 'bd-content-title' }, [children, $anchor])
    return h(
      `h${props.level}`,
      mergeData(data, {
        attrs: {
          id: props.id,
          tabindex: '-1'
        }
      }),
      [$content]
    )
  }
}
