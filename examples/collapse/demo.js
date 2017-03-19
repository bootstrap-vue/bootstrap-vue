window.app = new Vue({
    el: '#app',
    methods: {
        clicked() {
            this.$root.$emit("collapse::toggle", "collapse1");
        }
    }
});
