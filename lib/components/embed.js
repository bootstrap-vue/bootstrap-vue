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
        default: "16by9"
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            props.tag,
            {
                ref: data.ref,
                staticClass: "embed-responsive",
                class: {
                    [`embed-responsive-${props.aspect}`]: Boolean(props.aspect)
                }
            },
            [h(props.type, mergeData(data, { ref: '', staticClass: "embed-responsive-item" }), children)]
        );
    }
};
