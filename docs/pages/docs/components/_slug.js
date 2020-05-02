import AnchoredHeading from '~/components/anchored-heading'
import Componentdoc from '~/components/componentdoc'
import Importdoc from '~/components/importdoc'
import MainDocs from '~/components/main-docs'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { components as componentsMeta } from '~/content'

const getReadMeData = name => {
  try {
    return import(`~/../src/components/${name}/README.md` /* webpackChunkName: "docs/components" */)
  } catch {
    // If the dynamic import fails to load, trap the error
    return { loadError: true }
  }
}

// @vue/component
export default {
  name: 'BDVComponents',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(componentsMeta[params.slug])
  },
  async asyncData({ params }) {
    const readmeData = (await getReadMeData(params.slug)).default
    const loadError = readmeData.loaderror || false
    const titleLead = readmeData.titleLead || ''
    const body = readmeData.body || ''
    const baseTOC = readmeData.baseTOC || {}
    const meta = componentsMeta[params.slug]
    return { meta, titleLead, body, baseTOC, loadError }
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
          loadError: this.loadError
        }
      },
      [$referenceSection]
    )
  }
}
