import SectionToc from '~/components/section-toc.vue'
import docsMixin from '~/plugins/docs-mixin'

export default {
  name: 'BVDocsMiscIndex',
  mixins: [docsMixin],
  extends: SectionToc
}
