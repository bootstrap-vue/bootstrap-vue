import idMixin from '../../mixins/id'
import formRadioCheckMixin from '../../mixins/form-radio-check'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formCustomMixin from '../../mixins/form-custom'
import { isArray } from '../../utils/array'
import looseEqual from '../../utils/loose-equal'

export default {
  mixins: [
    idMixin,
    formRadioCheckMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin
  ],
  render (h) {
    const t = this

    const input = h('input', {
      ref: 'check',
      class: [
        t.is_ButtonMode
          ? ''
          : t.is_Plain ? 'form-check-input' : 'custom-control-input',
        t.get_StateClass
      ],
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: t.computedLocalChecked,
          expression: 'computedLocalChecked'
        }
      ],
      attrs: {
        id: t.safeId(),
        type: 'checkbox',
        name: t.get_Name,
        disabled: t.is_Disabled,
        required: t.is_Required,
        autocomplete: 'off',
        'true-value': t.value,
        'false-value': t.uncheckedValue,
        'aria-required': t.is_Required ? 'true' : null
      },
      domProps: { value: t.value, checked: t.is_Checked },
      on: {
        focus: t.handleFocus,
        blur: t.handleFocus,
        change: t.emitChange,
        __c: evt => {
          const $$a = t.computedLocalChecked
          const $$el = evt.target
          if (isArray($$a)) {
            // Multiple checkbox
            const $$v = t.value
            let $$i = t._i($$a, $$v) // Vue's 'loose' Array.indexOf
            if ($$el.checked) {
              // Append value to array
              $$i < 0 && (t.computedLocalChecked = $$a.concat([$$v]))
            } else {
              // Remove value from array
              $$i > -1 &&
                (t.computedLocalChecked = $$a
                  .slice(0, $$i)
                  .concat($$a.slice($$i + 1)))
            }
          } else {
            // Single checkbox
            t.computedLocalChecked = $$el.checked ? t.value : t.uncheckedValue
          }
        }
      }
    })

    const description = h(
      t.is_ButtonMode ? 'span' : 'label',
      {
        class: t.is_ButtonMode
          ? null
          : t.is_Plain ? 'form-check-label' : 'custom-control-label',
        attrs: { for: t.is_ButtonMode ? null : t.safeId() }
      },
      [t.$slots.default]
    )

    if (!t.is_ButtonMode) {
      return h(
        'div',
        {
          class: [
            t.is_Plain ? 'form-check' : t.labelClasses,
            { 'form-check-inline': t.is_Plain && !t.is_Stacked },
            { 'custom-control-inline': !t.is_Plain && !t.is_Stacked }
          ]
        },
        [input, description]
      )
    } else {
      return h('label', { class: [t.buttonClasses] }, [input, description])
    }
  },
  props: {
    value: {
      default: true
    },
    uncheckedValue: {
      // Not applicable in multi-check mode
      default: false
    },
    indeterminate: {
      // Not applicable in multi-check mode
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelClasses () {
      return [
        'custom-control',
        'custom-checkbox',
        this.get_Size ? `form-control-${this.get_Size}` : '',
        this.get_StateClass
      ]
    },
    is_Checked () {
      const checked = this.computedLocalChecked
      if (isArray(checked)) {
        for (let i = 0; i < checked.length; i++) {
          if (looseEqual(checked[i], this.value)) {
            return true
          }
        }
        return false
      } else {
        return looseEqual(checked, this.value)
      }
    }
  },
  watch: {
    computedLocalChecked (newVal, oldVal) {
      if (looseEqual(newVal, oldVal)) {
        return
      }
      this.$emit('input', newVal)
      this.$emit('update:indeterminate', this.$refs.check.indeterminate)
    },
    checked (newVal, oldVal) {
      if (this.is_Child || looseEqual(newVal, oldVal)) {
        return
      }
      this.computedLocalChecked = newVal
    },
    indeterminate (newVal, oldVal) {
      this.setIndeterminate(newVal)
    }
  },
  methods: {
    emitChange ({ target: { checked } }) {
      // Change event is only fired via user interaction
      // And we only emit the value of this checkbox
      if (this.is_Child || isArray(this.computedLocalChecked)) {
        this.$emit('change', checked ? this.value : null)
        if (this.is_Child) {
          // If we are a child of form-checkbbox-group, emit change on parent
          this.$parent.$emit('change', this.computedLocalChecked)
        }
      } else {
        // Single radio mode supports unchecked value
        this.$emit('change', checked ? this.value : this.uncheckedValue)
      }
      this.$emit('update:indeterminate', this.$refs.check.indeterminate)
    },
    setIndeterminate (state) {
      // Indeterminate only supported in single checkbox mode
      if (this.is_Child || isArray(this.computedLocalChecked)) {
        return
      }
      this.$refs.check.indeterminate = state
      // Emit update event to prop
      this.$emit('update:indeterminate', this.$refs.check.indeterminate)
    }
  },
  mounted () {
    // Set initial indeterminate state
    this.setIndeterminate(this.indeterminate)
  }
}
