<template>
  <b-container fluid tag="main" class="pb-5">
    <!-- Introduction -->
    <div class="bd-content mb-4">
      <h1><span class="bd-content-title">{{ title }}</span></h1>
      <b-row align-v="center">
        <b-col>
          <p class="bd-lead">
            Here you can interactively play and test components with a fresh Vue.js instance. Please
            refer to the <b-link to="/docs">Docs</b-link> section for more information about
            available components and usage.
          </p>
        </b-col>
        <b-col lg="auto">
          <BVCarbonAd class="my-3 my-lg-1"></BVCarbonAd>
        </b-col>
      </b-row>
    </div>

    <!-- Compiler loading state -->
    <b-row v-if="loading">
      <b-col class="mb-2 mb-md-0">
        <!-- Loading indicator -->
        <b-alert
          variant="info"
          class="text-center"
          show
        >
          Loading JavaScript compiler...
        </b-alert>
      </b-col>
    </b-row>

    <!-- Transpiler warning -->
    <b-container v-if="ready && needsTranspiler">
      <b-row>
        <b-col>
          <b-alert
            variant="info"
            class="mb-3"
            show
            fade
            dismissible
          >
            Your browser does not support modern ES6 JavaScript syntax. However, the code in the
            JavaScipt editor will be transpiled to work with your browser, except for any ES6 code
            that is in the Template editor (i.e. destructuring, arrow functions, etc.)
          </b-alert>
        </b-col>
      </b-row>
    </b-container>

    <!-- Actions -->
    <b-row>
      <b-col class="mb-2 mb-md-0">
        <!-- Reset action -->
        <b-btn
          size="sm"
          variant="danger"
          :disabled="isDefault || isBusy"
          @click="reset"
        >
          Reset to default
        </b-btn>
      </b-col>

      <!-- Export actions -->
      <b-col
        md="auto"
        class="mt-2 mt-md-0"
      >
        <b class="d-block d-sm-inline-block mr-sm-2 mb-1 mb-sm-0">Export to</b>

        <!-- Export to CodePen -->
        <b-form
          class="d-inline-block mr-1 notranslate"
          translate="no"
          method="post"
          action="https://codepen.io/pen/define"
          target="_blank"
        >
          <input type="hidden" name="data" :value="codepenData">
          <b-btn size="sm" type="submit" :disabled="!isOk || isBusy">CodePen</b-btn>
        </b-form>

        <!-- Export to CodeSandbox -->
        <b-form
          class="d-inline-block mr-1 notranslate"
          translate="no"
          method="post"
          action="https://codesandbox.io/api/v1/sandboxes/define"
          target="_blank"
        >
          <input type="hidden" name="parameters" :value="codesandboxData">
          <b-btn size="sm" type="submit" :disabled="!isOk || isBusy">CodeSandbox</b-btn>
        </b-form>

        <!-- Export to JSFiddle -->
        <b-form
          class="d-inline-block notranslate"
          translate="no"
          method="post"
          action="https://jsfiddle.net/api/post/library/pure/"
          target="_blank"
        >
          <input type="hidden" name="html" :value="exportData.extendedHtml">
          <input type="hidden" name="js" :value="exportData.extendedJs">
          <input type="hidden" name="resources" :value="[...exportData.externalCss, exportData.externalJs].join(',')">
          <input type="hidden" name="css" :value="exportData.css">
          <input type="hidden" name="js_wrap" value="l">
          <b-btn size="sm" type="submit" :disabled="!isOk || isBusy">JSFiddle</b-btn>
        </b-form>
      </b-col>
    </b-row>

    <!-- Editors / Result / Console -->
    <transition-group
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
            <b-card no-body header-tag="header">
              <template v-slot:header>
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">
                    <span class="notranslate" translate="no">Template</span>
                  </h5>
                  <b-btn
                    size="sm"
                    variant="outline-info"
                    class="d-none d-md-inline-block"
                    @click="toggleFull"
                  >
                    <span>{{ full ? 'Split' : 'Full' }}</span>
                  </b-btn>
                </div>
              </template>

              <BVCodeMirror v-model="html" mode="htmlmixed"></BVCodeMirror>
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
            <b-card no-body header-tag="header">
              <template v-slot:header>
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">
                    <span class="notranslate" translate="no">JavaScript</span>
                    <small v-if="compiling" class="text-muted"> compiling</small>
                  </h5>
                  <b-btn
                    size="sm"
                    variant="outline-info"
                    class="d-none d-md-inline-block"
                    @click="toggleFull"
                  >
                    <span>{{ full ? 'Split' : 'Full' }}</span>
                  </b-btn>
                </div>
              </template>

              <BVCodeMirror v-model="js" mode="javascript"></BVCodeMirror>
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
            <b-card no-body class="play-result" header-tag="header">
              <template v-slot:header>
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">
                    <span>Result</span>
                    <small v-if="compiling || building" class="text-muted"> building</small>
                  </h5>
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
              </template>

              <b-card-body ref="result" class="play-result-body notranslate" translate="no"></b-card-body>
            </b-card>
          </b-col>

          <!-- Console column -->
          <b-col cols="12" class="mt-3 notranslate" translate="no">
            <!-- Console -->
            <b-card no-body header-tag="header">
              <template v-slot:header>
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">
                    <span>Console log</span>
                  </h5>
                  <b-btn
                    :disabled="messages.length === 0"
                    size="sm"
                    variant="outline-danger"
                    @click="clear"
                  >
                    <span>Clear</span>
                  </b-btn>
                </div>
              </template>

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
.play-result-body,
.play-log {
  min-height: 300px;
}

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

