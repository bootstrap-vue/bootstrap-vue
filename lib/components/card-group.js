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

export const props = {
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
}

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(props.tag, mergeData(data, { class: computeClasses(props) }), children)
    }
}
