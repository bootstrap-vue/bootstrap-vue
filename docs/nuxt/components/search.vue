<template>
  <div class="bd-search d-flex align-items-center">
    <b-form-input id="bd-search-input" v-model="search" placeholder="Search..." />
    <b-popover target="bd-search-input" placement="bottom" triggers="focus">
      <span v-if="search.length && Object.keys(toc).length === 0">No results found</span>
      <span v-else-if="search.length"></span>
      <span v-else>Type something to start search</span>

      <div v-for="(toc, section, idx) in toc" :key="section" :class="idx > 0 ? 'mt-2' : ''">
        <p class="bd-text-purple" v-html="section" class="my-1"></p>
        <p v-for="t in toc" :key="t.href" class="my-1">
          <a :href="t.href" v-html="t.title"></a>
        </p>
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
