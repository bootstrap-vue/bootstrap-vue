import { loadFixture, testVM } from "../helpers";

describe("carousel", async () => {
    beforeEach(loadFixture("carousel"));
    testVM();

    it("should load carousel component", async () => {
        const { app: { $refs: { carousel } } } = window;
        expect(carousel).toBeComponent("b-carousel");
    });

    it("should apply classes to root element", async () => {
        const { app: { $refs: { carousel } } } = window;
        expect(carousel).toHaveAllClasses(["carousel", "slide"]);
    });

    it("should contain carousel-inner", async () => {
        const { app: { $refs: { carousel } } } = window;
        const children = Array.from(carousel.$el.children);
        const inner = children.find(node => node.tagName === "DIV" && node.classList.contains("carousel-inner"));

        expect(inner).toBeDefined();
    });

    it("should contain controls", async () => {
        const { app: { $refs: { carousel } } } = window;
        const children = Array.from(carousel.$el.children);
        const controls = children.filter(node => node.tagName === "A");

        expect(controls).toHaveLength(2);

        const [prev, next] = controls;

        expect(prev).toBeDefined();
        expect(next).toBeDefined();

        expect(prev).toHaveClass("carousel-control-prev");
        expect(next).toHaveClass("carousel-control-next");
    });

    it("should contain <ol> with 3 slides", async () => {
        const { app: { $refs: { carousel } } } = window;
        const children = Array.from(carousel.$el.children);
        const ol = children.find(node => node.tagName === "OL");

        expect(ol).toBeDefined();
        expect(ol).toHaveClass("carousel-indicators");
        // Filter out potential text/comment nodes.
        const slides = Array.from(ol.children).filter(node => node.tagName === "LI");
        expect(slides).toHaveLength(3);
    });
});
