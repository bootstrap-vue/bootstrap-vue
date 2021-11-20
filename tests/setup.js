import '@testing-library/jest-dom'
import Vue from 'vue'
import VueRouter from 'vue-router'
import * as VTU from '@vue/test-utils'
import { installCompat as installVTUCompat, fullCompatConfig } from 'vue-test-utils-compat'

const useVue2 = 'USE_VUE2' in process.env
if (!useVue2) {
  Vue.configureCompat({
    MODE: 3,
    // required by Vue-router
    CONFIG_OPTION_MERGE_STRATS: 'suppress-warning',
    GLOBAL_PRIVATE_UTIL: 'suppress-warning',
    GLOBAL_PROTOTYPE: 'suppress-warning',

    // required due to global mixin on vue-router
    INSTANCE_EVENT_HOOKS: 'suppress-warning',
    OPTIONS_DESTROYED: 'suppress-warning',
    INSTANCE_EVENT_EMITTER: 'suppress-warning',

    // required by portal-vue
    GLOBAL_SET: 'suppress-warning',

    // globals
    GLOBAL_EXTEND: 'suppress-warning',
    GLOBAL_MOUNT: 'suppress-warning'
  })

  Vue.use(VueRouter)

  Vue.component('RouterLink').compatConfig = {
    MODE: 2,
    RENDER_FUNCTION: 'suppress-warning',
    INSTANCE_SCOPED_SLOTS: 'suppress-warning'
  }

  Vue.component('RouterView').compatConfig = {
    MODE: 2,
    RENDER_FUNCTION: 'suppress-warning',
    COMPONENT_FUNCTIONAL: 'suppress-warning'
  }

  const PortalVue = require('portal-vue')
  PortalVue.Portal = PortalVue.Portal.extend({
    compatConfig: {
      MODE: 2,
      RENDER_FUNCTION: 'suppress-warning',
      INSTANCE_SCOPED_SLOTS: 'suppress-warning',
      OPTIONS_BEFORE_DESTROY: 'suppress-warning'
    }
  })
  PortalVue.PortalTarget = PortalVue.PortalTarget.extend({
    compatConfig: {
      MODE: 2,
      RENDER_FUNCTION: 'suppress-warning',
      WATCH_ARRAY: 'suppress-warning',
      OPTIONS_BEFORE_DESTROY: 'suppress-warning',
      INSTANCE_SCOPED_SLOTS: 'suppress-warning'
    }
  })

  PortalVue.Wormhole.$.type.compatConfig = {
    MODE: 3,
    INSTANCE_SET: 'suppress-warning',
    INSTANCE_DELETE: 'suppress-warning'
  }

  let compatH
  Vue.config.compilerOptions.whitespace = 'condense'
  Vue.createApp({
    compatConfig: {
      MODE: 3,
      RENDER_FUNCTION: 'suppress-warning'
    },
    render(h) {
      compatH = h
    }
  }).mount(document.createElement('div'))
  installVTUCompat(VTU, fullCompatConfig, compatH)
}

// Don't stub `<transition>` and `<transition-group>` components
VTU.config.stubs.transition = false
VTU.config.stubs['transition-group'] = false
