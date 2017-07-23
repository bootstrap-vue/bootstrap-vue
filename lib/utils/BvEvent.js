import { assign, defineProperty, defineProperties, readonlyDescriptor } from "../utils/object";

export class BvEvent {
    constructor(type, eventInit = {}) {
        // Start by emulating native Event constructor.
        if (!type) {
            throw new TypeError(
                `Failed to construct '${this.constructor.name}'. 1 argument required, ${arguments.length} given.`
            );
        }
        // Assign defaults first,
        // the eventInit,
        // and last the type and timestamp so they can't be overwritten.
        assign(this, BvEvent.defaults(), eventInit, { type });
        // Freeze some props as readonly.
        defineProperties(this, {
            type: readonlyDescriptor(),
            cancelable: readonlyDescriptor(),
            nativeEvent: readonlyDescriptor(),
            target: readonlyDescriptor(),
            vueTarget: readonlyDescriptor()
        });
        // Create a private variable using closure scoping.
        let defaultPrevented = false;
        // Recreate event method
        this.preventDefault = function preventDefault() {
            defaultPrevented = true;
        };
        // Alias preventDefault
        this.cancel = this.preventDefault;
        // Create a publicly accessible prop that can only be altered by preventDefault
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
            vueTarget: null
        };
    }
}
