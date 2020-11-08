import { defineComponent } from '../../vue'
import { NAME_FORM_RADIO } from '../../constants/components'
import { EVENT_NAME_CHANGE, EVENT_NAME_MODEL_VALUE } from '../../constants/events'
import looseEqual from '../../utils/loose-equal'
import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import formSizeMixin from '../../mixins/form-size'
import formRadioCheckMixin from '../../mixins/form-radio-check'

// @vue/component
export const BFormRadio = /*#__PURE__*/ defineComponent({
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
  emits: [EVENT_NAME_CHANGE],
  computed: {
    // Radio Groups can only have a single value, so determining if checked is simple
    isChecked() {
      return looseEqual(this.value, this.computedLocalChecked)
    },
    // Flags for form-radio-check mixin
    isRadio() {
      return true
    },
    isCheck() {
      return false
    }
  },
  watch: {
    // Radio Groups can only have a single value, so our watchers are simple
    computedLocalChecked() {
      this.$emit(EVENT_NAME_MODEL_VALUE, this.computedLocalChecked)
    }
  },
  methods: {
    handleChange({ target: { checked } }) {
      const value = this.value
      this.computedLocalChecked = value
      // Change is only emitted on user interaction
      this.$emit(EVENT_NAME_CHANGE, checked ? value : null)
      // If this is a child of form-radio-group, we emit a change event on it as well
      if (this.isGroup) {
        this.bvGroup.$emit(EVENT_NAME_CHANGE, checked ? value : null)
      }
    }
  }
})
