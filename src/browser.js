// Main entry point for the browser build
import { vueUse } from './utils/plugins'

import BootstrapVue from './index'

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)

export default BootstrapVue
