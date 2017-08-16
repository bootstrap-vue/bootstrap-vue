import { mergeData } from "../utils";

export const props = {
    tag: {
        type: String,
        default: "nav"
    },
    type: {
        type: String,
        default: "light"
    },
    variant: {
        type: String
    },
    toggleable: {
        type: [Boolean, String],
        default: false
    },
    toggleBreakpoint: {
        // Deprecated: to be removed soon
        type: String,
        default: null
    },
    fixed: {
        type: String
    },
    sticky: {
        type: Boolean,
        default: false
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        let breakpoint = this.toggleBreakpoint || 'sm';
        if (typeof this.toggleable === 'string') {
            breakpoint = this.toggleable;
        }
        return h(
            props.tag,
            mergeData(data, {
                staticClass: "navbar",
                class: {
                    [`navbar-${props.type}`]: Boolean(props.type),
                    [`bg-${props.variant}`]: Boolean(props.variant),
                    [`fixed-${props.fixed}`]: Boolean(props.fixed),
                    "sticky-top": props.sticky,
                    [`navbar-expand-${breakpoint}`]: Boolean(props.toggleable)
                }
            }),
            children
        );
    }
};
