import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import formRadioCheckMixin from '../../mixins/form-radio-check'
import looseEqual from '../../utils/loose-equal'

export default {
  mixins: [idMixin, formRadioCheckMixin, formMixin, formStateMixin],
  render (h) {
    const t = this

    const input = h('input', {
      ref: 'radio',
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
        type: 'radio',
        name: t.get_Name,
        required: t.get_Name && t.is_Required,
        disabled: t.is_Disabled,
        autocomplete: 'off'
      },
      domProps: {
        value: t.value,
        checked: looseEqual(t.computedLocalChecked, t.value)
      },
      on: {
        focus: t.handleFocus,
        blur: t.handleFocus,
        change: t.emitChange,
        __c: evt => {
          t.computedLocalChecked = t.value
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
