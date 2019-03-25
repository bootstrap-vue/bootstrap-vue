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
  template: `<div class="container bd-content">${readme}</div>`,
  layout: 'docs'
}
