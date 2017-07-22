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
        assign(this, BvEvent.defaults(), eventInit, { type, timeStamp: new Date().getTime() });
        // Freeze some props as readonly.
        defineProperties(this, {
            type: readonlyDescriptor(),
            // Conform to native Event's name
            timeStamp: readonlyDescriptor(),
            // Alias for misspelling
            timestamp: {
                get() {
                    return this.timeStamp;
                }
            },
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
            get() {
                return defaultPrevented;
            }
        });
    }

    static defaults() {
        return {
            type: "",
            timeStamp: 0,
            cancelable: true,
            nativeEvent: null,
            target: null,
            vueTarget: null
        };
    }
}
