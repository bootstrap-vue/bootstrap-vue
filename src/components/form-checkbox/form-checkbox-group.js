import Vue from '../../vue'
import { NAME_FORM_CHECKBOX_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import formControlMixin, { props as formControlProps } from '../../mixins/form-control'
import formOptionsMixin, { props as formOptionsProps } from '../../mixins/form-options'
import formRadioCheckGroupMixin, {
  props as formRadioCheckGroupProps
} from '../../mixins/form-radio-check-group'
import formSizeMixin, { props as formSizeProps } from '../../mixins/form-size'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import idMixin from '../../mixins/id'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...formControlProps,
    ...formOptionsProps,
    ...formRadioCheckGroupProps,
    ...formSizeProps,
    ...formStateProps,
    switches: {
      // Custom switch styling
      type: Boolean,
      default: false
    },
    checked: {
      type: Array,
      default: null
    }
  },
  NAME_FORM_CHECKBOX_GROUP
)

// --- Main component ---
// @vue/component
export const BFormCheckboxGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_CHECKBOX_GROUP,
  mixins: [
    idMixin,
    formControlMixin,
    formRadioCheckGroupMixin, // Includes render function
    formOptionsMixin,
    formSizeMixin,
    formStateMixin
  ],
  provide() {
    return {
      bvCheckGroup: this
    }
  },
  props,
  data() {
    return {
      localChecked: this.checked || []
    }
  },
  computed: {
    isRadioGroup() {
      return false
    }
  }
})
