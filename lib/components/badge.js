import mergeProps from "../utils/mergeProps"

function computeBadgeVariant({ variant }) {
    if (!variant) {
        return null
    }

    return variant === `default` ? `badge-default` : `badge-${variant}`
}

function computeBadgePill({ pill }) {
    return pill ? "badge-pill" : ""
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
