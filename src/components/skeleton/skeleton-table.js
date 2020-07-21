import Vue from '../../utils/vue'
import { createAndFillArray } from '../../utils/array'
import { BSkeleton } from './skeleton'
import { BTableSimple } from '../table'

const NAME = 'BSkeletonTable'

// @vue/component
export const BSkeletonTable = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props: {
    animation: {
      type: String
    },
    rows: {
      type: Number,
      default: 3,
      validator: value => value > 0
    },
    columns: {
      type: Number,
      default: 5,
      validator: value => value > 0
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    tableProps: {
      type: Object,
      default: () => {}
    }
  },
  render(h, { props }) {
    const { animation, columns } = props

    const $th = h('th', [h(BSkeleton, { props: { animation } })])
    const $thTr = h('tr', createAndFillArray(columns, $th))
    const $thead = h('thead', [!props.hideHeader ? $thTr : h()])

    const $td = h('td', [h(BSkeleton, { props: { width: '75%', animation } })])
    const $tdTr = h('tr', createAndFillArray(columns, $td))
    const $tbody = h('tbody', createAndFillArray(props.rows, $tdTr))

    const $tfoot = h('tfoot', [props.showFooter ? $thTr : h()])

    return h(BTableSimple, { props: { ...props.tableProps } }, [$thead, $tbody, $tfoot])
  }
})
