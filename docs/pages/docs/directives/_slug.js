import AnchoredHeading from '~/components/anchored-heading'
import Importdoc from '~/components/importdoc'
import MainDocs from '~/components/main-docs'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { directives as directivesMeta } from '~/content'

const getReadmeData = name => {
  try {
    return import(`~/../src/directives/${name}/README.md` /* webpackChunkName: "docs/directives" */)
  } catch {
    return { default: { loadError: true } }
  }
}

// @vue/component
export default {
  name: 'BDVDirectives',
  mixins: [docsMixin],
  layout: 'docs',
  validate({ params }) {
    return Boolean(directivesMeta[params.slug])
  },
  async asyncData({ params }) {
    const name = params.slug
    const meta = directivesMeta[name]
    const readmeData = (await getReadmeData(name)).default
    const { titleLead = '', body = '', baseTOC = {}, loadError = false } = readmeData
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
