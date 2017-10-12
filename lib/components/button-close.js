import { mergeData } from "../utils";

const props = {
    disabled: {
        type: Boolean,
        default: false
    },
    ariaLabel: {
        type: String,
        default: "Close"
    },
    textVariant: {
        type: String,
        default: null
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, listeners, children }) {
        const componentData = {
            staticClass: "close",
            class: {
                [`text-${props.textVariant}`]: props.textVariant
            },
            attrs: {
                type: "button",
                disabled: props.disabled,
                "aria-label": props.ariaLabel ? String(props.ariaLabel) : null
            },
            on: {
                click(e) {
                    // Ensure click on button HTML content is also disabled
                    if (props.disabled && e instanceof Event) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }
            }
        };
        // Careful not to override the slot with innerHTML
        if (!children.length) {
            componentData.domProps = { innerHTML: "&times;" };
        }
        return h("button", mergeData(data, componentData), children);
    }
};
