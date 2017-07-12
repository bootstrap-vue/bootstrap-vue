import { mergeData } from "../utils";
import { create } from "../utils/object";
import Link from "./link";

export const props = {
    text: {
        type: String,
        default: null
    },
    href: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    },
    ariaCurrent: {
        type: String,
        default: "location"
    },
    linkProps: {
        type: Object,
        default: () => create(null)
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        const tag = props.active ? "span" : Link;

        let componentData = {
            props: props.linkProps,
            domProps: {
                innerHTML: props.text
            }
        };

        if (props.active) {
            componentData.attrs = { "aria-current": props.ariaCurrent };
        } else {
            componentData.attrs = { href: props.href };
        }

        return h(tag, mergeData(data, componentData), children);
    }
};
