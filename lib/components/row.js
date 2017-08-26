import { mergeData } from "../utils";

export const props = {
    tag: {
        type: String,
        default: "div"
    },
    noGutters: {
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
                staticClass: "row",
                class: {
                    "no-gutters": props.noGutters
                }
            }),
            children
        );
    }
};
