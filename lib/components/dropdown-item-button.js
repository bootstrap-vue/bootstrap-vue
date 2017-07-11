import { mergeData } from "../utils"

export const props = {
    disabled: {
        type: Boolean,
        default: false
    }
}

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            "button",
            mergeData(data, {
                props,
                staticClass: "dropdown-item",
                attrs: { role: "menuitem", type: "button", disabled: props.disabled }
            }),
            children
        )
    }
}
