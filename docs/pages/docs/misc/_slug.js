import hljs from '~/utils/hljs'
import CarbonAd from '~/components/ad'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links.vue'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { misc as miscMeta, defaultConfig } from '~/content'
import { splitReadme } from '~/utils'

const getReadMe = name =>
  import(`~/markdown/misc/${name}/README.md` /* webpackChunkName: "docs/misc" */)

export default {
  name: 'BDVMisc',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(miscMeta[params.slug])
  },
  async asyncData({ params }) {
    let readme = (await getReadMe(params.slug)).default
    readme = readme.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, undefined, 2)).value
    )
    const { titleLead, body } = splitReadme(readme)
    const meta = miscMeta[params.slug]
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
    return h(Main, { staticClass: 'bd-components' }, [
      $leadSection,
      $carbonAd,
      $quickLinks,
      $bodySection
    ])
  }
}
