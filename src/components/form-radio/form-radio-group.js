import { defineComponent } from '../../vue'
import { NAME_FORM_RADIO_GROUP } from '../../constants/components'
import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

// --- Props ---

export const props = {
  checked: {
    // type: [String, Number, Boolean, Object],
    default: null
  }
}

// --- Main component ---
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
  props,
  data() {
    return {
      localChecked: this.checked
    }
  },
  computed: {
    isRadioGroup() {
      return true
    }
  }
})
