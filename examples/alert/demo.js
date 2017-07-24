window.app = new Vue({
    el: "#app",
    data: {
        dismissCountDown: null,
        showDismissibleAlert: false,
        variants: ["success", "info", "warning", "danger"],
        dismiss_test_show: true
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = 5;
        }
    }
});
