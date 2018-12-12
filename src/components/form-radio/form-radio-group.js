import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

import bFormRadio from './form-radio'

// @vue/component
export default {
  components: { bFormRadio },
  mixins: [
    idMixin,
    formMixin,
    formRadioCheckGroupMixin, // includes render function
    formOptionsMixin,
    formSizeMixin,
    formStateMixin
  ],
  provide () {
    return {
      bvRadioGroup: this
    }
  },
  props: {
    checked: {
      type: [String, Object, Number, Boolean],
      default: null
    }
  },
  data () {
    return {
      localChecked: this.checked
    }
  },
  computed: {
    is_RadioGroup () {
      return true
    }
  }
}
