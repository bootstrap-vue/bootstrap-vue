<template>
  <div class="bd-search d-flex align-items-center">
    <b-form-input id="bd-search-input" v-model="search" placeholder="Search keywords..." />
    <button type="button" v-b-toggle.bd-docs-nav class="bd-search-docs-toggle d-md-none p-0 ml-3" aria-label="Toggle docs navigation">
      <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg>
    </button>
    <b-popover target="bd-search-input" placement="bottom" triggers="focus">
      <span v-if="search.length && Object.keys(results).length === 0">No results found</span>
      <span v-else-if="search.length"></span>
      <span v-else>Type something to start search</span>

      <div v-for="(results, section, idx) in results" :key="section" :class="idx > 0 ? 'mt-2' : ''">
        <h6 v-html="section" class="bd-text-purple my-1"></h6>
        <div v-for="t in results" :key="t.href" class="my-1">
          <b-link :to="t.href" v-html="t.title" @click="search = ''"></b-link>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
import { groupBy, intersectionBy } from "lodash";
import { makeTOC } from '~/utils';

// Searchable sections of the docs
const SECTIONS = {
    '/': require.context('~/../', false, /README.md$/),
    '/components': require.context('~/../src/components/', true, /README.md$/),
    '/directives': require.context('~/../src/directives/', true, /README.md$/),
    '/reference': require.context('~/markdown/reference', true, /README.md$/),
    '/misc': require.context('~/markdown/misc', true, /README.md$/)
};

// Our search array in the format of:
// [
//     { section: <page.title>, title: <heading.label>, href: <heading.href> },
//     { section: <page.title>, title: <heading.label>, href: <heading.href> },
//     etc
// ]
const SEARCH = [];

// Build the search data
Object.keys(SECTIONS).forEach(section => {
  SECTIONS[section].keys().forEach(page => {
    // Generate the TOC data for the README.md file (which is in HTML format)
    const tocData = makeTOC(SECTIONS[section].resolve(page));

    // Build the base path to the page (need to remove leading '.' and trailing '/README.md')
    let baseURL = `/docs${section}${page.replace(/^\.|\/README\.md$/g, '')}`;
    baseURL = baseURL.trim().replace(/\/\//, '/').replace(/\/$), '');

    // Process the TOCs toc headings (we need to flatten the toc array, so we spread it first)
    [].concat(...tocData.toc).forEach(heading => {
      SEARCH.push({
        section: tocData.title,
        title: heading.label,
        href: (baseURL + heading.href).replace'/#','#')
      });
    });
  });
});

export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    results() {
      if (!this.search.length) {
        return {};
      }

      // Break the searh into individual terms
      const terms = this.search
        .replace(/\s+/g, " ")
        .split(/\s+/)
        .filter(t => t);
      if (terms.length === 0) {
        return {};
      }

      // find results for each term
      let results = [];
      terms.forEach(term => {
        results.push(this.resultsFor(term));
      });

      if (results.length === 0) {
        // If no results return emptiness
        return {};
      }

      // add our intersectionBy 'iteratee' key as the last array entry
      results.push("href");
      // Find the intersection (common) of all individual term results (all retults ANDed)
      results = intersectionBy(...results);

      // Return the first 6 results or an empty array
      return groupBy(results.slice(0, 6), "section");
    }
  },
  methods: {
    resultsFor(term) {
      // Return the search entries for a particular search term
      const regex = new RegExp("\\b" + term, "i");
      const results = [];

      SEARCH.forEach(item => {
        if (regex.test(item.title) || regex.test(item.section)) {
          results.push(item);
        }
      });

      return results;
    }
  }
};
</script>
