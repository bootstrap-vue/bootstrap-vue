export default {
    mounted() {
        if (typeof document !== 'undefined') {
            document.documentElement.addEventListener('click', this._clickOutListener);
        }
    },
    destroyed() {
        if (typeof document !== 'undefined') {
            document.removeEventListener('click', this._clickOutListener);
        }
    },
    methods: {
        _clickOutListener(e) {
            if (!this.$el.contains(e.target)) {
                if (this.clickOutListener) {
                    this.clickOutListener();
                }
            }
        }
    }
};
