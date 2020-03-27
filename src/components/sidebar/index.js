import { BSidebar } from './sidebar'
import { VBTogglePlugin } from '../../directives/toggle'
import { pluginFactory } from '../../utils/plugins'

const SidebarPlugin = /*#__PURE__*/ pluginFactory({
  components: { BSidebar },
  plugins: { VBTogglePlugin }
})

export { SidebarPlugin, BSidebar }
