import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formOptionsMixin from '../../mixins/form-options'
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

import bFormRadio from './form-radio'

export default {
  mixins: [
    idMixin,
    formMixin,
    formRadioCheckGroupMixin, // includes render function
    formOptionsMixin,
    formSizeMixin,
    formStateMixin
  ],
  components: { bFormRadio },
  provide () {
    return {
      bvRadioGroup: this
    }
  },
  data () {
    return {
      localChecked: this.checked
    }
  },
  props: {
    checked: {
      type: [String, Object, Number, Boolean],
      default: null
    }
  },
  computed: {
    is_RadioGroup () {
      return true
    }
  }
}
