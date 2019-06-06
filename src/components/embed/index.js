import BEmbed from './embed'
import { pluginFactory } from '../../utils/plugins'

const EmbedPlugin = /*#__PURE__*/ pluginFactory({
  components: { BEmbed }
})

export { BEmbed }

export default EmbedPlugin
