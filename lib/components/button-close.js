import { mergeData } from "../utils";

const props = {
    disabled: {
        type: Boolean,
        default: false
    },
    ariaLabel: {
        type: String,
        default: 'Close'
    },
    textVariant: {
        type: String,
        default: null
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, listeners, slots }) {
        const componentData = {
            staticClass: "close",
            class: [
                Boolean(props.textVariant) ? `text-${props.textVariant}` : ""
            ],
            attrs: {
                "type": "button",
                "disabled": props.disabled,
                "aria-label": Boolean(props.ariaLabel) ? String(props.ariaLabel) : null
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
        const children = Boolean(slots().default) ? slots().default : ["&times;"];
        return h("button", mergeData(data, componentData), children);
    }
};
