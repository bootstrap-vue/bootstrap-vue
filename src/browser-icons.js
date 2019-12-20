// Main entry point for the browser icons-only build
import { vueUse } from './utils/plugins'

import { BootstrapVueIcons } from './index'

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVueIcons)

export default BootstrapVueIcons
