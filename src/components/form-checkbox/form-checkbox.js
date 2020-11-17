import { defineComponent } from '../../vue'
import { NAME_FORM_CHECKBOX } from '../../constants/components'
import { EVENT_NAME_CHANGE, EVENT_NAME_MODEL_PREFIX } from '../../constants/events'
import looseEqual from '../../utils/loose-equal'
import looseIndexOf from '../../utils/loose-index-of'
import { makePropsConfigurable } from '../../utils/config'
import { isArray } from '../../utils/inspect'
import formRadioCheckMixin, {
  EVENT_NAME_UPDATE_CHECKED,
  props as formRadioCheckProps
} from '../../mixins/form-radio-check'

// --- Constants ---

const PROP_NAME_INDETERMINATE = 'indeterminate'

const EVENT_NAME_UPDATE_INDETERMINATE = EVENT_NAME_MODEL_PREFIX + PROP_NAME_INDETERMINATE

// --- Main component ---
// @vue/component
export const BFormCheckbox = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_CHECKBOX,
  mixins: [formRadioCheckMixin],
  inject: {
    bvGroup: {
      from: 'bvCheckGroup',
      default: null
    }
  },
  props: makePropsConfigurable(
    {
      ...formRadioCheckProps,
      value: {
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
    }
  },
  watch: {
    [PROP_NAME_INDETERMINATE](newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.setIndeterminate(newValue)
      }
    }
  },
  mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this[PROP_NAME_INDETERMINATE])
  },
  methods: {
    computedLocalCheckedWatcher(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(EVENT_NAME_UPDATE_CHECKED, newValue)

        const $input = this.$refs.input
        if ($input) {
          this.$emit(EVENT_NAME_UPDATE_INDETERMINATE, $input.indeterminate)
        }
      }
    },

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
        this.$emit(EVENT_NAME_CHANGE, localChecked)

        // If this is a child of a group, we emit a change event on it as well
        if (this.isGroup) {
          this.bvGroup.$emit(EVENT_NAME_CHANGE, localChecked)
        }

        this.$emit(EVENT_NAME_UPDATE_INDETERMINATE, indeterminate)
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
        this.$emit(EVENT_NAME_UPDATE_INDETERMINATE, state)
      }
    }
  }
})
