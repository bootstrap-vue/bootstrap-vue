import { mergeData } from "../utils";

export const props = {
    tag: {
        type: String,
        default: "div"
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data }) {
        return h(
            props.tag,
            mergeData(data, {
                staticClass: "dropdown-divider",
                attrs: { role: "separator" }
            })
        );
    }
};
