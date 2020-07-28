import { BAspect } from './aspect'
import { pluginFactory } from '../../utils/plugins'

const AspectPlugin = /*#__PURE__*/ pluginFactory({
  components: { BAspect }
})

export { AspectPlugin, BAspect }
