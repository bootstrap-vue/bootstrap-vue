import { BFormTimepicker } from './form-timepicker'
import { pluginFactory } from '../../utils/plugins'

const FormTimepickerPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormTimepicker,
    BTimepicker: BFormTimepicker
  }
})

export { FormTimepickerPlugin, BFormTimepicker }
