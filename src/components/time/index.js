import { BTime } from './time'
import { pluginFactory } from '../../utils/plugins'

const TimePlugin = /*#__PURE__*/ pluginFactory({
  components: { BTime }
})

export { TimePlugin, BTime }
