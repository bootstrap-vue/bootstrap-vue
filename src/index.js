// TODO: This index file will be replaced by the contents of the
// index.esm.js file once the `es/` build has been removed.
import { installFactory } from './utils/plugins'
import { setConfig } from './utils/config'
import { componentsPlugin } from './components'
import { directivesPlugin } from './directives'

const BootstrapVue = {
  install: installFactory({ plugins: { componentsPlugin, directivesPlugin } }),
  setConfig: setConfig
}

// Default export is the BootstrapVue plugin
export default BootstrapVue
