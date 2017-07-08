import mergeData from "../utils/mergeData"

export default {
    functional: true,
    props: {},
    render(h, { data, children }) {
        return h("ol", mergeData(data, { staticClass: "breadcrumb" }), children)
    }
}
