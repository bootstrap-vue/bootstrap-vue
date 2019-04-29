//
// ES build directory
//
declare module 'bootstrap-vue/es' {
  import { VueConstructor, Component, AsyncComponent, ComponentOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  interface BvPluginsObject {
    [key: string]?: BvPlugin
  }

  const BootstrapVueComponent: {
    default: BvPlugin
    [key: string]: BvPluginsObject
  }

  export = BootstrapVueComponent
}

declare module 'bootstrap-vue/es/components/*' {
  import { VueConstructor, Component, AsyncComponent, ComponentOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueComponent: {
    default: BvPlugin
    [key: string]: VueConstructor | Component | AsyncComponent | ComponentOptions
  }

  export = BootstrapVueComponent
}

declare module 'bootstrap-vue/es/directives' {
  import { DirectiveOptions, DirectiveFunction, PluginFunction } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueDirective: {
    default: BvPlugin
    [key: string]: DirectiveOptions | DirectiveFunction
  }

  export = BootstrapVueDirective
}
