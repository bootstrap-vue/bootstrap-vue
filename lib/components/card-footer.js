import { mergeData } from "../utils"

export const props = {
    // Footer
    footer: {
        type: String,
        default: null
    },
    footerVariant: {
        type: String,
        default: null
    },
    footerClass: {
        type: [String, Array],
        default: null
    },
    footerTag: {
        type: String,
        default: "div"
    }
}

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        return h(
            props.footerTag,
            mergeData(data, {
                staticClass: "card-footer",
                class: [props.footerClass, { [`bg-${props.footerVariant}`]: props.footerVariant }],
            }),
            slots().default || [h("div", { domProps: { innerHTML: props.footer } })]
        )
    }
}
