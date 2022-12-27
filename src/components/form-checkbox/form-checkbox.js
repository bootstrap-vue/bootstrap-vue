import { extend } from '../../vue'
import { NAME_FORM_CHECKBOX } from '../../constants/components'
import { EVENT_NAME_CHANGE, MODEL_EVENT_NAME_PREFIX } from '../../constants/events'
import { PROP_TYPE_ANY, PROP_TYPE_BOOLEAN } from '../../constants/props'
import { isArray } from '../../utils/inspect'
import { looseEqual } from '../../utils/loose-equal'
import { looseIndexOf } from '../../utils/loose-index-of'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import {
  MODEL_EVENT_NAME,
  formRadioCheckMixin,
  props as formRadioCheckProps
} from '../../mixins/form-radio-check'

// --- Constants ---

const MODEL_PROP_NAME_INDETERMINATE = 'indeterminate'
const MODEL_EVENT_NAME_INDETERMINATE = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_INDETERMINATE

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...formRadioCheckProps,
    // Not applicable in multi-check mode
    [MODEL_PROP_NAME_INDETERMINATE]: makeProp(PROP_TYPE_BOOLEAN, false),
    // Custom switch styling
    switch: makeProp(PROP_TYPE_BOOLEAN, false),
    // Not applicable in multi-check mode
    uncheckedValue: makeProp(PROP_TYPE_ANY, false),
    value: makeProp(PROP_TYPE_ANY, true)
  }),
  NAME_FORM_CHECKBOX
)

// --- Main component ---

// @vue/component
export const BFormCheckbox = /*#__PURE__*/ extend({
  name: NAME_FORM_CHECKBOX,
  mixins: [formRadioCheckMixin],
  inject: {
    getBvGroup: {
      from: 'getBvCheckGroup',
      default: () => () => null
    }
  },
  props,
  computed: {
    bvGroup() {
      return this.getBvGroup()
    },
    isChecked() {
      const { value, computedLocalChecked: checked } = this
      return isArray(checked) ? looseIndexOf(checked, value) > -1 : looseEqual(checked, value)
    },
    isRadio() {
      return false
    }
  },
  watch: {
    [MODEL_PROP_NAME_INDETERMINATE](newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.setIndeterminate(newValue)
      }
    }
  },
  mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this[MODEL_PROP_NAME_INDETERMINATE])
  },
  methods: {
    computedLocalCheckedWatcher(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(MODEL_EVENT_NAME, newValue)

        const $input = this.$refs.input
        if ($input) {
          this.$emit(MODEL_EVENT_NAME_INDETERMINATE, $input.indeterminate)
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

        this.$emit(MODEL_EVENT_NAME_INDETERMINATE, indeterminate)
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
        this.$emit(MODEL_EVENT_NAME_INDETERMINATE, state)
      }
    }
  }
})
