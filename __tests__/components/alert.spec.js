import {loadFixture, testVM, nextTick, setData} from '../helpers';
import Vue from 'vue/dist/vue.common';

describe('alert', async () => {
    beforeEach(loadFixture('alert'));
    testVM();

    it('check class names', async () => {
        const {app: {$refs, $el}} = window;

        expect($refs.default_alert).toHaveClass('alert alert-info');
        expect($refs.success_alert).toHaveClass('alert alert-success');
    });

    it('show prop', async () => {
        const {app: {$refs, $el}} = window;

        // Default is hidden
        expect($el.textContent).not.toContain('Dismissible Alert!');

        // Make visible by changing visible state
        await setData(app, 'showDismissibleAlert', true);
        expect($el.textContent).toContain('Dismissible Alert!');
    });

    it('dismiss button', async () => {
        const {app: {$refs, $el}} = window;
        const alert = $refs.success_alert;

        expect(alert).toHaveClass('alert-dismissible');

        const closeBtn = alert.$el.querySelector('.close');
        expect(closeBtn).not.toBeNull();
        closeBtn.click();
        await nextTick();
        expect($el.textContent).not.toContain('Success Alert');
    });
});