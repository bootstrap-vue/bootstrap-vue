import { mergeData, pluckProps } from "../utils";
import { assign } from "../utils/object";
import Link, { propsFactory as linkPropsFactory } from "./link";

export const props = assign(linkPropsFactory(), {
    text: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    },
    href: {
        type: String,
        default: "#"
    },
    ariaCurrent: {
        type: String,
        default: "location"
    }
});

export default {
    functional: true,
    props,
    render(h, { props: suppliedProps, data, children }) {
        const tag = suppliedProps.active ? "span" : Link;

        let componentData = {
            props: pluckProps(props, suppliedProps),
            domProps: { innerHTML: suppliedProps.text }
        };

        if (suppliedProps.active) {
            componentData.attrs = { "aria-current": suppliedProps.ariaCurrent };
        } else {
            componentData.attrs = { href: suppliedProps.href };
        }

        return h(tag, mergeData(data, componentData), children);
    }
};
