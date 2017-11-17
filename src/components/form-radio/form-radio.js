import { idMixin, formRadioCheckMixin, formMixin, formStateMixin } from '../../mixins'
import { looseEqual } from '../../utils'

export default {
  mixins: [idMixin, formRadioCheckMixin, formMixin, formStateMixin],
  render (h) {
    const t = this

    const input = h(
      'input',
      {
        ref: 'radio',
        class: [ t.is_ButtonMode ? '' : (t.is_Plain ? 'form-check-input' : 'custom-control-input'), t.get_StateClass ],
        directives: [
          { name: 'model', rawName: 'v-model', value: t.computedLocalChecked, expression: 'computedLocalChecked' }
        ],
        attrs: {
          id: t.safeId(),
          type: 'radio',
          name: t.get_Name,
          required: t.get_Name && t.is_Required,
          disabled: t.is_Disabled,
          autocomplete: 'off'
        },
        domProps: { value: t.value, checked: looseEqual(t.computedLocalChecked, t.value) },
        on: {
          focus: t.handleFocus,
          blur: t.handleFocus,
          change: t.emitChange,
          __c: (evt) => { t.computedLocalChecked = t.value }
        }
      }
    )

    let indicator = h(false)
    if (!t.is_ButtonMode && !t.is_Plain) {
      indicator = h('span', { class: 'custom-control-indicator', attrs: { 'aria-hidden': 'true' } })
    }

    const description = h(
      'span',
      { class: t.is_ButtonMode ? null : (t.is_Plain ? 'form-check-description' : 'custom-control-description') },
      [ t.$slots.default ]
    )

    const label = h(
      'label',
      { class: [ t.is_ButtonMode ? t.buttonClasses : t.is_Plain ? 'form-check-label' : t.labelClasses ] },
      [ input, indicator, description ]
    )

    if (t.is_Plain && !t.is_ButtonMode) {
      return h('div', { class: ['form-check', {'form-check-inline': !t.is_Stacked}] }, [ label ])
    } else {
      return label
    }
  },
  watch: {
    // Radio Groups can only have a single value, so our watchers are simple
    checked (newVal, oldVal) {
      this.computedLocalChecked = newVal
    },
    computedLocalChceked (newVal, oldVal) {
      this.$emit('input', this.computedLocalChceked)
    }
  },
  computed: {
    is_Checked () {
      return looseEqual(this.value, this.computedLocalChecked)
    },
    labelClasses () {
      // Specific to radio
      return [
        this.get_Size ? `form-control-${this.get_Size}` : '',
        'custom-control',
        'custom-radio',
        this.get_StateClass
      ]
    }
  },
  methods: {
    emitChange ({ target: { checked } }) {
      // Change is only emitted on user interaction
      this.$emit('change', checked ? this.value : null)
      // If this is a child of form-radio-group, we emit a change event on it as well
      if (this.is_Child) {
        this.$parent.$emit('change', this.computedLocalChecked)
      }
    }
  }
}
