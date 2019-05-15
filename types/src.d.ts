//
// src directory
//
// '/src' modules

declare module 'bootstrap-vue/src/components' {
  export * from './components'
}

declare module 'bootstrap-vue/src/directives' {
  export * from './directives'
}

declare module 'bootstrap-vue/src/bv-config' {
  import BVConfigPlugin from 'bootstrap-vue/bv-config'

  export default BVConfigPlugin
}

declare module 'bootstrap-vue/src' {
  import BootstrapVue from './index.d.ts'

  export default BootstrapVue
}
