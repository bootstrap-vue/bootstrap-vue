// Main entry point for the browser build
import { vueUse } from './utils/plugins'

import { BootstrapVue, BootstrapVueIcons } from './index'

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)
vueUse(BootstrapVueIcons)

export default BootstrapVue
