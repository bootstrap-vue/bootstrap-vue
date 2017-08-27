import { mergeData } from "../utils";

export const props = {
    src: {
        type: String,
        default: null
    },
    alt: {
        type: String,
        default: null
    },
    width: {
        type: Number,
        default: null
    },
    height: {
        type: Number,
        default: null
    },
    blank: {
        type: Boolean,
        default: false
    },
    fluid: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: [Boolean, String],
        default: false
    },
    thumbnail: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    grow: {
        type: Boolean,
        default: false
    },
    left: {
        type: Boolean,
        default: false
    },
    right: {
        type: Boolean,
        default: false
    },
    center: {
        type: Boolean,
        default: false
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data }) {
        let src = props.src;
        let width = props.width;
        let height = props.height;
        let align = null;
        let block = props.block;
        if (props.blank) {
            if (!height && Boolean(width)) {
                height = width;
            } else if (!width && Boolean(height) {
                width = height;
            }
            if (!width && !height) {
                width = 1;
                height = 1;
            }
            // Make a blank SVG image
            src = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 ${width} ${height}'%2F%3E`;
        }
        if (props.left) {
            align = 'float-left';
        } else if (props.right) {
            align = 'float-right';
        } else if (props.center) {
            align = 'mx-auto';
            block = true;
        }
        return h(
            'img',
            mergeData(data, {
                attrs: {
                    'src': props.src,
                    'alt': props.alt
                    'width': width,
                    'height': height
                },
                class: {
                    'img-thubnail': props.thumbnail,
                    'img-fluid': props.fluid,
                    'rounded': props.rounded === '' || props.rounded === true,
                    [`rounded-${props.rounded}`]: typeof props.rounded === string && props.rounded !== '',
                    [align]: Boolean(align);
                    'd-block': block,
                    'w-100': props.grow
                }
            }),
            null
        );
    }
};
