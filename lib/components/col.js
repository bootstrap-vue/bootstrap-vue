import { mergeData, upperFirst } from "../utils";
import { concat } from "../utils/array";
import { keys, assign, create } from "../utils/object";

/**
 * Generates a prop object with a type of
 * [Boolean, String, Number]
 */
function boolStrNum() {
    return {
        type: [Boolean, String, Number],
        default: false
    };
}

/**
 * Generates a prop object with a type of
 * [String, Number]
 */
function strNum() {
    return {
        type: [String, Number],
        default: null
    };
}

function suffix(str, suffix) {
    return suffix ? str + upperFirst(suffix) : str;
}

function computeBkPt(prefix, bkpt, val) {
    if (!val) {
        return null;
    }
    if (val === true && bkpt) {
        return `${prefix}-${bkpt}`;
    }
    if (val && !bkpt) {
        return `${prefix}-${val}`;
    }

    return `${prefix}-${bkpt}-${val}`;
}

const BKPTS = ["sm", "md", "lg", "xl"];
// This generates plain order props without bkpt suffixes.
const BKPTS_PADDED = concat(null, BKPTS);

const breakpointProps = BKPTS.reduce((memo, bkpt) => ((memo[bkpt] = boolStrNum()), memo), {});
const orderProps = BKPTS_PADDED.reduce((memo, bkpt) => ((memo[suffix("order", bkpt)] = strNum()), memo), {});

// For loop doesn't need to check hasOwnProperty
// when using an object created from null
const propKeyMap = assign(create(null), {
    col: keys(breakpointProps),
    order: keys(orderProps)
});

export const props = assign(
    {
        tag: {
            type: String,
            default: "div"
        },
        col: {
            type: Boolean,
            default: false
        },
        cols: {
            type: [String, Number],
            default: null
        }
    },
    breakpointProps,
    orderProps
);

/**
 * We need ".col" to default in when no other props are passed,
 * but always render when col=true.
 */
export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        const classList = [];
        for (const type in propKeyMap) {
            const keys = propKeyMap[type];
            for (let i = 0; i < keys.length; i++) {
                if (props[keys[i]]) {
                    classList.push(computeBkPt(type, keys[i].replace(type, "").toLowerCase(), props[keys[i]]));
                }
            }
        }

        classList.push({
            col: props.col || (classList.length === 0 && !props.cols),
            [`col-${props.cols}`]: props.cols
        });

        return h(props.tag, mergeData(data, { class: classList }), children);
    }
};
