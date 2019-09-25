<template>
  <nav>
    <header>
      <b-button
        v-b-toggle.quick-links-collapse
        class="font-weight-bold"
        variant="outline-secondary"
        size="sm"
        block
      >
        <span v-if="quickLinksVisible">Hide</span>
        <span v-else>Show</span>
        Page table of contents
      </b-button>
    </header>
    <b-collapse v-mdel="quickLinksVisible" id="quick-links-collapse" tag="ul">
      <li v-for="h2 in toc.toc" :key="h2.href">
        <b-link :href="h2.href" @click="scrollIntoView($event, h2.href)">
          <span v-html="h2.label"></span>
        </b-link>
      </li>
    </b-collapse>
  </nav>
</template>

<style scoped lang="scss">
#quick-links-collapse {
  border-left: 5px solid #ccc;
  padding-left: 1rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
}
</style>

<script>
import { makeTOC, offsetTop, scrollTo } from '~/utils'

export default {
  name: 'BDVToc',
  data() {
    return {
      readme: '',
      meta: null,
      offset: 0,
      quickLinksVisible: false
    }
  },
  computed: {
    toc() {
      return makeTOC(this.readme, this.meta)
    }
  },
  created() {
    this.$root.$on('setTOC', (readme, meta) => {
      this.readme = readme
      this.meta = meta || null
    })
  },
  mounted() {
    const $header = document.body.querySelector('header.navbar')
    if ($header) {
      this.offset = $header.offsetHeight + 6
    }
  },
  methods: {
    isArray(value) {
      return Array.isArray(value)
    },
    scrollIntoView(evt, href) {
      evt.preventDefault()
      evt.stopPropagation()
      // We use an attribute `querySelector()` rather than `getElementByID()`,
      // as some auto-generated ID's are invalid or not unique
      const id = (href || '').replace(/#/g, '')
      const $el = document.body.querySelector(`[id="${id}"]`)
      if ($el) {
        // Get the document scrolling element
        const scroller = document.scrollingElement || document.documentElement || document.body
        // Scroll heading into view (minus offset to account for nav top height
        scrollTo(scroller, offsetTop($el) - 70, 100, () => {
          // Set a tab index so we can focus header for a11y support
          $el.tabIndex = -1
          // Focus the heading
          $el.focus()
        })
      }
    }
  }
}
</script>
