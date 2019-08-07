import Vue from '../../utils/vue'
import { omit } from '../../utils/object'
import { props as cellProps, BTableCell } from './helpers/table-cell'

export const props = omit(cellProps, ['header'])

// @vue/component
export const BTh = /*#__PURE__*/ Vue.extend({
  name: 'BTh',
  functional: true,
  props,
  render(h, { props, data, children }) {
    // `data` already includes any listeners
    data.props = { ...props, header: true }
    return h(BTableCell, data, children)
  }
})
