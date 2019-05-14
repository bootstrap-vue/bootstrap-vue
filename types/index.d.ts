import Vue, { PluginFunction, PluginObject } from 'vue'
import { BvPlugin, BvConfigOptions } from './bv-plugin'

// Vue prototype augments
import './vue-injections'
// '/es' and '/src/' modules types
import './es'
import './src'

export * from './bv-config'
export * from './bv-event'
export * from './components'
export * from './directives'

declare const BootstrapVue: BootstrapVuePlugin
export default BootstrapVue
export interface BootstrapVuePlugin extends BvPlugin {
  setConfig: (config: BvConfigOptions) => void
}
