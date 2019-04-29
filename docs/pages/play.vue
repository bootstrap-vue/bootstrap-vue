<template>
  <b-container tag="main">
    <!-- Introduction -->
    <div class="bd-content mb-4">
      <h1><span class="bd-content-title">{{ title }}</span></h1>
      <p class="bd-lead">
        Here you can interactively play and test components with a fresh Vue.js instance. Please
        refer to the <b-link to="/docs">Docs</b-link> section for more information about
        available components and usage.
      </p>
    </div>

    <!-- Actions -->
    <b-row>
      <b-col class="mb-2 mb-md-0">
        <!-- Loading indicator -->
        <b-alert
          v-if="loading"
          variant="info"
          class="text-center"
          show
        >
          Loading JavaScript compiler...
        </b-alert>

        <!-- Reset action -->
        <b-btn
          v-else
          size="sm"
          variant="danger"
          :disabled="isDefault"
          @click="reset"
        >
          Reset to default
        </b-btn>
      </b-col>

      <!-- Export actions -->
      <b-col
        v-if="!loading"
        md="auto"
        class="mt-2 mt-md-0"
      >
        <b class="d-block d-sm-inline-block mr-sm-2 mb-1 mb-sm-0">Export to</b>

        <!-- Export to CodePen -->
        <b-form
          class="d-inline-block mr-1"
          method="post"
          action="https://codepen.io/pen/define"
          target="_blank"
        >
          <input type="hidden" name="data" :value="codepenData">
          <b-btn size="sm" type="submit" :disabled="!isOk">CodePen</b-btn>
        </b-form>

        <!-- Export to CodeSandbox -->
        <b-form
          class="d-inline-block mr-1"
          method="post"
          action="https://codesandbox.io/api/v1/sandboxes/define"
          target="_blank"
        >
          <input type="hidden" name="parameters" :value="codesandboxData">
          <b-btn size="sm" type="submit" :disabled="!isOk">CodeSandbox</b-btn>
        </b-form>

        <!-- Export to JSFiddle -->
        <b-form
          class="d-inline-block"
          method="post"
          action="https://jsfiddle.net/api/post/library/pure/"
          target="_blank"
        >
          <input type="hidden" name="html" :value="exportData.extendedHtml">
          <input type="hidden" name="js" :value="exportData.extendedJs">
          <input type="hidden" name="resources" :value="[...exportData.externalCss, exportData.externalJs].join(',')">
          <input type="hidden" name="css" :value="exportData.css">
          <input type="hidden" name="js_wrap" value="l">
          <b-btn size="sm" type="submit" :disabled="!isOk">JSFiddle</b-btn>
        </b-form>
      </b-col>
    </b-row>

    <!-- Editors -->
    <transition-group
      v-if="!loading"
      tag="div"
      class="row"
      name="flip"
    >
      <!-- Left/Top column -->
      <b-col key="A" :cols="full ? 12 : null">
        <transition-group tag="div" class="row" name="flip">
          <!-- Template column -->
          <b-col
            key="A1"
            :md="vertical && !full ? 6 : 12"
            sm="12"
            class="mt-3"
          >
            <!-- Template -->
            <b-card no-body>
              <div
                slot="header"
                class="d-flex justify-content-between align-items-center"
              >
                <span>Template</span>
                <b-btn
                  size="sm"
                  variant="outline-info"
                  class="d-none d-md-inline-block"
                  @click="toggleFull"
                >
                  <span>{{ full ? 'Split' : 'Full' }}</span>
                </b-btn>
              </div>

              <codemirror v-model="html" mode="htmlmixed"></codemirror>
            </b-card>
          </b-col>

          <!-- JavaScript column -->
          <b-col
            key="A2"
            :md="vertical && !full ? 6 : 12"
            sm="12"
            class="mt-3"
          >
            <!-- JavaScript -->
            <b-card no-body>
              <div
                slot="header"
                class="d-flex justify-content-between align-items-center"
              >
                <span>JS</span>
                <b-btn
                  size="sm"
                  variant="outline-info"
                  class="d-none d-md-inline-block"
                  @click="toggleFull"
                >
                  <span>{{ full ? 'Split' : 'Full' }}</span>
                </b-btn>
              </div>

              <codemirror v-model="js" mode="javascript"></codemirror>
            </b-card>
          </b-col>
        </transition-group>
      </b-col>

      <!-- Right/bottom column -->
      <b-col key="B" :md="vertical || full ? 12 : 6" sm="12">
        <b-row>
          <!-- Result column -->
          <b-col cols="12" class="mt-3">
            <!-- Result -->
            <b-card>
              <div
                slot="header"
                class="d-flex justify-content-between align-items-center"
              >
                <span>Result</span>
                <b-btn
                  v-if="!full"
                  size="sm"
                  variant="outline-info"
                  class="d-none d-md-inline-block"
                  @click="toggleVertical"
                >
                  <span>{{ vertical ? 'Horizontal' : 'Vertical' }}</span>
                </b-btn>
              </div>

              <div ref="result"></div>
            </b-card>
          </b-col>

          <!-- Console column -->
          <b-col cols="12" class="mt-3">
            <!-- Console -->
            <b-card no-body>
              <div slot="header" class="d-flex justify-content-between align-items-center">
                <span>Console</span>
                <b-btn
                  v-if="messages.length"
                  size="sm"
                  variant="outline-danger"
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
                <b-list-group-item v-if="!messages.length" key="empty-console">
                  &nbsp;
                </b-list-group-item>
                <b-list-group-item
                  v-for="msg in messages"
                  :key="`console-${msg[2]}`"
                  class="py-2 d-flex"
                >
                  <b-badge :variant="msg[0]" class="mr-1" style="font-size:90%;">
                    {{ msg[0] === 'danger' ? 'error' : msg[0] === 'warning' ? 'warn' : 'log' }}
                  </b-badge>
                  <span
                    :class="[`text-${msg[0]}`, 'text-monospace', 'small', 'd-block']"
                    style="white-space: pre-wrap;"
                  >{{ msg[1] }}</span>
                </b-list-group-item>
              </transition-group>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </transition-group>
  </b-container>
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
import { getParameters as getCodeSandboxParameters } from 'codesandbox/lib/api/define'
import needsTranspiler from '~/utils/needs-transpiler'
import { version as bootstrapVueVersion, bootstrapVersion, vueVersion } from '~/content'

