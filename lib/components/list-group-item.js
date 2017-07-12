import { mergeData, pluckProps } from "../utils";
import { assign } from "../utils/object";
import { arrayIncludes } from "../utils/array";
import Link, { props as linkProps } from "./link";

const actionTags = ["a", "router-link", "button", "b-link"];

export const props = assign(linkProps, {
    href: { type: linkProps.href.type },
    to: { type: linkProps.to.type },
    tag: {
        type: String,
        default: "div"
    },
    action: {
        type: Boolean,
        default: null
    },
    variant: {
        type: String,
        default: null
    }
});

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        const tag = !props.href && !props.to ? props.tag : Link;

        const componentData = {
            staticClass: "list-group-item",
            class: {
                "list-group-flush": props.flush,
                [`list-group-item-${props.variant}`]: Boolean(props.variant),
                active: props.active,
                disabled: props.disabled,
                "list-group-item-action": Boolean(
                    props.href || props.to || props.action || arrayIncludes(actionTags, props.tag)
                )
            },
            props: pluckProps(linkProps, props)
        };

        return h(tag, mergeData(data, componentData), children);
    }
};
