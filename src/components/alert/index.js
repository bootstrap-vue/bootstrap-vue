import BAlert from './alert'
import { pluginFactory } from '../../utils/plugins'

// prettier-ignore
const AlertPlugin = /*#__PURE__*/pluginFactory({
  components: { BAlert }
})

export { BAlert }

export default AlertPlugin
