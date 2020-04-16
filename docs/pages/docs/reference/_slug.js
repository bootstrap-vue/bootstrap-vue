import hljs from '~/utils/hljs'
import MainDocs from '~/components/main-docs'
import docsMixin from '~/plugins/docs-mixin'
import { reference as referenceMeta, defaultConfig } from '~/content'

const getReadMe = name => {
  let base = '/markdown/reference/'
  let file = 'README.md'
  name = `${name}/`
  if (name === 'changelog/') {
    name = ''
    base = '/../'
    file = 'CHANGELOG.md'
  } else if (name === 'contributing/') {
    name = ''
    base = '/../'
    file = 'CONTRIBUTING.md'
  }
  import(`~${base}${name}${file}` /* webpackChunkName: "docs/reference" */)
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
    let readme = (await getReadMe(params.slug)).default
    const meta = referenceMeta[params.slug]
    readme = readme.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, replacer, 2)).value
    )
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
