import { NAME_SKELETON_TABLE } from '../../constants/components'
import Vue from '../../utils/vue'
import { createAndFillArray } from '../../utils/array'
import { BSkeleton } from './skeleton'
import { BTableSimple } from '../table'

// @vue/component
export const BSkeletonTable = /*#__PURE__*/ Vue.extend({
  name: NAME_SKELETON_TABLE,
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

    const $td = h('td', [h(BSkeleton, { props: { width: '75%', animation } })])
    const $tdTr = h('tr', createAndFillArray(columns, $td))
    const $tbody = h('tbody', createAndFillArray(props.rows, $tdTr))

    const $thead = !props.hideHeader ? h('thead', [$thTr]) : h()
    const $tfoot = props.showFooter ? h('tfoot', [$thTr]) : h()

    return h(BTableSimple, { props: { ...props.tableProps } }, [$thead, $tbody, $tfoot])
  }
})
