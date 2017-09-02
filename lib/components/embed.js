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
        let emded = h(
            props.type,
            mergeData(data, {
                staticClass: "embed-responsive-item"
            }),
            children
        );

        return h(
            propstag,
            {
                staticClass: "embed-responsive",
                class: {
                    [`embed-responsive-${props.aspect}`]: Boolean(props.aspect)
                }
            },
            embed
        );
    }
};
