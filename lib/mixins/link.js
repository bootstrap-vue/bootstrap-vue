// Props compatible with vue-router
// https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
import linkBase from "./link-base";

export default {
    mixins: [linkBase],

    computed: {
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
