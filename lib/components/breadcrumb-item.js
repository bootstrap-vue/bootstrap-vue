import { mergeData } from "../utils"
import { isArray } from "../utils/array"
import { assign } from "../utils/object"
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
            default: null
        },
        items: {
            type: Array,
            default: null
        }
    },
    render(h, { props, data, children }) {
        const staticClass = "breadcrumb-item"
        const role = "presentation"

        // If an items array was passed, we're generating the markup
        if (isArray(props.items)) {
            let activeDefined = false

            return props.items.map((item, idx) => {
                let active = item.active

                if (active) {
                    activeDefined = true
                }

                if (!active && !activeDefined) {
                    active = idx + 1 === props.items.length
                }

                return h(
                    "li",
                    mergeData(data, {
                        staticClass,
                        class: { active },
                        attrs: { role }
                    }),
                    [h(BreadcrumbLink, { props: assign({}, props, item) }, children)]
                )
            })
        }

        return h(
            "li",
            mergeData(data, {
                staticClass,
                class: { active: props.active },
                attrs: { role }
            }),
            [h(BreadcrumbLink, { props }, children)]
        )
    }
}
