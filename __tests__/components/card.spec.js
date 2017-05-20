import { loadFixture, testVM } from '../helpers';

describe('card', async() => {
    beforeEach(loadFixture('card'));
    testVM();

    it('should contain class names', async() => {
        const { app: { $refs, $el } } = window;

        expect($refs.simple_card).toHaveClass('card card-success card-inverse');
        expect($refs.standard_card).toHaveClass('card');
        expect($refs.img_card).toHaveClass('card');
        expect($refs.img_overlay_card).toHaveClass('card card-inverse');
    });

    it('should contain text content', async() => {
        const { app: { $refs, $el } } = window;

        expect($refs.simple_card.$el.textContent).toContain('Simple Card')
        expect($refs.standard_card.$el.textContent.trim()).toContain('Last updated 3 mins ago')
        expect($refs.img_card.$el.textContent.trim()).toContain('This is my opinion :)')
        expect($refs.img_overlay_card.$el.textContent.trim()).toContain('Overlay cards are cute!')
    });

    it('all examples should contain card block', async() => {
        const { app: { $refs, $el } } = window;

        const refs = ['simple_card', 'standard_card', 'img_card', 'img_overlay_card']

        refs.forEach((ref) => {
            const childNodes = [...$refs[ref].$el.childNodes]
            const cardBlock = childNodes.find(el => el.classList && el.classList.contains(
                'card-block'))

            expect(cardBlock).toBeDefined()
        })
    });

    it('standard_card should display card header', async() => {
        const { app: { $refs, $el } } = window;

        const childNodes = [...$refs.standard_card.$el.childNodes]
        const headerEl = childNodes.find(el => el.classList && el.classList.contains('card-header'))
        const headerText = $refs.standard_card.header

        expect(headerEl).toBeDefined()
        expect(headerEl.textContent).toContain(headerText)
    });

    it('standard_card should display card footer', async() => {
        const { app: { $refs, $el } } = window;

        const childNodes = [...$refs.standard_card.$el.childNodes]
        const footerEl = childNodes.find(el => el.classList && el.classList.contains('card-footer'))
        const footerText = 'Last updated 3 mins ago'

        expect(footerEl).toBeDefined()
        expect(footerEl.textContent).toContain(footerText)
    });

    it('should contain <img> with matching src', async() => {
        const { app: { $refs, $el } } = window;

        const vmsWithImg = ['img_card', 'img_overlay_card']

        vmsWithImg.forEach((vmRef) => {
            const vm = $refs[vmRef]
            const src = vm.img
            const childNodes = [...vm.$el.childNodes]
            const imgEl = childNodes.find(el => el.tagName && el.tagName === 'IMG')

            expect(imgEl).toBeDefined()
            expect(imgEl.src).toEqual(src)
        })
    });
});
