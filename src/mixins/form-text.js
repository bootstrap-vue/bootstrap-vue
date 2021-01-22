import { Vue } from '../vue'
import {
  EVENT_NAME_BLUR,
  EVENT_NAME_CHANGE,
  EVENT_NAME_INPUT,
  EVENT_NAME_UPDATE,
  HOOK_EVENT_NAME_BEFORE_DESTROY
} from '../constants/events'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_STRING,
  PROP_TYPE_FUNCTION,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../constants/props'
import { attemptBlur, attemptFocus } from '../utils/dom'
import { stopEvent } from '../utils/events'
import { mathMax } from '../utils/math'
import { makeModelMixin } from '../utils/model'
import { toInteger, toFloat } from '../utils/number'
import { sortKeys } from '../utils/object'
import { hasPropFunction, makeProp, makePropsConfigurable } from '../utils/props'
import { toString } from '../utils/string'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', {
  type: PROP_TYPE_NUMBER_STRING,
  defaultValue: '',
  event: EVENT_NAME_UPDATE
})

export { MODEL_PROP_NAME, MODEL_EVENT_NAME }

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...modelProps,
    ariaInvalid: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    autocomplete: makeProp(PROP_TYPE_STRING),
    // Debounce timeout (in ms). Not applicable with `lazy` prop
    debounce: makeProp(PROP_TYPE_NUMBER_STRING, 0),
    formatter: makeProp(PROP_TYPE_FUNCTION),
    // Only update the `v-model` on blur/change events
    lazy: makeProp(PROP_TYPE_BOOLEAN, false),
    lazyFormatter: makeProp(PROP_TYPE_BOOLEAN, false),
    number: makeProp(PROP_TYPE_BOOLEAN, false),
    placeholder: makeProp(PROP_TYPE_STRING),
    plaintext: makeProp(PROP_TYPE_BOOLEAN, false),
    readonly: makeProp(PROP_TYPE_BOOLEAN, false),
    trim: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  'formTextControls'
)

// --- Mixin ---

