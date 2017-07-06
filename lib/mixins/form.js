export default {
    computed: {
        inputClass() {
            return [
                this.size ? `form-control-${this.size}` : null,
                this.state ? `form-control-${this.state}` : null
            ];
        },
        custom() {
            return !this.plain;
        }
    },
    props: {
        name: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        plain: {
            type: Boolean,
            default: false
        },
        state: {
            type: String
        },
        size: {
            type: String
        },
        id: {
            type: String
        }
    }
};

