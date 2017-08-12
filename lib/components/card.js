import { mergeData, pluckProps } from "../utils";
import { assign } from "../utils/object";
import CardHeader, { props as headerProps } from "./card-header";
import CardFooter, { props as footerProps } from "./card-footer";

export const props = assign({}, headerProps, footerProps, {
    align: {
        type: String,
        default: null
    },
    bordered: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        default: null
    },
    textVariant: {
        type: String,
        default: null
    },
    tag: {
        type: String,
        default: "div"
    },
    // Main block
    title: {
        type: String,
        default: null
    },
    titleTag: {
        type: String,
        default: "h4"
    },
    subTitle: {
        type: String,
        default: null
    },
    subTitleTag: {
        type: String,
        default: "h6"
    },
    noBody: {
        type: Boolean,
        default: false
    },
    // Image
    img: {
        type: String,
        default: null
    },
    imgAlt: {
        type: String,
        default: null
    },
    overlay: {
        type: Boolean,
        default: false
    }
});

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        let childNodes = [],
            variantPrefix = props.bordered ? "border-" : "bg-";

        // The order of these conditionals matter.
        // We are building up the markup.
        if (slots().img) {
            childNodes.push(slots().img);
        } else if (props.img) {
            childNodes.push(h("img", { staticClass: "card-img", attrs: { src: props.img, alt: props.imgAlt } }));
        }

        if (props.header || slots().header) {
            childNodes.push(h(CardHeader, { props: pluckProps(headerProps, props) }, slots().header));
        }

        if (props.noBody) {
            childNodes.push(slots().default);
        } else {
            let mainBlockChildren = [];

            if (props.title) {
                mainBlockChildren.push(
                    h(props.titleTag, {
                        staticClass: "card-title",
                        domProps: { innerHTML: props.title }
                    })
                );
            }
            if (props.subTitle) {
                mainBlockChildren.push(
                    h(props.subTitleTag, {
                        staticClass: "card-subtitle mb-2 text-muted",
                        domProps: { innerHTML: props.subTitle }
                    })
                );
            }

            mainBlockChildren.push(slots().default);

            childNodes.push(
                h("div", { staticClass: "card-body", class: { "card-img-overlay": props.overlay } }, mainBlockChildren)
            );
        }

        if (props.footer || slots().footer) {
            childNodes.push(h(CardFooter, { props: pluckProps(footerProps, props) }, slots().footer));
        }

        return h(
            props.tag,
            mergeData(data, {
                staticClass: "card",
                class: {
                    [`card-${props.variant}`]: Boolean(props.variant),
                    [`text-${props.align}`]: Boolean(props.align),
                    [variantPrefix + props.variant]: Boolean(props.variant),
                    [`text-${props.textVariant}`]: Boolean(props.textVariant)
                }
            }),
            childNodes
        );
    }
};
