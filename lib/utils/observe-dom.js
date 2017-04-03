/**
 * Observe a DOM element changes, falls back to eventListener mode
 * @param {Element} el The DOM element to observe
 * @param {Function} callback callback to be called on change
 * @param {object} [opts={childList: true, subtree: true}] observe options
 * @see http://stackoverflow.com/questions/3219758
 */
export default function observeDOM(el, callback, opts) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const eventListenerSupported = window.addEventListener;

    if (MutationObserver) {
        // Define a new observer
        const obs = new MutationObserver(mutations => {
            if (mutations[0].addedNodes.length > 0 || mutations[0].removedNodes.length > 0) {
                callback();
            }
        });

        // Have the observer observe foo for changes in children
        obs.observe(el, Object.assign({childList: true, subtree: true}, opts));
    } else if (eventListenerSupported) {
        el.addEventListener('DOMNodeInserted', callback, false);
        el.addEventListener('DOMNodeRemoved', callback, false);
    }
}
