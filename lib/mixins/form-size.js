export default {
    props: {
        size: {
            type: String,
            default: null
        }
    },
    computed: {
        sizeClass() {
            return [
                this.size ? `form-control-${this.size}` : null
            ];
        }
    }
};
