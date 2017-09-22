<template>
  <div class="bd-search d-flex align-items-center">
    <b-form-input id="bd-search-input" v-model="search" placeholder="Search..." />
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
          <a :href="t.href" v-html="t.title"></a>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
import site from '~/..';
import { groupBy } from 'lodash';

export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    toc () {
      if (!this.search.length) {
        return {}
      }
      const regex = new RegExp(this.search, 'i')
      const allResults = Array.concat.apply([], Object.keys(site.toc).map(sectionKey => {
        const section = site.toc[sectionKey]
        return section.toc.map(t => {
          return Object.assign({
            title: t.label,
            section: section.title,
            href: (sectionKey + t.href).replace('/#', '#')
          })
        }).filter(r => regex.test(r.title) || regex.test(r.section) || regex.test(r.href))
      }))
      console.log(this.search, regex, allResults)
      return groupBy(allResults.slice(0, 6), 'section')
    }
  }
}
</script>
