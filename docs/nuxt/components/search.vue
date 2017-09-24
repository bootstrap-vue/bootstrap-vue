<template>
  <div class="bd-search d-flex align-items-center">
    <b-form-input id="bd-search-input" v-model="search" placeholder="Search keywords..." />
    <button type="button" v-b-toggle.bd-docs-nav class="bd-search-docs-toggle d-md-none p-0 ml-3" aria-label="Toggle docs navigation">
      <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg>
    </button>
    <b-popover target="bd-search-input" placement="bottom" triggers="focus">
      <span v-if="search.length && Object.keys(toc).length === 0">No results found</span>
      <span v-else-if="search.length"></span>
      <span v-else>Type something to start search</span>

      <div v-for="(toc, section, idx) in toc" :key="section" :class="idx > 0 ? 'mt-2' : ''">
        <h6 v-html="section" class="bd-text-purple my-1"></h6>
        <div v-for="t in toc" :key="t.href" class="my-1">
          <b-link :to="t.href" v-html="t.title"></b-link>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
import site from '~/..';
import { groupBy, intersectionBy } from 'lodash';

export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    toc () {
      if (!this.search.length) {
        return {};
      }
      const terms = this.search.replace(/\s+/g, ' ').split(/\s+/).filter(t => t);
      if (terms.length === 0)
        return {};
      }
      let results = [];
      // find results for each term
      terms.forEach(term => {
        results.push(this.resultsFor(term));
      });
      if (results.length === 0) {
        return {};
      }
      // add our 'iteratee' key
      results.push('href');
      // Find the intersection (common) of all individual results
      results = intersectionBy.apply(null, results);
      return groupBy(results.slice(0, 6), 'section');
    }
  },
  methods: {
    resultsFor(term) {
      const regex = new RegExp('\\b' + term, 'i')
      const results = Array.concat.apply([], Object.keys(site.toc).map(sectionKey => {
        const section = site.toc[sectionKey];
        return Array.concat.apply([], section.toc).map(t => {
          return {
            title: t.label,
            section: section.title,
            href: (sectionKey + t.href).replace('/#', '#')
          };
        }).filter(r => regex.test(r.title) || regex.test(r.section) || regex.test(r.href));
      }));
      return results;
    }
  }
}
</script>
