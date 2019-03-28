//
// Utility Plugin for setting the configuration
//
import { setConfig } from './utils/config'

const BVConfigPlugin = {
  install(Vue, config = {}) {
    setConfig(config)
  }
}

export default BVConfigPlugin
