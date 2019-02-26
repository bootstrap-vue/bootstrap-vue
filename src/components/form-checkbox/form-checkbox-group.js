import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

import BFormCheckbox from './form-checkbox'

// @vue/component
export default {
  name: 'BFormCheckboxGroup',
  components: { BFormCheckbox },
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
  props: {
    switches: {
      // Custom switch styling
      type: Boolean,
      default: false
    },
    checked: {
      type: [String, Number, Object, Array, Boolean],
      default: null
    }
  },
  data() {
    return {
      localChecked: this.checked || []
    }
  },
  computed: {
    is_RadioGroup() {
      return false
    }
  }
}
