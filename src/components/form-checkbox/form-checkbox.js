import { defineComponent } from '../../vue'
import { NAME_FORM_CHECKBOX } from '../../constants/components'
import { EVENT_NAME_CHANGE, EVENT_NAME_MODEL_PREFIX } from '../../constants/events'
import { PROP_NAME_MODEL_VALUE } from '../../constants/props'
import looseEqual from '../../utils/loose-equal'
import looseIndexOf from '../../utils/loose-index-of'
import { isArray } from '../../utils/inspect'
import formMixin from '../../mixins/form'
import formRadioCheckMixin from '../../mixins/form-radio-check'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import idMixin from '../../mixins/id'

// --- Constants ---

const PROP_NAME_INDETERMINATE = 'indeterminate'

const EVENT_NAME_MODEL_INDETERMINATE = EVENT_NAME_MODEL_PREFIX + PROP_NAME_INDETERMINATE

// --- Main component ---
// @vue/component
export const BFormCheckbox = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_CHECKBOX,
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
      default: false
    }
  },
  props: {
    [PROP_NAME_MODEL_VALUE]: {
      // type: [Boolean, Number, Object, String],
      default: true
    },
    uncheckedValue: {
      // type: [String, Number, Boolean, Object],
      // Not applicable in multi-check mode
      default: false
    },
    [PROP_NAME_INDETERMINATE]: {
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
  emits: [EVENT_NAME_CHANGE],
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
        this.$emit(PROP_NAME_MODEL_VALUE, newValue)

        const $input = this.$refs.input
        if ($input) {
          this.$emit(EVENT_NAME_MODEL_INDETERMINATE, $input.indeterminate)
        }
      }
    },
    [PROP_NAME_INDETERMINATE](newVal) {
      this.setIndeterminate(newVal)
    }
  },
  mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this[PROP_NAME_INDETERMINATE])
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

      // Change is only emitted on user interaction
      this.$emit(EVENT_NAME_CHANGE, localChecked)

      // If this is a child of `<form-checkbox-group>`,
      // we emit a change event on it as well
      if (this.isGroup) {
        this.bvGroup.$emit(EVENT_NAME_CHANGE, localChecked)
      }

      this.$emit(EVENT_NAME_MODEL_INDETERMINATE, indeterminate)
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
        this.$emit(EVENT_NAME_MODEL_INDETERMINATE, state)
      }
    }
  }
})
