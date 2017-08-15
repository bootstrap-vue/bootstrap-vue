import { mergeData, memoize, suffixPropName } from "../utils";
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

const computeBreakPoint = memoize(function computeBkPt(type, breakpoint, val) {
    // Handle boolean style prop.
    if (val === true) {
        // .col-md
        return `${type}-${breakpoint}`.toLowerCase();
    }
    // .order-md-6
    return `${type}-${breakpoint}-${val}`.toLowerCase();
});

const BREAKPOINTS = ["sm", "md", "lg", "xl"];
// Supports classes like: .col-sm, .col-md-6, .col-lg-auto
const breakpointCols = BREAKPOINTS.reduce(
    (memo, breakpoint) => ((memo[breakpoint] = boolStrNum()), memo),
    create(null)
);
// Supports classes like: .order-md-1, .order-lg-12
const breakpointOrder = BREAKPOINTS.reduce(
    (memo, breakpoint) => ((memo[suffixPropName(breakpoint, "order")] = strNum()), memo),
    create(null)
);

// For loop doesn't need to check hasOwnProperty
// when using an object created from null
const breakpointMap = assign(create(null), {
    col: keys(breakpointCols),
    order: keys(breakpointOrder)
});

export const props = assign(
    {
        tag: {
            type: String,
            default: "div"
        },
        // Generic flexbox .col
        col: {
            type: Boolean,
            default: false
        },
        // .col-[1-12]|auto
        cols: {
            type: [String, Number],
            default: null
        },
        // Flex ordering utility .order-[1-12]
        order: {
            type: [String, Number],
            default: null
        }
    },
    breakpointCols,
    breakpointOrder
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
        // Loop through `col` & `order` breakpoint props
        for (const type in breakpointMap) {
            // Returns colSm, orderMd, etc.
            const keys = breakpointMap[type];
            for (let i = 0; i < keys.length; i++) {
                if (props[keys[i]]) {
                    // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
                    classList.push(computeBreakPoint(type, keys[i].replace(type, ""), props[keys[i]]));
                }
            }
        }

        classList.push({
            // Default to .col if no other classes generated.
            col: props.col || (classList.length === 0 && !props.cols),
            [`col-${props.cols}`]: props.cols,
            [`order-${props.order}`]: props.order
        });

        return h(props.tag, mergeData(data, { class: classList }), children);
    }
};
