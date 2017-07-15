export default {
    props: {
        name: {
            type: String
        },
        id: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        }
    }
};

