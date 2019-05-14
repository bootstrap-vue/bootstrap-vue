//
// ES build directory
//
// '/es' modules

declare module 'bootstrap-vue/es/components' {
  import { Component, VueConstructor } from 'vue'
  import { BvPlugin, BvConfigOptions } from './bv-plugin'
  
  const BVComponents: {
    default: Component & BvPlugin & VueConstructor
    [key: string]: Component & BvPlugin & VueConstructor
  }

  export = BVComponents
}

declare module 'bootstrap-vue/es/components/*' {
  import { Component, VueConstructor } from 'vue'
  import { BvPlugin, BvConfigOptions } from './bv-plugin'
  
  const BVComponents: {
    default: Component & BvPlugin & VueConstructor
    [key: string]: Component & BvPlugin & VueConstructor
  }

  export = BVComponents
}

declare module 'bootstrap-vue/es/directives' {
  import { VueConstructor, DirectiveOptions } from 'vue'
  import { BvPlugin, BvConfigOptions } from './bv-plugin'

  const BVDirectives: {
    default: DirectiveOptions & BvPlugin & VueConstructor
    [key: string]: DirectiveOptions & BvPlugin & VueConstructor
  }

  export = BVDirectives
}

declare module 'bootstrap-vue/es/directives/*' {
  import { VueConstructor, DirectiveOptions } from 'vue'
  import { BvPlugin, BvConfigOptions } from './bv-plugin'

  const BVDirectives: {
    default: DirectiveOptions & BvPlugin & VueConstructor
    [key: string]: DirectiveOptions & BvPlugin & VueConstructor
  }

  export = BVDirectives
}

declare module 'bootstrap-vue/es/bv-config' {
  import BVConfigPlugin from 'bootstrap-vue/bv-plugin'

  export default BVConfigPlugin
}

declare module 'bootstrap-vue/es' {
  import BootstrapVue from 'bootstrap-vue'

  export default BootstrapVue
}
