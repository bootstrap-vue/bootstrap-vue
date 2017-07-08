import Form from "./form"
import mergeData from "../utils/mergeData"

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
            mergeData(data, {
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
