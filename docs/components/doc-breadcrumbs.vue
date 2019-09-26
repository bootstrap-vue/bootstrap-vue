<template>
  <nav aria-label="Breadcrumbs">
    <b-breadcrumb :items="items" class="d-inline-flex bg-transparent px-2 py-1 my-0">
    </b-breadcrumb>
  </nav>
</template>

<style scoped>
.breadcrumb /deep/ .breadcrumb-item {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0;
}
</style>

<script>
import { nav } from '~/content'

const navLookup = nav.reduce((obj, section) => {
  obj[section.base.replace('/', '')] = section
  return obj
}, {})

export default {
  name: 'BDVBreadcrumbs',
  computed: {
    items() {
      const items = [{ text: 'Home', to: '/' }, { text: 'Docs', to: '/docs' }]
      const section = this.$route.name.split('-')[1] || ''
      const slug = this.$route.params.slug || ''
      if (section) {
        const sectionMeta = navLookup[section] || {}
        items.push({
          text: sectionMeta.title || section,
          to: ['/docs', section].join('/')
        })
        if (slug) {
          const pagesMeta = sectionMeta.pages || {}
          items.push({
            text: (pagesMeta[slug] || {}).title || slug,
            to: ['/docs', section, slug].join('/')
          })
        }
      }
      return items
    }
  }
}
</script>
