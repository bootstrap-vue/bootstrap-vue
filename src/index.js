import componentsPlugin from './components'
import directivesPlugin from './directives'
import { installFactory } from './utils/plugins'
import { setConfig } from './utils/config'

// Named export of all compoents and component group plugins
export * from './components/index.esm'

// Named export of all directives and directive group plugins
export * from './directives/index.esm'

const BootstrapVue = {
  install: installFactory({ plugins: { componentsPlugin, directivesPlugin } }),
  setConfig: setConfig
}

export default BootstrapVue
