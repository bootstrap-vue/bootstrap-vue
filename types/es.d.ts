//
// ES build directory
//
declare module 'bootstrap-vue/es/components/*' {
  import { VueConstructor } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueComponent: {
    default: BvPlugin
    [key: string]: VueConstructor
  }

  export = BootstrapVueComponent
}

declare module 'bootstrap-vue/es/directives' {
  import { DirectiveOptions, PluginFunction } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueDirective: {
    default: BvPlugin
    [key: string]: DirectiveOptions
  }

  export = BootstrapVueDirective
}
