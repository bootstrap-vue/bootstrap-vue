import mergeProps from "../utils/mergeProps"

function computeBadgeVariant({ variant }) {
    return !variant ? "badge-default" : `badge-${variant}`
}

export default {
    functional: true,
    props: {
        variant: {
            type: String,
            default: "default"
        },
        pill: {
            type: Boolean,
            default: false
        }
    },
    render(h, { props, data, children }) {
        const componentData = {
            staticClass: "badge",
            class: [computeBadgeVariant(props), props.pill ? "badge-pill" : null]
        }

        return h("span", mergeProps(data, componentData), children)
    }
}
