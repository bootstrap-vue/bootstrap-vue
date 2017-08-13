import { mergeData } from "../utils";
import { isArray } from "../utils/array";
import { assign } from "../utils/object";
import BreadcrumbItem from "./breadcrumb-item";

export const props = {
    items: {
        type: Array,
        default: null
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        let childNodes = children;
        // Build child nodes from items if given.
        if (isArray(props.items)) {
            let activeDefined = false;
            childNodes = props.items.map((item, idx) => {
                // Copy the value here so we can normalize it.
                let active = item.active;
                if (active) {
                    activeDefined = true;
                }
                if (!active && !activeDefined) {
                    active = idx + 1 === props.items.length;
                }

                return h(BreadcrumbItem, assign({}, item));
            });
        }

        return h("ol", mergeData(data, { staticClass: "breadcrumb" }), childNodes);
    }
};
