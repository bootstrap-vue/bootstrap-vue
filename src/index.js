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
const install = /*#__PURE__*/ installFactory({ plugins: { componentsPlugin, directivesPlugin } })

// BootstrapVue plugin
const BootstrapVue = /*#__PURE__*/ {
  install: install,
  // To be deprecated. not documented
  setConfig: setConfig
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
  // To be deprecated. not documented
  setConfig
}

// Default export is the BootstrapVue plugin
export default BootstrapVue
