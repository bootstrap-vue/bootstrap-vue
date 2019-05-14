//
// ES build directory
//
// '/es' modules

declare module 'bootstrap-vue/es/components' {
  export * from './components'
}

declare module 'bootstrap-vue/es/directives' {
  export * from './direcctives'
}

declare module 'bootstrap-vue/es/bv-config' {
  import BVConfigPlugin from 'bootstrap-vue/bv-plugin'

  export default BVConfigPlugin
}

declare module 'bootstrap-vue/es' {
  import BootstrapVue from 'bootstrap-vue'

  export default BootstrapVue
}
