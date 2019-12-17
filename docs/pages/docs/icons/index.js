import AnchoredHeading from '~/components/anchored-heading'
import Componentdoc from '~/components/componentdoc'
import IconsTable from '~/components/icons-table'
import Importdoc from '~/components/importdoc'
import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { icons as iconsMeta, bootstrapIconsVersion } from '~/content'
import readme from '~/../src/icons/README.md'

export default {
  name: 'BDVIcons',
  layout: 'docs',
  // We use a string template here so that the docs README can do interpolation
  template: `
    <Main class="bd-components">
      <Section play>${readme}</Section>
      <Section class="bd-component-reference">
        <AnchoredHeading id="component-reference">Component reference</AnchoredHeading>
        <template v-for="c in componentMeta">
          <Componentdoc
            :key="c.component"
            :component="c.component"
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
            All individual icon components have the same props as <code>&lt;b-icon&gt;</code> other
            than the <code>icon</code> prop.
          </p>
        </div>
        <Importdoc :meta="importMeta"></ImportDoc>
      </Section>
    </Main>`,
  components: {
    AnchoredHeading,
    Componentdoc,
    IconsTable,
    Importdoc,
    Main,
    Section
  },
  mixins: [docsMixin],
  data() {
    return {
      readme: readme,
      // key for icons meta is '' (empty slug)
      meta: iconsMeta[''],
      bootstrapIconsVersion
    }
  },
  computed: {
    componentMeta() {
      // We only return the first BIcon component, plus one extra example
      // icon component which we modify the icon name to be `BIcon{IconName}`
      // We sort the array to ensure `BIcon` appears first
      const components = this.meta.components
        .sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
        .slice(0, 2)
        .map(c => ({ ...c }))
      // Change the name of the example icon component
      components[1].component = 'BIcon{IconName}'
      // Return the shortend list of components
      return components
    },
    importMeta() {
      return { ...this.meta, slug: 'icons', components: this.componentMeta }
    }
  }
}
