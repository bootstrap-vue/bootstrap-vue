// Icons only build
import { BootstrapVueIcons, IconsPlugin } from './icons'

const install = BootstrapVueIcons.install
const NAME = BootstrapVueIcons.NAME

export {
  // Installer exported just in case the consumer does not import `default`
  // as the plugin in CommonJS build (or does not have interop enabled
  // for CommonJS). Both the following will work:
  //   BootstrapVueIcons = require('bootstrap-vue/dist/bootstrap-vue-icons.common')
  //   BootstrapVueIcons = require('bootstrap-vue/dist/bootstrap-vue-icons.common').default
  //   Vue.use(BootstrapVueIcons)
  install,
  NAME,
  // Main BootstrapVueIcons Plugin
  BootstrapVueIcons,
  IconsPlugin
}

//
// Export Icon components
//
// export * from './icons'

export { BIcon } from './icons/icon'

// This re-export is only a single level deep, which
// Webpack 4 handles correctly when tree shaking
export * from './icons/icons'

// Default export is the BootstrapVueIcons plugin
export default BootstrapVueIcons
