import idMixin from '../../mixins/id'
import formRadioCheckMixin from '../../mixins/form-radio-check'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import { isArray } from '../../utils/array'
import looseEqual from '../../utils/loose-equal'
import looseIndexOf from '../../utils/loose-index-of'

// @vue/component
export default {
  name: 'BFormCheckbox',
  mixins: [
    formRadioCheckMixin, // Includes shared render function
    idMixin,
    formMixin,
    formSizeMixin,
    formStateMixin
  ],
  inject: {
    bvGroup: {
      from: 'bvCheckGroup',
      default: function() {
        return this
      }
    }
  },
  props: {
    value: {
      // type: [Object, Boolean],
      default: true
    },
    uncheckedValue: {
      // type: [Object, Boolean],
      // Not applicable in multi-check mode
      default: false
    },
    indeterminate: {
      // Not applicable in multi-check mode
      type: Boolean,
      default: false
    },
    switch: {
      // Custom switch styling
      type: Boolean,
      default: false
    },
    checked: {
      // v-model
      type: [String, Number, Object, Array, Boolean],
      default: null
    }
  },
  computed: {
    is_Checked() {
      const checked = this.computedLocalChecked
      const value = this.value
      if (isArray(checked)) {
        return looseIndexOf(checked, value) > -1
      } else {
        return looseEqual(checked, value)
      }
    },
    is_Radio() {
      return false
    },
    is_Check() {
      return true
    }
  },
  watch: {
    computedLocalChecked(newVal, oldVal) {
      this.$emit('input', newVal)
      if (this.$refs && this.$refs.input) {
        this.$emit('update:indeterminate', this.$refs.input.indeterminate)
      }
    },
    indeterminate(newVal, oldVal) {
      this.setIndeterminate(newVal)
    }
  },
  mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this.indeterminate)
  },
  methods: {
    handleChange({ target: { checked, indeterminate } }) {
      let localChecked = this.computedLocalChecked
      const value = this.value
      const isArr = isArray(localChecked)
      const uncheckedValue = isArr ? null : this.uncheckedValue
      // Update computedLocalChecked
      if (isArr) {
        const idx = looseIndexOf(localChecked, value)
        if (checked && idx < 0) {
          // Add value to array
          localChecked = localChecked.concat(value)
        } else if (!checked && idx > -1) {
          // Remove value from array
          localChecked = localChecked.slice(0, idx).concat(localChecked.slice(idx + 1))
        }
      } else {
        localChecked = checked ? value : uncheckedValue
      }
      this.computedLocalChecked = localChecked
      // Change is only emitted on user interaction
      this.$emit('change', checked ? value : uncheckedValue)
      // If this is a child of form-checkbox-group, we emit a change event on it as well
      if (this.is_Group) {
        this.bvGroup.$emit('change', localChecked)
      }
      this.$emit('update:indeterminate', indeterminate)
    },
    setIndeterminate(state) {
      // Indeterminate only supported in single checkbox mode
      if (isArray(this.computedLocalChecked)) {
        state = false
      }
      if (this.$refs && this.$refs.input) {
        this.$refs.input.indeterminate = state
        // Emit update event to prop
        this.$emit('update:indeterminate', state)
      }
    }
  }
}
