<template>
  <div class="container">
    <div class="mb-3 row">
      <div class="col-12 mb-3">
        <p class="mb-1">
          Here you can interactively play and test components with a fresh vue instance.
          Please refer to the <router-link to="/docs">Docs</router-link>
          section for more info about available tags and usage.
        </p>
        <p class="mb-1">
          <strong>TIP:</strong>
          You can clone docs repo, to hack and develop components.
          changes will be reflected and hot-reloaded instantly.
        </p>
      </div>
      <div class="col-12">
        <div
          v-if="loading"
          class="alert alert-info show text-center"
        >
          <strong>Loading JavaScript Compiler...</strong>
        </div>
        <div
          v-else
          class="clearfix"
        >
          <form
            class="d-inline-block ml-2 mr-0 p-0 float-right"
            method="post"
            action="https://jsfiddle.net/api/post/library/pure/"
            target="_blank"
          >
            <input type="hidden" name="html" :value="fiddle_html">
            <input type="hidden" name="js" :value="fiddle_js">
            <input type="hidden" name="resources" :value="fiddle_dependencies">
            <input type="hidden" name="css" value="body { padding: 1rem; }">
            <input type="hidden" name="js_wrap" value="l">
            <b-btn size="sm" type="submit" :disabled="!isOk">Export to JSFiddle</b-btn>
          </form>
          <b-btn
            size="sm"
            variant="danger"
            :disabled="isDefault"
            @click="reset"
          >
            Reset to default
          </b-btn>
        </div>
      </div>
    </div>

    <transition-group
      class="row"
      tag="div"
      name="flip"
    >
      <div
        key="A"
        :class="full ? 'col-12' : 'col'"
      >
        <transition-group
          class="row"
          tag="div"
          name="flip"
        >
          <div
            key="A1"
            :class="`col-md-${vertical && !full ? 6 : 12} col-sm-12`"
          >
            <!--Template-->
            <div class="card mt-2">
              <div class="card-header card-outline-info">
                <span>Template</span>
                <b-btn
                  size="sm"
                  variant="outline-info"
                  class="float-right d-none d-md-inline-block"
                  @click="toggleFull"
                >
                  <span>{{ full ? 'Split' : 'Full' }}</span>
                </b-btn>
              </div>
              <codemirror
                v-model="html"
                mode="htmlmixed"
              />
            </div>
          </div>
          <div
            key="A2"
            :class="`col-md-${vertical && !full ? 6 : 12} col-sm-12`"
          >
            <!--JS-->
            <div class="card mt-2">
              <div class="card-header card-outline-warning">
                <span>JS</span>
                <b-btn
                  size="sm"
                  variant="outline-info"
                  class="float-right d-none d-md-inline-block"
                  @click="toggleFull"
                >
                  <span>{{ full ? 'Split' : 'Full' }}</span>
                </b-btn>
              </div>
              <codemirror
                v-model="js"
                mode="javascript"
              />
            </div>
          </div>
        </transition-group>
      </div>

      <div
        key="B"
        :class="`col-md-${vertical || full ? 12 : 6} col-sm-12`"
      >
        <!--Result-->
        <div class="card mt-2">
          <div class="card-header card-outline-success">
            <span>Result</span>
            <b-btn
              v-if="!full"
              size="sm"
              variant="outline-info"
              class="float-right d-none d-md-inline-block"
              @click="toggleVertical"
            >
              <span>{{ vertical ? 'Horizontal' : 'Vertical' }}</span>
            </b-btn>
          </div>
          <div
            ref="result"
            class="card-body"
          />
        </div>

        <!--Console-->
        <div class="card mt-2">
          <div class="card-header card-outline-secondary">
            <span>Console</span>
            <b-btn
              v-if="messages.length"
              size="sm"
              variant="outline-danger"
              class="float-right"
              @click="clear"
            >
              <span>Clear</span>
            </b-btn>
          </div>
          <transition-group
            tag="ul"
            name="flip-list"
            class="list-group list-group-flush play-log"
          >
            <li
              v-if="!messages.length"
              key="empty-console"
              class="list-group-item"
            >
              &nbsp;
            </li>
            <li
              v-for="(msg) in messages"
              :key="`console-${msg[2]}`"
              class="list-group-item py-2 d-flex"
            >
              <b-badge
                :variant="msg[0]"
                class="mr-1"
                style="font-size:90%;"
              >
                {{ msg[0] === 'danger' ? 'error' : msg[0] === 'warning' ? 'warn' : 'log' }}
              </b-badge>
              <div
                :class="[`text-${msg[0]}`, 'text-monospace', 'small']"
                style="white-space: pre-wrap;"
              >
                {{ msg[1] }}
              </div>
            </li>
          </transition-group>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.flip-move {
  transition: all 0.3s;
}
.play-log .list-group-item {
  transition: all 0.3s;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
}
.flip-list-leave-active {
  position: absolute;
}
.flip-list-move {
  transform: 0.3s;
}
</style>

<script>
import Vue from 'vue'
import debounce from 'lodash/debounce'
import needsTranspiler from '../utils/needs-transpiler'

