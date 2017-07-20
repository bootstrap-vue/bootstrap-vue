import {loadFixture, testVM, setData, nextTick} from '../helpers';
import { bLink } from '../../lib/components'
import Vue from 'vue/dist/vue.common';

/**
 * Button functionality to test:
 * - Style variants: [ 'primary','secondary','success','outline-success','warning','danger','link' ]
 * - Sizes: [ 'sm','','lg' ]
 * - Props: [ disabled, block ]
 * - elements: [ <button/>, <a/> ]
 * - pressed state, toggling state
 */

const variants = ['primary', 'secondary', 'success', 'outline-success', 'warning', 'danger', 'link'];
const sizes = ['sm', '', 'lg'];
const btnRefs = variants.reduce((memo, variant) => [
    ...memo,
    ...sizes.map(size => {
        return {
            variant,
            size,
            ref: `btn${size ? `_${size}` : ''}_${variant.replace(/-/g, '_')}`
        }
    })
], []);

describe('button', async() => {
    beforeEach(loadFixture('button'));
    testVM();

    it('should contain class names', async() => {
        const {app: {$refs, $el}} = window;

        btnRefs.forEach(({ ref, variant, size }) => {
            // ref will contain an array of children because of v-for
            const vm = $refs[ref][0];

            let classList = ['btn', `btn-${variant}`];
            if (size) classList.push(`btn-${size}`);

            expect(vm).toHaveAllClasses(classList)
        });

        const vmBlockDisabled = $refs.btn_block_disabled;
        expect(vmBlockDisabled).toHaveAllClasses(['btn', 'btn-block', 'disabled'])
    });

    it('should use <b-link> when given href', async() => {
        const {app: {$refs, $el}} = window;
        const btnChildNode = $refs.btn_href.$children[0];

        expect(btnChildNode).toBeInstanceOf(Vue);
        expect(btnChildNode).toBeComponent('b-link');
        expect(btnChildNode.href).toBe('https://github.com/bootstrap-vue/bootstrap-vue')
    });

    it('should emit "click" event when clicked', async() => {
        const {app: {$refs, $el}} = window;
        const vm = $refs.btn_click;
        const spy = jest.fn();

        vm.$on('click', spy);
        vm.$el.click();

        expect(spy).toHaveBeenCalled()
    });

    it('"click" event should emit with native event object', async () => {
        const {app: {$refs, $el}} = window;
        const vm = $refs.btn_click;
        let event = null;

        vm.$on('click', e => event = e);
        vm.$el.click();

        expect(event).toBeInstanceOf(MouseEvent)
    });

    it('should be disabled and not emit click event with `disabled` prop true', async() => {
        const {app: {$refs, $el}} = window;
        const vm = $refs.btn_block_disabled;
        const spy = jest.fn();

        vm.$on('click', spy);
        vm.$el.click();

        expect(vm.disabled).toBe(true);
        expect(vm.$el.disabled).toBe(true);
        expect(spy).not.toHaveBeenCalled()
    });

    it('shoud not have `.active` class and `aria-pressed` when pressed is null', async () => {
        const {app: {$refs, $el}} = window;
        const vm = $refs.btn_pressed;

        await setData(app, 'btnToggle', null);
        await nextTick();

        expect(vm.pressed).toBeNull();
        expect(vm).not.toHaveClass('active');
        expect(vm.$el.getAttribute('aria-pressed')).toBeNull();
        vm.$el.click();
        expect(vm.pressed).toBeNull();
        expect(app.btnToggle).toBeNull();
    });

    it('shoud not have `.active` class and have `aria-pressed="false"` when pressed is false', async () => {
        const {app: {$refs, $el}} = window;
        const vm = $refs.btn_pressed;

        await setData(app, 'btnToggle', false);
        await nextTick();

        expect(vm.pressed).toBe(false);
        expect(vm).not.toHaveClass('active');
        expect(vm.$el.getAttribute('aria-pressed')).toBe('false');
    });

    it('shoud have `.active` class and have `aria-pressed="true"` when pressed is true', async () => {
        const {app: {$refs, $el}} = window;
        const vm = $refs.btn_pressed;

        await setData(app, 'btnToggle', true);
        await nextTick();

        vm.$el.click();

        expect(vm.pressed).toBe(true);
        expect(vm).toHaveClass('active');
        expect(vm.$el.getAttribute('aria-pressed')).toBe('true');
    });

    it('shoud emit `update:pressed` event on click and toggle pressed prop when pressed in not null', async () => {
        const {app: {$refs, $el}} = window;
        const vm = $refs.btn_pressed;
        const spy = jest.fn();

        await setData(app, 'btnToggle', false);
        await nextTick();
        vm.$on('update:pressed', spy);

        expect(vm.pressed).toBe(false);
        expect(vm).not.toHaveClass('active');
        expect(vm.$el.getAttribute('aria-pressed')).toBe('false');
        vm.$el.click();
        await nextTick();
        expect(vm).toHaveClass('active');
        expect(vm.$el.getAttribute('aria-pressed')).toBe('true');
        expect(vm.pressed).toBe(true);
        expect(spy).toHaveBeenCalled();
    })
});
