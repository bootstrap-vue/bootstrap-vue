import { installFactory } from './utils/plugins'
import { setConfig } from './utils/config'
import { componentsPlugin } from './components'
import { directivesPlugin } from './directives'

// Named exports of all compoents and component group plugins
// Once es dir build is gone, we will move index.esm.js to index.js
export * from './components/index.esm'

// Named exports of all directives and directive group plugins
// Once es dir build is gone, we will move index.esm.js to index.js
export * from './directives/index.esm'

export const BootstrapVue = {
  install: installFactory({ plugins: { componentsPlugin, directivesPlugin } }),
  setConfig: setConfig
}

// Default export is the BootstrapVue plugin
export default BootstrapVue
