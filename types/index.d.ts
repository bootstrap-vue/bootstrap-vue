import Vue, { PluginFunction, PluginObject } from 'vue'
import { BvPlugin, BvInstallOptions } from './bv-plugin'
import './vue-injections'
import './es'

export * from './bv-congig'
export * from './bv-event'
export * from './components'
export * from './directives'

declare const BootstrapVue: BootstrapVue
export default BootstrapVue
export interface BootstrapVue extends BvPlugin {
  setConfig: (config: BvInstallOptions) => void
}
