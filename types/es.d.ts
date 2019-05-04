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

declare module 'bootstrap-vue/es' {
  type Cmp = VueConstructor | Component | ComponentOptions | AsyncComponent
  type Dir = DirectiveOptions | DirectiveFunction

  const BootstrapVuePlugin: {
    default: BvPlugin
    [key: string]?: Cmp | Dir | BvPlugin
  }

  export = BootstrapVuePlugin
}

// components/index.js file
declare module 'bootstrap-vue/es/components' {
  interface BvPluginsObject {
    [key: string]?: BvPlugin
  }

  const BootstrapVueComponentPlugin: {
    // Default export is a plugin that installs all component plugins
    default: BvPlugin
    // plugins contains an object of all component group plugins
    plugins: BvPluginsObject
    // Named exports are components
    [key: string]: VueConstructor | Component | ComponentOptions | AsyncComponent
  }

  export = BootstrapVueComponentPlugin
}

declare module 'bootstrap-vue/es/components/*' {
  const BootstrapVueComponentPlugin: {
    // Default export is a plugin
    default: BvPlugin
    // Named exports are cmponents
    [key: string]: VueConstructor | Component | ComponentOptions | AsyncComponent
  }

  export = BootstrapVueComponentPlugin
}

declare module 'bootstrap-vue/es/components/*/*' {
  const BootstrapVueComponent: {
    // Default export is a component
    default: VueConstructor | Component | AsyncComponent | ComponentOptions | BvPlugin
    // Other named exports (which shouldn't be used by users)
    [key: string]: any
  }

  export = BootstrapVueComponent
}

// directives/index.js
declare module 'bootstrap-vue/es/directives' {
  interface BvPluginsObject {
    [key: string]?: BvPlugin
  }

  const BootstrapVueDirectivePlugin: {
    // Default export is a plugin that installs all directive plugins
    default: BvPlugin
    // plugins export is an object of plugins
    plugins: BvPluginsObject
    // Named export(s) are individual directives
    [key: string]: DirectiveOptions | DirectiveFunction
  }

  export = BootstrapVueDirectivePlugin
}

declare module 'bootstrap-vue/es/directives/*' {
  const BootstrapVueDirectivePlugin: {
    // Default export is the plugin
    default: BvPlugin
    // Named export(s) are individual directives
    [key: string]: DirectiveOptions | DirectiveFunction
  }

  export = BootstrapVueDirectivePlugin
}

declare module 'bootstrap-vue/es/directives/*/*' {
  const BootstrapVueDirective: {
    default: DirectiveOptions | DirectiveFunction | BvPlugin
    [key: string]: any
  }

  export = BootstrapVueDirective
}
