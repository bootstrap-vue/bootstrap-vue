import mergeProps from "../utils/mergeProps"
import warn from "../utils/warn"
// import { props } from "../mixins/link"

const props = {
    disabled: {
        type: Boolean,
        default: false
    },
}

function computeTag(props) {
    return props.to && !props.disabled ? "router-link" : "a"
}

function computeHref({ disabled, href, to }) {
    if (disabled) return "#"
    // If href explicitly provided
    if (href) return href
    // Fallback to `to` prop
    if (to && typeof to === "string") return to
}

function computeRel({ target, rel }) {
    if (target === "_blank" && rel === null) {
        return "noopener"
    }
    return rel || null
}

function computeRouterTag({ tag, routerTag }) {
    if (tag) {
        warn('<b-link> "tag" property is deprecated, please use "routerTag" property instead.')
        return tag
    }

    return routerTag
}

function computeClass(props) {
    return [
        props.active ? (props.exact ? props.exactActiveClass : props.activeClass) : null,
        props.disabled ? "disabled" : null
    ]
}

function clickHandlerFactory({ disabled, tag, href }) {
    return function onClick(e) {
        if (disabled) {
            e.stopPropagation()
        }

        if (tag === "a" && href === "#") {
            // stop scroll-to-top behavior
            e.preventDefault()
        }
    }
}

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        const [tag, rel, href] = [computeTag(props), computeRel(props), computeHref(props)]

        const newData = {
            class: computeClass(props),
            attrs: { rel, href },
            props: {
                tag: computeRouterTag(props)
            },
            on: {
                click: clickHandlerFactory({ tag, href, disabled: props.disabled })
            }
        }

        return h(tag, mergeProps(data, newData), children)
    }
}
