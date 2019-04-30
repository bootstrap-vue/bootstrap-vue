//
// ES build directory
//
declare module 'bootstrap-vue/es' {
  import { VueConstructor, Component, AsyncComponent, ComponentOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  interface BvPluginsObject {
    [key: string]?: BvPlugin
  }

  const BootstrapVue: {
    default: BvPlugin
  }

  export = BootstrapVue
}

declare module 'bootstrap-vue/es/components/*' {
  import { VueConstructor, Component, AsyncComponent, ComponentOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueComponentPlugin: {
    default: BvPlugin
    [key: string]: any
  }

  export = BootstrapVueComponentPlugin
}

declare module 'bootstrap-vue/es/components/*/*' {
  import { VueConstructor, Component, AsyncComponent, ComponentOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueComponent: {
    default: VueConstructor | Component | AsyncComponent | ComponentOptions | BvPlugin
    [key: string]: any
  }

  export = BootstrapVueComponent
}

declare module 'bootstrap-vue/es/directives/*' {
  import { DirectiveOptions, DirectiveFunction, PluginFunction } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueDirectivePlugin: {
    default: BvPlugin
    [key: string]: any
  }

  export = BootstrapVueDirectivePlugin
}

declare module 'bootstrap-vue/es/directives/*/*' {
  import { DirectiveOptions, DirectiveFunction, PluginFunction } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueDirective: {
    default: DirectiveOptions | DirectiveFunction | BvPlugin
    [key: string]: any
  }

  export = BootstrapVueDirective
}
