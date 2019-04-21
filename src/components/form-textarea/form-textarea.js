import Vue from '../../utils/vue'
import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formTextMixin from '../../mixins/form-text'
import formSelectionMixin from '../../mixins/form-selection'
import formValidityMixin from '../../mixins/form-validity'
import { getCS, isVisible } from '../../utils/dom'
import { isNull } from '../../utils/inspect'

// @vue/component
export default Vue.extend({
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
      dontResize: true,
      heightInPx: null
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
        styles.height = this.heightInPx
        // We always add a vertical scrollbar to the textarea when auto-resize is
        // enabled so that the computed height calcaultion returns a stable value.
        styles.overflowY = 'scroll'
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
    }
  },
  watch: {
    dontResize(newVal, oldval) {
      if (!newVal) {
        this.setHeight()
      }
    },
    localValue(newVal, oldVal) {
      this.setHeight()
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
  methods: {
    setHeight() {
      this.$nextTick(() => {
        this.heightInPx = this.computeHeight()
      })
    },
    computeHeight() /* istanbul ignore next: can't test getComputedStyle in JSDOM */ {
      if (this.$isServer || !isNull(this.computedRows)) {
        return null
      }

      const el = this.$el

      // Element must be visible (not hidden) and in document.
      // Must be checked after above checks
      if (!isVisible(el)) {
        return null
      }

      // Get current computed styles
      const computedStyle = getCS(el)
      // Height of one line of text in px
      const lineHeight = parseFloat(computedStyle.lineHeight)
      // Calculate height of border and padding
      const border =
        (parseFloat(computedStyle.borderTopWidth) || 0) +
        (parseFloat(computedStyle.borderBottomWidth) || 0)
      const padding =
        (parseFloat(computedStyle.paddingTop) || 0) + (parseFloat(computedStyle.paddingBottom) || 0)
      // Calculate offset
      const offset = border + padding
      // Minimum height for min rows (which must be 2 rows or greater for cross-browser support)
      const minHeight = lineHeight * this.computedMinRows + offset

      // Get the current style height (with `px` units)
      const oldHeight = el.style.height || computedStyle.height
      // Probe scrollHeight by temporarily changing the height to `auto`
      el.style.height = 'auto'
      const scrollHeight = el.scrollHeight
      // Place the original old height back on the element, just in case this computedProp
      // returns the same value as before.
      el.style.height = oldHeight

      // Calculate content height in "rows" (scrollHeight includes padding but not border)
      const contentRows = Math.max((scrollHeight - padding) / lineHeight, 2)
      // Calculate number of rows to display (limited within min/max rows)
      const rows = Math.min(Math.max(contentRows, this.computedMinRows), this.computedMaxRows)
      // Calculate the required height of the textarea including border and padding (in pixels)
      const height = Math.max(Math.ceil(rows * lineHeight + offset), minHeight)

      // Computed height remains the larger of oldHeight and new height,
      // when height is in `sticky` mode (prop `no-auto-shrink` is true)
      if (this.noAutoShrink && (parseFloat(oldHeight) || 0) > height) {
        return oldHeight
      }

      // Return the new computed CSS height in px units
      return `${height}px`
    }
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
})
