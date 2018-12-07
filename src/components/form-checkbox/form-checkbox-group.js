import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

import bFormCheckbox from './form-checkbox'

export default {
  mixins: [
    idMixin,
    formMixin,
    formRadioCheckGroupMixin, // includes render function
    formOptionsMixin,
    formSizeMixin,
    formStateMixin
  ],
  components: { bFormCheckbox },
  provide () {
    return {
      bvCheckGroup: this
    }
  },
  data () {
    return {
      localChecked: this.checked || []
    }
  },
  props: {
    checked: {
      type: [String, Number, Object, Array, Boolean],
      default: null
    }
  },
  computed: {
    is_RadioGroup () {
      return false
    }
  }
}
