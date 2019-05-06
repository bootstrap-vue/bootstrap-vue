import BBadge from './badge'
import { installFactory } from '../../utils/plugins'

const components = {
  BBadge
}

const BadgePlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  BadgePlugin,
  // Components
  BBadge
}

// Legacy: default is plugin
export default BadgePlugin
