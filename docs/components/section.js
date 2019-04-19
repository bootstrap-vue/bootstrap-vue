import { mergeData } from 'vue-functional-data-merge'

export default {
  name: 'BDVSection',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'section'
    },
    play: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, data, children }) {
    let directives = []
    if (props.play) {
      directives.push({ name: 'play' })
    }
    return h(
      props.tag,
      mergeData(data, {
        class: ['bd-content'],
        directives
      }),
      [children]
    )
  }
}
