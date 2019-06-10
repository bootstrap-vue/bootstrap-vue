import { BBadge } from './badge'
import { pluginFactory } from '../../utils/plugins'

const BadgePlugin = /*#__PURE__*/ pluginFactory({
  components: { BBadge }
})

export { BadgePlugin, BBadge }

export default BadgePlugin
