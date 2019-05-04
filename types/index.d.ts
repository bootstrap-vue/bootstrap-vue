import Vue, { PluginFunction, PluginObject } from 'vue'
import { BvPlugin, BvConfigOptions } from './bv-plugin'
import './vue-injections'
import './es'

export * from './bv-config'
export * from './bv-event'
export * from './components'
export * from './directives'

declare const BootstrapVue: BootstrapVue
export default BootstrapVue
export interface BootstrapVue extends BvPlugin {
  setConfig: (config: BvConfigOptions) => void
}
