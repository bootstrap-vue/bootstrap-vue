import { mergeData } from "../utils"
import Link from "./link"

export default {
    functional: true,
    props: {
        text: {
            type: String,
            default: null
        },
        href: {
            type: String,
            default: null
        },
        ariaCurrent: {
            type: String,
            default: "location"
        },
        linkProps: {
            type: Object,
            default: () => Object.create(null)
        }
    },
    render(h, { props, data, children }) {
        const tag = props.active ? "span" : Link

        let componentData = {
            attrs: { href: props.href },
            props: props.linkProps,
            domProps: {
                innerHTML: props.text
            }
        }

        if (props.active) {
            Object.assign(componentData.attrs, { "aria-current": props.ariaCurrent })
        }

        return h(tag, mergeData(data, componentData), children)
    }
}
