import componentsPlugin from './components'
import * as directivePlugins from './directives/plugins'
import { registerPlugins, vueUse } from './utils/plugins'
import { setConfig } from './utils/config'

const install = (Vue, config = {}) => {
  if (install.installed) {
    /* istanbul ignore next */
    return
  }
  install.installed = true

  // Configure BootstrapVue
  setConfig(config)

  // Install all component plugins
  Vue.use(componentsPlugin)

  // Register directive plugins
  registerPlugins(Vue, directivePlugins)
}

install.installed = false

const BootstrapVue = {
  install: install,
  setConfig: setConfig
}

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
