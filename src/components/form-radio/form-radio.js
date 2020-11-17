import { defineComponent } from '../../vue'
import { NAME_FORM_RADIO } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import formRadioCheckMixin, { props as formRadioCheckProps } from '../../mixins/form-radio-check'

// @vue/component
export const BFormRadio = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_RADIO,
  mixins: [formRadioCheckMixin],
  inject: {
    bvGroup: {
      from: 'bvRadioGroup',
      default: null
    }
  },
  props: makePropsConfigurable(formRadioCheckProps, NAME_FORM_RADIO)
})
