import BAlert from './alert'
import { pluginFactory } from '../../utils/plugins'

// eslint-disable-next-line spaced-comment
// prettier-ignore
const AlertPlugin = /*#__PURE__*/pluginFactory({
  components: { BAlert }
})

export { BAlert }

export default AlertPlugin
