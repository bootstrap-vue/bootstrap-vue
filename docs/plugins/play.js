import Vue from 'vue'
import debounce from 'lodash/debounce'
import needsTranspiler from '../utils/needs-transpiler'
import hljs from '../utils/hljs'

// --- Constants ---

const RX_NAME = /<!-- (.*)\.vue -->/
const RX_NAME_DEFINITION = /<!-- .*\.vue -->/
const RX_TEMPLATE = /<template>([\s\S]*)<\/template>/
const RX_SCRIPT = /<script>([\s\S]*)<\/script>/

const CLASS_NAMES = {
  editable: 'editable',
  live: 'live',
  error: 'error'
}

// --- Helper functions ---

// Default "transpiler" function
let compiler = code => code

const match = (regex, text) => (regex.exec(text) || [])[1]
const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

const parseVueTemplate = text => {
  let template = match(RX_TEMPLATE, text)
  const script = match(RX_SCRIPT, text)
  const options = {}

  // It is plain code
  if (!template) {
    template = text
  }

  // Try to evaluate script
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
    const vt = parseVueTemplate(node.textContent)
    if (!vt) {
      return null
    }

    const { template, options } = vt

    // Create a placeholder after node container
    const container = node.parentNode
    const holder = document.createElement('div')
    container.parentNode.insertBefore(holder, container)

    // Create VM
    return new Vue({
      ...options,
      el: holder,
      template: `<div class="bd-example vue-example vue-example-${name}" translate="no">${template}</div>`,
      router: vnode.context.$router
    })
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

const processExamples = (el, binding, vnode) => {
  if (vnode.context.$options.beforeDestroy) {
    vnode.context.$options.beforeDestroy = []
      .concat(vnode.context.$options.beforeDestroy)
      .filter(h => h)
  } else {
    vnode.context.$options.beforeDestroy = []
  }

  // Get all code-snippets
  const pres = [...el.querySelectorAll('.bd-code pre')]

  // Iterate over them and parse
  pres.forEach(pre => {
    // Store example name globally
    const name = match(RX_NAME, pre.textContent)

    // Exit early when no name is given
    if (!name) {
      return
    }

    // Remove name definition
    const text = pre.textContent.replace(RX_NAME_DEFINITION, '').trim()
    pre.textContent = text

    // Highlight again
    hljs.highlightBlock(pre)

    // Add editable class
    pre.classList.add(CLASS_NAMES.editable)

    // Store "previous" content on pre element
    pre.$_v_play_content = pre.textContent.trim()

    // Initial load
    let vm = createVM(name, pre, vnode)

    // Ensure we destroy the VM when parent is destroyed
    vnode.context.$options.beforeDestroy.push(() => destroyVM(name, vm))

    // Enable live edit on double click
    pre.ondblclick = async () => {
      // Add live class
      pre.classList.add(CLASS_NAMES.live)
      // Make editable
      pre.contentEditable = true

      pre.onblur = () => {
        // Re-highlight
        hljs.highlightBlock(pre)
        // Store "previous" content on pre element
        pre.$_v_play_content = pre.textContent.trim()
      }

      pre.onkeyup = debounce(() => {
        const newContent = pre.textContent.trim()
        if (pre.$_v_play_content === newContent) {
          // Early exit if no changes to content
          return
        }

        // Store "previous" content on pre element
        pre.$_v_play_content = newContent

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
