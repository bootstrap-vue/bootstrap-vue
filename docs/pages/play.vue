<template>
  <div class="container">

    <div class="mb-3 row">
      <div class="col-md-10">
        <span>Here you can interactively play and test components with a fresh vue instance.</span>
        <br>
        <Strong>TIP: </Strong>
        <span>You can clone docs repo, to hack and develop components.</span>
        <span> changes will be reflected and hot-reloaded instantly.</span>
        <br>
        <span>Please refer to</span>
        <router-link to="/docs"> Docs </router-link>
        <span>for more info about available tags and usage.</span>
      </div>
      <div class="col-md-1">
        <form
          method="post"
          action="https://jsfiddle.net/api/post/library/pure/"
          target="_blank"
          v-if="vm">
          <input
            type="hidden"
            :value="html_fiddle"
            name="html">
          <input
            type="hidden"
            :value="js_fiddle"
            name="js">
          <input
            type="hidden"
            value="l"
            name="js_wrap">
          <input
            name="resources"
            type="hidden"
            :value="fiddle_dependencies.join(',')">
          <b-btn
            size="sm"
            type="submit">
            <span>Export to JSFiddle</span>
          </b-btn>
        </form>
      </div>
    </div>

    <transition-group
      class="row"
      tag="div"
      name="flip">
      <div
        key="A"
        :class="full?'col-12':'col'">
        <transition-group
          class="row"
          tag="div"
          name="flip">
          <div
            :class="`col-md-${(vertical&&!full)?6:12} col-sm-12`"
            key="A1">
            <!--Template-->
            <div class="card mt-2">
              <div class="card-header card-outline-info">
                <span>Template</span>
                <b-btn
                  size="sm"
                  @click="toggleFull"
                  variant="outline-info"
                  class="float-right">
                  <span>{{ full ? 'Split' : 'Full' }}</span>
                </b-btn>
              </div>
              <codemirror
                v-model="html"
                mode="htmlmixed"/>
            </div>
          </div>
          <div
            :class="`col-md-${(vertical&&!full)?6:12} col-sm-12`"
            key="A2">
            <!--JS-->
            <div class="card mt-2">
              <div class="card-header card-outline-warning">
                <span>JS</span>
                <b-btn
                  size="sm"
                  @click="toggleFull"
                  variant="outline-info"
                  class="float-right">
                  <span>{{ full ? 'Split' : 'Full' }}</span>
                </b-btn>
              </div>
              <codemirror
                v-model="js"
                mode="javascript"/>
            </div>
          </div>
        </transition-group>
      </div>

      <div
        key="B"
        :class="`col-md-${(vertical || full)?12:6} col-sm-12`">
        <!--Result-->
        <div class="card mt-2">
          <div class="card-header card-outline-success">
            <span>Result</span>
            <b-btn
              size="sm"
              @click="toggleVertical"
              variant="outline-info"
              class="float-right"
              v-if="!full">
              <span>{{ vertical ? 'Horizontal' : 'Vertical' }}</span>
            </b-btn>
          </div>
          <div class="card-body">
            <play-error-boundary>
             <div ref="result"/>
            </play-error-boundary>
          </div>
        </div>

        <!--Console-->
        <div class="">
          <div class="card mt-2">
            <div class="card-header card-outline-secondary">
              <span>Console</span>
              <b-btn
                size="sm"
                @click="clear"
                variant="outline-danger"
                class="float-right"
                v-if="messages.length">
                <span>Clear</span>
              </b-btn>
            </div>
            <div class="card-body">
              <div
                v-for="(message, idx) in messages"
                :key="`console-${idx}`">
                <b-badge :variant="message[0]">{{ message[0] }}</b-badge>
                <span class="text-muted"> {{ message[1] }}</span>
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>

  </div>
</template>

<style>
.flip-move {
  transition: all .3s;
}
</style>

<script>
import Vue from 'vue'
import debounce from 'lodash/debounce'

const defaultJS = `{
    data: {
        name: 'Zeus'
    },
}`

const defaultHTML = `<div>
  <b-alert show> Hello {{ name }}! </b-alert>
</div>`

// Maximum age of localstorage before we revert back to defaults
// 7 days
const maxRetention = 7 * 24 * 60 * 60 * 1000

const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

