/* istanbul ignore file */
import { readFileSync } from 'fs'
import { resolve } from 'path'
import BootstrapVue from '../src'

const VUE_VERSION = process.env.VUE_VERSION ? 'vue-' + process.env.VUE_VERSION : 'vue'

const Vue = require(`${VUE_VERSION}/dist/vue.common`)

// Hide development mode warning
Vue.config.productionTip = false
Vue.config.devtools = false

// Install Vue and BootstrapVue
window.Vue = Vue
Vue.use(BootstrapVue)

export function loadFixture(dirName, name) /* istanbul ignore next */ {
  const fixtureBase = resolve(dirName, 'fixtures')
  const template = readFileSync(resolve(fixtureBase, name + '.html'), 'UTF-8')
  const js = readFileSync(resolve(fixtureBase, name + '.js'), 'UTF-8')

  return async () => {
    // Mount template
    document.body.innerHTML = template

    // Eval js
    // eslint-disable-next-line no-eval
    eval(js)

    // Await for Vue render
    await Vue.nextTick()
  }
}

export async function testVM() {
  /* istanbul ignore next */
  it(`vm mounts`, async () => {
    return expect(window.app.$el).toBeDefined()
  })
}

export function nextTick() {
  /* istanbul ignore next */
  return new Promise((resolve, reject) => {
    Vue.nextTick(resolve)
  })
}

export async function setData(app, key, value) {
  /* istanbul ignore next */
  app[key] = value
  /* istanbul ignore next */
  await nextTick()
}

// Usage: await sleep(1000);
export function sleep(ms) {
  /* istanbul ignore next */
  ms = ms || 0
  /* istanbul ignore next */
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

const isVueInstance = vm => vm instanceof Vue
const isHTMLElement = el => el instanceof HTMLElement

const throwIfNotVueInstance = vm => {
  /* istanbul ignore next */
  if (!isVueInstance(vm)) {
    // debugging breadcrumbs in case a non-Vue instance gets erroneously passed
    // makes the error easier to fix than example: "Cannot read _prevClass of undefined"
    console.error(vm)
    throw new TypeError(`The matcher function expects Vue instance. Given ${typeof vm}`)
  }
}

const throwIfNotHTMLElement = el => {
  /* istanbul ignore next */
  if (!isHTMLElement(el)) {
    console.error(el)
    throw new TypeError(`The matcher function expects an HTML Element. Given ${typeof el}`)
  }
}

/* istanbul ignore next */
const throwIfNotArray = array => {
  if (!Array.isArray(array)) {
    throw new TypeError(`The matcher requires an array. Given ${typeof array}`)
  }
}

/* istanbul ignore next */
const vmHasClass = (vm, className) => {
  throwIfNotVueInstance(vm)
  return vm.$el._prevClass.indexOf(className) !== -1
}

/**
 * @param {HTMLElement} el
 * @param {string} className
 * @return {boolean}
 */
/* istanbul ignore next */
const elHasClass = (el, className) => {
  throwIfNotHTMLElement(el)
  return el.classList.contains(className)
}

/**
 * @param {Vue|HTMLElement} node
 * @param {string} className
 * @return {boolean}
 */
/* istanbul ignore next */
const hasClass = (node, className) =>
  isVueInstance(node) ? vmHasClass(node, className) : elHasClass(node, className)

/* istanbul ignore next */
const getVmTag = vm => vm.$options._componentTag
/* istanbul ignore next */
const getHTMLTag = el => String(el.tagName).toLowerCase()
/* istanbul ignore next */
const getTagName = node => (isVueInstance(node) ? getVmTag(node) : getHTMLTag(node))

// Extend Jest marchers
/* istanbul ignore next */
expect.extend({
  toHaveClass(node, className) {
    /* istanbul ignore next */
    return {
      message: () => `expected <${getTagName(node)}> to have class '${className}'`,
      pass: hasClass(node, className)
    }
  },
  toHaveAllClasses(node, classList) {
    throwIfNotArray(classList)

    let pass = true
    let missingClassNames = []

    classList.forEach(className => {
      /* istanbul ignore next */
      if (!hasClass(node, className)) {
        pass = false
        missingClassNames.push(className)
      }
    })

    const plural = missingClassNames.length > 1
    const classStr = classList.join(', ')
    const missingClassStr = missingClassNames.join(', ')
    const tagName = getTagName(node)

    /* istanbul ignore next */
    return {
      // more debugging breadcrumbs
      message: () =>
        `Expected <${tagName}> to have all classes in [${classStr}], but was missing [${missingClassStr}] class${
          plural ? 'es' : ''
        }.`,
      pass
    }
  },
  toBeComponent(vm, componentTag) {
    throwIfNotVueInstance(vm)
    /* istanbul ignore next */
    return {
      message: () => `Expected to be <${componentTag}>. Received: ${getVmTag(vm)}`,
      pass: getVmTag(vm) === componentTag
    }
  },
  toBeElement(el, tagName) {
    throwIfNotHTMLElement(el)
    /* istanbul ignore next */
    return {
      message: () =>
        `Expected to be <${String(tagName).toLowerCase()}>. Received: ${el.tagName.toLowerCase()}`,
      pass: el.tagName === String(tagName).toUpperCase()
    }
  }
})
