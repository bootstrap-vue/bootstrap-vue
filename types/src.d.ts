//
// src directory
//
// '/src' modules

declare module 'bootstrap-vue/src/components' {
  export * from './components'
}

declare module 'bootstrap-vue/src/directives' {
  export * from './direcctives'
}

declare module 'bootstrap-vue/src/bv-config' {
  import BVConfigPlugin from 'bootstrap-vue/bv-plugin'

  export default BVConfigPlugin
}

declare module 'bootstrap-vue/src' {
  import BootstrapVue from 'bootstrap-vue'

  export default BootstrapVue
}
