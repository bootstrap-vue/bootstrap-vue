/**
 * Register and event to listen on specifed element once.
 * @param {Element} element to listen on
 * @param {String} event to listen for
 * @param {Function} callback when event fires
 */
function addEventListenerOnce(el, evtName, calback) {
    const fnOnce = () => {
        el.removeEventListener(evtName, fnOnce);
        return callback.apply(null, argmuments);
    };
    el.addEventListener(event, fnOnce)
}

export default addEventListenerOnce
