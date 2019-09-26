<template>
  <Main>
    <Section>
      <h1 :id="id" tabindex="-1">
        <span class="bd-content-title">{{ groupTitle }}</span>
      </h1>
      <p class="lead">
        Table of contents
      </p>
      <nav class="bd-section-contents" :aria-labelledby="id">
        <ul>
          <li v-for="page in pages" :key="page.slug">
            <b-link :to="`/docs/${slug}/${page.slug}`" active-class="">
              {{ page.title }}
            </b-link>
            &mdash;
            <span class="text-muted">{{ page.description }}</span>
          </li>
        </ul>
      </nav>
    </Section>
  </Main>
</template>

<style scoped>
.bd-section-contents ul {
  list-item-style: square;
}
</style>

<script>
import Main from '~/components/main'
import Section from '~/components/section'
import { nav } from '~/content'

// Normalize nav into a lookup object
const groups = nav.reduce((obj, g) => {
  const groupSlug = g.base.replace(/\/$/, '')
  obj[groupSlug] = g
  return obj
}, {})

export default {
  layout: 'docs',
  components: {
    Main,
    Section
  },
  computed: {
    slug() {
      return this.$route.path.replace(/^\//, '').split('/')[1] || ''
    },
    id() {
      return `bd-section-toc-${this.slug}`
    },
    group() {
      return groups[this.slug] || {}
    },
    groupTitle() {
      const title = this.group.title || ''
      return title === 'Components'
        ? 'Component groups'
        : title === 'Misc'
          ? 'Miscellaneous'
          : title || ''
    },
    pages() {
      return this.group.pages || []
    }
  }
}
</script>