// --- Constants ---

const DEFAULT_HTML = `<div>
  <b-button size="sm" @click="toggle">
    {{ show ? 'Hide' : 'Show' }} Alert
  </b-button>
  <b-alert
    v-model="show"
    class="mt-3"
    dismissible
    @dismissed="dismissed"
  >
    Hello {{ name }}!
  </b-alert>
</div>`

const DEFAULT_JS = `{
  data() {
    return {
      name: 'BootstrapVue',
      show: true
    }
  },
  watch: {
    show(newVal) {
      console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
    }
  },
  methods: {
    toggle() {
      console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed() {
      console.log('Dismiss button clicked')
    }
  }
}`

const storage = typeof window !== 'undefined' ? window.localStorage || null : null
const STORAGE_KEY_PREFIX = 'BV_playground'
const STORAGE_KEYS = {
  html: `${STORAGE_KEY_PREFIX}_html`,
  js: `${STORAGE_KEY_PREFIX}_js`,
  layout: `${STORAGE_KEY_PREFIX}_layout`,
  timestamp: `${STORAGE_KEY_PREFIX}_ts`
}

// Maximum age of localStorage before we revert back to defaults
const STORAGE_MAX_RETENTION = 7 * 24 * 60 * 60 * 1000 // 7 days

// --- Helper functions ---

// Remove a node from it's parent's children
const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

// Indent a value by the given count
const indent = (value, count = 2, { indent } = { indent: ' ' }) => {
  if (count === 0) {
    return value
  }
  return value.replace(/^(?!\s*$)/gm, indent.repeat(count))
}

