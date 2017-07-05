import mergeProps from "../utils/mergeProps"
import assign from "../utils/assign"

function computeTag(props) {
    return props.to && !props.disabled ? "router-link" : "a"
}

function computeRouterTag(props) {
    if (props.tag) {
        warn('<b-link> "tag" property is deprecated, please use "routerTag" property instead.')
        return props.tag
    }

    return props.routerTag
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

export const anchorProps = {
    href: {
        type: String,
        default: "#"
    },
    rel: {
        type: String,
        default: null
    },
    target: {
        type: String,
        default: "_self"
    }
}

export const routerLinkProps = {
    active: {
        type: Boolean,
        default: false
    },
    activeClass: {
        type: String,
        default: "active"
    },
    append: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    event: {
        type: [String, Array],
        default: "click"
    },
    exact: {
        type: Boolean,
        default: false
    },
    exactActiveClass: {
        type: String,
        default: "active"
    },
    replace: {
        type: Boolean,
        default: false
    },
    routerTag: {
        type: String,
        default: "a"
    },
    tag: {
        type: String,
        default: null
    },
    to: {
        type: [String, Object],
        default: null
    }
}

export default {
    functional: true,
    props: assign({}, routerLinkProps, anchorProps),
    render(h, { props, data, children }) {
        const [tag, rel, href] = [computeTag(props), computeRel(props), computeHref(props)]

        const newData = {
            class: computeClass(props),
            attrs: { rel, href },
            props: assign(props, {
                tag: computeRouterTag(props)
            }),
            on: {
                click: clickHandlerFactory({ tag, href, disabled: props.disabled })
            }
        }

        return h(tag, mergeProps(data, newData), children)
    }
}
