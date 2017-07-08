import mergeData from "../utils/mergeData"
import { arrayIncludes } from "../utils/array"

function computeClasses(props) {
    return [props.vertical ? "btn-group-vertical" : null, props.size ? `btn-group-${props.size}` : null]
}

export default {
    functional: true,
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null,
            validator: size => arrayIncludes(["sm", "lg"], size)
        },
        tag: {
            type: String,
            default: "div"
        },
        ariaRole: {
            type: String,
            default: "group"
        }
    },
    render(h, { props, data, children }) {
        return h(
            props.tag,
            mergeData(data, {
                staticClass: "btn-group",
                class: computeClasses(props),
                attrs: { "aria-role": props.ariaRole }
            }),
            children
        )
    }
}
