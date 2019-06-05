import { installFactory } from './utils/plugins'
import { setConfig } from './utils/config-set'
import { componentsPlugin } from './components/index.esm'
import { directivesPlugin } from './directives/index.esm'
import BVConfigPlugin from './bv-config'

// Named exports of all components and component group plugins
export * from './components/index.esm'

// Named exports of all directives and directive group plugins
export * from './directives/index.esm'

// BootstrapVue installer
const install = installFactory({ plugins: { componentsPlugin, directivesPlugin } })

// BootstrapVue plugin
const BootstrapVue = {
  install: install,
  setConfig: config => /* istanbul ignore next: to be deprecated */ {
    setConfig(config)
  }
}

// Named exports for BvConfigPlugin and BootstrapVue
export {
  // BV Config Plugin
  BVConfigPlugin,
  // BVConfigPlugin has been documented as BVConfig as well,
  // so we add an alias to the shorter name for backwards compat
  BVConfigPlugin as BVConfig,
  // Main BootstrapVue Plugin
  BootstrapVue,
  // Installer and setConfig exported in case the consumer does not
  // import `default` as the plugin in CommonJS build (or does not
  // have interop enabled for CommonJS). Both the following will work:
  //   BootstrapVue = require('bootstrap-vue')
  //   BootstrapVue = require('bootstrap-vue').default
  //   Vue.use(BootstrapVue)
  install,
  /* istanbul ignore next: to be deprecated */
  setConfig
}

// Default export is the BootstrapVue plugin
export default BootstrapVue
