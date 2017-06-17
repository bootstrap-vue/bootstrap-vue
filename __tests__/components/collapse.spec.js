import {loadFixture, testVM, setData, nextTick} from '../helpers';

describe('collapse', async() => {
    beforeEach(loadFixture('collapse'));
    testVM();
    
    it('v-b-toggle examples should have aria-controls ID', async() => {
        const { app: { $refs, $el } } = window

        const collapse = [
            'collapse_mod',
            'collapse_arg',
            'collapse_open'
        ]

        collapse.forEach(col => {
            expect($refs[col + '_btn'].$el.getAttribute('aria-controls')).toBe($refs[col].id)
        })
    })

    it('multi example should have aria-controls with two IDs', async() => {
        const { app: { $refs, $el } } = window

        expect($refs.collapse_multi_btn.$el.getAttribute('aria-controls')).toContain($refs.collapse_multi_1.id)
        expect($refs.collapse_multi_btn.$el.getAttribute('aria-controls')).toContain($refs.collapse_multi_2.id)
    })

    it('v-b-toggle non open examples should have attribute aria-expanded="false"', async() => {
        const { app: { $refs, $el } } = window

        const buttons = [
            'collapse_mod_btn',
            'collapse_arg_btn',
            'collapse_multi_btn',
            'accordion_2_btn',
            'accordion_3_btn'
        ]

        buttons.forEach(btn => {
            expect($refs[btn].$el.getAttribute('aria-expanded')).toBe('false')
        })
    })

    it('v-b-toggle non open examples should have CSS "display:none"', async() => {
        const { app: { $refs, $el } } = window

        const collapse = [
            'collapse_mod',
            'collapse_arg',
            'collapse_multi_1',
            'collapse_multi_2',
            'accordion_2',
            'accordion_3'
        ]

        collapse.forEach(col => {
            expect($refs[col].$el.style.display).toBe('none')
        })
    })

    it('v-b-toggle open examples should have attribute aria-expanded="true"', async() => {
        const { app: { $refs, $el } } = window

        const buttons = [
            'collapse_open_btn',
            'accordion_1_btn'
        ]

        buttons.forEach(btn => {
            expect($refs[btn].$el.getAttribute('aria-expanded')).toBe('true')
        })
    })

    it('Initially open examples should not have CSS "display:none"', async() => {
        const { app: { $refs, $el } } = window

        const collapse = [
            'collapse_open',
            'collapse_vmod',
            'accordion_1'
        ]

        collapse.forEach(col => {
            expect($refs[col].$el.style.display).toBe('')
        })
    })

    it('Accorian example should have appropriate CSS "display"', async() => {
        const { app: { $refs, $el } } = window

        expect($refs.accordion_1.$el.style.display).toBe('')
        expect($refs.accordion_2.$el.style.display).toBe('none')
        expect($refs.accordion_3.$el.style.display).toBe('none')
    })

    it('v-model example should change state on data update', async() => {
        const { app: { $refs, $el } } = window

        const btn = $refs.collapse_vmod_btn
        const col = $refs.collapse_vmod

        expect(app.showCollapse).toBe(true)
        expect(col.$el.classList.contains('show')).toBe(true)
        expect(btn.$el.getAttribute('aria-expanded')).toBe('true')

        await setData(app, 'showCollapse', false);
        await nextTick()

        expect(app.showCollapse).toBe(false)
        await nextTick()

        expect(col.$el.classList.contains('show')).toBe(false)
        expect(btn.$el.getAttribute('aria-expanded')).toBe('false')
    })

    it('basic example should change visibility on click', async() => {
        const { app: { $refs, $el } } = window

        const btn = $refs.collapse_mod_btn
        const col = $refs.collapse_mod

        expect(col.$el.style.display).toBe('none')
        expect(btn.$el.getAttribute('aria-expanded')).toBe('false')

        btn.$el.click()
        await nextTick()
         
        expect(col.$el.style.display).toBe('')
        expect(btn.$el.getAttribute('aria-expanded')).toBe('true')
    })

    it('accordion example should change visibility on click', async() => {
        const { app: { $refs, $el } } = window

        const btn1 = $refs.accordion_1_btn
        const col1 = $refs.accordion_1
        const btn2 = $refs.accordion_2_btn
        const col2 = $refs.accordion_2
        const btn3 = $refs.accordion_3_btn
        const col3 = $refs.accordion_3

        expect(col1.$el.classList.contains('show')).toBe(true)
        expect(btn1.$el.getAttribute('aria-expanded')).toBe('true')
        expect(col2.$el.classList.contains('show')).toBe(false)
        expect(btn2.$el.getAttribute('aria-expanded')).toBe('false')
        expect(col3.$el.classList.contains('show')).toBe(false)
        expect(btn3.$el.getAttribute('aria-expanded')).toBe('false')

        btn2.$el.click();
        await nextTick()
        
        expect(col1.$el.classList.contains('show')).toBe(false)
        expect(btn1.$el.getAttribute('aria-expanded')).toBe('false')
        expect(col2.$el.classList.contains('show')).toBe(true)
        expect(btn2.$el.getAttribute('aria-expanded')).toBe('true')
        expect(col3.$el.classList.contains('show')).toBe(false)
        expect(btn3.$el.getAttribute('aria-expanded')).toBe('false')

        btn2.$el.click();
        await nextTick()
        
        expect(col1.$el.classList.contains('show')).toBe(false)
        expect(btn1.$el.getAttribute('aria-expanded')).toBe('false')
        expect(col2.$el.classList.contains('show')).toBe(false)
        expect(btn2.$el.getAttribute('aria-expanded')).toBe('false')
        expect(col3.$el.classList.contains('show')).toBe(false)
        expect(btn3.$el.getAttribute('aria-expanded')).toBe('false')
    })

});
