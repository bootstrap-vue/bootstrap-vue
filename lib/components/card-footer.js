import { mergeData } from "../utils";

export const props = {
    footer: {
        type: String,
        default: null
    },
    footerBordered: {
        type: Boolean,
        default: false
    },
    footerVariant: {
        type: String,
        default: null
    },
    footerTextVariant: {
        type: String,
        default: null
    },
    footerClass: {
        type: [String, Object, Array],
        default: null
    },
    footerTag: {
        type: String,
        default: "div"
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        const variantPrefix = props.footerBordered ? "border-" : "bg-";

        return h(
            props.footerTag,
            mergeData(data, {
                staticClass: "card-footer",
                class: [
                    props.footerClass,
                    {
                        [variantPrefix + props.footerVariant]: Boolean(props.footerVariant),
                        [`text-${props.footerTextVariant}`]: Boolean(props.footerTextVariant)
                    }
                ]
            }),
            slots().default || [h("div", { domProps: { innerHTML: props.footer } })]
        );
    }
};
