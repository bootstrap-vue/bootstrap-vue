import { Vue, mergeData } from '../../vue'
import { NAME_SKELETON_TABLE } from '../../constants/components'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_NUMBER,
  PROP_TYPE_OBJECT,
  PROP_TYPE_STRING
} from '../../constants/props'
import { createArray } from '../../utils/array'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BSkeleton } from './skeleton'
import { BTableSimple } from '../table'

// --- Helper methods ---

const isPositiveNumber = value => value > 0

// --- Props ---

export const props = makePropsConfigurable(
  {
    animation: makeProp(PROP_TYPE_STRING),
    columns: makeProp(PROP_TYPE_NUMBER, 5, isPositiveNumber),
    hideHeader: makeProp(PROP_TYPE_BOOLEAN, false),
    rows: makeProp(PROP_TYPE_NUMBER, 3, isPositiveNumber),
    showFooter: makeProp(PROP_TYPE_BOOLEAN, false),
    tableProps: makeProp(PROP_TYPE_OBJECT, {})
  },
  NAME_SKELETON_TABLE
)

// --- Main component ---

// @vue/component
export const BSkeletonTable = /*#__PURE__*/ Vue.extend({
  name: NAME_SKELETON_TABLE,
  functional: true,
  props,
  render(h, { data, props }) {
    const { animation, columns } = props

    const $th = h('th', [h(BSkeleton, { props: { animation } })])
    const $thTr = h('tr', createArray(columns, $th))

    const $td = h('td', [h(BSkeleton, { props: { width: '75%', animation } })])
    const $tdTr = h('tr', createArray(columns, $td))
    const $tbody = h('tbody', createArray(props.rows, $tdTr))

    const $thead = !props.hideHeader ? h('thead', [$thTr]) : h()
    const $tfoot = props.showFooter ? h('tfoot', [$thTr]) : h()

    return h(BTableSimple, mergeData(data, { props: { ...props.tableProps } }), [
      $thead,
      $tbody,
      $tfoot
    ])
  }
})
