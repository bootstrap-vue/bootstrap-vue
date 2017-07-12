import { assign, keys, toString } from "../utils/object";
import { warn, error as logError, mergeData } from "../utils";

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
};

export const routerProps = {
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
};

export const props = assign({}, routerProps, anchorProps);

export const computed = {
    linkProps() {
        let linkProps = {},
            propKeys = keys(props);

        for (let i = 0; i < propKeys.length; i++) {
            const prop = propKeys[i];
            // Computed Vue getters are bound to the instance.
            linkProps[prop] = this[prop];
        }

        return linkProps;
    }
};

function computeTag(props) {
    return props.to && !props.disabled ? "router-link" : "a";
}

function computeRouterTag(props) {
    if (props.tag) {
        warn('<b-link> "tag" property is deprecated, please use "routerTag" property instead.');
        return props.tag;
    }

    return props.routerTag;
}

function computeHref({ disabled, href, to }) {
    if (disabled) return "#";
    // If href explicitly provided
    if (href) return href;
    // Fallback to `to` prop
    if (to && typeof to === "string") return to;
}

function computeRel({ target, rel }) {
    if (target === "_blank" && rel === null) {
        return "noopener";
    }
    return rel || null;
}

function clickHandlerFactory({ disabled, tag, href, parent }) {
    return function onClick(e) {
        const isRouterLink = tag === "router-link";

        if (disabled) {
            e.stopPropagation();
        } else {
            parent.$root.$emit("clicked::link", e);

            if (isRouterLink) {

                /**
                 * In the event that we expected a router-link,
                 * but the vm is not available at __vue__ ,
                 * emitting the event will fail.
                 * Leave breadcrumbs for our users and ourselves.
                 */
                if (!e.target.__vue__) {
                    const type = toString.call(e.target.__vue__);
                    logError(
                        `'link' component expected click event.target to be a router-link. Found ${type}.`,
                        e.target.__vue__
                    );
                }
                e.target.__vue__.$emit("click", e);
            }
        }

        if (!isRouterLink && href === "#") {
            // stop scroll-to-top behavior
            e.preventDefault();
        }
    };
}

export default {
    functional: true,
    props,
    render(h, { props, data, parent, children }) {
        const tag = computeTag(props),
            rel = computeRel(props),
            href = computeHref(props),
            onClick = clickHandlerFactory({ tag, href, disabled: props.disabled, parent });

        const componentData = {
            class: [
                props.active ? (props.exact ? props.exactActiveClass : props.activeClass) : null,
                props.disabled ? "disabled" : null
            ],
            attrs: { rel, href, target: props.target },
            props: assign(props, {
                tag: computeRouterTag(props)
            }),
            [tag === "router-link" ? "nativeOn" : "on"]: { click: onClick }
        };

        return h(tag, mergeData(data, componentData), children);
    }
};
