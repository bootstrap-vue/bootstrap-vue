import AnchoredHeading from '~/components/anchored-heading'
import Componentdoc from '~/components/componentdoc'
import Importdoc from '~/components/importdoc'
import MainDocs from '~/components/main-docs'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { components as componentsMeta } from '~/content'
import { parseReadme } from '~/utils'

const getReadMe = name =>
  import(`~/../src/components/${name}/README.md` /* webpackChunkName: "docs/components" */)

export default {
  name: 'BDVComponents',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(componentsMeta[params.slug])
  },
  async asyncData({ params }) {
    const readme = (await getReadMe(params.slug)).default
    const meta = componentsMeta[params.slug]
    const { titleLead, body } = parseReadme(readme)
    return { meta, readme, titleLead, body }
  },
  render(h) {
    // Reference section
    const $referenceSection = h(Section, { class: ['bd-component-reference'] }, [
      // Heading
      h(AnchoredHeading, { props: { id: 'component-reference' } }, 'Component reference'),
      // Component reference information
      ...this.meta.components.map(
        ({ component, events, rootEventListeners, slots, aliases, props: propsMeta, version }) =>
          h(Componentdoc, {
            props: { component, events, rootEventListeners, slots, aliases, propsMeta, version }
          })
      ),
      // Component importing information
      h(Importdoc, { props: { meta: this.meta } })
    ])

    return h(
      MainDocs,
      {
        key: this.$route.path,
        staticClass: 'bd-components',
        props: {
          readme: this.readme || '',
          titleLead: this.titleLead || '',
          body: this.body || '',
          meta: this.meta
        }
      },
      [$referenceSection]
    )
  }
}
