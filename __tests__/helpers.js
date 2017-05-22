import {readFileSync} from 'fs';
import {resolve} from 'path';
import Vue from 'vue/dist/vue.common';
import BootstrapVue from '../lib';

const readFile = (path) => String(readFileSync(resolve(__dirname, '../examples', path)));

export function loadFixture(name) {
    const template = readFile(`${name}/demo.html`);
    const js = readFile(`${name}/demo.js`);

    return async () => {
        // Mount template
        document.body.innerHTML = template;

        // Install Vue and BootstrapVue
        window.Vue = Vue;
        Vue.use(BootstrapVue);

        // Eval js
        eval(js);

        // Await for Vue render
        await Vue.nextTick();
    };
}

export async function testVM() {
    it(`vm mounts`, async () => {
        return expect(window.app.$el).toBeDefined();
    });
}

export async function nextTick() {
    await Vue.nextTick();
}

export async function setData(app, key, value) {
    app[key] = value;
    await nextTick();
}

// Extend Jest marchers
expect.extend({
    toHaveClass(vnode, className) {
        return {
            message: `expected to have class '${className}'`,
            pass: vnode.$el._prevClass.indexOf(className) !== -1,
        };
    },
    toNotHaveClass(vnode, className) {
        return {
            message: `expected NOT to have class '${className}'`,
            pass: vnode.$el._prevClass.indexOf(className) === -1,
        };
    },
    isComponent(vnode, component) {
        return {
            message: `expected to be ${component}`,
            pass: vnode.$el.constructor.name === component
        };
    },
});
