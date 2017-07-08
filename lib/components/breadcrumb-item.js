import { mergeData } from "../utils"
import BreadcrumbLink from "./breadcrumb-link"

export default {
    functional: true,
    props: {
        text: {
            type: String,
            default: null
        },
        href: {
            type: String,
            default: null
        },
        active: {
            type: Boolean,
            default: false
        },
        ariaCurrent: {
            type: String,
            default: "location"
        },
        linkProps: {
            type: Object,
            default: () => Object.create(null)
        },
        items: {
            type: Array,
            default: null
        }
    },
    render(h, { props, data, children }) {
        const componentData = {
            staticClass: "breadcrumb-item",
            class: { active: props.active },
            attrs: { role: "presentation" }
        }

        // If an items array was passed, we're generating the markup
        if (Array.isArray(props.items)) {
            return props.items.map(item => {
                return h("li", mergeData(data, componentData), [
                    h(BreadcrumbLink, { props: Object.assign({}, props, item) }, children)
                ])
            })
        }

        return h(
            "li",
            mergeData(data, {
                staticClass: "breadcrumb-item",
                class: { active: props.active },
                attrs: { role: "presentation" }
            }),
            [h(BreadcrumbLink, { props }, children)]
        )
    }
}
