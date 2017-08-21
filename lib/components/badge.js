import { mergeData } from "../utils";

export const props = {
    tag: {
        type: String,
        default: "span"
    },
    variant: {
        type: String,
        default: "secondary"
    },
    pill: {
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
                staticClass: "badge",
                class: [
                    !props.variant ? "badge-secondary" : `badge-${props.variant}`,
                    { "badge-pill": Boolean(props.pill) }
                ]
            }),
            children
        );
    }
};
