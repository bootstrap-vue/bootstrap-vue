import hljs from '~/utils/hljs'
import MainDocs from '~/components/main-docs'
import docsMixin from '~/plugins/docs-mixin'
import { reference as referenceMeta, defaultConfig } from '~/content'

const getReadMeData = slug => {
  return import(`~/markdown/reference/${slug}/README.md` /* webpackChunkName: "docs/reference" */)
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
    const readmeData = (await getReadMeData(params.slug)).default
    const titleLead = readmeData.titleLead || ''
    let body = readmeData.body || ''
    const baseTOC = readmeData.baseTOC || {}
    const meta = referenceMeta[params.slug]
    body = body.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, replacer, 2)).value
    )
    return { meta, titleLead, body, baseTOC }
  },
  render(h) {
    return h(MainDocs, {
      staticClass: 'bd-components',
      props: {
        meta: this.meta,
        titleLead: this.titleLead,
        body: this.body
      }
    })
  }
}
