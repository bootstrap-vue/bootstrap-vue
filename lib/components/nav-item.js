import { mergeData } from "../utils";
import { assign } from "../utils/object";
import Link, { props as linkProps } from "./link";

export const props = assign({}, linkProps);

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            "li",
            mergeData(data, {
                staticClass: "nav-item"
            }),
            [h(Link, { staticClass: "nav-link", props }, children)]
        );
    }
};
