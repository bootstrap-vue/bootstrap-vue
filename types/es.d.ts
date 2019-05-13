//
// ES build directory
//
// '/es' modules

declare module 'bootstrap-vue/es/components' {
  export * from './components'
}

declare module 'bootstrap-vue/es/directives' {
  export * from './directives'
}

declare module 'bootstrap-vue/es/bv-config' {
  export * from './bv-config'
}

declare module 'bootstrap-vue/es' {
  import { BvPlugin, BvConfigOptions } from './bv-plugin'

  export * from './bv-config'
  export * from './bv-event'
  export * from './components'
  export * from './directives'

  declare const BootstrapVue: BootstrapVue
  export default BootstrapVue
  export interface BootstrapVue extends BvPlugin {
    setConfig: (config: BvConfigOptions) => void
  }
}
