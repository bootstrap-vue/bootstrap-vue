import { mergeData } from "../utils"

export const props = {
    // Header
    header: {
        type: String,
        default: null
    },
    headerVariant: {
        type: String,
        default: null
    },
    headerClass: {
        type: [String, Array],
        default: null
    },
    headerTag: {
        type: String,
        default: "div"
    }
}

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        return h(
            props.headerTag,
            mergeData(data, {
                staticClass: "card-header",
                class: [props.headerClass, { [`bg-${props.headerVariant}`]: props.headerVariant }]
            }),
            slots().default || [h("div", { domProps: { innerHTML: props.header } })]
        )
    }
}
