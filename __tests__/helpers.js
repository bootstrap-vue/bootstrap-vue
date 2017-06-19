import { readFileSync } from 'fs';
import { resolve } from 'path';
import Vue from 'vue/dist/vue.common';
import BootstrapVue from '../lib';

const readFile = (path) => String(readFileSync(resolve(__dirname, '../examples', path)));
const throwIfNotVueInstance = vm => {
    if (!vm instanceof Vue) {
        // debugging breadcrumbs in case a non-Vue instance gets erroneously passed
        // makes the error easier to fix than example: "Cannot read _prevClass of undefined"
        throw new TypeError(`The matcher function expects Vue instance. Given ${typeof vm}`)
    }
}
const throwIfNotArray = array => {
    if (!Array.isArray(array)) {
        throw new TypeError(`The matcher requires an array. Given ${typeof array}`)
    }
}

export function loadFixture(name) {
    const template = readFile(`${name}/demo.html`);
    const js = readFile(`${name}/demo.js`);

    return async() => {
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
    it(`vm mounts`, async() => {
        return expect(window.app.$el).toBeDefined();
    });
}

export function nextTick() {
    return new Promise((resolve, reject) => {
        Vue.nextTick(resolve)
    });
}

export async function setData(app, key, value) {
    app[key] = value;
    await nextTick();
}

// Usage: await sleep(1000);
export function sleep(ms) {
    ms = ms || 0;
    return new Promise(r => setTimeout(r, ms));
}

// Extend Jest marchers
expect.extend({
    toHaveClass(vm, className) {
        throwIfNotVueInstance(vm)

        return {
            message: `expected <${vm.$options._componentTag}> to have class '${className}'`,
            pass: vm.$el._prevClass.indexOf(className) !== -1,
        };
    },
    toHaveAllClasses(vm, classList) {
        throwIfNotVueInstance(vm)
        throwIfNotArray(classList)

        let pass = true;
        let missingClassNames = []

        classList.forEach(className => {
            if (!vm.$el._prevClass.includes(className)) {
                pass = false
                missingClassNames.push(className)
            }
        })

        return {
            // more debugging breadcrumbs
            message: `Expected <${vm.$options._componentTag}> to have all classes in [ ${classList.join(', ')} ], but was missing [ ${missingClassNames.join(', ')} ] class${missingClassNames.length > 1 ? 'es' : ''}.`,
            pass
        }
    },
    toBeComponent(vm, componentTag) {
        throwIfNotVueInstance(vm)

        return {
            message: `expected to be <${componentTag}>`,
            pass: vm.$options._componentTag === componentTag
        };
    },
});