// Helper wrapper component
const playErrorBoundary = {
  name: 'playErrorBoundary',
  data () {
    return { error: false }
  },
  errorCaptured (err, vm, info) {
    this.error = true
    console.error(err, info)
    return false
  },
  render (h) {
    return this.error ? h('p', 'whoops!') : this.$slots.default[0]
  }
}

export default {
  components: {
    playErrorBoundary
  },
  data () {
    return {
      html: '',
      js: '',
      messages: [],
      originalLog: null,
      originalWarn: null,
      originalError: null,
      vertical: false,
      full: false
    }
  },
  head () {
    return {
      title: 'Playground - BootstrapVue'
    }
  },
  computed: {
    fiddle_dependencies () {
      return [
        '//unpkg.com/bootstrap/dist/css/bootstrap.min.css',
        '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css',
        '//unpkg.com/vue@latest/dist/vue.min.js',
        '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js'
      ]
    },
    js_fiddle () {
      const js = `new Vue({el:'#app',\r\n${this.js.trim()}})`
      return `window.onload = function() {${js}}`
    },
    html_fiddle () {
      return `<div id='app'>\r\n${this.html.trim()}\r\n</div>`
    }
  },
  watch: {
    html (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.run()
      }
    },
    js (newVal, oldVal) {
      if (newVal !== oldVal) { 
        this.run()
      }
    }
  },
  created () {
    // Non reactive property to store the playground vm
    this.playVM = null
    // Create our debounced runner
    this.run = debounce(this._run, 500)
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.originalLog = console.log
      this.originalWarn = console.warn
      this.originalError = console.error
      const self = this

      console.warn = function () {
        self.log('warning', arguments)
      }

      console.log = function () {
        self.log('info', arguments)
      }

      console.error = function () {
        self.log('danger', arguments)
      }
    }

    this.load()
    // not really needed as loading will trigger the watchers
    // this.$nextTick(this.run)
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      console.log = this.originalLog
      console.warn = this.originalWarn
      console.error = this.originalError
    }
    this.destroyVM()
  },
  methods: {
    log (tag, args) {
      // We have to ignore props mutation warning due to vue bug when we have two instances
      if (String(args[0]).indexOf('Avoid mutating a prop directly') !== -1) {
        return
      }

      const argsArr = []
      for (let i = 0; i < args.length; i++) {
        argsArr.push(args[i])
      }

      let oLog = this.originalLog
      if (tag === 'danger') {
        oLog = this.originalError
      } else if (tag === 'warning') {
        oLog = this.originalWarn
      }
      oLog.apply(console, [].concat(tag, argsArr))

      if (this.messages.length > 10) {
        this.messages.splice(10)
      }
      this.messages.unshift([tag, argsArr.map(String).join(' ')])
    },
    destroyVM () {
      if (this.playVM) {
        try {
          this.playVM.$destroy()
        } catch (err) {
        }
        removeNode(this.playVM)
        this.playVM.$el.innerHTML = ''
        this.playVM = null
        this.$refs.result.innerHTML = ''
      }
      this.$refs.result.innerHTML = ''
    },
    createVM () {
      let options = {}
      let js = this.js.trim()
      if (js.indexOf('{') !== 0) {
        js = `{${js}}`
      }

      // Test javascript
      try {
        /* eslint-disable no-eval */
        eval(`options = ${js}`)
        /* eslint-enable no-eval */
      } catch (err) {
        this.log('danger', [`Error compiling JS: ${err.message}`])
        this.playVM = null
        return
      }

      const holder = document.createElement('div')
      this.$refs.result.appendChild(holder)
      const self = this

      options = Object.assign({}, options, {
        template = `<div>${this.html.trim()}</div>`,
        el: holder,
        router: self.$router,
        errorCaptured (err, vm, info) {
          self.log('danger', [err, info])
          return false
        },
        renderError (h, err) {
          // Only works in dev mode
          self.log('danger', [err])
          return h('div', ['Whoops!', h('br'), err.message]) 
        }
      })

      try {
        this.playVM = new Vue(options)
      } catch (err) {
        this.log('danger', [`Error creating Vue instance: ${err.message}`])
        this.playVM = null
        return
      }

      this.save()
    },
    _run () {
      // Destroy old VM if exists
      this.destroyVM()
      // clear the log
      this.clear()
      // create and render the instance
      this.createVM()
    },
    toggleVertical () {
      this.vertical = !this.vertical
    },
    toggleFull () {
      this.full = !this.full
    },
    clear () {
      this.messages.splice(0)
    },
    load () {
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
    save () {
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
