import Vue from '../../utils/vue'
import { omit } from '../../utils/object'
import { props as cellProps, BTableCell } from './helpers/table-cell'

export const props = omit(cellProps, ['header'])

// @vue/component
/* istanbul ignore next: until tests are written */
export const BTableTd = /*#__PURE__*/ Vue.extend({
  name: 'BTableTd',
  functional: true,
  props: props,
  render(h, { props, data, children }) {
    // `data` already includes any listeners
    data.props = { ...props, header: false }
    return h(BTableCell, data, children)
  }
})
