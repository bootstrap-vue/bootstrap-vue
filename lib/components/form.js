import mergeProps from "../utils/mergeProps"

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
            mergeProps(data, {
                class: { "form-inline": props.inline }
            }),
            children
        )
    }
}
