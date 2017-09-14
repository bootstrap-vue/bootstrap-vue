import { mergeData, pluckProps } from "../utils";
import { arrayIncludes, concat } from "../utils/array";
import { assign, keys } from "../utils/object";
import { addClass, removeClass } from "../utils/dom";
import Link, { propsFactory as linkPropsFactory } from "./link";

const btnProps = {
    block: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: null,
        validator: size => arrayIncludes(["sm", "", "lg"], size)
    },
    variant: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: "button"
    },
    pressed: {
        // tri-state prop: true, false or null
        // => on, off, not a toggle
        type: Boolean,
        default: null
    }
};

let linkProps = linkPropsFactory();
delete linkProps.href.default;
delete linkProps.to.default;
const linkPropKeys = keys(linkProps)

export const props = assign(linkProps, btnProps);

function handleFocus(evt) {
    if (evt.type === "focusin") {
        addClass(evt.target, "focus");
    } else if (evt.type === "focusout") {
        removeClass(evt.target, "focus");
    }
}

export default {
    functional: true,
    props,
    render(h, { props, data, listeners, children }) {
        const isLink = Boolean(props.href || props.to);
        const isToggle = typeof props.pressed === "boolean";
        const on = {
            click(e) {
                if (props.disabled && e instanceof Event) {
                    e.stopPropagation();
                    e.preventDefault();
                } else if (isToggle) {
                    // Concat will normalize the value to an array
                    // without double wrapping an array value in an array.
                    concat(listeners["update:pressed"]).forEach(fn => {
                        if (typeof fn === "function") {
                            fn(!props.pressed);
                        }
                    });
                }
            }
        };

        if (isToggle) {
            on.focusin = handleFocus;
            on.focusout = handleFocus;
        }

        const componentData = {
            staticClass: "btn",
            class: [
                props.variant ? `btn-${props.variant}` : `btn-secondary`,
                {
                    [`btn-${props.size}`]: Boolean(props.size),
                    "btn-block": props.block,
                    disabled: props.disabled,
                    active: props.pressed
                }
            ],
            props: isLink ? pluckProps(linkPropKeys, props) : null,
            attrs: {
                type: isLink ? null : props.type,
                disabled: isLink ? null : props.disabled,
                // Data attribute not used for js logic,
                // but only for BS4 style selectors.
                "data-toggle": isToggle ? "button" : null,
                "aria-pressed": isToggle ? String(props.pressed) : null,
                // Tab index is used when the component becomes a link.
                // Links are tabable, but don't allow disabled,
                // so we mimic that functionality by disabling tabbing.
                tabindex: props.disabled && isLink ? "-1" : null
            },
            on
        };

        return h(isLink ? Link : "button", mergeData(data, componentData), children);
    }
};
