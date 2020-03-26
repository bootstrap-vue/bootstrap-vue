import { BSidebar } from './sidebar'
import { VBToggle } from '../../directives/toggle/toggle'
import { pluginFactory } from '../../utils/plugins'

const SidebarPlugin = /*#__PURE__*/ pluginFactory({
  components: { BSidebar },
  directives: { VBToggle }
})

export { SidebarPlugin, BSidebar }
