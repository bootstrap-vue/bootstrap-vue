import { BFormDatepicker } from './form-datepicker'
import { pluginFactory } from '../../utils/plugins'

const FormDatepickerPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormDatepicker,
    BDatepicker: BFormDatepicker
  }
})

export { FormDatepickerPlugin, BFormDatepicker }
