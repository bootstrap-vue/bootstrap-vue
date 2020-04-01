import CarbonAd from '~/components/carbon-ad'
import QuickLinks from '~/components/quick-links.vue'
import Section from '~/components/section'
import { parseReadme } from '~/utils'

export default {
  name: 'BVMainDocs',
  props: {
    titleLead: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
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
    computedTitleLead() {
      return this.docs.titleLead || ''
    },
    computedBody() {
      return this.docs.body || ''
    },
    availableSince() {
      const { version } = this.meta || {}
      return version
        ? `Available in BootstrapVue since <code class="text-nowrap">v${version}</code>.`
        : ''
    }
  },
  render(h) {
    const docsPath = this.$route.path

    // Lead section
    const $leadSection = h(Section, {
      key: `lead-${this.docsPath}`,
      props: { tag: 'header', play: false },
      domProps: { innerHTML: this.titleLead || this.computedTitleLead }
    })

    // Available since section
    let $availableSinceSection = h()
    if (this.availableSince) {
      $availableSinceSection = h(Section, { key: `avail-${docsPath}`, props: { play: false } }, [
        h('p', { staticClass: 'font-italic', domProps: { innerHTML: this.availableSince } })
      ])
    }

    // Carbon Ad
    const $carbonAd = h(CarbonAd, { key: `ad-${docsPath}` })

    // Quick links
    const $quickLinks = h(QuickLinks, { key: `quick-${docsPath}` })

    // Body section
    const $bodySection = h(Section, {
      key: `body-${docsPath}`,
      props: { play: true },
      domProps: { innerHTML: this.body || this.computedBody }
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
