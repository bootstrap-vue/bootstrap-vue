import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import prefixPropName from '../../utils/prefix-prop-name'
import copyProps from '../../utils/copy-props'
import { htmlOrText } from '../../utils/html'
import cardMixin from '../../mixins/card'

export const props = {
  ...copyProps(cardMixin.props, prefixPropName.bind(null, 'header')),
  header: {
    type: String,
    default: null
  },
  headerHtml: {
    type: String,
    default: null
  },
  headerClass: {
    type: [String, Object, Array],
    default: null
  }
}

// @vue/component
export const BCardHeader = /*#__PURE__*/ Vue.extend({
  name: 'BCardHeader',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.headerTag,
      mergeData(data, {
        staticClass: 'card-header',
        class: [
          props.headerClass,
          {
            [`bg-${props.headerBgVariant}`]: props.headerBgVariant,
            [`border-${props.headerBorderVariant}`]: props.headerBorderVariant,
            [`text-${props.headerTextVariant}`]: props.headerTextVariant
          }
        ]
      }),
      children || [h('div', { domProps: htmlOrText(props.headerHtml, props.header) })]
    )
  }
})
