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

export const bLinkProps = function() {
    return Object.keys(props).reduce((memo, prop) => {
        return Object.assign(memo, this[prop]);
    }, {});
};

export default {
    props,
    computed: {
        bLinkProps
    }
};

export const pickProps = (...propsToPick) => {
    return propsToPick.reduce((memo, prop) => {
        if (props[prop]) {
            Object.assign(memo, { [prop]: props[prop] });
        }

        return memo;
    }, {});
};

export const omitProps = (...propsToOmit) => {
    return Object.keys(props).reduce((memo, prop) => {
        if (!propsToOmit.includes(prop)) {
            Object.assign(memo, { [prop]: props[prop] });
        }

        return memo;
    }, {});
};
