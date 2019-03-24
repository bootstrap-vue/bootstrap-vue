import * as componentPlugins from './components'
import * as directivePlugins from './directives'
import { vueUse } from './utils/plugins'
import { setConfig } from './utils/config'

const BootstrapVue = {
  install(Vue, config = {}) {
    // Configure BootstrapVue
    setConfig(config)

    // Register component plugins
    for (let plugin in componentPlugins) {
      Vue.use(componentPlugins[plugin])
    }

    // Register directive plugins
    for (let plugin in directivePlugins) {
      Vue.use(directivePlugins[plugin])
    }
  },
  setConfig(config = {}) /* istanbul ignore next */ {
    setConfig(config)
  }
}

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
