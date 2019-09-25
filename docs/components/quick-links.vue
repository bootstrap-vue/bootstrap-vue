<template>
  <nav :class="['bd-quick-links', 'mb-3', { 'd-none': quickLinksMoved }]">
    <header>
      <b-button
        v-b-toggle.bd-quick-links-collapse
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
    <b-collapse id="bd-quick-links-collapse" v-model="quickLinksVisible" tag="ul">
      <li v-for="h2 in toc.toc" :key="h2.href">
        <b-link :href="h2.href" @click="scrollIntoView($event, h2.href)">
          <span v-html="h2.label"></span>
        </b-link>
      </li>
    </b-collapse>
  </nav>
</template>

<style scoped lang="scss">
#bd-quick-links-collapse {
  border-left: 5px solid #ccc;
  padding-left: 2.5rem;
  margin-top: 1rem;
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
      quickLinksVisible: false,
      quickLinksMoved: false
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
    const $body = document.body
    // Set the correct offset based on the header height
    const $header = $body.querySelector('header.navbar')
    if ($header) {
      this.offset = $header.offsetHeight + 6
    }
    // Move the quick links to the correct position, if possible
    const $referenceNode = $body.querySelector('.bd-lead') || $body.querySelector('h1')
    if ($referenceNode) {
      // IE 11 doesn't support the .after() method, and appears
      // that the polyfill doesn't polyfill this method
      // $referenceNode.after(this.$el)
      $referenceNode.insertAdjacentElement('afterend', this.$el)
    }
    // Make the quick links visible
    // We hide them initially to make the position change not that distracting
    this.quickLinksMoved = true
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
