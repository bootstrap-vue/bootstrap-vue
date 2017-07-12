import { mergeData } from "../utils";

export const props = {
    tag: {
        type: String,
        default: "div"
    },
    contentTag: {
        type: String,
        default: "div"
    },
    captionTag: {
        type: String,
        default: "h3"
    },
    textTag: {
        type: String,
        default: "p"
    },
    img: {
        type: String
    },
    imgAlt: {
        type: String
    },
    contentVisibleUp: {
        type: String
    },
    caption: {
        type: String
    },
    text: {
        type: String
    },
    background: {
        type: String
    },
    height: {
        type: String
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        let childNodes = [];
        let contentChildren = [];

        if (props.img) {
            childNodes.push(
                h("img", {
                    staticClass: "d-block img-fluid",
                    attrs: {
                        src: props.img,
                        alt: props.imgAlt
                    }
                })
            );
        }

        if (props.caption) {
            contentChildren.push(h(props.captionTag, { domProps: { innerHTML: props.caption } }));
        }
        if (props.text) {
            contentChildren.push(h(props.textTag, { domProps: { innerHTML: props.text } }));
        }
        contentChildren.push(slots().default);

        childNodes.push(
            h(
                props.contentTag,
                {
                    class: {
                        "carousel-caption": Boolean(props.caption || slots().default),
                        "d-none": Boolean(props.contentVisibleUp),
                        [`d-${props.contentVisibleUp}-block`]: Boolean(props.contentVisibleUp)
                    }
                },
                contentChildren
            )
        );

        return h(
            props.tag,
            mergeData(data, {
                staticClass: "carousel-item",
                style: {
                    background: props.background,
                    height: props.height
                },
                attrs: {
                    role: "listitem"
                }
            }),
            childNodes
        );
    }
};
