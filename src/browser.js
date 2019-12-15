// Main entry point for the browser build
import { vueUse } from './utils/plugins'

import { BootstrapVue, IconsPlugin } from './index'

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVue)
vueUse(IconsPlugin)

export default BootstrapVue
