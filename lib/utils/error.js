/**
 * Log an error message to the console with bootstrap-vue formatting sugar.
 * @param {string} message
 * @param {...any}
 */
function error(message, ...args) {
    console.error(`[Bootstrap-Vue error]: ${message}`, ...args);
}

export default error;
