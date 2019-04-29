import Vue, { PluginFunction, PluginObject } from 'vue'
import { BvPlugin } from './bv-plugin'
import './vue-injections'
import './es'

export * from './components'

declare const BootstrapVue: BootstrapVue
export default BootstrapVue
export interface BootstrapVue extends BvPlugin {}
