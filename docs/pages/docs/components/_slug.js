import AnchoredHeading from '~/components/anchored-heading'
import Componentdoc from '~/components/componentdoc'
import Importdoc from '~/components/importdoc'
import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { components as componentsMeta } from '~/content'

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
      h(AnchoredHeading, { props: { id: 'component-reference' } }, 'Component reference'),
      // Component reference information
      ...this.meta.components.map(({ component, events, rootEventListeners, slots, aliases }) =>
        h(Componentdoc, {
          props: { component, events, rootEventListeners, slots, aliases }
        })
      ),
      // Component importing information
      h(Importdoc, { props: { meta: this.meta } })
    ])
    return h(Main, { staticClass: 'bd-components' }, [$readmeSection, $referenceSection])
  }
}
