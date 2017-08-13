import { mergeData } from "../utils";

export const props = {
    header: {
        type: String,
        default: null
    },
    headerBordered: {
        type: Boolean,
        default: false
    },
    headerVariant: {
        type: String,
        default: null
    },
    headerTextVariant: {
        type: String,
        default: null
    },
    headerClass: {
        type: [String, Object, Array],
        default: null
    },
    headerTag: {
        type: String,
        default: "div"
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        const variantPrefix = props.headerBordered ? "border-" : "bg-";

        return h(
            props.headerTag,
            mergeData(data, {
                staticClass: "card-header",
                class: [
                    props.headerClass,
                    {
                        [variantPrefix + props.headerVariant]: Boolean(props.headerVariant),
                        [`text-${props.headerTextVariant}`]: Boolean(props.headerTextVariant)
                    }
                ]
            }),
            slots().default || [h("div", { domProps: { innerHTML: props.header } })]
        );
    }
};
