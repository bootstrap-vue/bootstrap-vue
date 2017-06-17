const linkProps = {
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

export default {
    props: linkProps,
    computed: {
        bLinkProps() {
            return Object.keys(linkProps).reduce((memo, prop) => {
                return Object.assign(memo, {[prop]: this[prop]});
            }, {})
        }
    }
};
