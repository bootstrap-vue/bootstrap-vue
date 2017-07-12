import { mergeData } from "../utils";
import InputGroupAddon from "./input-group-addon";

export const props = {
    tag: {
        type: String,
        default: "div"
    },
    headerTag: {
        type: String,
        default: "h1"
    },
    leadTag: {
        type: String,
        default: "p"
    },
    fluid: {
        type: Boolean,
        default: false
    },
    containerFluid: {
        type: Boolean,
        default: false
    },
    header: {
        type: String,
        default: null
    },
    lead: {
        type: String,
        default: null
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        const componentData = {
            staticClass: "jumbotron",
            class: {
                "jumbotron-fluid": Boolean(props.fluid)
            }
        };

        let childNodes = [
            h("div", {
                class: [props.containerFluid ? "container-fluid" : "container"]
            })
        ];

        if (props.header) {
            childNodes.push(
                h(props.headerTag, {
                    staticClass: "display-3",
                    domProps: { innerHTML: props.header }
                })
            );
        }

        if (props.lead) {
            childNodes.push(
                h(props.leadTag, {
                    staticClass: "lead",
                    domProps: { innerHTML: props.lead }
                })
            );
        }

        childNodes.push(slots().default);

        return h(props.tag, mergeData(data, componentData), childNodes);
    }
};
