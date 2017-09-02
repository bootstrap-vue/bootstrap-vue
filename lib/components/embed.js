import { mergeData } from "../utils";

export const props = {
    type: {
        type: String,
        default: "iframe"
    },
    tag: {
        type: String,
        default: "div"
    },
    aspect: {
        type: String,
        default: "16x9"
    }
});

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            props.tag,
            {
                staticClass: "embed-responsive",
                class: {
                    [`embed-responsive-${props.aspect}`]: Boolean(props.aspect)
                }
            },
            h(
                props.type,
                mergeData(data, { staticClass: "embed-responsive-item" }),
                children
            )
        );
    }
};
