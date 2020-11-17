import { defineComponent } from '../../vue'
import { NAME_FORM_CHECKBOX_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import formRadioCheckGroupMixin, {
  PROP_NAME_CHECKED,
  props as formRadioCheckGroupProps
} from '../../mixins/form-radio-check-group'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...formRadioCheckGroupProps,
    [PROP_NAME_CHECKED]: {
      type: Array,
      default: () => []
    },
    switches: {
      // Custom switch styling
      type: Boolean,
      default: false
    }
  },
  NAME_FORM_CHECKBOX_GROUP
)

// --- Main component ---
// @vue/component
export const BFormCheckboxGroup = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_CHECKBOX_GROUP,
  // Includes render function
  mixins: [formRadioCheckGroupMixin],
  provide() {
    return {
      bvCheckGroup: this
    }
  },
  props,
  computed: {
    isRadioGroup() {
      return false
    }
  }
})
