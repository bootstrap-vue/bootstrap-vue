import { mergeData } from "../utils";

export const props = {
    id: {
        type: String,
        default: null
    },
    tag: {
        type: String,
        default: "div"
    },
    textVariant: {
        type: String,
        default: null
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            props.tag,
            mergeData(data, {
                staticClass: 'invalid-feedback',
                attrs: {
                  id: props.id
                }
            }),
            children
        );
    }
};
