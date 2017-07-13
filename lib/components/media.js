import { mergeData } from "../utils";
import MediaBody from "./media-body";
import MediaAside from "./media-aside";

export const props = {
    tag: {
        type: String,
        default: "div"
    },
    rightAlign: {
        type: Boolean,
        default: false
    },
    verticalAlign: {
        type: String,
        default: "top"
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        let childNodes = [];

        if (!props.rightAlign) {
            childNodes.push(h(MediaAside, { staticClass: "mr-3" }, slots().aside));
        }

        childNodes.push(h(MediaBody, slots().default));

        if (props.rightAlign) {
            childNodes.push(h(MediaAside, { staticClass: "ml-3" }, slots().aside));
        }

        return h(props.tag, mergeData(data, { staticClass: "media" }), childNodes);
    }
};
