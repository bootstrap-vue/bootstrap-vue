import { mergeData } from "../utils";

export const props = {
    inline: {
        type: Boolean,
        default: false
    },
    browserValidate: {
        type: Boolean,
        default: false
    },
    validated: {
        type: Boolean,
        default: false
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            "form",
            mergeData(data, {
                class: {
                    "form-inline": props.inline,
                    "was-validated": props.validated
                },
                attrs: {
                    novalidate: !props.browserValidate
                }
            }),
            children
        );
    }
};
