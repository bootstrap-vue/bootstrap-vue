import Vue from '../../vue'
import { NAME_FORM_TEXTAREA } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { getCS, getStyle, isVisible, requestAF, setStyle } from '../../utils/dom'
import { isNull } from '../../utils/inspect'
import { mathCeil, mathMax, mathMin } from '../../utils/math'
import { toInteger, toFloat } from '../../utils/number'
import formControlMixin, { props as formControlProps } from '../../mixins/form-control'
import formSelectionMixin from '../../mixins/form-selection'
import formSizeMixin, { props as formSizeProps } from '../../mixins/form-size'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import formTextMixin, { props as formTextProps } from '../../mixins/form-text'
import formValidityMixin from '../../mixins/form-validity'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import listenersMixin from '../../mixins/listeners'
import { VBVisible } from '../../directives/visible/visible'

// @vue/component
export const BFormTextarea = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_TEXTAREA,
  directives: {
    'b-visible': VBVisible
  },
  // Mixin order is important!
  mixins: [
    listenersMixin,
    idMixin,
    listenOnRootMixin,
    formControlMixin,
    formSizeMixin,
    formStateMixin,
    formTextMixin,
    formSelectionMixin,
    formValidityMixin
  ],
  props: makePropsConfigurable(
    {
      ...formControlProps,
      ...formSizeProps,
      ...formStateProps,
      ...formTextProps,
      rows: {
        type: [Number, String],
        default: 2
      },
      maxRows: {
        type: [Number, String]
        // default: null
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
    NAME_FORM_TEXTAREA
  ),
  data() {
    return {
      heightInPx: null
    }
  },
  computed: {
    computedStyle() {
      const styles = {
        // Setting `noResize` to true will disable the ability for the user to
        // manually resize the textarea. We also disable when in auto height mode
        resize: !this.computedRows || this.noResize ? 'none' : null
      }
      if (!this.computedRows) {
        // Conditionally set the computed CSS height when auto rows/height is enabled
        // We avoid setting the style to `null`, which can override user manual resize handle
        styles.height = this.heightInPx
        // We always add a vertical scrollbar to the textarea when auto-height is
        // enabled so that the computed height calculation returns a stable value
        styles.overflowY = 'scroll'
      }
      return styles
    },
    computedMinRows() {
      // Ensure rows is at least 2 and positive (2 is the native textarea value)
      // A value of 1 can cause issues in some browsers, and most browsers
      // only support 2 as the smallest value
      return mathMax(toInteger(this.rows, 2), 2)
    },
    computedMaxRows() {
      return mathMax(this.computedMinRows, toInteger(this.maxRows, 0))
    },
    computedRows() {
      // This is used to set the attribute 'rows' on the textarea
      // If auto-height is enabled, then we return `null` as we use CSS to control height
      return this.computedMinRows === this.computedMaxRows ? this.computedMinRows : null
    },
    computedAttrs() {
      const { disabled, required } = this

      return {
        id: this.safeId(),
        name: this.name || null,
        form: this.form || null,
        disabled,
        placeholder: this.placeholder || null,
        required,
        autocomplete: this.autocomplete || null,
        readonly: this.readonly || this.plaintext,
        rows: this.computedRows,
        wrap: this.wrap || null,
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      }
    },
    computedListeners() {
      return {
        ...this.bvListeners,
        input: this.onInput,
        change: this.onChange,
        blur: this.onBlur
      }
    }
  },
  watch: {
    localValue() {
      this.setHeight()
    }
  },
  mounted() {
    this.setHeight()
  },
  methods: {
    // Called by intersection observer directive
    /* istanbul ignore next */
    visibleCallback(visible) {
      if (visible) {
        // We use a `$nextTick()` here just to make sure any
        // transitions or portalling have completed
        this.$nextTick(this.setHeight)
      }
    },
    setHeight() {
      this.$nextTick(() => {
        requestAF(() => {
          this.heightInPx = this.computeHeight()
        })
      })
    },
    /* istanbul ignore next: can't test getComputedStyle in JSDOM */
    computeHeight() {
      if (this.$isServer || !isNull(this.computedRows)) {
        return null
      }

      const el = this.$el

      // Element must be visible (not hidden) and in document
      // Must be checked after above checks
      if (!isVisible(el)) {
        return null
      }

      // Get current computed styles
      const computedStyle = getCS(el)
      // Height of one line of text in px
      const lineHeight = toFloat(computedStyle.lineHeight, 1)
      // Calculate height of border and padding
      const border =
        toFloat(computedStyle.borderTopWidth, 0) + toFloat(computedStyle.borderBottomWidth, 0)
      const padding = toFloat(computedStyle.paddingTop, 0) + toFloat(computedStyle.paddingBottom, 0)
      // Calculate offset
      const offset = border + padding
      // Minimum height for min rows (which must be 2 rows or greater for cross-browser support)
      const minHeight = lineHeight * this.computedMinRows + offset

      // Get the current style height (with `px` units)
      const oldHeight = getStyle(el, 'height') || computedStyle.height
      // Probe scrollHeight by temporarily changing the height to `auto`
      setStyle(el, 'height', 'auto')
      const scrollHeight = el.scrollHeight
      // Place the original old height back on the element, just in case `computedProp`
      // returns the same value as before
      setStyle(el, 'height', oldHeight)

      // Calculate content height in 'rows' (scrollHeight includes padding but not border)
      const contentRows = mathMax((scrollHeight - padding) / lineHeight, 2)
      // Calculate number of rows to display (limited within min/max rows)
      const rows = mathMin(mathMax(contentRows, this.computedMinRows), this.computedMaxRows)
      // Calculate the required height of the textarea including border and padding (in pixels)
      const height = mathMax(mathCeil(rows * lineHeight + offset), minHeight)

      // Computed height remains the larger of `oldHeight` and new `height`,
      // when height is in `sticky` mode (prop `no-auto-shrink` is true)
      if (this.noAutoShrink && toFloat(oldHeight, 0) > height) {
        return oldHeight
      }

      // Return the new computed CSS height in px units
      return `${height}px`
    }
  },
  render(h) {
    return h('textarea', {
      ref: 'input',
      class: this.computedClass,
      style: this.computedStyle,
      directives: [
        {
          name: 'b-visible',
          value: this.visibleCallback,
          // If textarea is within 640px of viewport, consider it visible
          modifiers: { '640': true }
        }
      ],
      attrs: this.computedAttrs,
      domProps: { value: this.localValue },
      on: this.computedListeners
    })
  }
})
