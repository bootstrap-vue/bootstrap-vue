/**
 * Register and event to listen on specified element once.
 * @param {Element} element to listen on
 * @param {String} event to listen for
 * @param {Function} callback when event fires
 */
export default function addEventListenerOnce(el, evtName, callback) {
    function fnOnce() {
        el.removeEventListener(evtName, fnOnce);
        return callback.apply(null, arguments);
    }
    el.addEventListener(event, fnOnce);
}
