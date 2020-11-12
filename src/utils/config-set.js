import OurVue from '../vue'
import { NAME, PROP_NAME } from '../constants/config'
import cloneDeep from './clone-deep'
import { getRaw } from './get'
import { isArray, isPlainObject, isString, isUndefined } from './inspect'
import { getOwnPropertyNames } from './object'
import { warn } from './warn'

// Config manager class
class BvConfig {
  constructor() {
    this.$_config = {}
  }

  // Method to merge in user config parameters
  setConfig(config = {}) {
    /* istanbul ignore next */
    if (!isPlainObject(config)) {
      return
    }
    const configKeys = getOwnPropertyNames(config)
    configKeys.forEach(key => {
      /* istanbul ignore next */
      const subConfig = config[key]
      if (key === 'breakpoints') {
        /* istanbul ignore if */
        if (
          !isArray(subConfig) ||
          subConfig.length < 2 ||
          subConfig.some(b => !isString(b) || b.length === 0)
        ) {
          warn('"breakpoints" must be an array of at least 2 breakpoint names', NAME)
        } else {
          this.$_config[key] = cloneDeep(subConfig)
        }
      } else if (isPlainObject(subConfig)) {
        // Component prop defaults
        this.$_config[key] = getOwnPropertyNames(subConfig).reduce((config, prop) => {
          if (!isUndefined(subConfig[prop])) {
            config[prop] = cloneDeep(subConfig[prop])
          }
          return config
        }, this.$_config[key] || {})
      }
    })
  }

  // Clear the config
  resetConfig() {
    this.$_config = {}
  }

  // Returns a deep copy of the user config
  getConfig() {
    return cloneDeep(this.$_config)
  }

  // Returns a deep copy of the config value
  getConfigValue(key, defaultValue = undefined) {
    return cloneDeep(getRaw(this.$_config, key, defaultValue))
  }
}

// Method for applying a global config
export const setConfig = (config = {}, Vue = OurVue) => {
  // Ensure we have a `$bvConfig` Object on the Vue prototype
  // We set on Vue and OurVue just in case consumer has not set an alias of `vue`
  Vue.prototype[PROP_NAME] = OurVue.prototype[PROP_NAME] =
    Vue.prototype[PROP_NAME] || OurVue.prototype[PROP_NAME] || new BvConfig()
  // Apply the config values
  Vue.prototype[PROP_NAME].setConfig(config)
}

// Method for resetting the user config
// Exported for testing purposes only
export const resetConfig = () => {
  if (OurVue.prototype[PROP_NAME] && OurVue.prototype[PROP_NAME].resetConfig) {
    OurVue.prototype[PROP_NAME].resetConfig()
  }
}
