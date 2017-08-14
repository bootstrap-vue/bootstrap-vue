import { mergeData, pluckProps } from "../utils";
import { assign } from "../utils/object";
import CardHeader, { props as headerProps } from "./card-header";
import CardFooter, { props as footerProps } from "./card-footer";
import CardImg from "./card-img";

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
    // Main body
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
    imgTop: {
        type: Boolean,
        default: false
    },
    imgBottom: {
        type: Boolean,
        default: false
    },
    imgFluid: {
        type: Boolean,
        default: false
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
        // The order of the conditionals matter.
        // We are building the component markup in order.
        let childNodes = [],
            variantPrefix = props.bordered ? "border-" : "bg-",
            img = slots().img;

        if (!img && props.img) {
            img = h(CardImg, {
                props: { top: props.imgTop, bottom: props.imgBottom, imgFluid: props.imgFluid },
                attrs: { src: props.img, alt: props.imgAlt }
            });
        }

        if (img && (props.imgTop || !props.imgBottom)) {
            childNodes.push(img);
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

        if (img && props.imgBottom) {
            childNodes.push(img);
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