export default {
  data() {
    return {
      html: '',
      js: '',
      logIdx: 1, // Used as the ":key" on console section for transition hooks
      messages: [],
      isOk: false,
      vertical: false,
      full: false,
      loading: false
    }
  },
  head() {
    const title = `${this.title} | BootstrapVue`
    const description = 'Interactively play and test BootstrapVue components online.'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    }
  },
  computed: {
    title() {
      return 'Online Playground'
    },
    isDefault() {
      // Check if editors contain default JS and Template
      return this.js.trim() === DEFAULT_JS.trim() && this.html.trim() === DEFAULT_HTML.trim()
    },
    layout() {
      return this.full ? 'full' : this.vertical ? 'vertical' : 'horizontal'
    },
    exportData() {
      const html = this.html.trim()
      const js = this.js.trim() || '{}'

      let extendedJs = js === '{}' ? "{ el: '#app' }" : js.replace(/^\{/, "{\r\n  el: '#app',")
      extendedJs = `new Vue(${extendedJs})`
      extendedJs = `window.onload = () => {\r\n${indent(extendedJs, 2)}\r\n}`

      return {
        html,
        js,
        css: 'body { padding: 1rem; }',
        extendedHtml: `<div id="app">\r\n${indent(html, 2)}\r\n</div>`,
        extendedJs,
        externalCss: [
          `//unpkg.com/bootstrap@${bootstrapVersion}/dist/css/bootstrap.min.css`,
          `//unpkg.com/bootstrap-vue@${bootstrapVueVersion}/dist/bootstrap-vue.css`
        ],
        externalJs: [
          '//unpkg.com/babel-polyfill/dist/polyfill.min.js',
          `//unpkg.com/vue@${vueVersion}/dist/vue.min.js`,
          `//unpkg.com/bootstrap-vue@${bootstrapVueVersion}/dist/bootstrap-vue.js`
        ]
      }
    },
    codepenData() {
      const { css, extendedHtml, extendedJs, externalCss, externalJs } = this.exportData
      const data = {
        editors: '101',
        layout: 'left', // left, right, top
        html_pre_processor: 'none',
        css_pre_processor: 'none',
        css_prefix: 'autoprefixer',
        js_pre_processor: 'babel',
        head: '<meta name="viewport" content="width=device-width">',
        css_external: externalCss.join(';'),
        js_external: externalJs.join(';'),
        html: extendedHtml,
        js: extendedJs,
        css
      }
      return JSON.stringify(data)
    },
    codesandboxData() {
      const { html, js, css } = this.exportData
      const vueContent = [
        '<template>',
        indent(html, 2),
        '</template>',
        '',
        '<style>',
        indent(css, 2),
        '</style>',
        '',
        '<script>',
        indent(`export default ${js}`, 2),
        // prettier-ignore
        '<\/script>' // eslint-disable-line
      ]
        .join('\r\n')
        .replace(/\\\//g, '/')
      const htmlContent = '<div id="app"></div>'
      const jsContent = [
        "import Vue from 'vue'",
        "import BootstrapVue from 'bootstrap-vue'",
        "import App from './App'",
        '',
        "import 'bootstrap/dist/css/bootstrap.css'",
        "import 'bootstrap-vue/dist/bootstrap-vue.css'",
        '',
        'Vue.use(BootstrapVue)',
        '',
        "new Vue({ el: '#app', render: h => h(App) })"
      ].join('\r\n')
      const dependencies = {
        bootstrap: bootstrapVersion,
        'bootstrap-vue': bootstrapVueVersion,
        vue: vueVersion
      }
      return getCodeSandboxParameters({
        files: {
          'App.vue': { content: vueContent },
          'index.html': { content: htmlContent },
          'index.js': { content: jsContent },
          'package.json': { content: { dependencies } }
        }
      })
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
  watch: {
    layout(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.saveToStorage()
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
      // Set up our editor content watcher
      this.contentUnWatch = this.$watch(
        () => `${this.js.trim()}::${this.html.trim()}`,
        (newVal, oldVal) => {
          this.run()
        }
      )
      // Load our content into the editors
      this.$nextTick(this.loadFromStorage)
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

      // Disable the export buttons
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

      // Vue's errorCapture doesn't always handle errors in methods,
      // so we wrap any methods with a try/catch handler so we can
      // show the error in our GUI console
      // Doesn't handle errors in async methods
      // See: https://github.com/vuejs/vue/issues/8568
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
        this.playVM = new Vue({
          ...options,
          el: holder,
          // Router needed for tooltips/popovers so they hide when
          // docs route changes
          router: this.$router,
          // We set a fake parent so we can capture most runtime and
          // render errors (error boundary)
          parent: new Vue({
            template: '<span></span>',
            errorCaptured(err, vm, info) {
              // Pass error to playground error handler
              playground.errHandler(err, info)
              // Don't propegate to parent/global error handler!
              return false
            }
          })
        })
      } catch (err) {
        this.destroyVM()
        this.errHandler(err, 'app create')
        return
      }

      // We got this far, so save the JS/HTML changes to
      // localStorage and enable export buttons
      this.isOk = true
      this.saveToStorage()
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
      // We have to ignore props mutation warning due to a
      // Vue.js bug when we have two instances
      if (String(args[0]).indexOf('Avoid mutating a prop directly') !== -1) {
        return
      }
      const msg = args.map(String).join(' ')
      if (
        this.messages.length &&
        msg.indexOf('Error in render') !== -1 &&
        msg === this.messages[0][1]
      ) {
        // Prevent duplicate render error messages
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
      this.$bvModal
        .msgBoxConfirm(
          'Are you sure that you want to reset to the playground to the default values?',
          {
            title: 'Please Confirm Reset',
            size: 'sm',
            buttonSize: 'sm',
            okTitle: 'YES',
            cancelTitle: 'NO',
            titleTag: 'h6',
            headerClass: 'p-2',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value) {
            this.doReset()
          }
        })
        .catch(err => {
          // An error occurred
          console.log(err)
        })
    },
    doReset() {
      // Needed to trick codemirror component to reload contents
      this.js = this.html = ''
      this.$nextTick(() => {
        this.js = DEFAULT_JS.trim()
        this.html = DEFAULT_HTML.trim()
        this.saveToStorage()
      })
    },
    clearStorage() {
      if (!storage) {
        return
      }
      Object.keys(STORAGE_KEYS).forEach(key => {
        storage.removeItem(key)
      })
    },
    loadFromStorage() {
      if (!storage) {
        this.js = DEFAULT_JS.trim()
        this.html = DEFAULT_HTML.trim()
        return
      }
      const timestamp = parseInt(storage.getItem(STORAGE_KEYS.timestamp), 10) || 0
      if (Date.now() - timestamp > STORAGE_MAX_RETENTION) {
        this.clearStorage()
      }
      this.html = storage.getItem(STORAGE_KEYS.html) || DEFAULT_HTML.trim()
      this.js = storage.getItem(STORAGE_KEYS.js) || DEFAULT_JS.trim()
      const layout = storage.getItem(STORAGE_KEYS.layout) || 'horizontal'
      if (layout === 'full') {
        this.full = true
      } else if (layout === 'vertical') {
        this.vertical = true
        this.full = false
      } else if (layout === 'horizontal') {
        this.vertical = false
        this.full = false
      }
    },
    saveToStorage() {
      if (!storage) {
        return
      }
      try {
        storage.setItem(STORAGE_KEYS.html, this.html)
        storage.setItem(STORAGE_KEYS.js, this.js)
        storage.setItem(STORAGE_KEYS.layout, this.layout)
        storage.setItem(STORAGE_KEYS.timestamp, String(Date.now()))
      } catch (err) {
        // Silently ignore errors on safari iOS private mode
      }
    }
  }
}
</script>
