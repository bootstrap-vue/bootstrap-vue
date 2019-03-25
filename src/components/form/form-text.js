import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'

const NAME = 'BFormText'

export const props = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'small'
  },
  textVariant: {
    type: String,
    default: () => getComponentConfig(NAME, 'textVariant')
  },
  inline: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default {
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'form-text': !props.inline,
          [`text-${props.textVariant}`]: Boolean(props.textVariant)
        },
        attrs: {
          id: props.id
        }
      }),
      children
    )
  }
}
