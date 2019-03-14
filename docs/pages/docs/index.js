import { bootstrapVersion, vueVersion } from '~/content'
import docsMixin from '~/plugins/docs-mixin'
import readme from '~/markdown/intro/README.md'

export default {
  mixins: [docsMixin],
  data() {
    return { bootstrapVersion, vueVersion }
  },
  template: `<div class="container bd-content">${readme}</div>`,
  layout: 'docs'
}
