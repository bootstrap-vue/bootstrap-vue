<template>
  <form
    class="bd-search d-flex align-items-center"
    @submit.stop.prevent
  >
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
  </form>
</template>

<script>
import { relativeUrl } from '../utils'

let scriptsInjected = false

export default {
  name: 'BDVSearch',
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

      // Search indexing config stored at:
      // https://github.com/algolia/docsearch-configs/blob/master/configs/bootstrap-vue.json

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
        apiKey: 'c816d3054b015320f0cfb40042f7e2bc',
        indexName: 'bootstrap-vue',
        inputSelector: '#bd-search-input',
        transformData(hits) {
          return hits.map(function(hit) {
            // Transform URL to a relative URL
            hit.url = relativeUrl(hit.url)

            return hit
          })
        },
        // Set debug to `true` if you want to inspect the dropdown
        debug: false
      })
    }
  }
}
</script>
