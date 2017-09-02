import { loadFixture, testVM } from "../helpers";

describe("embed", async () => {
  beforeEach(loadFixture("embed"));
  testVM();

  it("default should be rendered with outer tag 'div'", async () => {
    const { app: { $refs } } = window;
    expect($refs.default).toBeElement("div");
  });

  it("tag should be rendered with outer tag 'aside'", async () => {
    const { app: { $refs } } = window;
    expect($refs.tag).toBeElement("aside");
  });

  it("default should be rendered with inner tag 'iframe'", async () => {
    const { app: { $refs } } = window;
    expect($refs.default.children[0]).toBeElement("iframe");
  });
/*
  it("type should be rendered with inner tag 'video'", async () => {
    const { app: { $refs } } = window;
    const embed = $refs.type;
    expect(embed).toBeDefined();
    const inner = embed.children[0];
    expect(inner).toBeDefined();
    expect(inner).toBeElement("video");
  });

  it("all should be rendered with default outer class 'embed-responsive'", async () => {
    const { app: { $refs } } = window;
    ["default","tag","type","aspect","attributes","cildren"].forEach(ref => {
      const embed = $refs[ref];
      expect(embed).toBeDefined();
      expect(embed).toHaveClass("embed-responsive");
    });
  });

  it("all should be rendered with default inner class 'embed-responsive-item'", async () => {
    const { app: { $refs } } = window;
    ["default","tag","type","aspect","attributes","children"].forEach(ref => {
      const embed = $refs[ref];
      expect(embed).toBeDefined();
      const inner = embed.children[0];
      expect(inner).toBeDefined();
      expect(inner).toHaveClass("embed-responsive-item");
    });
  });
/*
  it("default should be rendered with outer class 'embed-responsive-16by9'", async () => {
    const { app: { $refs } } = window;
    const embed = $refs.default;
    expect(embed).toBeDefined();
    expect(embed).toHaveClass("embed-responsive-16by9");
  });

  it("aspect should be rendered with outer class 'embed-responsive-4by3'", async () => {
    const { app: { $refs } } = window;
    const embed = $refs.aspect;
    expect(embed).toBeDefined();
    expect(embed).toHaveClass("embed-responsive-4by3");
  });

  it("attributes should have attribute 'foo=bar' on inner tag", async () => {
    const { app: { $refs } } = window;
    const embed = $refs.attributes;
    expect(embed).toBeDefined();
    const inner = embed.children[0];
    expect(inner).toBeDefined();
    expect(inner.hasAttribute("foo")).toBe(true);
    expect(inner.getAttribute("foo")).toBe("bar");
  });

  it("attributes should have attribute 'baz' on inner tag", async () => {
    const { app: { $refs } } = window;
    const embed = $refs.attributes;
    expect(embed).toBeDefined();
    const inner = embed.children[0];
    expect(inner).toBeDefined();
    expect(inner.hasAttribute("baz")).toBe(true);
    expect(inner.getAttribute("baz")).toBe("");
  });
*/
});
