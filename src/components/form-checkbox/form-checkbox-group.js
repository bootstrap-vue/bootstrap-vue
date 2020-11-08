import { defineComponent } from '../../vue'
import { NAME_FORM_CHECKBOX_GROUP } from '../../constants/components'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import idMixin from '../../mixins/id'

// @vue/component
export const BFormCheckboxGroup = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_CHECKBOX_GROUP,
  mixins: [
    idMixin,
    formMixin,
    formRadioCheckGroupMixin, // Includes render function
    formOptionsMixin,
    formSizeMixin,
    formStateMixin
  ],
  props: {
    // Custom switch styling
    switches: {
      type: Boolean,
      default: false
    }
  }
})
