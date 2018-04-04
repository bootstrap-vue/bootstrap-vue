import Vue from 'vue'
import debounce from 'lodash/debounce'

const VUE_REGEX = /<!-- (.*).vue -->/
const TEMPLATE_REGEX = /<template>([\s\S]*)<\/template>/
const SCRIPT_REGEX = /<script>([\s\S]*)<\/script>/

const match = (regex, text) => (regex.exec(text) || [])[1]

const loadVue = text => {
    let name = match(VUE_REGEX, text)
    let template = match(TEMPLATE_REGEX, text)
    let script = match(SCRIPT_REGEX, text)
    let options = {}
    if (script && script.includes('export default')) {
        eval(script.replace('export default', 'options = '))
    }
    return { name, template, script, options }
}

const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

Vue.directive('play', (el, binding, vnode, oldVnode) => {
    // Get all code-snippets
    const pres = Array.prototype.slice.apply(el.querySelectorAll('pre.hljs'))

    // Iterate over them and parse
    pres.forEach(pre => {
        // Add bd-clipboard class
        // Test if it is really vue template
        let l = loadVue(pre.textContent)
        if(!l.template && !l.name) {
            return
        }

        // Add live class
        pre.className += ' editable'

        // createVM function
        let vm = null

        const destroyVM = () => {
            // console.log('Destroy VM')
            if (vm) {
                vm.$destroy()
                removeNode(vm.$el)
                vm.$el.innerHTML = ""
            }
            if (name) {
                Array.prototype.slice.apply(document.querySelectorAll(`.vue-example-${name}`)).forEach(removeNode)
            }
        }

        if (!Array.isArray(vnode.context.$options['beforeDestroy'])) {
            vnode.context.$options['beforeDestroy'] = []
        }

        vnode.context.$options['beforeDestroy'].push(destroyVM)

        const createVM = () => {
            try {
                // Try to load vue template
                let { name, template, options } = loadVue(pre.textContent)
                if (!template) {
                    if(name) {
                        // It is plain code
                        template = pre.textContent
                    } else {
                        return
                    }
                }

                // Destroy old instance
                destroyVM()

                // Create a placeholder after pre
                let holder = document.createElement('div')
                pre.parentNode.insertBefore(holder, pre)

                // CreateVM
                vm = new Vue(Object.assign({}, options, {
                    template: `<div class='bd-example vue-example vue-example-${name}'>${template}</div>`,
                    router: vnode.context.$router,
                    el: holder
                }))
            } catch (e) {
                console.error('[v-play]', e)
            }
        }

        // Initial load
        createVM()

        // Enable live edit on double click
        pre.ondblclick = async () => {
            pre.className += ' live'
            // eslint-ignore-next-line
            const hljs = await import('highlightjs')
            pre.contentEditable = true
            pre.onblur = () => {
                hljs.highlightBlock(pre)
            }
            pre.onkeyup = debounce(() => {
                createVM()
            }, 250)
        }
    })
})
