<template>
  <div class="bd-search d-flex align-items-center">
    <b-form-input
      id="bd-search-input"
      autocomplete="off"
      type="search"
      placeholder="Search..."
      aria-label="Search docs"
    ></b-form-input>
    <button
      v-b-toggle.bd-docs-nav
      type="button"
      class="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3"
      aria-label="Toggle docs navigation"
    >
      <svg
        class=""
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="30"
        height="30"
        focusable="false"
      >
        <title>Menu</title>
        <path
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          d="M4 7h22M4 15h22M4 23h22"
        />
      </svg>
    </button>
  </div>
</template>

<script>
let scriptsInjected = false

export default {
  data() {
    return {
      docsearch: null
    }
  },
  mounted() {
    this.loadDocsearch().then(this.initDocsearch)
  },
  methods: {
    async loadDocsearch() {
      if (scriptsInjected) {
        return
      }

      const cdnBaseUrl = '//cdn.jsdelivr.net/docsearch.js/2/'
      const $body = document.body

      // Load JS
      const loadJs = new Promise(resolve => {
        let $script = document.createElement('script')
        $script.setAttribute('type', 'text/javascript')
        $script.setAttribute('src', `${cdnBaseUrl}docsearch.min.js`)
        $body.appendChild($script)
        $script.onload = resolve
      })

      // Load CSS
      const loadCss = new Promise(resolve => {
        let $link = document.createElement('link')
        $link.setAttribute('rel', 'stylesheet')
        $link.setAttribute('type', 'text/css')
        $link.setAttribute('href', `${cdnBaseUrl}docsearch.min.css`)
        $body.appendChild($link)
        $link.onload = resolve
      })

      await Promise.all([loadJs, loadCss])

      scriptsInjected = true
    },
    initDocsearch() {
      if (this.docsearch) {
        return
      }
      // Initialize docsearch
      this.docsearch = window.docsearch({
        apiKey: 'XXX',
        indexName: 'bootstrap-vue',
        inputSelector: '#bd-search-input',
        debug: true // Set debug to true if you want to inspect the dropdown
      })
    }
  }
}
</script>
