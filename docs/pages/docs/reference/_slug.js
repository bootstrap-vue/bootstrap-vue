import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { reference as referenceMeta } from '~/content'

const getReadMe = name =>
  import(`~/markdown/reference/${name}/README.md` /* webpackChunkName: "docs/reference" */)

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
    return { readme, meta }
  },
  render(h) {
    // Readme section
    const $readmeSection = h(Section, {
      props: { play: true },
      domProps: { innerHTML: this.readme }
    })
    return h(Main, { staticClass: 'bd-components' }, [$readmeSection])
  }
}
