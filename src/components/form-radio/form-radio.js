import { Vue } from '../../vue'
import { NAME_FORM_RADIO } from '../../constants/components'
import { looseEqual } from '../../utils/loose-equal'
import { makePropsConfigurable } from '../../utils/props'
import {
  MODEL_EVENT_NAME,
  formRadioCheckMixin,
  props as formRadioCheckProps
} from '../../mixins/form-radio-check'

// --- Props ---

export const props = makePropsConfigurable(formRadioCheckProps, NAME_FORM_RADIO)

// --- Main component ---

// @vue/component
export const BFormRadio = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_RADIO,
  mixins: [formRadioCheckMixin],
  inject: {
    bvGroup: {
      from: 'bvRadioGroup',
      default: false
    }
  },
  props,
  watch: {
    computedLocalChecked(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(MODEL_EVENT_NAME, newValue)
      }
    }
  }
})
