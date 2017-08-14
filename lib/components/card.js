import { mergeData, pluckProps, prefixPropName, unPrefixPropName } from "../utils";
import { assign, keys, create } from "../utils/object";
import CardBody, { props as bodyProps } from "./card-body";
import CardHeader, { props as headerProps } from "./card-header";
import CardFooter, { props as footerProps } from "./card-footer";
import CardImg, { props as imgProps } from "./card-img";

const toCardImgPropName = prefixPropName.bind(null, "img");
const toImgPropName = unPrefixPropName.bind(null, "img");

const cardImgProps = keys(imgProps).reduce((props, key) => {
    // Namespace the img prop name to avoid collisions in card,
    // and add clarity for their purpose.
    const newKey = toCardImgPropName(key);
    // Copy the each prop object to a fresh instance.
    props[newKey] = assign(create(null), imgProps[key]);
    // No required props in card.
    if (props[newKey].required) {
        props[newKey].required = false;
    }
    return props;
}, create(null));

export const props = assign({}, bodyProps, headerProps, footerProps, cardImgProps, {
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
    noBody: {
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
            img = props.imgSrc ? h(CardImg, { props: pluckProps(cardImgProps, props, toImgPropName) }) : null;

        if (img) {
            // Above the header placement.
            if (props.imgTop || !props.imgBottom) {
                childNodes.push(img);
            }
        }
        if (props.header || slots().header) {
            childNodes.push(h(CardHeader, { props: pluckProps(headerProps, props) }, slots().header));
        }
        if (props.noBody) {
            childNodes.push(slots().default);
        } else {
            childNodes.push(h(CardBody, { props: pluckProps(bodyProps, props) }, slots().default));
        }
        if (props.footer || slots().footer) {
            childNodes.push(h(CardFooter, { props: pluckProps(footerProps, props) }, slots().footer));
        }
        if (img && props.imgBottom) {
            // Below the footer placement.
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
