export const props = {
    bodyTag: {
        type: String,
        default: "div"
    },
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
    overlay: {
        type: Boolean,
        default: false
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        let cardBodyChildren = [];
        if (props.title) {
            cardBodyChildren.push(
                h(props.titleTag, {
                    staticClass: "card-title",
                    domProps: { innerHTML: props.title }
                })
            );
        }
        if (props.subTitle) {
            cardBodyChildren.push(
                h(props.subTitleTag, {
                    staticClass: "card-subtitle mb-2 text-muted",
                    domProps: { innerHTML: props.subTitle }
                })
            );
        }
        cardBodyChildren.push(slots().default);

        return h(
            props.bodyTag,
            { staticClass: "card-body", class: { "card-img-overlay": props.overlay } },
            cardBodyChildren
        );
    }
};
