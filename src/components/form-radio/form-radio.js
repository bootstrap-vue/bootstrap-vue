import { Vue } from '../../vue'
import { NAME_FORM_RADIO } from '../../constants/components'
import { looseEqual } from '../../utils/loose-equal'
import { sortKeys } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { formControlMixin, props as formControlProps } from '../../mixins/form-control'
import {
  MODEL_EVENT_NAME,
  formRadioCheckMixin,
  props as formRadioCheckProps
} from '../../mixins/form-radio-check'
import { formSizeMixin, props as formSizeProps } from '../../mixins/form-size'
import { formStateMixin, props as formStateProps } from '../../mixins/form-state'
import { idMixin, props as idProps } from '../../mixins/id'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...formControlProps,
    ...formRadioCheckProps,
    ...formSizeProps,
    ...formStateProps
  }),
  NAME_FORM_RADIO
)

// --- Main component ---

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
  props,
  watch: {
    computedLocalChecked(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(MODEL_EVENT_NAME, newValue)
      }
    }
  }
})
