import { mergeData, uppercase } from "../utils";
import { concat } from "../utils/array";
import { keys, assign } from "../utils/object";

function boolStrNum() {
    return {
        type: [Boolean, String, Number],
        default: false
    };
}
function strNum() {
    return {
        type: [String, Number],
        default: null
    };
}

function suffix(str, suffix) {
    return suffix ? str + uppercase(suffix) : str;
}

function computeBkPt(prefix, bkpt, val) {
    if (!val) {
        return null;
    }
    if (val === true && bkpt) {
        return `${prefix}-${bkpt}`;
    }

    return `${prefix}-${bkpt}-${val}`;
}

const BKPTS = ["sm", "md", "lg", "xl"];
// This generates plain [offset, push, pull] props without bkpt suffixes.
const BKPTS_PADDED = concat(null, BKPTS);

const breakpointProps = BKPTS.reduce((memo, bkpt) => ((memo[bkpt] = boolStrNum()), memo), {});
const offsetProps = BKPTS_PADDED.reduce((memo, bkpt) => ((memo[suffix("offset", bkpt)] = strNum()), memo), {});
const pushProps = BKPTS_PADDED.reduce((memo, bkpt) => ((memo[suffix("push", bkpt)] = strNum()), memo), {});
const pullProps = BKPTS_PADDED.reduce((memo, bkpt) => ((memo[suffix("pull", bkpt)] = strNum()), memo), {});

const propKeys = [
    ["col", keys(breakpointProps)],
    ["offset", keys(offsetProps)],
    ["push", keys(pushProps)],
    ["pull", keys(pullProps)]
];

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
    offsetProps,
    pushProps,
    pullProps
);

/**
 * We need ".col" to default in when no other props are passed,
 * but always render when col=true.
 */

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        const classList = propKeys.reduce((memo, bkptPair) => {
            const [type, keys] = bkptPair;

            const result = keys.reduce((typeClasses, k) => {
                if (props[k]) {
                    typeClasses.push(computeBkPt(type, k, props[k]));
                }
                return typeClasses;
            }, []);

            if (result.length) {
                return memo.concat(result);
            }

            return memo;
        }, []);

        classList.push({
            col: props.col || classList.length === 0,
            [`col-${props.size}`]: props.size
        });

        return h(props.tag, mergeData(data, { class: classList }), children);
    }
};
