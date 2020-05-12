import { BCollapse } from './collapse'
import { VBTogglePlugin } from '../../directives/toggle'
import { pluginFactory } from '../../utils/plugins'

const CollapsePlugin = /*#__PURE__*/ pluginFactory({
  components: { BCollapse },
  plugins: { VBTogglePlugin }
})

export { CollapsePlugin, BCollapse }
