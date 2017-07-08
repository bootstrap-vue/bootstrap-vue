import mergeData from "../utils/mergeData"
import { arrayIncludes } from "../utils"
import Link, { anchorProps, routerProps } from "./link"

function computeClasses(props) {
    return [
        props.variant ? `btn-${props.variant}` : `btn-secondary`,
        props.size ? `btn-${props.size}` : null,
        { "btn-block": props.block },
        { disabled: props.disabled }
    ]
}

export default {
    functional: true,
    props: {
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
            validator: size => arrayIncludes(["sm", "lg"], size)
        },
        variant: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "button"
        },
        href: {
            type: anchorProps.href.type
        },
        to: {
            type: routerProps.to.type
        },
        linkProps: {
            type: Object,
            default: () => Object.create(null)
        }
    },
    render(h, { props, data, children }) {
        const isLink = !!(Object.keys(props.linkProps).length > 0 || props.href || props.to)
        const componentData = {
            staticClass: "btn",
            class: computeClasses(props),
            props: Object.assign(
                {
                    href: props.href,
                    to: props.to,
                    disabled: props.disabled
                },
                props.linkProps
            ),
            attrs: {
                type: !isLink ? props.type : null
            },
            on: {
                click(e) {
                    if (props.disabled) {
                        e.stopPropagation()
                        e.preventDefault()
                    }
                }
            }
        }

        return h(isLink ? Link : "button", mergeData(data, componentData), children)
    }
}
