import { bootstrapVersion, vueVersion, nuxtVersion, defaultConfig } from '~/content'
import docsMixin from '~/plugins/docs-mixin'
import readme from '~/markdown/intro/README.md'

export default {
  mixins: [docsMixin],
  data() {
    return {
      readme,
      bootstrapVersion,
      vueVersion,
      nuxtVersion,
      defaultConfig
    }
  },
  // We use a string template here so that the docs README can do interpolation
  template: `<main class="container"><div class="bd-content">${readme}</div></main>`,
  layout: 'docs'
}
