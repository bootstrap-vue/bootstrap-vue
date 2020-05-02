import AnchoredHeading from '~/components/anchored-heading'
import Componentdoc from '~/components/componentdoc'
import Importdoc from '~/components/importdoc'
import MainDocs from '~/components/main-docs'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { components as componentsMeta } from '~/content'

// TODO:
//   Add error detection when chunk not available
//   due to docs updates. Perhaps show a message to
//   reload docs, or perhaps auto re-load
const getReadMe = name =>
  import(`~/../src/components/${name}/README.md` /* webpackChunkName: "docs/components" */)

// @vue/component
export default {
  name: 'BDVComponents',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(componentsMeta[params.slug])
  },
  async asyncData({ params }) {
    const readmeData = (await getReadMe(params.slug)).default
    const titleLead = readmeData.titleLead || ''
    const body = readmeData.body || ''
    const baseTOC = readmeData.baseTOC || {}
    const meta = componentsMeta[params.slug]
    return { meta, titleLead, body, baseTOC }
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
          meta: this.meta,
          titleLead: this.titleLead,
          body: this.body,
          // TODO: remove this once new docs-loader implemented
          readme: this.readme || ''
        }
      },
      [$referenceSection]
    )
  }
}
