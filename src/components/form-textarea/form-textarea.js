import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formTextMixin from '../../mixins/form-text'
import formSelectionMixin from '../../mixins/form-selection'
import formValidityMixin from '../../mixins/form-validity'
import { getCS, isVisible } from '../../utils/dom'

// @vue/component
export default {
  name: 'BFormTextarea',
  mixins: [
    idMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formTextMixin,
    formSelectionMixin,
    formValidityMixin
  ],
  props: {
    rows: {
      type: [Number, String],
      default: 2
    },
    maxRows: {
      type: [Number, String],
      default: null
    },
    wrap: {
      // 'soft', 'hard' or 'off'. Browser default is 'soft'
      type: String,
      default: 'soft'
    },
    noResize: {
      // Disable the resize handle of textarea
      type: Boolean,
      default: false
    },
    noAutoShrink: {
      // When in auto resize mode, disable shrinking to content height
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dontResize: true
    }
  },
  computed: {
    computedStyle() {
      const styles = {
        // Setting `noResize` to true will disable the ability for the user to
        // manually resize the textarea. We also disable when in auto resize mode
        resize: !this.computedRows || this.noResize ? 'none' : null
      }
      if (!this.computedRows) {
        // The computed height for auto resize.
        // We avoid setting the style to null, which can override user manual resize.
        styles.height = this.computedHeight
      }
      return styles
    },
    computedMinRows() {
      // Ensure rows is at least 2 and positive (2 is the native textarea value).
      // A value of 1 can cause issues in some browsers, and most browsers only support
      // 2 as the smallest value.
      return Math.max(parseInt(this.rows, 10) || 2, 2)
    },
    computedMaxRows() {
      return Math.max(this.computedMinRows, parseInt(this.maxRows, 10) || 0)
    },
    computedRows() {
      // This is used to set the attribute 'rows' on the textarea.
      // If auto-resize is enabled, then we return null as we use CSS to control height.
      return this.computedMinRows === this.computedMaxRows ? this.computedMinRows : null
    },
    computedHeight() /* istanbul ignore next: can't test getComputedProperties */ {
      // We compare `computedRows` and `localValue` to `true`, a value
      // they both can't have at any time, to ensure reactivity
      if (
        this.$isServer ||
        this.dontResize ||
        this.computedRows === true ||
        this.localValue === true
      ) {
        return null
      }

      const el = this.$el

      // Element must be visible (not hidden) and in document
      // *Must* be checked after above checks
      if (!isVisible(el)) {
        return null
      }

      // Remember old height (includes `px` units) and reset it temporarily to `auto`
      const oldHeight = el.style.height
      el.style.height = 'auto'

      // Get current computed styles
      const computedStyle = getCS(el)
      // Height of one line of text in px
      const lineHeight = parseFloat(computedStyle.lineHeight)
      // Minimum height for min rows (browser dependant)
      const minHeight = parseInt(computedStyle.height, 10) || lineHeight * this.computedMinRows
      // Calculate height of content
      const offset =
        (parseFloat(computedStyle.borderTopWidth) || 0) +
        (parseFloat(computedStyle.borderBottomWidth) || 0) +
        (parseFloat(computedStyle.paddingTop) || 0) +
        (parseFloat(computedStyle.paddingBottom) || 0)
      // Calculate content height in "rows"
      const contentRows = Math.max((el.scrollHeight - offset) / lineHeight, 2)
      // Calculate number of rows to display (limited within min/max rows)
      const rows = Math.min(Math.max(contentRows, this.computedMinRows), this.computedMaxRows)
      // Calculate the required height of the textarea including border and padding (in pixels)
      const height = Math.max(Math.ceil(rows * lineHeight + offset), minHeight)

      // Place old height back on element, just in case this computed prop returns the same value
      el.style.height = oldHeight

      // Value of previous height (without px units appended)
      const oldHeightPx = parseFloat(oldHeight) || 0

      if (this.noAutoShrink && oldHeightPx > height) {
        // Computed height remains the larger of oldHeight and new height
        // When height is `sticky` (no-auto-shrink is true)
        return oldHeight
      }

      // Return the new computed height in px units
      return `${height}px`
    }
  },
  mounted() {
    // Enable opt-in resizing once mounted
    this.$nextTick(() => {
      this.dontResize = false
    })
  },
  activated() {
    // If we are being re-activated in <keep-alive>, enable opt-in resizing
    this.$nextTick(() => {
      this.dontResize = false
    })
  },
  deactivated() {
    // If we are in a deactivated <keep-alive>, disable opt-in resizing
    this.dontResize = true
  },
  beforeDestroy() {
    /* istanbul ignore next */
    this.dontResize = true
  },
  render(h) {
    // Using self instead of this helps reduce code size during minification
    const self = this
    return h('textarea', {
      ref: 'input',
      class: self.computedClass,
      style: self.computedStyle,
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: self.localValue,
          expression: 'localValue'
        }
      ],
      attrs: {
        id: self.safeId(),
        name: self.name,
        form: self.form || null,
        disabled: self.disabled,
        placeholder: self.placeholder,
        required: self.required,
        autocomplete: self.autocomplete || null,
        readonly: self.readonly || self.plaintext,
        rows: self.computedRows,
        wrap: self.wrap || null,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: {
        value: self.localValue
      },
      on: {
        ...self.$listeners,
        input: self.onInput,
        change: self.onChange,
        blur: self.onBlur
      }
    })
  }
}
