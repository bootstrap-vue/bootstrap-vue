import hljs from '~/utils/hljs'
import MainDocs from '~/components/main-docs'
import docsMixin from '~/plugins/docs-mixin'
import { reference as referenceMeta, defaultConfig } from '~/content'

const getReadMe = slug => {
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
    const readmeData = (await getReadMe(params.slug)).default
    const titleLead = readmeData.titleLead || ''
    let body = readmeData.body || ''
    const baseTOC = readmeData.baseTOC || {}
    const meta = referenceMeta[params.slug]
    body = body.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, replacer, 2)).value
    )
    let readme = String(readmeData)
    readme = readme.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, replacer, 2)).value
    )
    return { meta, readme, titleLead, body, baseTOC }
  },
  render(h) {
    return h(MainDocs, {
      staticClass: 'bd-components',
      props: {
        meta: this.meta,
        titleLead: this.titleLead,
        body: this.body,
        // TODO: remove once docs-loader is implemented
        readme: this.readme,
      }
    })
  }
}
