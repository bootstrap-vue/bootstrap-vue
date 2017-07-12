import { mergeData } from "../utils";
import InputGroupAddon from "./input-group-addon";

export const props = {
    tag: {
        type: String,
        default: "div"
    },
    size: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    left: {
        type: String,
        default: null
    },
    right: {
        type: String,
        default: null
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        let childNodes = [];
        const componentData = {
            staticClass: "input-group",
            class: {
                [`input-group-${props.size}`]: Boolean(props.size),
                [`has-${props.state}`]: Boolean(props.state)
            }
        };

        if (slots().left) {
            childNodes.push(slots().left);
        } else if (props.left) {
            childNodes.push(h(InputGroupAddon, { domProps: { innerHTML: props.left } }));
        }

        childNodes.push(slots().default);

        if (slots().right) {
            childNodes.push(slots().right);
        } else if (props.right) {
            childNodes.push(h(InputGroupAddon, { domProps: { innerHTML: props.right } }));
        }

        return h(props.tag, mergeData(data, componentData), childNodes);
    }
};
