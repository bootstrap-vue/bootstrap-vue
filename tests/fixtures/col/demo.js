window.app = new Vue({
    el: "#app",
    data: {
        breakpoints: ["sm", "md", "lg", "xl"],
        sizes: Array.from({ length: 12 }).map((_, i) => i + 1)
    }
});
