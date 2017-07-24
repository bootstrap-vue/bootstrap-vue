import { loadFixture, testVM } from '../helpers'

describe('breadcrumb', async() => {
    beforeEach(loadFixture('breadcrumb'))
    testVM()

    it('should apply bootstrap breadcrumb classes', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.breadcrumb1
        const $ol = vm.$el

        expect($ol.classList.contains('breadcrumb')).toBe(true)

        Array.from($ol.children).forEach($li => {
            if ($li.tagName === 'LI') {
                expect($li.classList.contains('breadcrumb-item')).toBe(true)
            }
        })
    })

    it('should apply ARIA roles', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.breadcrumb1
        const $ol = vm.$el

        Array.from($ol.children).forEach($li => {
            if ($li.tagName === 'LI') {
                expect($li.getAttribute('role')).toBe('presentation')
            }
        })
    })

    it('should apply active class', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.breadcrumb2
        const $listItems = Array.from(vm.$el.children)

        app.items2.forEach((item, i) => {
            if (item.active) {
                expect($listItems[i].classList.contains('active')).toBe(true)
            }
        })
    })

    it('should apply aria-current to active class element', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.breadcrumb2
        const $listItems = Array.from(vm.$el.children)

        app.items2.forEach((item, i) => {
            if (item.active) {
                expect($listItems[i].firstElementChild.hasAttribute('aria-current')).toBe(true)
            } else {
                expect($listItems[i].firstElementChild.hasAttribute('aria-current')).toBe(false)
            }
        })
    })

    it('should default active class to last item only when no true active prop provided', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.breadcrumb1
        const $listItems = Array.from(vm.$el.children)
        const itemsLength = app.items.length

        app.items.forEach((item, i) => {
            const isLast = i === itemsLength - 1

            if (isLast) {
                expect($listItems[i].classList.contains('active')).toBe(true)
            } else {
                expect($listItems[i].classList.contains('active')).toBe(false)
            }
        })
    })

    it('should emit a click event with the item when clicked', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.breadcrumb2
        const spy = jest.fn();

        vm.$on('click', spy)
        const $listItems = Array.from(vm.$el.children)

        app.items2.forEach((item, index) => {
            $listItems[index].click()
            expect(spy).toHaveBeenCalledWith(item)
        })
    })
});
