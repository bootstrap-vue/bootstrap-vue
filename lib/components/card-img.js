import { mergeData } from "../utils";

export const props = {
    top: {
        type: Boolean,
        default: false
    },
    bottom: {
        type: Boolean,
        default: false
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        let staticClass = "card-img";
        if (props.top) {
            staticClass = "card-img-top";
        } else if (props.bottom) {
            staticClass = "card-img-bottom";
        }

        return h("img", mergeData(data, { staticClass }));
    }
};
