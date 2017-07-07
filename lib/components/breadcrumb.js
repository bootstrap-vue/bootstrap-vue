import mergeProps from "../utils/mergeProps"
import { warn } from "../utils/"
import bLink from "./link"

function transformItems(props, h) {
    let userDefinedActive = false
    const originalItemsLength = props.items.length

    return function itemsMapper(item, index) {
        let active, text, href, childNode
        // if no active state is defined,
        // default to the last item in the array as active
        const isLast = index === originalItemsLength - 1

        // nothing defined except the text
        if (typeof item === "string") {
            text = item
            href = "#"
            active = isLast
        } else {
            text = item.text
            // Prefer href and deprecate link
            if (item.link && !item.href) {
                warn("The <breadcrumb> `link` property is deprecated. Please use `href` instead.")
                href = item.link
            } else {
                href = item.href
            }
        }

        // don't default the active state if given a boolean value,
        // or if a user defined value has already been given
        if (active !== true && active !== false && !userDefinedActive) {
            active = isLast
        } else if (active) {
            // here we know we've been given an active value,
            // so we won't set a default value
            userDefinedActive = true
        }

        const domProps = { innerHTML: text }

        if (active) {
            childNode = h(bLink, {
                props: Object.assign({}, item, { href }),
                domProps
            })
        } else {
            childNode = h("span", {
                attrs: {
                    "aria-current": props.ariaCurrent
                },
                domProps
            })
        }

        return h(
            "li",
            {
                staticClass: "breadcrumb-item",
                class: { active },
                attrs: {
                    role: "presentation"
                }
            },
            [childNode]
        )
    }
}

export default {
    functional: true,
    props: {
        items: {
            type: Array,
            default: () => [],
            required: true
        },
        ariaCurrent: {
            type: String,
            default: "location"
        }
    },
    render(h, { props, data, children }) {
        return h(
            "ol",
            mergeProps(data, { staticClass: "breadcrumb" }),
            [].concat(props.items.map(transformItems(props, h)), children)
        )
    }
}
