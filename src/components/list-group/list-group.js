import { Vue, mergeData } from '../../vue'
import { NAME_LIST_GROUP } from '../../constants/components'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { isString } from '../../utils/inspect'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    flush: makeProp(PROP_TYPE_BOOLEAN, false),
    horizontal: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    tag: makeProp(PROP_TYPE_STRING, 'div')
  },
  NAME_LIST_GROUP
)

// --- Main component ---

// @vue/component
export const BListGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_LIST_GROUP,
  functional: true,
  props,
  render(h, { props, data, children }) {
    let horizontal = props.horizontal === '' ? true : props.horizontal
    horizontal = props.flush ? false : horizontal
    const componentData = {
      staticClass: 'list-group',
      class: {
        'list-group-flush': props.flush,
        'list-group-horizontal': horizontal === true,
        [`list-group-horizontal-${horizontal}`]: isString(horizontal)
      }
    }
    return h(props.tag, mergeData(data, componentData), children)
  }
})
