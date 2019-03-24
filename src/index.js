import * as componentPlugins from './components'
import * as directivePlugins from './directives'
import { registerPlugins, vueUse } from './utils/plugins'
import { setConfig } from './utils/config'

const BootstrapVue = {
  install(Vue, config = {}) {
    // Configure BootstrapVue
    setConfig(config)

    // Register component plugins
    registerPlugins(Vue, componentPlugins)

    // Register directive plugins
    registerPlugins(Vue, directivePlugins)
  },
  setConfig(config = {}) /* istanbul ignore next */ {
    setConfig(config)
  }
}

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
