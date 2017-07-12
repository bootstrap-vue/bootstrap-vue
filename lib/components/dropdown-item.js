import { mergeData } from "../utils";
import { assign } from "../utils/object";
import Link, { props as linkProps } from "./link";

export const props = assign({}, linkProps);

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            Link,
            mergeData(data, {
                props,
                staticClass: "dropdown-item",
                attrs: { role: "menuitem" }
            }),
            children
        );
    }
};
