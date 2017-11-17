import { loadFixture, testVM, nextTick, setData } from '../../../tests/utils';

describe('alert', async () => {
    jest.useFakeTimers();

    beforeEach(loadFixture(__dirname, 'alert'));
    testVM();

    it('check class names', async () => {
        const { app: { $refs, $el } } = window;

        expect($refs.default_alert).toHaveClass('alert alert-info');
        expect($refs.success_alert).toHaveClass('alert alert-success');
    });

    it('show prop', async () => {
        const { app: { $refs, $el } } = window;

        // Default is hidden
        expect($el.textContent).not.toContain('Dismissible Alert!');

        // Make visible by changing visible state
        await setData(app, 'showDismissibleAlert', true);
        expect($el.textContent).toContain('Dismissible Alert!');
    });

    it('dismiss button', async () => {
        const { app: { $refs, $el } } = window;
        const alert = $refs.success_alert;

        expect(alert).toHaveClass('alert-dismissible');

        const closeBtn = alert.$el.querySelector('.close');
        expect(closeBtn).not.toBeNull();
        closeBtn.click();
        await nextTick();
        expect($el.textContent).not.toContain('Success Alert');
    });

    it('emits dismiss-count-down event', async () => {
        const { app: { $refs, $el } } = window;
        const alert = $refs.counter_alert;
        const spy = jest.fn()

        // Default is hidden
        expect($el.textContent).not.toContain('This alert will dismiss after');

        // Make visible by changing visible state
        const dismissTime = 5;
        alert.$on('dismiss-count-down', spy);
        await setData(app, 'dismissCountDown', dismissTime);
        // await nextTick();
        expect(spy).not.toBeCalled();
        jest.runTimersToTime(1000);
        // Emits a dismiss-count-down` event
        expect(spy).toHaveBeenCalledWith(dismissTime - 1);
        // await nextTick();
        jest.runAllTimers();
        expect($el.textContent).toContain('This alert will dismiss after');
        expect(spy.mock.calls.length).toBe(dismissTime + 1);
    });
});
