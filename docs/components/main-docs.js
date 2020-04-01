import CarbonAd from '~/components/carbon-ad'
import QuickLinks from '~/components/quick-links.vue'
import Section from '~/components/section'
import { parseReadme } from '~/utils'

export default {
  name: 'BVMainDocs',
  props: {
    readme: {
      type: String,
      default: ''
    },
    meta: {
      type: Object,
      default: null
    },
    tag: {
      type: String,
      default: 'main'
    }
  },
  computed: {
    docs() {
      return parseReadme(this.readme || '')
    },
    titleLead() {
      return this.docs.titleLead || ''
    },
    availableSince() {
      const { version } = this.meta || {}
      return version
        ? `Available in BootstrapVue since <code class="text-nowrap">v${version}</code>.`
        : ''
    },
    body() {
      return this.docs.body || this.readme
    },
    docsPath() {
      return this.$route.path
    }
  },
  render(h) {
    // Lead section
    const $leadSection = h(Section, {
      props: { tag: 'header', play: false },
      domProps: { innerHTML: this.titleLead }
    })
    // Available since section
    let $availableSinceSection = h()
    if (this.availableSince) {
      $availableSinceSection = h(Section, { props: { play: false } }, [
        h('p', { staticClass: 'font-italic', domProps: { innerHTML: this.availableSince } })
      ])
    }
    // Carbon Ad
    const $carbonAd = h(CarbonAd, { key: `ad-${this.docPath}` })
    // Quick links
    const $quickLinks = h(QuickLinks, { key: `quick-${this.docsPath}` })
    // Body section
    const $bodySection = h(Section, {
      props: { play: true },
      domProps: { innerHTML: this.body }
    })

    return h(this.tag, { staticClass: 'bd-main' }, [
      $leadSection,
      $availableSinceSection,
      $carbonAd,
      $quickLinks,
      $bodySection,
      this.$scopedSlots.default ? this.$scopedSlots.default() : this.$slots.default
    ])
  }
}
