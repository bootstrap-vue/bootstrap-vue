import { mergeData } from 'vue-functional-data-merge'

// @vue/component
export default {
  name: 'BVAnchoredHeading',
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
        props: { to: { hash: `#${props.id}` } },
        attrs: {
          'aria-labelledby': props.id || null,
          'aria-label': props.id ? null : 'Anchor'
        }
      },
      [h()]
    )
    const $content = h('span', { staticClass: 'bd-content-title' }, [children, $anchor])
    return h(
      `h${props.level}`,
      mergeData(data, {
        staticClass: 'bv-no-focus-ring',
        attrs: {
          id: props.id,
          tabindex: '-1'
        }
      }),
      [$content]
    )
  }
}
