import Vue from '../../vue'
import { NAME_FORM_CHECKBOX } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import looseEqual from '../../utils/loose-equal'
import looseIndexOf from '../../utils/loose-index-of'
import { isArray } from '../../utils/inspect'
import formControlMixin, { props as formControlProps } from '../../mixins/form-control'
import formRadioCheckMixin, { props as formRadioCheckProps } from '../../mixins/form-radio-check'
import formSizeMixin, { props as formSizeProps } from '../../mixins/form-size'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import idMixin from '../../mixins/id'

// @vue/component
export const BFormCheckbox = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_CHECKBOX,
  mixins: [
    formRadioCheckMixin, // Includes shared render function
    idMixin,
    formControlMixin,
    formSizeMixin,
    formStateMixin
  ],
  inject: {
    bvGroup: {
      from: 'bvCheckGroup',
      default: false
    }
  },
  props: makePropsConfigurable(
    {
      ...formControlProps,
      ...formRadioCheckProps,
      ...formSizeProps,
      ...formStateProps,
      value: {
        // type: [String, Number, Boolean, Object],
        default: true
      },
      uncheckedValue: {
        // type: [String, Number, Boolean, Object],
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
        // v-model (Array when multiple checkboxes have same name)
        // type: [String, Number, Boolean, Object, Array],
        default: null
      }
    },
    NAME_FORM_CHECKBOX
  ),
  computed: {
    isChecked() {
      const { value, computedLocalChecked: checked } = this
      return isArray(checked) ? looseIndexOf(checked, value) > -1 : looseEqual(checked, value)
    },
    isRadio() {
      return false
    },
    isCheck() {
      return true
    }
  },
  watch: {
    computedLocalChecked(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit('input', newValue)

        const $input = this.$refs.input
        if ($input) {
          this.$emit('update:indeterminate', $input.indeterminate)
        }
      }
    },
    indeterminate(newVal) {
      this.setIndeterminate(newVal)
    }
  },
  mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this.indeterminate)
  },
  methods: {
    handleChange({ target: { checked, indeterminate } }) {
      const { value, uncheckedValue } = this

      // Update `computedLocalChecked`
      let localChecked = this.computedLocalChecked
      if (isArray(localChecked)) {
        const index = looseIndexOf(localChecked, value)
        if (checked && index < 0) {
          // Add value to array
          localChecked = localChecked.concat(value)
        } else if (!checked && index > -1) {
          // Remove value from array
          localChecked = localChecked.slice(0, index).concat(localChecked.slice(index + 1))
        }
      } else {
        localChecked = checked ? value : uncheckedValue
      }
      this.computedLocalChecked = localChecked

      // Fire events in a `$nextTick()` to ensure the `v-model` is updated
      this.$nextTick(() => {
        // Change is only emitted on user interaction
        this.$emit('change', localChecked)

        // If this is a child of `<form-checkbox-group>`,
        // we emit a change event on it as well
        if (this.isGroup) {
          this.bvGroup.$emit('change', localChecked)
        }

        this.$emit('update:indeterminate', indeterminate)
      })
    },
    setIndeterminate(state) {
      // Indeterminate only supported in single checkbox mode
      if (isArray(this.computedLocalChecked)) {
        state = false
      }

      const $input = this.$refs.input
      if ($input) {
        $input.indeterminate = state
        // Emit update event to prop
        this.$emit('update:indeterminate', state)
      }
    }
  }
})
