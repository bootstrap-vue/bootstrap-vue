import {loadFixture, testVM} from '../helpers';

describe('image', async() => {
    beforeEach(loadFixture('img'));
    testVM();
    
    it("Should be rednered with an 'img' tag", async() => {
      const { app: { $refs, $el } } = window;
      const img = $refs.default;
      expect(img).toBeDefined();
      expect(img).toBeElement('img');
    });

    it("fluid shpould have class 'img-fluid'", async() => {
      const { app: { $refs, $el } } = window;
      const img = $refs.fluid;
      expect(img).toBeDefined();
      expect(img).toBeElement('img');
      expect(img).toHaveClass('img-fluid');
    });

    it("thumbnail should have class 'img-thumbnail'", async() => {
      const { app: { $refs, $el } } = window;
      const img = $refs.thumbnail;
      expect(img).toBeDefined();
      expect(img).toBeElement('img');
      expect(img).toHaveClass('img-thumbnail');
    });

    it("left should have class 'float-left'", async() => {
      const { app: { $refs, $el } } = window;
      const img = $refs.left;
      expect(img).toBeDefined();
      expect(img).toBeElement('img');
      expect(img).toHaveClass('float-left');
    });

    it("right should have class 'float-right'", async() => {
      const { app: { $refs, $el } } = window;
      const img = $refs.right;
      expect(img).toBeDefined();
      expect(img).toBeElement('img');
      expect(img).toHaveClass('float-right');
    });

    it("center should have classes 'mx-auto' and 'd-block'", async() => {
      const { app: { $refs, $el } } = window;
      const img = $refs.center;
      expect(img).toBeDefined();
      expect(img).toBeElement('img');
      expect(img).toHaveClass('mx-auto');
      expect(img).toHaveClass('d-block');
    });

});
