import BAlert from './alert'
import { installFactory } from '../../utils/plugins'

const AlertPlugin = /#__PURE__*/pluginFactory({
  components: { BAlert }
})

export { BAlert }

export default AlertPlugin
