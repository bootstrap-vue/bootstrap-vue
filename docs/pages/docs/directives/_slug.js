import AnchoredHeading from '~/components/anchored-heading'
import Importdoc from '~/components/importdoc'
import MainDocs from '~/components/main-docs'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { directives as directivesMeta } from '~/content'

const getReadMeData = name => {
  try {
    return import(`~/../src/directives/${name}/README.md` /* webpackChunkName: "docs/directives" */)
  } catch {
    // If the dynamic import fails to load, trap the error
    return { loadError: true }
  }
}

// @vue/component
export default {
  name: 'BDVDirectives',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(directivesMeta[params.slug])
  },
  async asyncData({ params }) {
    const readmeData = (await getReadMeData(params.slug)).default || { loadError: true }
    const loadError = readmeData.loadError || false
    const titleLead = readmeData.titleLead || ''
    const body = readmeData.body || ''
    const baseTOC = readmeData.baseTOC || {}
    const meta = directivesMeta[params.slug]
    return { meta, titleLead, body, baseTOC, loadError }
  },
  render(h) {
    const $referenceSection = h(Section, { class: ['bd-component-reference'] }, [
      // Heading
      h(AnchoredHeading, { props: { id: 'directive-reference' } }, 'Directive reference'),
      // Directive importing information
      h(Importdoc, { props: { meta: this.meta } })
    ])

    return h(
      MainDocs,
      {
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
