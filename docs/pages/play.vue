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
      <div class="col-md-2">
        <form
          method="post"
          action="https://jsfiddle.net/api/post/library/pure/"
          target="_blank"
          v-if="html || js">
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
          <div class="card-body" ref="result"></div>
        </div>

        <!--Console-->
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
          <ul v-if="messages.length" class="list-group list-group-flush">
            <li
              v-for="(message, idx) in messages"
              class="list-group-item"
              :key="`console-${idx}`">
              <b-badge :variant="message[0]" style="width:1.25rem;">{{
                message[0] === 'danger' ? 'X' : '?'
              }}</b-badge>
              <span class="text-muted"> {{ message[1] }}</span>
            </li>
          </ul>
          <div v-else class="card-body">&nbsp;</div>
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

export default {
  data () {
    return {
      html: '',
      js: '',
      messages: [],
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
    html () {
      this.run()
    },
    js () {
      this.run()
    }
  },
  created () {
    const self = this
    // Non reactive property to store the playground vm
    this.playVM = null
    // disable global error handler
    this.oldErrorHandler = Vue.config.errorHandler
/*
    Vue.config.errorHandler = null
    Vue.config.errorHandler = (err, vm, info) => {
      try {
        self.log.call(self, 'danger', `Error in ${info}: ${String(err)}`)
        // Note Vue still sends original error to console.error()!!!
      } catch (err) {
        // prevent possible endless loops
      }
    }
*/
    // original console logger
    if (typeof window !== 'undefined' && console) {
      const that = console
      this.originalLog = console.log
      console.log = function () {
        self.log.call(self, 'info', ...arguments)
        // self.originalLog.apply(that, arguments)
      }
    }
    // Create our debounced runner
    this.run = debounce(this._run, 500)
  },
  mounted () {
    // load our content into the editors after dom updated
    this.$nextTick(this.load)
  },
  beforeDestroy () {
    if (typeof window !== 'undefined' && this.originalLog) {
      console.log = this.originalLog
    }
    Vue.config.errorHandler = this.oldErrorHandler
    this.destroyVM()
  },
  methods: {
    log (tag, ...args) {
      // We have to ignore props mutation warning due to vue bug when we have two instances
      if (String(args[0]).indexOf('Avoid mutating a prop directly') !== -1) {
        return
      }
      if (this.messages.length > 10) {
        this.messages.splice(10)
      }
      this.messages.unshift([tag, args.map(String).join(' ')])
    },
    destroyVM () {
      if (this.playVM) {
        let parent
        try {
          parent = this.playVM.$parent
          this.playVM.$destroy()
          removeNode(this.playVM.$el)
          this.playVM.$el.innerHTML = ''
        } catch (err) {
        }
        try {
          parent.$destroy()
        } catch (err) {
        }
      }
      this.playVM = null
      this.$refs.result.innerHTML = ''
    },
    createVM () {
      let options
      const js = this.js.trim()
      const html = this.html.trim()
      const log = this.log

      const errHandler = (err, vm, info) => {
        log('danger', `Error in ${info}: ${err.message}`)
        return false
      }

      // Test JavaScript
      try {
        /* eslint-disable no-eval */
        eval(`options = ${js}`)
        /* eslint-enable no-eval */
      } catch (err) {
        errHandler(err, null, 'javascript')
        this.playVM = null
        return
      }
      
      if (!html && !options.template && !options.render && !(options.staticRenderFns && options.render)) {
        this.log('danger', 'No template or render function provided')
        return
      }

      const res
      if (html) {
        try {
          res = Vue.compile(`<div id="playground-app">${html}</div>`)
        } catch (err) {
          errHandler(err, null, 'compiling template')
          return
        }
      }

      if (html && res) {
        delete options.template
        // we use render functions so that we can trap errors in the templates
        options.render = res.render
        options.staticRenderFns = res.staticRenderFns
      }

      let holder = document.createElement('div')
      this.$refs.result.appendChild(holder)

      try {
        const fakeParent = new Vue({
          template: '<div></div>',
          errorCaptured: errHandler
        })
        this.playVM = new Vue(Object.assign({}, options, {
          el: holder,
          // we set a fake parent so we can capture errors
          parent: fakeParent,
          // router needed for tooltips and popovers so they hide when route changes
          router: this.$router
        }))
      } catch (err) {
        holder = null
        this.destroyVM()
        errhandler(err, null, 'vm create')
        return
      }

      this.save()
    },
    _run () {
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
