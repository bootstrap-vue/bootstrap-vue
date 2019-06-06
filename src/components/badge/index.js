import BBadge from './badge'
import { pluginFactory } from '../../utils/plugins'

const BadgePlugin = /*#__PURE__*/ pluginFactory({
  components: { BBadge }
})

export { BBadge }

export default BadgePlugin
