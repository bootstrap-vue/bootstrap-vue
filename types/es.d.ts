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
  import BVConfigPlugin from 'bootstrap-vue/bv-config'

  export default BVConfigPlugin
}

declare module 'bootstrap-vue/es' {
  import BootstrapVue from './index.d.ts'

  export default BootstrapVue
}
