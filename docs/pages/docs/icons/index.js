import AnchoredHeading from '~/components/anchored-heading'
import CarbonAd from '~/components/carbon-ad'
import Componentdoc from '~/components/componentdoc'
import IconsTable from '~/components/icons-table'
import Importdoc from '~/components/importdoc'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import {
  icons as iconsMeta,
  bootstrapIconsVersion,
  bootstrapIconsCount,
  bootstrapVersion,
  vueVersion
} from '~/content'
import readmeData from '~/../src/icons/README.md'

const { titleLead = '', body = '', baseTOC = {} } = readmeData

// @vue/component
export default {
  name: 'BDVIcons',
  components: {
    AnchoredHeading,
    CarbonAd,
    Componentdoc,
    IconsTable,
    Importdoc,
    Main,
    QuickLinks,
    Section
  },
  mixins: [docsMixin],
  layout: 'docs',
  data() {
    return {
      titleLead,
      body,
      baseTOC,
      // Key for icons meta is `''` (empty slug)
      meta: iconsMeta[''],
      bootstrapIconsVersion,
      bootstrapIconsCount,
      bootstrapVersion,
      vueVersion
    }
  },
  computed: {
    componentMeta() {
      // `docs/content/index.js` massages the list of icon components
      // to include only `BIcon`, `BIconstack` and an example component
      // The example icon has a special `srcComponent` property that lists
      // `BIconBlank` as the component to grab the `$options.props` from
      return this.meta.components
    },
    importMeta() {
      return { ...this.meta, slug: 'icons', components: this.componentMeta }
    }
  },
  // We use a string template here so that the docs README can do interpolation
  template: `
    <Main class="bd-components">
      <Section tag="header">${titleLead}</Section>
      <CarbonAd key="ad-/docs/icons"></CarbonAd>
      <QuickLinks key="quick-/docs/icons"></QuickLinks>
      <Section play>${body}</Section>
      <Section class="bd-component-reference">
        <AnchoredHeading id="component-reference">Component reference</AnchoredHeading>
        <template v-for="c in componentMeta">
          <Componentdoc
            :key="c.component"
            :component="c.component"
            :src-component="c.srcComponent"
            :events="c.events"
            :root-event-listeners="c.rootEventListeners"
            :slots="c.slots"
            :aliases="c.aliases"
            :props-meta="c.props"
            :version="c.version"
          ></Componentdoc>
        </template>
        <div class="alert alert-info small">
          <p class="mb-0">
            Individual icon components are not listed here due to the large number of components.
          </p>
        </div>
        <Importdoc :meta="importMeta"></ImportDoc>
        <p>
          <code>IconsPlugin</code> is also exported as <code>BootstrapVueIcons</code>.
        </p>
      </Section>
    </Main>`
}