// @vue/component
export const formTextMixin = Vue.extend({
  mixins: [modelMixin],
  props,
  data() {
    const value = this[MODEL_PROP_NAME]
    return {
      localValue: toString(value),
      vModelValue: this.modifyValue(value)
    }
  },
  computed: {
    computedClass() {
      const { plaintext, type } = this
      const isRange = type === 'range'
      const isColor = type === 'color'

      return [
        {
          // Range input needs class `custom-range`
          'custom-range': isRange,
          // `plaintext` not supported by `type="range"` or `type="color"`
          'form-control-plaintext': plaintext && !isRange && !isColor,
          // `form-control` not used by `type="range"` or `plaintext`
          // Always used by `type="color"`
          'form-control': isColor || (!plaintext && !isRange)
        },
        this.sizeFormClass,
        this.stateClass
      ]
    },
    computedDebounce() {
      // Ensure we have a positive number equal to or greater than 0
      return mathMax(toInteger(this.debounce, 0), 0)
    },
    hasFormatter() {
      return hasPropFunction(this.formatter)
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue) {
      const stringifyValue = toString(newValue)
      const modifiedValue = this.modifyValue(newValue)
      if (stringifyValue !== this.localValue || modifiedValue !== this.vModelValue) {
        // Clear any pending debounce timeout, as we are overwriting the user input
        this.clearDebounce()
        // Update the local values
        this.localValue = stringifyValue
        this.vModelValue = modifiedValue
      }
    }
  },
  created() {
    // Create private non-reactive props
    this.$_inputDebounceTimer = null
  },
  mounted() {
    // Set up destroy handler
    this.$on(HOOK_EVENT_NAME_BEFORE_DESTROY, this.clearDebounce)
  },
  beforeDestroy() {
    this.clearDebounce()
  },
  methods: {
    clearDebounce() {
      clearTimeout(this.$_inputDebounceTimer)
      this.$_inputDebounceTimer = null
    },
    formatValue(value, event, force = false) {
      value = toString(value)
      if (this.hasFormatter && (!this.lazyFormatter || force)) {
        value = this.formatter(value, event)
      }
      return value
    },
    modifyValue(value) {
      value = toString(value)
      // Emulate `.trim` modifier behaviour
      if (this.trim) {
        value = value.trim()
      }
      // Emulate `.number` modifier behaviour
      if (this.number) {
        value = toFloat(value, value)
      }
      return value
    },
    updateValue(value, force = false) {
      const { lazy } = this
      if (lazy && !force) {
        return
      }
      // Make sure to always clear the debounce when `updateValue()`
      // is called, even when the v-model hasn't changed
      this.clearDebounce()
      // Define the shared update logic in a method to be able to use
      // it for immediate and debounced value changes
      const doUpdate = () => {
        value = this.modifyValue(value)
        if (value !== this.vModelValue) {
          this.vModelValue = value
          this.$emit(MODEL_EVENT_NAME, value)
        } else if (this.hasFormatter) {
          // When the `vModelValue` hasn't changed but the actual input value
          // is out of sync, make sure to change it to the given one
          // Usually caused by browser autocomplete and how it triggers the
          // change or input event, or depending on the formatter function
          // https://github.com/bootstrap-vue/bootstrap-vue/issues/2657
          // https://github.com/bootstrap-vue/bootstrap-vue/issues/3498
          /* istanbul ignore next: hard to test */
          const $input = this.$refs.input
          /* istanbul ignore if: hard to test out of sync value */
          if ($input && value !== $input.value) {
            $input.value = value
          }
        }
      }
      // Only debounce the value update when a value greater than `0`
      // is set and we are not in lazy mode or this is a forced update
      const debounce = this.computedDebounce
      if (debounce > 0 && !lazy && !force) {
        this.$_inputDebounceTimer = setTimeout(doUpdate, debounce)
      } else {
        // Immediately update the v-model
        doUpdate()
      }
    },
    onInput(event) {
      // `event.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      // TODO: Is this needed now with the latest Vue?
      /* istanbul ignore if: hard to test composition events */
      if (event.target.composing) {
        return
      }
      const { value } = event.target
      const formattedValue = this.formatValue(value, event)
      // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event
      /* istanbul ignore next */
      if (formattedValue === false || event.defaultPrevented) {
        stopEvent(event, { propagation: false })
        return
      }
      this.localValue = formattedValue
      this.updateValue(formattedValue)
      this.$emit(EVENT_NAME_INPUT, formattedValue)
    },
    onChange(event) {
      const { value } = event.target
      const formattedValue = this.formatValue(value, event)
      // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event
      /* istanbul ignore next */
      if (formattedValue === false || event.defaultPrevented) {
        stopEvent(event, { propagation: false })
        return
      }
      this.localValue = formattedValue
      this.updateValue(formattedValue, true)
      this.$emit(EVENT_NAME_CHANGE, formattedValue)
    },
    onBlur(event) {
      // Apply the `localValue` on blur to prevent cursor jumps
      // on mobile browsers (e.g. caused by autocomplete)
      const { value } = event.target
      const formattedValue = this.formatValue(value, event, true)
      if (formattedValue !== false) {
        // We need to use the modified value here to apply the
        // `.trim` and `.number` modifiers properly
        this.localValue = toString(this.modifyValue(formattedValue))
        // We pass the formatted value here since the `updateValue` method
        // handles the modifiers itself
        this.updateValue(formattedValue, true)
      }
      // Emit native blur event
      this.$emit(EVENT_NAME_BLUR, event)
    },
    focus() {
      // For external handler that may want a focus method
      if (!this.disabled) {
        attemptFocus(this.$el)
      }
    },
    blur() {
      // For external handler that may want a blur method
      if (!this.disabled) {
        attemptBlur(this.$el)
      }
    }
  }
})
