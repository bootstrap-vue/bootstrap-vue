//
// Utility Plugin for setting the configuration
//
import { setConfig } from './utils/config-set'

const BVConfigPlugin = {
  install(Vue, config = {}) {
    setConfig(config, Vue)
  }
}

export default BVConfigPlugin
