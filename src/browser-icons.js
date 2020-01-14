// Main entry point for the browser icons-only build
import { vueUse } from './utils/plugins'

import { BootstrapVueIcons } from './icons-only'

// Auto installation only occurs if window.Vue exists
vueUse(BootstrapVueIcons)

export default BootstrapVueIcons
