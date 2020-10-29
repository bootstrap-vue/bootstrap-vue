import OurVue from '../vue'
import cloneDeep from './clone-deep'
import { getRaw } from './get'
import { isArray, isPlainObject, isString, isUndefined } from './inspect'
import { getOwnPropertyNames } from './object'
import { warn } from './warn'

// --- Constants ---

const NAME = 'BvConfig'
const PROP_NAME = '$bvConfig'

// Config manager class
class BvConfig {
  constructor() {
    // TODO: pre-populate with default config values (needs updated tests)
    // this.$_config = cloneDeep(DEFAULTS)
    this.$_config = {}
    this.$_cachedBreakpoints = null
  }

  // Method to merge in user config parameters
  setConfig(config = {}) {
    if (!isPlainObject(config)) {
      /* istanbul ignore next */
      return
    }
    const configKeys = getOwnPropertyNames(config)
    configKeys.forEach(cmpName => {
      /* istanbul ignore next */
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
          warn('"breakpoints" must be an array of at least 2 breakpoint names', NAME)
        } else {
          this.$_config.breakpoints = cloneDeep(breakpoints)
        }
      } else if (isPlainObject(cmpConfig)) {
        // Component prop defaults
        const props = getOwnPropertyNames(cmpConfig)
        props.forEach(prop => {
          // TODO: If we pre-populate the config with defaults, we can skip this line
          this.$_config[cmpName] = this.$_config[cmpName] || {}
          if (!isUndefined(cmpConfig[prop])) {
            this.$_config[cmpName][prop] = cloneDeep(cmpConfig[prop])
          }
        })
      }
    })
  }

  // Clear the config. For testing purposes only
  resetConfig() {
    this.$_config = {}
  }

  // Returns a deep copy of the user config
  getConfig() {
    return cloneDeep(this.$_config)
  }

  getConfigValue(key, defaultValue = undefined) {
    // First we try the user config, and if key not found we fall back to default value
    // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
    return cloneDeep(getRaw(this.$_config, key, defaultValue))
  }
}

// Method for applying a global config
export const setConfig = (config = {}, Vue = OurVue) => {
  // Ensure we have a $bvConfig Object on the Vue prototype.
  // We set on Vue and OurVue just in case consumer has not set an alias of `vue`.
  Vue.prototype[PROP_NAME] = OurVue.prototype[PROP_NAME] =
    Vue.prototype[PROP_NAME] || OurVue.prototype[PROP_NAME] || new BvConfig()
  // Apply the config values
  Vue.prototype[PROP_NAME].setConfig(config)
}

// Method for resetting the user config. Exported for testing purposes only.
export const resetConfig = () => {
  if (OurVue.prototype[PROP_NAME] && OurVue.prototype[PROP_NAME].resetConfig) {
    OurVue.prototype[PROP_NAME].resetConfig()
  }
}
