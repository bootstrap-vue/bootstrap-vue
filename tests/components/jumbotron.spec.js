import {loadFixture, testVM} from '../helpers';

describe('jumbotron', async() => {
    beforeEach(loadFixture('jumbotron'));
    testVM();

    it("All examples should contain base class", async () => {
        const { app: { $refs } } = window;
        ['default','tags','level','slots','content','fluid','containerFluid'].forEach(ref => {
           expect($refs[ref]).toHaveClass("jumbotron");
        });
    });

    it("fluid and containerFluid should contain jumbotron-fluid  class", async () => {
        const { app: { $refs } } = window;
        ['fluid','containerFluid'].forEach(ref => {
           expect($refs[ref]).toHaveClass("jumbotron-fluid");
        });
    });

    it("All others should not contain jumbotron-fluid  class", async () => {
        const { app: { $refs } } = window;
        ['default','tags','level','slots','content'].forEach(ref => {
           expect($refs[ref]).not.toHaveClass("jumbotron-fluid");
        });
    });

    it("All examples except tags should have root elemwnt of type 'div'", async () => {
        const { app: { $refs } } = window;
        ['default','level','slots','content','fluid','containerFluid'].forEach(ref => {
           expect($refs[ref]).toBeElement("div");
        });
        expect($refs.tags).not.toBeElement("div");
    });

    it("default should have first child h1 with content and class 'display-3'", async () => {
        const { app: { $refs } } = window;
        const h1 = $refs.default.children[0];
        expect(h1).toBeDefined();
        expect(h1).toBeElement("h1");
        expect(h1).toHaveClas("display-3");
        expect(h1.textContent).toContain("header prop");
    });

    it("default should have second child with tag p with class lead and have content", async () => {
        const { app: { $refs } } = window;
        const p = $refs.default.children[1];
        expect(p).toBeDefined();
        expect(p).toBeElement("p");
        expect(p).toHaveClass("lead");
        expect(p.textContent).toContain("lead prop");
    });

    it("default should have third child with content", async () => {
        const { app: { $refs } } = window;
        const p = $refs.default.children[2];
        expect(p).toBeDefined();
        expect(p).toBeElement("p");
        expect(p.textContent).toContain("content");
    });

    it("slots should have first child h1 with content", async () => {
        const { app: { $refs } } = window;
        const h1 = $refs.slots.children[0];
        expect(h1).toBeDefined();
        expect(h1).toBeElement("h1");
        expect(h1.textContent).toContain("header slot");
    });

    it("slots should have second child with tag p with class lead and have content", async () => {
        const { app: { $refs } } = window;
        const p = $refs.slots.children[1];
        expectp).toBeDefined();
        expect(p).toBeElement("p");
        expect(p).toHaveClass("lead");
        expect(p.textContent).toContain("lead slot");
    });

    it("slots should have third child with content", async () => {
        const { app: { $refs } } = window;
        const p = $refs.slots.children[2];
        expect(p).toBeDefined();
        expect(p).toBeElement("p");
        expect(p.textContent).toContain("content");
    });

    it("level should have first child h1 with content and class 'display-4'", async () => {
        const { app: { $refs } } = window;
        const h1 = $refs.default.children[0];
        expect(h1).toBeDefined();
        expect(h1).toBeElement("h1");
        expect(h1).toHaveClas("display-4");
        expect(h1.textContent).toContain("header prop");
    });

    it("tags should have custom root tag of 'article'", async () => {
        const { app: { $refs } } = window;
        const root = $refs.tags.children
        expect(root).toBeDefined();
        expect(root).toBeElement("article");
    });

    it("tags should have custom header tag of 'h2' with content", async () => {
        const { app: { $refs } } = window;
        const h1 = $refs.tags.children[0]
        expect(h1).toBeDefined();
        expect(h1).toBeElement("h2");
        expect(h1.textContent).toContain("header prop");
    });

    it("tags should have custom lead tag of 'div' with content and class 'lead'", async () => {
        const { app: { $refs } } = window;
        const p = $refs.tags.children[1]
        expect(p).toBeDefined();
        expect(p).toBeElement("div");
        expect(p).toHaveClass("lead");
        expect(p).textContent).toContain("lead prop");
    });

    it("content should have one child with tag p and text 'content'", async () => {
        const { app: { $refs } } = window;
        const content = $refs.content;
        expect(content).toBeDefined();
        expect(content.children.length).toBe(1);
        expect(content.children[0]).toBeElement("p");
        expect(content.children[0].textContent).toContain("content");
    });

    it("fluid should have child with class 'container' and content", async () => {
        const { app: { $refs } } = window;
        const container = $refs.fluid.children[0];
        expect(container).toBeDefined();
        expect(container).toBeElement("div");
        expect(container).toHaveClass("container");
        expect(container.children.length).toBe(3);
        expect(container.children[0].textContent).toContain("header");
        expect(container.children[1].textContent).toContain("lead");
        expect(container.children[2].textContent).toContain("content");
    });

    it("containerFluid should have child with class 'container-fluid' and content", async () => {
        const { app: { $refs } } = window;
        const container = $refs.containerfluid.children[0];
        expect(container).toBeDefined();
        expect(container).toBeElement("div");
        expect(container).toHaveClass("container-fluid");
        expect(container.children.length).toBe(3);
        expect(container.children[0].textContent).toContain("header");
        expect(container.children[1].textContent).toContain("lead");
        expect(container.children[2].textContent).toContain("content");
    });

});
