import { BFormDate } from './form-date'
import { pluginFactory } from '../../utils/plugins'

const FormDatePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormDate,
    BDate: BFormDate
  }
})

export { FormDatePlugin, BFormDate }
