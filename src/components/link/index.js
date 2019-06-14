import { BLink } from './link'
import { pluginFactory } from '../../utils/plugins'

const LinkPlugin = /*#__PURE__*/ pluginFactory({
  components: { BLink }
})

export { LinkPlugin, BLink }

export default LinkPlugin
