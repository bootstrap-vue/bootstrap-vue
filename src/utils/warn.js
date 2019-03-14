/**
 * Log a warning message to the console with bootstrap-vue formatting sugar.
 * @param {string} message
 */
/* istanbul ignore next */
const warn = message => {
  if (process && process.env && process.env.BOOTSTRAP_VUE_NO_WARN) {
    return
  }
  console.warn(`[BootstrapVue warn]: ${message}`)
}

export default warn
