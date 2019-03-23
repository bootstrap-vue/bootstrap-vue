import { noWarn } from './env'

/**
 * Log a warning message to the console with bootstrap-vue formatting sugar.
 * @param {string} message
 */
/* istanbul ignore next */
const warn = message => {
  if (!noWarn) {
    console.warn(`[BootstrapVue warn]: ${message}`)
  }
}

export default warn
