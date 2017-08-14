import { warn } from "../utils";
import { arrayIncludes } from "../utils/array";
import { keys } from "../utils/object";
import { propsFactory } from "../components/link";

export const props = propsFactory();

export const computed = {
    linkProps() {
        return keys(props).reduce((memo, prop) => {
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
    componentTag() {
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


export default {
    props,
    computed
};

export function pickLinkProps(...propsToPick) {
    return keys(props).reduce((memo, prop) => {
        if (arrayIncludes(propsToPick, prop)) {
            memo[prop] = props[prop];
        }

        return memo;
    }, {});
}

export function omitLinkProps(...propsToOmit) {
    return keys(props).reduce((memo, prop) => {
        if (!arrayIncludes(propsToOmit, prop)) {
            memo[prop] = props[prop];
        }

        return memo;
    }, {});
}
