import { defineComponent } from '../../vue'
import { NAME_FORM_RADIO_GROUP } from '../../constants/components'
import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

// @vue/component
export const BFormRadioGroup = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_RADIO_GROUP,
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
      bvRadioGroup: this
    }
  },
  computed: {
    isRadioGroup() {
      return true
    }
  }
})
