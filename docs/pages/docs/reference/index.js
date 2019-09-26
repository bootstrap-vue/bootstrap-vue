import SectionToc from '~/components/section-toc.vue'
import docsMixin from '~/plugins/docs-mixin'

export default {
  name: 'BVDocsReferenceIndex',
  mixins: [docsMixin],
  extends: SectionToc
}
