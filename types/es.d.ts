//
// ES build directory
//
import {
  VueConstructor,
  Component,
  AsyncComponent,
  ComponentOptions,
  DirectiveOptions,
  DirectiveFunction
} from 'vue'
import { BvPlugin } from './bv-plugin'

type ComponentOrPlugin = Component & BvPlugin

type DirectiveOrPlugin = DirectiveOptions & BvPlugin

declare module 'bootstrap-vue/es' {
  import BoostrapVue from 'bootstrap-vue'

  export default BootstrapVue
}

declare module 'bootstrap-vue/es/components/*' {
  const BootstrapVueComponent: {
    // Default export is a plugin that installs all component plugins
    default: ComponentOrPlugin & VueConstructor
    // Named exports are components
    [key: string]: ComponentOrPlugin & VueConstructor
  }

  export = BootstrapVueComponent
}

declare module 'bootstrap-vue/es/directives/*' {
  const BootstrapVueDirective: {
    // Default export is the plugin
    default: DirectiveOrPlugin
    // Named export(s) are individual directives
    [key: string]: DirectiveOrPlugin
  }

  export = BootstrapVueDirective
}
