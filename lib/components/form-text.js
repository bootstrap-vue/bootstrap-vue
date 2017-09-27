import { mergeData } from "../utils";

export const props = {
    id: {
        type: String,
        default: null
    },
    tag: {
        type: String,
        default: "small"
    },
    textVariant: {
        type: String,
        default: "muted"
    },
    inline: {
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
                class: {
                  'form-text': !Boolean(props.inline),
                  [`text-${props.textVariant}`]: Boolean(props.textVariant)
                },
                attrs: {
                  id: props.id
                }
            }),
            children
        );
    }
};
