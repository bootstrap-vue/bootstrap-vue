import { mergeData } from "../utils";
import { assign } from "../utils/object";


export const props = {
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
    headerTag: {
        type: String,
        default: 'h1'
    },
    headerLevel: {
        type: Number,
        default: 3
    },
    lead: {
        type: String,
        default: null
    },
    leadTag: {
        type: String,
        default: 'p'
    },
    tag: {
        type: String,
        default: 'div'
    }
};

export default {
    functional: true,
    props,
    render(h, { props, data, slots }) {
        // The order of the conditionals matter.
        // We are building the component markup in order.
        let childNodes = [];

        // Header
        if (props.header || slots().header) {
            childNodes.push(h(
                props.headerTag,
                {
                    class: {
                        [`display-${props.hederLevel}`]: Boolean(props.headerLevel)
                    }
                },
                slots().header || props.header
            ));
        }

        // Lead
        if (props.lead || slots().lead) {
            childNodes.push(h(
                props.leadTag,
                { staticClass: 'lead' },
                slots().lead || props.lead
            ));
        }

        // Default slot
        if (slots().default) {
            childNodes.push(slots().default);
        }

        // IF fluid, wrap content in a container/container-fluid
        if (props.fluid) {
            // Children become a child of a container
            childNodes = [h(
                'div',
                {
                    class: {
                        'container': !props.containerFluid,
                        'container-fluid': props.containerFluid
                    }
                },
                childNodes
            )];
        }
        // Return the jumbotron
        return h(
            props.tag,
            mergeData(data, {
                staticClass: "jumbotron",
                class: {
                    'jumbotron-fluid': props.fluid
                }
            }),
            childNodes
        );
    }
};
