<template>
  <Main>
    <Section>
      <h1 :id="id" tabindex="-1">
        <span class="bd-content-title">{{ groupTitle }}</span>
      </h1>
      <p class="bd-lead">Table of contents</p>
      <b-list-group tag="nav" :aria-label="`${groupTitle} section navigation`">
        <b-list-group-item
          v-for="page in pages"
          :key="page.slug"
          :to="`/docs/${slug}/${page.slug}`"
          active-class=""
        >
          <strong>{{ page.title }}</strong> &mdash;
          <span class="text-muted">{{ page.description }}</span>
        </b-list-group-item>
      </b-list-group>
    </Section>
  </Main>
</template>

<style scoped>
.list-group .list-group-item:hover strong {
  text-decoration: underline;
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
