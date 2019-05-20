import componentsPlugin from './components'
import directivesPlugin from './directives'
import { vueUse } from './utils/plugins'
import { setConfig } from './utils/config'

let _installed = false

const install = (Vue, config = {}) => {
  if (_installed) {
    /* istanbul ignore next */
    return
  }
  _installed = true

  // Configure BootstrapVue
  setConfig(config)

  // Install all component plugins
  Vue.use(componentsPlugin)

  // Install all directive plugins
  Vue.use(directivesPlugin)
}

const BootstrapVue = {
  install: install,
  setConfig: setConfig
}

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
