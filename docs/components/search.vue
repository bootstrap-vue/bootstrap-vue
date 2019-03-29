<template>
  <div class="bd-search d-flex align-items-center">
    <b-form-input
      id="bd-search-input"
      v-model="search"
      type="search"
      placeholder="Search keywords..."
      aria-label="Search site"
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
    <b-popover target="bd-search-input" placement="bottom" triggers="focus">
      <span v-if="search.length && Object.keys(results).length === 0">No results found</span>
      <span v-else-if="search.length"></span>
      <span v-else>Type something to start search</span>

      <div
        v-for="(results, section, idx) in results"
        :key="section"
        :class="idx > 0 ? 'mt-2' : ''"
        role="group"
      >
        <h6 class="bd-text-purple my-1" v-html="section"></h6>
        <div v-for="t in results" :key="t.href" class="my-1">
          <b-link :to="t.href" @click="search = ''" v-html="t.title"></b-link>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import intersectionBy from 'lodash/intersectionBy'
import { makeTOC } from '~/utils'
import { components, directives, reference, misc } from '~/content'

const SEARCH = []

const process = (readme, section, page) => {
  const baseURL = ['docs', section, page].filter(v => !!v).join('/')
  const { title, toc } = makeTOC(readme)
  ;[...toc].forEach(({ label, href }) => {
    SEARCH.push({
      section: title,
      title: label,
      href: `${baseURL}${href}`.replace('/#', '#')
    })
  })
}

// Async build the search database
import('~/markdown/intro/README.md' /* webpackChunkName: "docs/intro" */).then(readme =>
  process(readme.default, '', '')
)
Object.keys(components).forEach(page => {
  import(`~/../src/components/${page}/README.md` /* webpackChunkName: "docs/components" */).then(
    readme => process(readme.default, 'components', page)
  )
})
Object.keys(directives).forEach(page => {
  import(`~/../src/directives/${page}/README.md` /* webpackChunkName: "docs/directives" */).then(
    readme => process(readme.default, 'directives', page)
  )
})
Object.keys(reference).forEach(page => {
  import(`~/markdown/reference/${page}/README.md` /* webpackChunkName: "docs/reference" */).then(
    readme => process(readme.default, 'reference', page)
  )
})
Object.keys(misc).forEach(page => {
  import(`~/markdown/misc/${page}/README.md` /* webpackChunkName: "docs/misc" */).then(readme =>
    process(readme.default, 'misc', page)
  )
})

export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    results() {
      if (!this.search.length) {
        return {}
      }

      // Break the searh into individual terms
      const terms = this.search
        .replace(/\s+/g, ' ')
        .split(/\s+/)
        .filter(t => t)
      if (terms.length === 0) {
        return {}
      }

      // Find results for each term
      let results = terms.map(term => this.resultsFor(term))

      // If no results return emptiness
      if (results.length === 0) {
        return {}
      }

      // Add our intersectionBy 'iteratee' key as the last array entry
      results.push('href')
      // Find the intersection (common) of all individual term results (all retults ANDed)
      results = intersectionBy(...results)

      // Return the first 6 results or an empty array
      return groupBy(results.slice(0, 6), 'section')
    }
  },
  methods: {
    resultsFor(term) {
      // Return the search entries for a particular search term
      const regex = new RegExp(`\\b${term}`, 'i')
      return SEARCH.reduce((results, item) => {
        if (regex.test(item.title) || regex.test(item.section)) {
          results.push(item)
        }
        return results
      }, [])
    }
  }
}
</script>
