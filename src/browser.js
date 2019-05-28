// Main entry point for the browser build

import componentsPlugin from './components'
import directivesPlugin from './directives'
import { installFactory, vueUse } from './utils/plugins'

const BootstrapVue = {
  install: installFactory({ plugins: { componentsPlugin, directivesPlugin } }),
}

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
