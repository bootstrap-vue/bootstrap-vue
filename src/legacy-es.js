// This index file is used to create the legacy es/index.js
// and will be removed once the `es/` build has been removed.
// It has no top-level named exports

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
