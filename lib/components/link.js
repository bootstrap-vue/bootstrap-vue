import mergeProps from "../utils/merge"
import warn from "../utils/warn"
import arrayIncludes from "../utils/arrayIncludes"
// Props compatible with vue-router
// https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
export const props = {
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

    href: {
        type: String,
        default: "#"
    },

    rel: {
        type: String,
        default: null
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

    target: {
        type: String,
        default: "_self"
    },

    to: {
        type: [String, Object],
        default: null
    }
}

function computeHref({ disabled, href, to }) {
    if (disabled) {
        return "#"
    }

    // If href explicitly provided
    if (href) {
        return href
    }

    // Fallback to `to` prop
    if (to && typeof to === "string") {
        return to
    }
}

function computedRel({ target, rel }) {
    if (target === "_blank" && rel === null) {
        return "noopener"
    }
    return rel || null
}

function componentTag({ tag, routerTag }) {
    if (tag) {
        warn('<b-link> "tag" property is deprecated, please use "routerTag" property instead.')

        return tag
    }

    return routerTag
}

export default {
    functional: true,

    props,

    render(h, { props, data, children }) {
        const attrs = {
            rel: computedRel(props),
            href: computeHref(props)
        }

        return h(props.to && !props.disabled ? "router-link" : "a", mergeProps(data, { attrs }), children)
    }
}
