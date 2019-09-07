import { BProgress } from './progress'
import { BProgressBar } from './progress-bar'
import { pluginFactory } from '../../utils/plugins'

const ProgressPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BProgress,
    BProgressBar
  }
})

export { ProgressPlugin, BProgress, BProgressBar }
