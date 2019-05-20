import componentsPlugin from './components'
import directivesPlugin from './directives'
import { installFactory, vueUse } from './utils/plugins'
import { setConfig } from './utils/config'

const BootstrapVue = {
  install: installFactory({ plugins: { componentsPlugin, directivesPlugin } }),
  setConfig: setConfig
}

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
