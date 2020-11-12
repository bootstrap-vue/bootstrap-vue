import MainDocs from '~/components/main-docs'
import docsMixin from '~/plugins/docs-mixin'
import { reference as referenceMeta } from '~/content'

const getReadmeData = name => {
  try {
    return import(`~/markdown/reference/${name}/README.md` /* webpackChunkName: "docs/reference" */)
  } catch {
    return { default: { loadError: true } }
  }
}

// @vue/component
export default {
  name: 'BDVReference',
  mixins: [docsMixin],
  layout: 'docs',
  validate({ params }) {
    return Boolean(referenceMeta[params.slug])
  },
  async asyncData({ params }) {
    const name = params.slug
    const meta = referenceMeta[name]
    const readmeData = (await getReadmeData(name)).default
    const { titleLead = '', body = '', baseTOC = {}, loadError = false } = readmeData

    return { meta, titleLead, body, baseTOC, loadError }
  },
  render(h) {
    return h(MainDocs, {
      staticClass: 'bd-components',
      props: {
        meta: this.meta,
        titleLead: this.titleLead,
        body: this.body,
        loadError: this.loadError
      }
    })
  }
}
