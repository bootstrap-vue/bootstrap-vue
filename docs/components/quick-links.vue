<template>
  <nav
    :class="['bd-quick-links', 'mb-3', 'd-xl-none', { 'd-none': !hasContent }]"
    :aria-hidden="hasContent ? null : 'true'"
  >
    <header v-if="hasContent">
      <b-button
        v-b-toggle.bd-quick-links-collapse
        class="font-weight-bold"
        variant="outline-secondary"
        size="sm"
        block
      >
        {{ toogleText }}
      </b-button>
    </header>
    <b-collapse v-if="hasContent" id="bd-quick-links-collapse" v-model="expanded" tag="ul">
      <li v-for="h2 in toc.toc" :key="h2.href">
        <b-link :href="h2.href" @click="scrollIntoView($event, h2.href)">
          <span v-html="h2.label"></span>
        </b-link>
        <ul v-if="h2.toc && h2.toc.length > 0" :key="`sub-${h2.href}`">
          <li v-for="h3 in h2.toc" :key="h3.href">
            <b-link :href="h3.href" @click="scrollIntoView($event, h3.href)">
              <span v-html="h3.label"></span>
            </b-link>
          </li>
        </ul>
      </li>
    </b-collapse>
  </nav>
</template>

<script>
import { offsetTop, scrollTo } from '~/utils'

export default {
  name: 'BVQuickLinks',
  data() {
    return {
      toc: {},
      offset: 0,
      expanded: false
    }
  },
  computed: {
    hasContent() {
      return !!this.toc.toc
    },
    toogleText() {
      return `${this.expanded ? 'Hide' : 'Show'} page table of contents`
    }
  },
  created() {
    this.$root.$on('docs-set-toc', toc => {
      this.expanded = false
      // Update the TOC content
      this.toc = toc
    })
  },
  mounted() {
    // Set the correct offset based on the header height
    const $header = document.body.querySelector('header.navbar')
    if ($header) {
      this.offset = $header.offsetHeight + 6
    }
  },
  methods: {
    scrollIntoView(event, href) {
      event.preventDefault()
      event.stopPropagation()
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

<style scoped lang="scss">
#bd-quick-links-collapse {
  list-style-type: square;
  border-left: 0.25em solid #eee;
  padding-left: 2.5rem;
  margin-top: 1rem;

  ul {
    list-style-type: circle;
    padding-left: 1.25rem;
    margin-bottom: 0.25rem;
  }
}
</style>
