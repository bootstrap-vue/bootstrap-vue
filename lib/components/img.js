import { mergeData } from "../utils";

// Blank image with fill template
const IMG_TEMPLATE = '<svg width="%{w}" height="%{h}" '
                   + 'xmlns="http://www.w3.org/2000/svg" '
                   + 'viewBox="0 0 %{w} %{h}" preserveAspectRatio="none">'
                   + '<rect width="%{w}" height="%{w}" fill="%{f}"></rect>'
                   + `</svg>`;

function makeBlankImgSrc(width, height, color) {
    const src = encodeURIComponent(
        IMG_TEMPLATE
        .replace('%{w}', String(width))
        .replace('%{h}', String(height))
        .replace('%{f}', color)
    );
    return `data:image/svg+xml;charset=UTF-8,${src}`;
}

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
    fluid: {
        type: Boolean,
        default: false
    },
    rounded: {
        // rounded can be:
        //   'false': no rounding of corners
        //   'true': slightly rounded corners
        //   'top': top corners rounded
        //   'right': right corners rounded
        //   'bottom': bottom corners rounded
        //   'left': left corners rounded
        //   'circle': circle/oval
        //   '0': force rounding off
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
    },
    blank: {
        type: Boolean,
        default: false
    },
    blankColor: {
        type: String,
        default: 'transparent'
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
            } else if (!width && Boolean(height)) {
                width = height;
            }
            if (!width && !height) {
                width = 1;
                height = 1;
            }
            // Make a blank SVG image
            src = makeBlankImgSrc(width, height, props.blankColor || 'transparent');
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
                    'alt': props.alt,
                    'width': width || null,
                    'height': height || null
                },
                class: {
                    'img-thubnail': props.thumbnail,
                    'img-fluid': props.fluid,
                    'rounded': props.rounded === '' || props.rounded === true,
                    [`rounded-${props.rounded}`]: typeof props.rounded === string && props.rounded !== '',
                    [align]: Boolean(align),
                    'd-block': block
                }
            }),
            null
        );
    }
};
