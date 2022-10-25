import { extend, mergeData } from '../../vue'
import { NAME_FORM_VALID_FEEDBACK } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ariaLive: makeProp(PROP_TYPE_STRING),
    forceShow: makeProp(PROP_TYPE_BOOLEAN, false),
    id: makeProp(PROP_TYPE_STRING),
    role: makeProp(PROP_TYPE_STRING),
    // Tri-state prop: `true`, `false`, or `null`
    state: makeProp(PROP_TYPE_BOOLEAN, null),
    tag: makeProp(PROP_TYPE_STRING, 'div'),
    tooltip: makeProp(PROP_TYPE_BOOLEAN, false)
  },
  NAME_FORM_VALID_FEEDBACK
)

// --- Main component ---

// @vue/component
export const BFormValidFeedback = /*#__PURE__*/ extend({
  name: NAME_FORM_VALID_FEEDBACK,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { tooltip, ariaLive } = props
    const show = props.forceShow === true || props.state === true

    return h(
      props.tag,
      mergeData(data, {
        class: {
          'd-block': show,
          'valid-feedback': !tooltip,
          'valid-tooltip': tooltip
        },
        attrs: {
          id: props.id || null,
          role: props.role || null,
          'aria-live': ariaLive || null,
          'aria-atomic': ariaLive ? 'true' : null
        }
      }),
      children
    )
  }
})
