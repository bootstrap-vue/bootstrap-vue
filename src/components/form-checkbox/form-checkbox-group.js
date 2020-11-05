import Vue from '../../vue'
import { NAME_FORM_CHECKBOX_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import formMixin, { props as formProps } from '../../mixins/form'
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
    ...formProps,
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
    formMixin,
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
