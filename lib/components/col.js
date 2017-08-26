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

const computeBkPtClass = memoize(function computeBkPt(type, breakpoint, val) {
    let className = type;
    if (breakpoint) {
        className += `-${breakpoint}`;
    }
    // Handle boolean style prop.
    if (val === true) {
        // .col-md
        return className.toLowerCase();
    }
    // .order-md-6
    className += `-${val}`;
    return className.toLowerCase();
});

const BREAKPOINTS = ["sm", "md", "lg", "xl"];
// Supports classes like: .col-sm, .col-md-6, .col-lg-auto
const breakpointCol = BREAKPOINTS.reduce(
    (propMap, breakpoint) => ((propMap[breakpoint] = boolStrNum()), propMap),
    create(null)
);
// Supports classes like: .offset-md-1, .offset-lg-12
const breakpointOffset = BREAKPOINTS.reduce(
    (propMap, breakpoint) => ((propMap[suffixPropName(breakpoint, "offset")] = strNum()), propMap),
    create(null)
);
// Supports classes like: .order-md-1, .order-lg-12
const breakpointOrder = BREAKPOINTS.reduce(
    (propMap, breakpoint) => ((propMap[suffixPropName(breakpoint, "order")] = strNum()), propMap),
    create(null)
);

// For loop doesn't need to check hasOwnProperty
// when using an object created from null
const breakpointPropMap = assign(create(null), {
    col: keys(breakpointCol),
    offset: keys(breakpointOffset),
    order: keys(breakpointOrder)
});

export const props = assign({}, breakpointCol, breakpointOffset, breakpointOrder, {
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
    cols: strNum(),
    // .offset-[1-12]
    offset: strNum(),
    // Flex ordering utility .order-[1-12]
    order: strNum()
});

/**
 * We need ".col" to default in when no other props are passed,
 * but always render when col=true.
 */
export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        const classList = [];
        // Loop through `col`, `offset`, `order` breakpoint props
        for (const type in breakpointPropMap) {
            // Returns colSm, offset, offsetSm, orderMd, etc.
            const keys = breakpointPropMap[type];
            for (let i = 0; i < keys.length; i++) {
                // Guard against falsy props like :col-sm="value"
                // which are breakpoint specific flex values.
                if (props[keys[i]]) {
                    // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
                    classList.push(computeBkPtClass(type, keys[i].replace(type, ""), props[keys[i]]));
                }
            }
        }

        classList.push({
            // Default to .col if no other classes generated nor `cols` specified.
            col: props.col || (classList.length === 0 && !props.cols),
            [`col-${props.cols}`]: props.cols,
            [`offset-${props.offset}`]: props.offset,
            [`order-${props.order}`]: props.order
        });

        return h(props.tag, mergeData(data, { class: classList }), children);
    }
};
