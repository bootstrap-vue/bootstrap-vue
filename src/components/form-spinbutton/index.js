import { BFormSpinbutton } from './form-spinbutton'
import { pluginFactory } from '../../utils/plugins'

const FormSpinbuttonPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormSpinbutton,
    BSpinbutton: BFormSpinbutton
  }
})

export { FormSpinbuttonPlugin, BFormSpinbutton }
