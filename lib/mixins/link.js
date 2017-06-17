// Props compatible with vue-router
// https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
export const linkProps = {
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

    tag: {
        type: String,
        default: "a"
    },

    target: {
        type: String,
        default: "_self"
    },

    to: {
        type: [String, Object],
        default: null
    }
};

export function computedLinkProps() {
    return Object.keys(linkProps).reduce((memo, prop) => {
        memo[prop] = this[prop];

        return memo;
    }, {});
}

export function pickLinkProps(...propsToPick) {
    return Object.keys(linkProps).reduce((memo, prop) => {
        if (propsToPick.includes(prop)) {
            memo[prop] = linkProps[prop];
        }

        return memo;
    }, {});
}

export function omitLinkProps(...propsToOmit) {
    return Object.keys(linkProps).reduce((memo, prop) => {
        if (!propsToOmit.includes(prop)) {
            memo[prop] = linkProps[prop];
        }

        return memo;
    }, {});
}

export default {
    props: linkProps,

    computed: {
        computedLinkProps,

        isRouterLink() {
            return Boolean(this.$router && this.to && !this.disabled);
        },

        _href() {
            if (this.disabled) {
                return "#";
            }

            // If href explicitly provided
            if (this.href) {
                return this.href;
            }

            // Fallback to `to` prop
            if (this.to && typeof this.to === "string") {
                return this.to;
            }
        },

        computedRel() {
            if (this.target === "_blank" && this.rel === null) {
                return "noopener";
            }
            return this.rel || null;
        },

        linkClassObject() {
            return [
                this.active ? (this.exact ? this.exactActiveClass : this.activeClass) : null,
                this.disabled ? "disabled" : null
            ];
        }
    },

    methods: {
        linkClick(e) {
            if (!this.disabled) {
                this.$root.$emit("clicked::link", this);
                this.$emit("click", e);
            } else {
                e.stopPropagation();
            }

            if (!this.isRouterLink && this._href === "#") {
                // stop scroll-to-top behavior
                e.preventDefault();
            }
        }
    }
};
