import Vue from 'vue'
import debounce from 'lodash/debounce'
import hljs from 'highlightjs'
import needsTranspiler from '../utils/needs-transpiler'

const NAME_REGEX = /<!-- (.*)\.vue -->/
const NAME_DEFINITION_REGEX = /<!-- .*\.vue -->/
const TEMPLATE_REGEX = /<template>([\s\S]*)<\/template>/
const SCRIPT_REGEX = /<script>([\s\S]*)<\/script>/

const CLASS_NAMES = {
  editable: 'editable',
  live: 'live',
  error: 'error'
}

// Default "transpiler" function
let compiler = code => code

const match = (regex, text) => (regex.exec(text) || [])[1]
const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

const parseVueTemplate = text => {
  let template = match(TEMPLATE_REGEX, text)
  let script = match(SCRIPT_REGEX, text)
  let options = {}

  // It is plain code
  if (!template) {
    template = text
  }

  // Try to evalue script
  if (script && script.includes('export default')) {
    try {
      const code = compiler(script.replace('export default', ';options = '))
      // eslint-disable-next-line no-eval
      eval(code)
    } catch (e) {
      return false
    }
  }

  return { template, script, options }
}

const createVM = (name, node, vnode) => {
  try {
    // Try to parse the vue template
    let vt = parseVueTemplate(node.textContent)
    if (!vt) {
      return null
    }

    let { template, options } = vt

    // Create a placeholder after node
    let holder = document.createElement('div')
    node.parentNode.insertBefore(holder, node)

    // Create VM
    return new Vue(
      Object.assign({}, options, {
        template: `<div class='bd-example vue-example vue-example-${name}'>${template}</div>`,
        router: vnode.context.$router,
        el: holder
      })
    )
  } catch (e) {
    console.error('[v-play]', e)
  }

  return null
}

const destroyVM = (name, vm) => {
  if (vm) {
    vm.$destroy()
    removeNode(vm.$el)
    vm.$el.innerHTML = ''
  }

  ;[...document.querySelectorAll(`.vue-example-${name}`)].forEach(removeNode)
}

const processExamples = (el, binding, vnode, oldVnode) => {
  if (vnode.context.$options['beforeDestroy']) {
    vnode.context.$options['beforeDestroy'] = []
      .concat(vnode.context.$options['beforeDestroy'])
      .filter(h => h)
  } else {
    vnode.context.$options['beforeDestroy'] = []
  }

  // Get all code-snippets
  const pres = [...el.querySelectorAll('pre.hljs')]

  // Iterate over them and parse
  pres.forEach(pre => {
    // Store example name globally
    const name = match(NAME_REGEX, pre.textContent)

    // Exit early when no name is given
    if (!name) {
      return
    }

    // Remove name defintion
    let text = pre.textContent.replace(NAME_DEFINITION_REGEX, '').trim()
    pre.textContent = text

    // Highlight again
    hljs.highlightBlock(pre)

    // Add editable class
    pre.classList.add(CLASS_NAMES.editable)

    // Initial load
    let vm = createVM(name, pre, vnode)

    // Ensure we destroy the VM when parent is destroued
    vnode.context.$options['beforeDestroy'].push(() => destroyVM(name, vm))

    // Enable live edit on double click
    pre.ondblclick = async () => {
      // Add live class
      pre.classList.add(CLASS_NAMES.live)
      // Make editable
      pre.contentEditable = true

      pre.onblur = () => {
        // Rehighlight
        hljs.highlightBlock(pre)
      }

      pre.onkeyup = debounce(() => {
        // Recreate VM
        destroyVM(name, vm)
        vm = createVM(name, pre, vnode)

        // Toggle error class
        if (vm === null) {
          pre.classList.add(CLASS_NAMES.error)
        } else {
          pre.classList.remove(CLASS_NAMES.error)
        }
      }, 500)
    }
  })
}

// Register our v-play directive
Vue.directive('play', (el, binding, vnode, oldVnode) => {
  vnode.context.$nextTick(() => {
    if (needsTranspiler) {
      window && window.$nuxt && window.$nuxt.$loading.start()
      import('../utils/compile-js').then(module => {
        // Save the compiler reference for template parser
        compiler = module.default
        // Convert examples to live/editable
        processExamples(el, binding, vnode, oldVnode)
        window && window.$nuxt && window.$nuxt.$loading.finish()
      })
    } else {
      // Convert examples to live/editable
      processExamples(el, binding, vnode, oldVnode)
    }
  })
})
