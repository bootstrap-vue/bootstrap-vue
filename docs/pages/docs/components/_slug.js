import AnchoredHeading from '~/components/anchored-heading'
import CarbonAd from '~/components/ad'
import Componentdoc from '~/components/componentdoc'
import Importdoc from '~/components/importdoc'
import Main from '~/components/main'
import Section from '~/components/section'
import QuickLinks from '~/components/quick-links.vue'
import docsMixin from '~/plugins/docs-mixin'
import { components as componentsMeta } from '~/content'
import { splitReadme } from '~/utils'

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
    return h(Main, { staticClass: 'bd-components' }, [
      $leadSection,
      $carbonAd,
      $quickLinks,
      $bodySection,
      $referenceSection
    ])
  }
}
