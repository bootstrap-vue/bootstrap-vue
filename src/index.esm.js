import { installFactory } from './utils/plugins'
import { setConfig } from './utils/config'
// Once es dir build is gone, we will move index.esm.js to index.js
import { componentsPlugin } from './components/index.esm'
import { directivesPlugin } from './directives/index.esm'
import BvConfig from './bv-config'

// Named exports of all components and component group plugins
export * from './components/index.esm'

// Named exports of all directives and directive group plugins
export * from './directives/index.esm'

// BootstrapVue plugin
const BootstrapVue = {
  install: installFactory({ plugins: { componentsPlugin, directivesPlugin } }),
  setConfig: setConfig
}

// Named exports for BvConfig and BootstrapVue
export { BvConfig, BootstrapVue }

// Default export is the BootstrapVue plugin
export default BootstrapVue
