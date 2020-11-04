import Vue from '../../vue'
import { NAME_FORM_RADIO } from '../../constants/components'
import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import formSizeMixin from '../../mixins/form-size'
import formRadioCheckMixin from '../../mixins/form-radio-check'
import looseEqual from '../../utils/loose-equal'

// @vue/component
export const BFormRadio = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_RADIO,
  mixins: [
    idMixin,
    formRadioCheckMixin, // Includes shared render function
    formMixin,
    formSizeMixin,
    formStateMixin
  ],
  inject: {
    bvGroup: {
      from: 'bvRadioGroup',
      default: false
    }
  },
  props: {
    checked: {
      // v-model
      // type: [String, Number, Boolean, Object],
      default: null
    }
  },
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
