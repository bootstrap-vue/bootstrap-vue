export default {
    computed: {
        inputClass() {
            return [
                this.size ? `form-control-${this.size}` : null,
                this.state ? `form-control-${this.state}` : null
            ];
        }
    },
    props: {
        name: {
            type: String
        },
        id: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    }
};

