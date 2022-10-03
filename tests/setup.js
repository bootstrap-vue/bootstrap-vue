import '@testing-library/jest-dom'
import Vue from 'vue'
import * as VTU from '@vue/test-utils'
import { installCompat as installVTUCompat, fullCompatConfig } from 'vue-test-utils-compat'

if (Vue.configureCompat) {
  Vue.configureCompat({
    MODE: 2,
    ATTR_FALSE_VALUE: 'suppress-warning',
    COMPONENT_FUNCTIONAL: 'suppress-warning',
    COMPONENT_V_MODEL: 'suppress-warning',
    CONFIG_OPTION_MERGE_STRATS: 'suppress-warning',
    CONFIG_WHITESPACE: 'suppress-warning',
    CUSTOM_DIR: 'suppress-warning',
    GLOBAL_EXTEND: 'suppress-warning',
    GLOBAL_MOUNT: 'suppress-warning',
    GLOBAL_PRIVATE_UTIL: 'suppress-warning',
    GLOBAL_PROTOTYPE: 'suppress-warning',
    GLOBAL_SET: 'suppress-warning',
    INSTANCE_ATTRS_CLASS_STYLE: 'suppress-warning',
    INSTANCE_CHILDREN: 'suppress-warning',
    INSTANCE_DELETE: 'suppress-warning',
    INSTANCE_DESTROY: 'suppress-warning',
    INSTANCE_EVENT_EMITTER: 'suppress-warning',
    INSTANCE_EVENT_HOOKS: 'suppress-warning',
    INSTANCE_LISTENERS: 'suppress-warning',
    INSTANCE_SCOPED_SLOTS: 'suppress-warning',
    INSTANCE_SET: 'suppress-warning',
    OPTIONS_BEFORE_DESTROY: 'suppress-warning',
    OPTIONS_DATA_MERGE: 'suppress-warning',
    OPTIONS_DESTROYED: 'suppress-warning',
    RENDER_FUNCTION: 'suppress-warning',
    WATCH_ARRAY: 'suppress-warning'
  })

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
