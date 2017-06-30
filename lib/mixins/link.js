import warn from '../utils/warn';
import arrayIncludes from '../utils/arrayIncludes';
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
};

export const computed = {
    linkProps() {
        return Object.keys(props).reduce((memo, prop) => {
            memo[prop] = this[prop];

            return memo;
        }, {});
    },

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

    componentTag(){
        if (this.tag) {
            warn('<b-link> "tag" property is deprecated, please use "routerTag" property instead.');

            return this.tag;
        }

        return this.routerTag;
    },

    linkClassObject() {
        return [
            this.active ? (this.exact ? this.exactActiveClass : this.activeClass) : null,
            this.disabled ? "disabled" : null
        ];
    }
};

export const methods = {
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
};

export default {
    props,
    computed,
    methods
};

export function pickLinkProps(...propsToPick) {
    return Object.keys(props).reduce((memo, prop) => {
        if (arrayIncludes(propsToPick, prop)) {
            memo[prop] = props[prop];
        }

        return memo;
    }, {});
}

export function omitLinkProps(...propsToOmit) {
    return Object.keys(props).reduce((memo, prop) => {
        if (!arrayIncludes(propsToOmit, prop)) {
            memo[prop] = props[prop];
        }

        return memo;
    }, {});
}
