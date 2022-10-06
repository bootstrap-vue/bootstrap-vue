import { extend } from '../../vue'
import { NAME_FORM_CHECKBOX_GROUP } from '../../constants/components'
import { PROP_TYPE_ARRAY, PROP_TYPE_BOOLEAN } from '../../constants/props'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import {
  MODEL_PROP_NAME,
  formRadioCheckGroupMixin,
  props as formRadioCheckGroupProps
} from '../../mixins/form-radio-check-group'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...formRadioCheckGroupProps,
    [MODEL_PROP_NAME]: makeProp(PROP_TYPE_ARRAY, []),
    // Custom switch styling
    switches: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_FORM_CHECKBOX_GROUP
)

// --- Main component ---

// @vue/component
export const BFormCheckboxGroup = /*#__PURE__*/ extend({
  name: NAME_FORM_CHECKBOX_GROUP,
  // Includes render function
  mixins: [formRadioCheckGroupMixin],
  provide() {
    return {
      getBvCheckGroup: () => this
    }
  },
  props,
  computed: {
    isRadioGroup() {
      return false
    }
  }
})
