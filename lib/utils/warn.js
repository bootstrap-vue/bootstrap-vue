/**
 * Log a warning message to the console with bootstrap-vue formatting sugar.
 * @param {string} message
 * @param {...any}
 */
function warn(message, ...args) {
    console.warn(`[Bootstrap-Vue warn]: ${message}`, ...args)
}

export default warn
