import { mergeData } from "../utils";

export const props = {
    label: {
        type: String,
        default: null,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            'optgroup',
            mergeData(data, {
                attrs: {
                    "label": props.label,
                    "disabled": props.disabled
                }
            }),
            children
        );
    }
};
