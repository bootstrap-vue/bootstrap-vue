import { mergeData } from "../utils";

export const props = {
    tag: {
        type: String,
        default: "ul"
    },
    fill: {
        type: Boolean,
        default: false
    },
    justified: {
        type: Boolean,
        default: false
    },
    tabs: {
        type: Boolean,
        default: false
    },
    pills: {
        type: Boolean,
        default: false
    },
    vertical: {
        type: Boolean,
        default: false
    },
    isNavBar: {
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
                staticClass: "nav",
                class: {
                    "navbar-nav": props.isNavBar,
                    "nav-tabs": props.tabs,
                    "nav-pills": props.pills,
                    "flex-column": props.vertical,
                    "nav-fill": props.fill,
                    "nav-justified": props.justified
                }
            }),
            children
        );
    }
};
