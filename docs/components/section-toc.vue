<template>
  <Main>
    <Section tag="header">
      <h1 :id="id" class="bv-no-focus-ring" tabindex="-1">
        <span class="bd-content-title">
          {{ groupTitle }} <span class="small text-muted">- table of contents</span>
        </span>
      </h1>
      <p v-if="groupDescription" class="bd-lead">{{ groupDescription }}</p>
    </Section>
    <CarbonAd :key="`ad-{$route.path}`"></CarbonAd>
    <Section>
      <b-list-group tag="nav" :aria-label="`${groupTitle} section navigation`" class="mb-5">
        <b-list-group-item
          v-for="page in pages"
          :key="page.slug"
          :to="`/docs/${slug}/${page.slug}`"
          active-class=""
        >
          <strong class="text-primary">{{ page.title }}</strong> &mdash;
          <b-badge v-if="page.new" variant="success">NEW</b-badge>
          <span class="text-muted">{{ page.description }}</span>
          <b-badge v-if="page.version" variant="secondary">v{{ page.version }}</b-badge>
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
import CarbonAd from '~/components/carbon-ad'
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
  name: 'BVSectionToc',
  layout: 'docs',
  components: {
    CarbonAd,
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
    groupDescription() {
      return this.group.description
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
