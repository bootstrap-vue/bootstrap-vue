import Vue from '../../utils/vue'
import { omit } from '../../utils/object'
import { props as cellProps, BTableCell } from './helpers/table-cell'

export const props = omit(cellProps, ['header'])

// @vue/component
/* istanbul ignore next: until tests are written */
export const BTableTh = /*#__PURE__*/ Vue.extend({
  name: 'BTableTh',
  functional: true,
  props: props,
  render(h, { props, data, children }) {
    data.props = { ...props, header: true }
    return h(BTableCell, data, children)
  }
})
