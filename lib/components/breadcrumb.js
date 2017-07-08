import mergeData from "../utils/mergeData"

export default {
    functional: true,
    render(h, { data, children }) {
        return h("ol", mergeData(data, { staticClass: "breadcrumb" }), children)
    }
}