const defaultJS = `{
  data () {
    return {
      name: 'BootstrapVue',
      show: true
    }
  },
  watch: {
    show (newVal, oldVal) {
      console.log('Alert is now ' + (this.show ? 'visible' : 'hidden'))
    }
  },
  methods: {
    toggle () {
      console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed () {
      console.log('Dismiss button clicked')
    }
  }
}`

const defaultHTML = `<div>
  <b-button @click="toggle" size="sm">
    {{ show ? 'Hide' : 'Show' }} Alert
  </b-button>
  <b-alert v-model="show"
           dismissible
           @dismissed="dismissed"
           class="mt-3">
    Hello {{ name }}!
  </b-alert>
</div>`

// Maximum age of localstorage before we revert back to defaults
// 7 days
const maxRetention = 7 * 24 * 60 * 60 * 1000

// Helper function to remove a node from it's parent's children
const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

export default {
  data() {
    return {
      html: '',
      js: '',
      isOk: false,
      messages: [],
      logIdx: 1, // used as the ":key" on console section for transition hooks
      vertical: false,
      full: false,
      loading: false
    }
  },
  head() {
    return {
      title: 'Playground - BootstrapVue'
    }
  },
  computed: {
    isDefault() {
      // Check if editors contain default JS and Template
      return this.js.trim() === defaultJS.trim() && this.html.trim() === defaultHTML.trim()
    },
    fiddle_dependencies() {
      return [
        '//unpkg.com/bootstrap/dist/css/bootstrap.min.css',
        '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css',
        '//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js',
        '//unpkg.com/vue@latest/dist/vue.min.js',
        '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js'
      ].join(',')
    },
    fiddle_js() {
      let js = this.js.trim() || '{}'
      const comma = js === '{}' ? '' : ','
      js = js.replace(/^\{/, `{\r\n  el: '#app'${comma}\r\n`)
      js = `new Vue(${js})`
      return `window.onload = function() {\r\n${js}\r\n}`
    },
    fiddle_html() {
      return `<div id='app'>\r\n${this.html.trim()}\r\n</div>`
    },
    fakeConsole() {
      const logger = this.log
      const clear = this.clear
      let oConsole, oInfo, oLog, oWarn, oError, oClear
      try {
        // Native console object & methods
        oConsole = window.console
        oInfo = window.console.info
        oLog = window.console.log
        oWarn = window.console.warn
        oError = window.console.error
        oClear = window.console.clear
      } catch (e) {}
      return {
        info: function() {
          try {
            logger('info', ...arguments)
            oInfo.apply(oConsole, arguments)
          } catch (e) {}
        },
        log: function() {
          try {
            logger('info', ...arguments)
            oLog.apply(oConsole, arguments)
          } catch (e) {}
        },
        warn: function() {
          try {
            logger('warning', ...arguments)
            oWarn.apply(oConsole, arguments)
          } catch (e) {}
        },
        error: function() {
          try {
            logger('danger', ...arguments)
            oError.apply(oConsole, arguments)
          } catch (e) {}
        },
        clear: function() {
          try {
            clear()
            oClear.apply(oConsole)
          } catch (e) {}
        }
      }
    }
  },
  created() {
    // Create some non reactive properties
    this.playVM = null
    this.contentUnWatch = null
    this.run = () => {}
    // Default code "transpiler"
    this.compiler = code => code
  },
  mounted() {
    this.$nextTick(() => {
      if (needsTranspiler) {
        // Start the loading indicator
        this.loading = true
        window && window.$nuxt && window.$nuxt.$loading.start()
        // Lazy load the babel transpiler
        import('../utils/compile-js' /* webpackChunkName: "compile-js" */).then(module => {
          // Update compiler reference
          this.compiler = module.default
          // Run the setup code
          this.doSetup()
          // Stop the loading indicator
          this.loading = false
          window && window.$nuxt && window.$nuxt.$loading.finish()
        })
      } else {
        this.doSetup()
      }
    })
  },
  beforeDestroy() {
    if (this.contentUnWatch) {
      this.contentUnWatch()
    }
    if (!this.$isServer) {
      this.destroyVM()
    }
  },
  methods: {
    doSetup() {
      // Create our debounced runner
      this.run = debounce(this._run, 500)
      // Set up our editor content watcher.
      this.contentUnWatch = this.$watch(
        () => this.js.trim() + '::' + this.html.trim(),
        (newVal, oldVal) => {
          this.run()
        }
      )
      // load our content into the editors
      this.$nextTick(this.load)
    },
    destroyVM() {
      let vm = this.playVM
      if (vm) {
        let parent
        try {
          parent = vm.$parent
          vm.$destroy()
          removeNode(vm.$el)
          vm.$el.innerHTML = ''
        } catch (err) {}
        try {
          parent.$destroy()
        } catch (err) {}
      }
      this.playVM = vm = null
      this.$refs.result.innerHTML = ''
    },
    createVM() {
      const playground = this
      const js = this.js.trim() || '{}'
      const html = this.html.trim()
      let options = {}

      // Disable the export to fiddle button
      this.isOk = false

      // Test and assign options JavaScript
      try {
        // Options are eval'ed in our variable scope, so we can override
        // the "global" console reference just for the user app
        const code = this.compiler(`;options = ${js};`)
        /* eslint-disable no-eval */
        eval(`console = this.fakeConsole; ${code}`)
        /* eslint-enable no-eval */
      } catch (err) {
        this.errHandler(err, 'javascript')
        window.console.error('Error in javascript', err)
        return
      }

      // Sanitize template possibilities
      if (!(html || typeof options.template === 'string' || typeof options.render === 'function')) {
        this.errHandler('No template or render function provided', 'template')
        return
      } else if (
        !html &&
        typeof options.template === 'string' &&
        options.template.charAt(0) === '#'
      ) {
        this.errHandler('Do not set template to an element ID', 'template')
        return
      }
      if (options.el) {
        this.errHandler('Do not set "el" property', 'javascript')
        return
      }
      if (options.render && typeof options.render !== 'function') {
        this.errHandler('render must be a function', 'javascript')
        return
      }
      if (!options.render) {
        options.template = `<div id="playground-app">${options.template || html}</div>`
      } else {
        delete options.template
      }

      // Vue's errorCapture doesn't always handle errors in methods, so we
      // wrap any methods with a try/catch handler so we can show the error in our GUI console
      // https://github.com/vuejs/vue/issues/8568
      // Doesn't handle errors in async methods
      if (options.methods) {
        Object.keys(options.methods).forEach(methodName => {
          const fn = options.methods[methodName]
          if (typeof fn !== 'function') {
            this.errorHandler(`TypeError: ${methodName} is not a function`, 'methods')
          } else {
            // Replace it with a wrapped method
            options.methods[methodName] = function() {
              try {
                return fn.apply(this, arguments)
              } catch (err) {
                playground.errHandler(err, `method "${methodName}"`)
              }
            }
          }
        })
      }

      // Try and buld the user app
      try {
        let holder = document.createElement('div')
        this.$refs.result.appendChild(holder)
        this.playVM = new Vue(
          Object.assign({}, options, {
            // set the app mountpoint
            el: holder,
            // Router needed for tooltips/popovers so they hide when docs route changes
            router: this.$router,
            // We set a fake parent so we can capture most runtime and render errors (error boundary)
            parent: new Vue({
              template: '<span />',
              errorCaptured(err, vm, info) {
                // pass error to playground error handler
                playground.errHandler(err, info)
                // dont propegate to parent/global error handler!
                return false
              }
            })
          })
        )
      } catch (err) {
        this.destroyVM()
        this.errHandler(err, 'app create')
        return
      }

      // We got this far, so save the JS/HTML changes to localStorage and enable export button
      this.isOk = true
      this.save()
    },
    errHandler(err, info) {
      this.log('danger', `Error in ${info}: ${String(err)}`)
      this.destroyVM()
    },
    _run() {
      if (this.$isServer) {
        return
      }
      // Destroy old VM if exists
      this.destroyVM()
      // clear the log
      this.clear()
      // create and render the instance
      this.createVM()
    },
    toggleVertical() {
      this.vertical = !this.vertical
    },
    toggleFull() {
      this.full = !this.full
    },
    log(tag, ...args) {
      // We have to ignore props mutation warning due to vue bug when we have two instances
      if (String(args[0]).indexOf('Avoid mutating a prop directly') !== -1) {
        return
      }
      const msg = args.map(String).join(' ')
      if (
        this.messages.length &&
        msg.indexOf('Error in render') !== -1 &&
        msg === this.messages[0][1]
      ) {
        // prevent duplicate render error messages
        return
      }
      if (this.messages.length > 10) {
        this.messages.splice(10)
      }
      this.messages.unshift([tag, msg, this.logIdx++])
    },
    clear() {
      this.logIdx = 1
      this.messages.splice(0)
    },
    reset() {
      // Needed to trick codemirror component to reload contents
      this.js = this.html = ''
      this.$nextTick(() => {
        this.js = defaultJS.trim()
        this.html = defaultHTML.trim()
        this.save()
      })
    },
    load() {
      const ls = window && window.localStorage
      if (!ls) {
        this.js = defaultJS.trim()
        this.html = defaultHTML.trim()
        return
      }
      const ts = parseInt(ls.getItem('playground_ts'), 10) || 0
      if (Date.now() - ts > maxRetention) {
        // clear local storage if it is old
        ls.removeItem('playground_js')
        ls.removeItem('playground_html')
        ls.removeItem('playground_ts')
      }
      this.js = ls.getItem('playground_js') || defaultJS.trim()
      this.html = ls.getItem('playground_html') || defaultHTML.trim()
    },
    save() {
      if (typeof window === 'undefined' || !window.localStorage) {
        return
      }
      try {
        window.localStorage.setItem('playground_js', this.js)
        window.localStorage.setItem('playground_html', this.html)
        window.localStorage.setItem('playground_ts', String(Date.now()))
      } catch (err) {
        // silently ignore errors on safari iOS private mode
      }
    }
  }
}
</script>
