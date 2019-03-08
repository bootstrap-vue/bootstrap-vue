import * as componentPlugins from './components'
import * as directivePlugins from './directives'
import { vueUse } from './utils/plugins'

const VuePlugin = {
  install: function(Vue) {
    // Register component plugins
    for (let plugin in componentPlugins) {
      Vue.use(componentPlugins[plugin])
    }

    // Register directive plugins
    for (let plugin in directivePlugins) {
      Vue.use(directivePlugins[plugin])
    }
  }
}

vueUse(VuePlugin)

export default VuePlugin
