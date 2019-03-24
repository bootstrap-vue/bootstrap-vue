import * as componentPlugins from './components'
import * as directivePlugins from './directives'
// import { vueUse } from './utils/plugins'
// import { setConfig } from './utils/config'

const BootstrapVue = (Vue, config = {}) => {
  // Configure BootstrapVue
  // setConfig(config)

  // Register component plugins
  for (let plugin in componentPlugins) {
    Vue.use(componentPlugins[plugin])
  }

  // Register directive plugins
  for (let plugin in directivePlugins) {
    Vue.use(directivePlugins[plugin])
  }
}

// expose the config method
// BootstrapVue.setConfig = setConfig

// Auto installation only occurs if window.Vue exists
if (window && window.Vue && window.Vue.use) {
  /* istanbul ignore next */
  window.BootstrapVue = BootstrapVue
  /* istanbul ignore next */
  window.Vue.use(BootstrapVue)
}

export default BootstrapVue
