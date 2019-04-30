import * as componentPlugins from './components'
import * as directivePlugins from './directives'
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

  // Register component plugins
  registerPlugins(Vue, componentPlugins)

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
