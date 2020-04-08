import { nav } from '~/content'

const navLookup = nav.reduce(
  (obj, section) => ({ ...obj, [section.base.replace('/', '')]: section }),
  {}
)

// @vue/component
export default {
  name: 'BVBreadcrumbs',
  computed: {
    items() {
      const items = [{ text: 'Home', to: '/' }, { text: 'Docs', to: '/docs' }]

      const section = this.$route.name.split('-')[1] || ''
      if (section) {
        const sectionMeta = navLookup[section] || {}

        items.push({
          text: sectionMeta.title || section,
          to: ['/docs', section].join('/')
        })

        const slug = this.$route.params.slug || ''
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
  },
  render(h) {
    return h('nav', { attrs: { 'aria-label': 'Breadcrumbs' } }, [
      h('b-breadcrumb', {
        staticClass: 'd-inline-flex my-0 px-2 py-1 bg-transparent',
        props: { items: this.items }
      })
    ])
  }
}
