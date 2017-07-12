import mergeData from "../utils/mergeData";

export const props = {
    tag: {
        type: String,
        default: "div"
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(props.tag, mergeData(data, { staticClass: "input-group-btn" }), children);
    }
};
