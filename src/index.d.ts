import Vue, { Component, PluginFunction, PluginObject } from 'vue'

// Plugin Config Options
export type BvConfigComponentOptionValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | object
  | null
export type BvConfigBreakpointsValue = string[]
export interface BvConfigComponentOptions {
  [key: string]: BvConfigComponentOptionValue | any
}
export interface BvConfigOptions {
  breakpoints?: BvConfigBreakpointsValue
  [key: string]: BvConfigComponentOptions | any
}

// Plugin definition
export interface BvPlugin extends PluginObject<BvConfigOptions> {
  install: PluginFunction<BvConfigOptions>
}

// Component base definition
export class BvComponent extends Vue {
  // Simple catch-all to allow any prop/type
  [key: string]: any
}

// Generic BvEvent Object
export interface BvEvent {
  readonly type: string
  readonly cancelable: boolean
  readonly nativeEvent: any
  readonly target: any
  readonly relatedTarget: any
  readonly defaultPrevented: boolean
  readonly vueTarget: Vue | Component | null
  readonly componentId: string | null
  preventDefault: () => void
  // Catch all
  [key: string]: any
}

// Vue prototype augments
import './vue-injections'

// BvConfig Plugin
export * from './bv-config'

// Components & Plugins
export * from './components'

// Icons & Plugin
export * from './icons'

// Directives & Plugins
export * from './directives'

declare const BootstrapVue: BootstrapVuePlugin
export default BootstrapVue
export interface BootstrapVuePlugin extends BvPlugin {
  setConfig: (config: BvConfigOptions) => void
}
