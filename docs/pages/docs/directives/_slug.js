import AnchoredHeading from '~/components/anchored-heading'
import CarbonAd from '~/components/ad'
import Importdoc from '~/components/importdoc'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links.vue'
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
    const { titleLead, body } = splitReadme(readme)
    const meta = componentsMeta[params.slug]
    return { meta, titleLead, body }
  },
  render(h) {
    // Lead section
    const $leadSection = h(Section, {
      props: { play: false },
      domProps: { innerHTML: this.titleLead }
    })
    // CarbonAd
    const $carbonAd = h(CarbonAd, { key: `ad-${this.$route.path}` })
    // Quick links
    const $quickLinks = h(QuickLinks, { key: `quick-${this.$route.path}` })
    // Body section
    const $bodySection = h(Section, {
      props: { play: true },
      domProps: { innerHTML: this.body }
    })
    // Reference section
    const $referenceSection = h(Section, { class: ['bd-component-reference'] }, [
      // Heading
      h(AnchoredHeading, { props: { id: 'directive-reference' } }, 'Directive reference'),
      // Directive importing information
      h(Importdoc, { props: { meta: this.meta } })
    ])
    return h(Main, { staticClass: 'bd-components' }, [
      $leadSection,
      $carbonAd,
      $quickLinks,
      $bodySection,
      $referenceSection
    ])
  }
}
