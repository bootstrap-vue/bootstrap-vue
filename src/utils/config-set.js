import OurVue from './vue'
import cloneDeep from './clone-deep'
import get from './get'
import warn from './warn'
import { isArray, isPlainObject, isString, isUndefined } from './inspect'
import { keys } from './object'
import DEFAULTS from './config-defaults'

// --- Constants ---

const PROP_NAME = '$bvConfig'

// --- Utils ---

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

// Config manager class
class BvConfig {
  constructor() {
    // TODO: pre-populate with default config values (needs updated tests)
    // this.$_config = cloneDeep(DEFAULTS)
    this.$_config = {}
    this.$_cachedBreakpoints = null
  }
    // Merge in config parameters
  setConfig(config = {}) {
    if (!isPlainObject(config)) {
      /* istanbul ignore next */
      return
    }
    keys(config)
      .filter(cmpName => hasOwnProperty(config, cmpName))
      .forEach(cmpName => {
        /* istanbul ignore next */
        if (!hasOwnProperty(DEFAULTS, cmpName)) {
          warn(`config: unknown config property "${cmpName}"`)
          return
        }
        const cmpConfig = config[cmpName]
        if (cmpName === 'breakpoints') {
          // Special case for breakpoints
          const breakpoints = config.breakpoints
          /* istanbul ignore if */
          if (
            !isArray(breakpoints) ||
            breakpoints.length < 2 ||
            breakpoints.some(b => !isString(b) || b.length === 0)
          ) {
            warn('config: "breakpoints" must be an array of at least 2 breakpoint names')
          } else {
            this.$_config.breakpoints = cloneDeep(breakpoints)
          }
        } else if (isPlainObject(cmpConfig)) {
          keys(cmpConfig)
            .filter(key => hasOwnProperty(cmpConfig, key))
            .forEach(key => {
              /* istanbul ignore if */
              if (!hasOwnProperty(DEFAULTS[cmpName], key)) {
                warn(`config: unknown config property "${cmpName}.{$key}"`)
              } else {
                // TODO: If we pre-populate the config with defaults, we can skip this line
                this.$_config[cmpName] = this.$_config[cmpName] || {}
                if (!isUndefined(cmpConfig[key])) {
                  this.$_config[cmpName][key] = cloneDeep(cmpConfig[key])
                }
              }
            })
        }
      })
  }

  static get Defaults() /* istanbul ignore next */ {
    return DEFAULTS
  }

  get defaults() /* istanbul ignore next */ {
    return DEFAULTS
  }

  // Returns the defaults
  getDefaults() /* istanbul ignore next: not used in production */ {
    return DEFAULTS
  }

  // Returns a copy of the user config
  getConfig() {
    return cloneDeep(this.$_config)
  }

  // Clear the config. For testing purposes only
  resetConfig() {
    this.$_config = {}
  }

  getConfigValue(key) {
    // First we try the user config, and if key not found we fall back to default value
    // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
    return cloneDeep(get(this.$_config, key, get(DEFAULTS, key)))
  }
}

export const setConfig = (config = {}, Vue = OurVue) => {
  // Ensure we have a $bvConfig Object on the Vue prototype.
  // We set on Vue and OurVue just in case consumer has not set an alias of `vue`.
  Vue.prototype[PROP_NAME] = OurVue.prototype[PROP_NAME] =
    Vue.prototype[PROP_NAME] || OurVue.prototype[PROP_NAME] || new BvConfig()
  // Apply the config values
  Vue.prototype[PROP_NAME].setConfig(config)
}
