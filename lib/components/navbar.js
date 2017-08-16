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
        type: Boolean,
        default: false
    },
    toggleBreakpoint: {
        type: String,
        default: 'sm'
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
        return h(
            props.tag,
            mergeData(data, {
                staticClass: "navbar",
                class: {
                    [`navbar-${props.type}`]: Boolean(props.type),
                    [`bg-${props.variant}`]: Boolean(props.variant),
                    [`fixed-${props.fixed}`]: Boolean(props.fixed),
                    "sticky-top": props.sticky,
                    [`navbar-expand-${props.toggleBreakpoint}`]: props.toggleable
                }
            }),
            children
        );
    }
};
