import hljs from '~/utils/hljs'
import MainDocs from '~/components/main-docs'
import docsMixin from '~/plugins/docs-mixin'
import { reference as referenceMeta, defaultConfig } from '~/content'

const getReadmeData = name => {
  try {
    return import(`~/markdown/reference/${name}/README.md` /* webpackChunkName: "docs/reference" */)
  } catch {
    return { default: { loadError: true } }
  }
}

const replacer = (key, value) => (typeof value === 'undefined' ? null : value)

// @vue/component
export default {
  name: 'BDVReference',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(referenceMeta[params.slug])
  },
  async asyncData({ params }) {
    const name = params.slug
    const meta = referenceMeta[name]
    const readmeData = (await getReadmeData(name)).default
    let { titleLead = '', body = '', baseTOC = {}, loadError = false } = readmeData
    body = body.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, replacer, 2)).value
    )
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
