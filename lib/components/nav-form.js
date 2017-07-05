import Form from "./form"
import mergeProps from "../utils/mergeProps"

export default {
    functional: true,
    props: {
        id: {
            type: String
        }
    },
    render(h, { props, data, children }) {
        return h(
            Form,
            mergeProps(data, {
                attrs: {
                    id: props.id || null
                },
                props: {
                    inline: true
                }
            }),
            children
        )
    }
}
