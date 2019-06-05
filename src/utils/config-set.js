// Utils/config-set

import OurVue from './vue'
import cloneDeep from './clone-deep'
import get from './get'
import warn from './warn'
import { isArray, isPlainObject, isString, isUndefined } from './inspect'
import { keys } from './object'
import DEFAULTS from './config-defaults'

// --- utils --

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

// Config manager "class"
const BvConfig = {
  created() {
    // Non reactive private properties
    // TODO: pre-populate with default config values
    this.$_config = {}
    this.$_cachedBreakpoints = null
  },
  methods: {
    // Merge in config parameters
    setConfig(config = {}) {
      if (!isPlainObject(config)) {
        /* istanbul ignore next */
        return
      }
      keys(config)
        .filter(cmpName => hasOwnProperty(config, cmpName))
        .forEach(cmpName => {
          if (!DEFAULTS.hasOwnProperty(cmpName)) {
            /* istanbul ignore next */
            warn(`config: unknown config property "${cmpName}"`)
            /* istanbul ignore next */
            return
          }
          const cmpConfig = config[cmpName]
          if (cmpName === 'breakpoints') {
            // Special case for breakpoints
            const breakpoints = config.breakpoints
            if (
              !isArray(breakpoints) ||
              breakpoints.length < 2 ||
              breakpoints.some(b => !isString(b) || b.length === 0)
            ) {
              /* istanbul ignore next */
              warn('config: "breakpoints" must be an array of at least 2 breakpoint names')
            } else {
              this.$_config.breakpoints = cloneDeep(breakpoints)
            }
          } else if (isPlainObject(cmpConfig)) {
            keys(cmpConfig)
              .filter(key => hasOwnProperty(cmpConfig, key))
              .forEach(key => {
                if (!hasOwnProperty(DEFAULTS[cmpName], key)) {
                  /* istanbul ignore next */
                  warn(`config: unknown config property "${cmpName}.{$key}"`)
                } else {
                  // If we pre-populate the config with defaults, we can skip this line
                  this.$_config[cmpName] = this.$_config[cmpName] || {}
                  if (!isUndefined(cmpConfig[key])) {
                    this.$_config[cmpName][key] = cloneDeep(cmpConfig[key])
                  }
                }
              })
          }
        })
    },
    getDefaults() {
      // Returns a copy of the defaults
      return DEFAULTS
    },
    getConfig() {
      // Returns a copy of the user config
      return cloneDeep(this.$_config)
    },
    resetConfig() {
      // Clear the config. For testing purposes only
      this.$_config = {}
    },
    getConfigValue(key) {
      // First we try the user config, and if key not found we fall back to default value
      // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
      return cloneDeep(get(this.$_config, key, get(DEFAULTS, key)))
    }
  }
}

export const setConfig = (config = {}, Vue = OurVue) => {
  // Ensure we have a $bvConfig Object on the Vue prototype.
  // We set on Vue and OurVue just in case consumer has not set an alias of `vue`.
  Vue.prototype.$bvConfig = OurVue.prototype.$bvConfig =
    Vue.prototype.$bvConfig || OurVue.prototype.$bvConfig || new Vue.extend(BvConfig)()
  // Apply the config values
  Vue.prototype.$bvConfig.setConfig(config)
}
