import componentsPlugin from './components'
import directivesPlugin from './directives'
import { vueUse } from './utils/plugins'
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

  // Install all directive plugins
  Vue.use(directivesPlugin)
}

install.installed = false

const BootstrapVue = {
  install: install,
  setConfig: setConfig
}

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
