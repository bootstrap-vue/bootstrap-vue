import { createApp, defineComponent } from 'vue'
import { mergeData } from 'vue-functional-data-merge'

// --- Constants ---

const COMPONENT_UID_KEY = '_uid'
// TODO: remove; this is just as a dummy for unmigrated components
const Vue = createApp({})
Vue.extend = conf => {
  return defineComponent(conf)
}

export { COMPONENT_UID_KEY, Vue, mergeData }
