import mergeData from "../utils/mergeData";

export default {
    functional: true,
    props: {
        tag: {
            type: String,
            default: "div"
        }
    },
    render(h, { props, data, children }) {
        return h(props.tag, mergeData(data, { staticClass: "input-group-btn" }), children);
    }
};
