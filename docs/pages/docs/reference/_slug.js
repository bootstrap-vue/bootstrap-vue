import MainDocs from '~/components/main-docs'
import docsMixin from '~/plugins/docs-mixin'
import { reference as referenceMeta } from '~/content'

const getReadMe = name =>
  import(`~/markdown/reference/${name}/README.md` /* webpackChunkName: "docs/reference" */)

// @vue/component
export default {
  name: 'BDVReference',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(referenceMeta[params.slug])
  },
  async asyncData({ params }) {
    const readme = (await getReadMe(params.slug)).default
    const meta = referenceMeta[params.slug]
    return { meta, readme }
  },
  render(h) {
    return h(MainDocs, {
      staticClass: 'bd-components',
      props: {
        readme: this.readme,
        meta: this.meta
      }
    })
  }
}
