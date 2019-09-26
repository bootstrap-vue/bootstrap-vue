<template>
  <b-breadcrumb :items="items" class="d-inline-flex small px-2 py-1"></b-breadcrumb>
</template>

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
          items.push({
            text: (sectionMeta[slug] || {}).title || slug,
            to: ['/docs', section, slug].join('/')
          })
        }
      }
      return items
    } 
  }
}
</script>
