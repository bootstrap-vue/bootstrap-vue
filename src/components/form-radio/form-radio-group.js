import { NAME_FORM_RADIO_GROUP } from '../../constants/components'
import Vue from '../../utils/vue'
import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

export const props = {
  checked: {
    // type: [String, Number, Boolean, Object],
    default: null
  }
}

// @vue/component
export const BFormRadioGroup = /*#__PURE__*/ Vue.extend({
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
