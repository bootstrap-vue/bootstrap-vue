import { loadFixture, testVM, nextTick, setData } from "../helpers";

const variants = ["success", "info", "warning", "danger"].map(v => {
    return {
        variant: v,
        variantClass: `alert-${v}`,
        ref: `variant_${v}`
    };
});

describe("alert", async () => {
    beforeEach(loadFixture("alert"));
    testVM();

    it("should contain appropriate class names", async () => {
        const { app: { $refs } } = window;

        for (const { ref, variantClass } of variants) {
            // Use array notation due to v-for
            expect($refs[ref][0]).toHaveAllClasses(["alert", variantClass]);
        }
    });

    it("should render the dismiss button when passed the 'dismissible' attr", async () => {
        const { app: { $refs } } = window;
        const vm = $refs.dismissible_alert;
        expect(vm).toHaveClass("alert-dismissible");

        const closeBtn = vm.$el.querySelector("button.close");
        expect(closeBtn).not.toBeNull();
        expect(closeBtn).toBeElement("button");
        expect(closeBtn).toHaveClass("close");
    });

    it("should hide/show using the show prop", async () => {
        const { app: { $refs } } = window;
        const vm = $refs.show_test;

        // Default is hidden
        expect(vm.$el.textContent).not.toContain("Dismissible Alert!");

        // Make visible by changing visible state
        await setData(app, "showDismissibleAlert", true);
        expect(vm.$el.textContent).toContain("Dismissible Alert!");
    });

    it("should dismiss the alert when close button clicked and update v-model", async () => {
        const { app: { $refs } } = window;
        const vm = $refs.dismiss_test;
        // Initial state is open
        expect(app.dismiss_test_show).toBe(true);

        const closeBtn = vm.$el.querySelector("button.close");
        expect(closeBtn).not.toBeNull();

        closeBtn.click();
        await nextTick();

        expect(vm.$el.textContent).not.toContain("Success Alert");
        expect(app.dismiss_test_show).toBe(false);
    });
});
