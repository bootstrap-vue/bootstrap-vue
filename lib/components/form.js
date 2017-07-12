import mergeData from "../utils/mergeData";

export default {
    functional: true,
    props: {
        inline: {
            type: Boolean,
            default: false
        }
    },
    render(h, { props, data, children }) {
        return h(
            "form",
            mergeData(data, {
                class: { "form-inline": props.inline }
            }),
            children
        );
    }
};
