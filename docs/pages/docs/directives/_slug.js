import AnchoredHeading from '~/components/anchored-heading'
import Importdoc from '~/components/importdoc'
import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { directives as directivesMeta } from '~/content'

const getReadMe = name =>
  import(`~/../src/directives/${name}/README.md` /* webpackChunkName: "docs/directives" */)

export default {
  name: 'BDVDirectives',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(directivesMeta[params.slug])
  },
  async asyncData({ params }) {
    const readme = (await getReadMe(params.slug)).default
    const meta = directivesMeta[params.slug]
    return { readme, meta }
  },
  render(h) {
    // Readme section
    const $readmeSection = h(Section, {
      props: { play: true },
      domProps: { innerHTML: this.readme }
    })
    // Reference section
    const $referenceSection = h(Section, { class: ['bd-component-reference'] }, [
      // Heading
      h(AnchoredHeading, { props: { id: 'directive-reference' } }, 'Directive reference'),
      // Directive importing information
      h(Importdoc, { props: { meta: this.meta } })
    ])
    return h(Main, { staticClass: 'bd-components' }, [$readmeSection, $referenceSection])
  }
}