.bv-carbon-ad {
  min-height: 130px;
}

@media (min-width: 992px) {
  .bv-carbon-ad {
    min-width: 330px;
  }
}
</style>

<script>
import Vue from 'vue'
import debounce from 'lodash/debounce'
import { getParameters as getCodeSandboxParameters } from 'codesandbox/lib/api/define'
import needsTranspiler from '~/utils/needs-transpiler'
import { version as bootstrapVueVersion, bootstrapVersion, vueVersion } from '~/content'
import BVCarbonAd from '~/components/carbon-ad'
import BVCodeMirror from '~/components/code-mirror'

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
      console.log('Alert dismissed')
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

// Remove a node from its parent's children
const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

// Indent a value by the given count
const indent = (value, count = 2, { indent } = { indent: ' ' }) => {
  if (count === 0) {
    return value
  }
  return value.replace(/^(?!\s*$)/gm, indent.repeat(count))
}

export default {
  components: {
    BVCarbonAd,
    BVCodeMirror
  },
  data() {
    return {
      html: '',
      js: '',
      compiledJs: null, // Place to hold the transpiled JS code string
      logIdx: 1, // Used as the ":key" on console section for transition hooks
      messages: [],
      vertical: false,
      full: false,
      // Flags for various UI stuff
      isOk: false,
      loading: false,
      ready: false,
      compiling: false,
      building: false
    }
  },
  computed: {
    title() {
      return 'Online Playground'
    },
    isDefault() {
      // Check if editors contain default JS and template
      return this.js.trim() === DEFAULT_JS.trim() && this.html.trim() === DEFAULT_HTML.trim()
    },
    isBusy() {
      return this.compiling || this.building || this.loading || !this.ready
    },
    needsTranspiler() {
      return needsTranspiler
    },
    appData() {
      // Used by our debounced `run` watcher to build the app
      return {
        html: this.html.trim(),
        js: this.compiledJs // Transpiled String or null if transpilation failed
      }
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
          `//unpkg.com/bootstrap-vue@${bootstrapVueVersion}/dist/bootstrap-vue.js`,
          `//unpkg.com/bootstrap-vue@${bootstrapVueVersion}/dist/bootstrap-vue-icons.js`
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
        "import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'",
        "import App from './App'",
        '',
        "import 'bootstrap/dist/css/bootstrap.css'",
        "import 'bootstrap-vue/dist/bootstrap-vue.css'",
        '',
        'Vue.use(BootstrapVue)',
        'Vue.use(BootstrapVueIcons)',
        '',
        "new Vue({ el: '#app', render: h => h(App) })"
      ].join('\r\n')
      const scripts = {
        serve: 'vue-cli-service serve',
        build: 'vue-cli-service build'
      }
      const dependencies = {
        bootstrap: bootstrapVersion,
        'bootstrap-vue': bootstrapVueVersion,
        vue: vueVersion
      }
      const devDependencies = {
        '@vue/cli-service': '^4.3.0'
      }
      return getCodeSandboxParameters({
        files: {
          'App.vue': { content: vueContent },
          'index.html': { content: htmlContent },
          'index.js': { content: jsContent },
          'package.json': { content: { scripts, dependencies, devDependencies } }
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
    this.jsUnWatch = null
    this.run = () => {}
    this.compileJs = () => {}
    // Default code "transpiler"
    this.compiler = code => code
  },
  beforeMount() {
    // Load content and preferences (or defaults if not available)
    this.loadFromStorage()
  },
  mounted() {
    // Set the loading state if needed
    this.loading = needsTranspiler
    if (needsTranspiler) {
      this.$nextTick(() => {
        this.$nuxt && this.$nuxt.$loading && this.$nuxt.$loading.start()
        // Lazy load the babel transpiler (in a separate chunk)
        import('../utils/compile-js' /* webpackChunkName: "compile-js" */).then(module => {
          // Update compiler reference
          this.compiler = module.default || module
          // Stop the loading indicator
          this.loading = false
          this.$nuxt && this.$nuxt.$loading && this.$nuxt.$loading.finish()
          // Run the setup code. We pass 750ms as the debounce
          // timeout, as transpilation can be slow
          this.doSetup(750)
        })
      })
    } else {
      this.doSetup()
    }
  },
  beforeDestroy() {
    // Stop our watchers
    if (this.jsUnWatch) {
      this.jsUnWatch()
    }
    if (this.contentUnWatch) {
      this.contentUnWatch()
    }
    if (!this.$isServer) {
      this.destroyVM()
    }
  },
  methods: {
    doSetup(timeout = 500) {
      // Create our debounced runner
      this.run = debounce(this._run, 500)
      // Create our debounced javascript compiler
      this.compileJs = debounce(this._compileJs, timeout)
      // Set up our editor content watcher
      this.$nextTick(() => {
        // appData watcher
        this.contentUnWatch = this.$watch(
          'appData',
          () => {
            this.run()
          },
          { deep: true }
        )
        // Javascript watcher
        this.jsUnWatch = this.$watch(
          () => this.js.trim(),
          () => {
            this.compileJs()
          },
          { immediate: true }
        )
        // Set ready state
        this.ready = true
      })
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
      const js = this.compiledJs
      const html = this.html.trim()

      // Disable the export buttons
      this.isOk = false

      if (js === null) {
        // Error compiling JS
        return
      }

      // Options gets assiged to by our eval of the compiled JS
      // eslint-disable-next-line prefer-const
      let options = {}
      // Test JavaScript for syntax errors
      try {
        // Options are eval'ed in our variable scope, so we can override
        // the "global" console reference just for the user app
        /* eslint-disable no-eval */
        eval(`var console = this.fakeConsole; ${js}`)
        /* eslint-enable no-eval */
      } catch (err) {
        this.errHandler(err, 'javascript')
        window.console.error('Error in javascript', err)
        return
      }

      // Sanitize template possibilities
      if (!html && typeof options.template !== 'string' && typeof options.render !== 'function') {
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
      // Vue's `errorCapture` doesn't always handle errors in methods (although it
      // does if the method is used as a `v-on`/`@` handler), so we wrap any methods
      // with a try/catch handler so we can show the error in our GUI log console.
      // Note: Doesn't handle errors in async methods
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

      // Try and build the user app
      try {
        const holder = document.createElement('div')
        this.$refs.result.appendChild(holder)
        this.playVM = new Vue({
          ...options,
          el: holder,
          // Router needed for tooltips/popovers/toasts so
          // that they hide when docs route changes
          router: this.$router,
          // We set a fake parent so we can capture most runtime and
          // render errors (this is an error boundary component)
          parent: new Vue({
            template: '<span></span>',
            errorCaptured(err, vm, info) {
              // Pass error to playground error handler
              playground.errHandler(err, info)
              // Don't propagate to parent/global error handler!
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
    _compileJs() {
      if (this.$isServer) {
        this.compiledJs = null
        return
      }
      const js = (this.js || '').trim() || '{}'
      this.compiling = true
      let compiled = null
      this.$nextTick(() => {
        this.requestAF(() => {
          try {
            // The app build process expects the app options to
            // be assigned to the `options` variable
            compiled = this.compiler(';options = ' + js + ';')
          } catch (err) {
            this.errHandler(err, 'javascript')
            window.console.error('Error in javascript', err)
            compiled = null
          }
          this.compiledJs = compiled
          this.$nextTick(() => {
            this.compiling = false
          })
        })
      })
    },
    _run() {
      if (this.$isServer) {
        return
      }
      this.building = true
      // Destroy old VM if exists
      this.destroyVM()
      // Clear the log
      this.clear()
      this.requestAF(() => {
        // Create and render the instance
        this.createVM()
        this.$nextTick(() => {
          this.building = false
        })
      })
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
    },
    requestAF(fn) {
      const w = typeof window === 'undefined' ? {} : window
      const raf =
        w.requestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.mozRequestAnimationFrame ||
        w.msRequestAnimationFrame ||
        w.oRequestAnimationFrame ||
        // Fallback, but not a true polyfill
        // Only needed for Opera Mini
        (cb => setTimeout(cb, 16))

      return raf(fn)
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
  }
}
</script>
