import { BSpinner } from './spinner'
import { pluginFactory } from '../../utils/plugins'

const SpinnerPlugin = /*#__PURE__*/ pluginFactory({
  components: { BSpinner }
})

export { SpinnerPlugin, BSpinner }

export default SpinnerPlugin
