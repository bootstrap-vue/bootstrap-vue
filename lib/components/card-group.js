import { mergeData } from "../utils"

function computeClasses(props) {
    switch (true) {
        case props.columns:
            return "card-columns"
        case props.deck:
            return "card-deck"
        default:
            return "card-group"
    }
}

export default {
    functional: true,
    props: {
        tag: {
            type: String,
            default: "div"
        },
        deck: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Boolean,
            default: false
        }
    },
    render(h, { props, data, children }) {
        return h(props.tag, mergeData(data, { class: computeClasses(props) }), children)
    }
}
