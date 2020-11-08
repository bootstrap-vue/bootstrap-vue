import Vue from '../../vue'
import { NAME_FORM_RADIO } from '../../constants/components'
import looseEqual from '../../utils/loose-equal'
import { makePropsConfigurable } from '../../utils/config'
import formControlMixin, { props as formControlProps } from '../../mixins/form-control'
import formRadioCheckMixin, { props as formRadioCheckProps } from '../../mixins/form-radio-check'
import formSizeMixin, { props as formSizeProps } from '../../mixins/form-size'
import formStateMixin, { props as formStateProps } from '../../mixins/form-state'
import idMixin from '../../mixins/id'

// @vue/component
export const BFormRadio = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_RADIO,
  mixins: [
    idMixin,
    formRadioCheckMixin, // Includes shared render function
    formControlMixin,
    formSizeMixin,
    formStateMixin
  ],
  inject: {
    bvGroup: {
      from: 'bvRadioGroup',
      default: false
    }
  },
  props: makePropsConfigurable(
    {
      ...formControlProps,
      ...formRadioCheckProps,
      ...formSizeProps,
      ...formStateProps,
      checked: {
        // v-model
        // type: [String, Number, Boolean, Object],
        default: null
      }
    },
    NAME_FORM_RADIO
  ),
  computed: {
    isChecked() {
      return looseEqual(this.value, this.computedLocalChecked)
    },
    isRadio() {
      return true
    },
    isCheck() {
      return false
    }
  },
  watch: {
    computedLocalChecked(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    handleChange({ target: { checked } }) {
      const { value } = this
      const localChecked = checked ? value : null

      this.computedLocalChecked = value

      // Fire events in a `$nextTick()` to ensure the `v-model` is updated
      this.$nextTick(() => {
        // Change is only emitted on user interaction
        this.$emit('change', localChecked)

        // If this is a child of `<form-radio-group>`,
        // we emit a change event on it as well
        if (this.isGroup) {
          this.bvGroup.$emit('change', localChecked)
        }
      })
    }
  }
})
