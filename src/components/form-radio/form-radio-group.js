import { extend } from '../../vue'
import { NAME_FORM_RADIO_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/props'
import {
  formRadioCheckGroupMixin,
  props as formRadioCheckGroupProps
} from '../../mixins/form-radio-check-group'

// --- Props ---

export const props = makePropsConfigurable(formRadioCheckGroupProps, NAME_FORM_RADIO_GROUP)

// --- Main component ---

// @vue/component
export const BFormRadioGroup = /*#__PURE__*/ extend({
  name: NAME_FORM_RADIO_GROUP,
  mixins: [formRadioCheckGroupMixin],
  provide() {
    return {
      getBvRadioGroup: () => this
    }
  },
  props,
  computed: {
    isRadioGroup() {
      return true
    }
  }
})
