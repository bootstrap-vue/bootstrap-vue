//
// ES build directory
//
declare module 'bootstrap-vue/es' {
  import { VueConstructor, Component, AsyncComponent, ComponentOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

  interface BvPluginsObject {
    [key: string]?: BvPlugin
  }

  const BootstrapVuePlugin: {
    default: BvPlugin
  }

  export = BootstrapVuePlugin
}

// components/index.js file
declare module 'bootstrap-vue/es/components' {
  import { VueConstructor, Component, ComponentOptions, AsyncComponent } from 'vue'
  import { BvPlugin } from './bv-plugin'

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
  import { VueConstructor, Component, ComponentOptions, AsyncComponent } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueComponentPlugin: {
    // Default export is a plugin
    default: BvPlugin
    // Named exports are cmponents
    [key: string]: VueConstructor | Component | ComponentOptions | AsyncComponent
  }

  export = BootstrapVueComponentPlugin
}

declare module 'bootstrap-vue/es/components/*/*' {
  import { VueConstructor, Component, AsyncComponent, ComponentOptions } from 'vue'
  import { BvPlugin } from './bv-plugin'

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
  import { DirectiveOptions, DirectiveFunction, PluginFunction } from 'vue'
  import { BvPlugin } from './bv-plugin'
  
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
  import { DirectiveOptions, DirectiveFunction, PluginFunction } from 'vue'
  import { BvPlugin } from './bv-plugin'

  const BootstrapVueDirectivePlugin: {
    // Default export is the plugin
    default: BvPlugin
    // Named export(s) are individual directives
    [key: string]: DirectiveOptions | DirectiveFunction
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
