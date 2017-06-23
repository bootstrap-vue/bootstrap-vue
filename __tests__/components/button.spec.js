import { loadFixture, testVM } from '../helpers'
import { bLink } from '../../lib/components'
import Vue from 'vue/dist/vue.common';

/**
 * Button functionality to test:
 * - Style variants: [ 'primary','secondary','success','outline-success','warning','danger','link' ]
 * - Sizes: [ 'sm','','lg' ]
 * - Props: [ disabled, block ]
 * - elements: [ <button/>, <a/> ]
 */

const variants = ['primary', 'secondary', 'success', 'outline-success', 'warning', 'danger', 'link']
const sizes = ['sm', '', 'lg']
const btnRefs = variants.reduce((memo, variant) => [
    ...memo,
    ...sizes.map(size => {
        return {
            variant,
            size,
            ref: `btn${size ? `_${size}` : ''}_${variant.replace(/-/g, '_')}`
        }
    })
], [])

describe('button', async() => {
    beforeEach(loadFixture('button'))
    testVM()

    it('should contain class names', async() => {
        const { app: { $refs, $el } } = window

        btnRefs.forEach(({ ref, variant, size }) => {
            // ref will contain an array of children because of v-for
            const vm = $refs[ref][0]

            let classList = ['btn', `btn-${variant}`]
            if (size) classList.push(`btn-${size}`)

            expect(vm).toHaveAllClasses(classList)
        })

        const vmBlockDisabled = $refs.btn_block_disabled
        expect(vmBlockDisabled).toHaveAllClasses(['btn', 'btn-block', 'disabled'])
    })

    it('should use <b-link> when given href', async() => {
        const { app: { $refs, $el } } = window
        const btnChildNode = $refs.btn_href.$children[0]

        expect(btnChildNode).toBeInstanceOf(Vue)
        expect(btnChildNode).toBeComponent('b-link')
        expect(btnChildNode.href).toBe('https://github.com/bootstrap-vue/bootstrap-vue')
    })

    it('should emit "click" event when clicked', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.btn_click
        const spy = jest.fn();

        vm.$on('click', spy)
        vm.$el.click()

        expect(spy).toHaveBeenCalled()
    })

    it('should "click" event should emit with native event object', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.btn_click
        let event = null;

        vm.$on('click', e => event = e)
        vm.$el.click()

        expect(event).toBeInstanceOf(MouseEvent)
    })

    it('should be disabled and not emit click event with `disabled` prop true', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.btn_block_disabled
        const spy = jest.fn();

        vm.$on('click', spy)
        vm.$el.click()

        expect(vm.disabled).toBe(true)
        expect(vm.$el.disabled).toBe(true)
        expect(spy).not.toHaveBeenCalled()
    })
})
