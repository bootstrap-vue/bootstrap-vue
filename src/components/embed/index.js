import BEmbed from './embed'
import { installFactory } from '../../utils/plugins'

const components = {
  BEmbed
}

const EmbedPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  EmbedPlugin,
  // Components
  BEmbed
}

// Legacy: default is plugin
export default EmbedPlugin
