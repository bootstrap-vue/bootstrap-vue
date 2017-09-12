import { mergeData, memoize, suffixPropName } from "../utils";
import { keys, assign, create } from "../utils/object";
import { arrayIncludes } from "../utils/array";

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

export const computeBkPtClass = memoize(function computeBkPt(type, breakpoint, val) {
    let className = type;
    if (val === false || val === null || val === undefined) {
        return undefined;
    }
    if (breakpoint) {
        className += `-${breakpoint}`;
    }
    // Handling the boolean style prop when accepting [Boolean, String, Number]
    // means Vue will not convert <b-col sm /> to sm: true for us.
    // Since the default is false, an empty string indicates the prop's presence.
    if (type === "col" && (val === "" || val === true)) {
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
    order: strNum(),
    alignSelf: {
        type: String,
        default: null,
        validator: str => arrayIncludes(["auto", "start", "end", "center", "baseline", "stretch"], str)
    }
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
                // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
                const c = computeBkPtClass(type, keys[i].replace(type, ""), props[keys[i]]);
                // If a class is returned, push it onto the array.
                if (c) {
                    classList.push(c);
                }
            }
        }

        classList.push({
            // Default to .col if no other classes generated nor `cols` specified.
            col: props.col || (classList.length === 0 && !props.cols),
            [`col-${props.cols}`]: props.cols,
            [`offset-${props.offset}`]: props.offset,
            [`order-${props.order}`]: props.order,
            [`align-self-${props.alignSelf}`]: props.alignSelf
        });

        return h(props.tag, mergeData(data, { class: classList }), children);
    }
};
