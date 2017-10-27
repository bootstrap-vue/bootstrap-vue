import { assign, defineProperty, defineProperties, readonlyDescriptor } from "../utils/object";

export default class BvEvent {
    constructor(type, eventInit = {}) {
        // Start by emulating native Event constructor.
        if (!type) {
            throw new TypeError(
                `Failed to construct '${this.constructor.name}'. 1 argument required, ${arguments.length} given.`
            );
        }
        // Assign defaults first, the eventInit,
        // and the type last so it can't be overwritten.
        assign(this, BvEvent.defaults(), eventInit, { type });
        // Freeze some props as readonly, but leave them enumerable.
        defineProperties(this, {
            type: readonlyDescriptor(),
            cancelable: readonlyDescriptor(),
            nativeEvent: readonlyDescriptor(),
            target: readonlyDescriptor(),
            relatedTarget: readonlyDescriptor(),
            vueTarget: readonlyDescriptor()
        });
        // Create a private variable using closure scoping.
        let defaultPrevented = false;
        // Recreate preventDefault method. One way setter.
        this.preventDefault = function preventDefault() {
            if (this.cancelable) {
                defaultPrevented = true;
            }
        };
        // Create 'defaultPrevented' publicly accessible prop
        // that can only be altered by the preventDefault method.
        defineProperty(this, "defaultPrevented", {
            enumerable: true,
            get() {
                return defaultPrevented;
            }
        });
    }

    static defaults() {
        return {
            type: "",
            cancelable: true,
            nativeEvent: null,
            target: null,
            relatedTarget: null,
            vueTarget: null
        };
    }
}
