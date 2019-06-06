import BAlert from './alert'
import { installFactory } from '../../utils/plugins'

export { BAlert }

const AlertPlugin = pluginFactory({
  components: { BAlert }
})

export default AlertPlugin
