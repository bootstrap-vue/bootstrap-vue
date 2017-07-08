import { mergeData } from "../utils"
import { arrayIncludes } from "../utils/array"
import { assign } from "../utils/object"
import Link, { linkProps } from "./link"

function computeClasses(props) {
    return [
        props.variant ? `btn-${props.variant}` : `btn-secondary`,
        {
            [`btn-${props.size}`]: !!props.size,
            "btn-block": props.block,
            disabled: props.disabled
        }
    ]
}

const btnProps = {
    block: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: null,
        validator: size => arrayIncludes(["sm", "", "lg"], size)
    },
    variant: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: "button"
    }
}

export default {
    functional: true,
    props: assign({}, linkProps, btnProps, {
        href: {
            type: linkProps.href.type
        },
        to: {
            type: linkProps.to.type
        }
    }),
    render(h, { props, data, children }) {
        const isLink = !!(props.href || props.to)

        const componentData = {
            staticClass: "btn",
            class: computeClasses(props),
            props,
            attrs: {
                type: isLink ? null : props.type,
                disabled: isLink ? null : props.disabled
            },
            on: {
                click(e) {
                    if (props.disabled && e instanceof Event) {
                        e.stopPropagation()
                        e.preventDefault()
                    }
                }
            }
        }

        return h(isLink ? Link : "button", mergeData(data, componentData), children)
    }
}
