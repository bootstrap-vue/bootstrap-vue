import BAlert from './alert'
import { installFactory } from '../../utils/plugins'

const components = {
  BAlert
}

const AlertPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  AlertPlugin,
  // Components
  BAlert
}

// Legacy: default is plugin
export default AlertPlugin
