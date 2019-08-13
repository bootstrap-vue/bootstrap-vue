import { BAlert } from './alert'
import { pluginFactory } from '../../utils/plugins'

const AlertPlugin = /*#__PURE__*/ pluginFactory({
  components: { BAlert }
})

export { AlertPlugin, BAlert }
