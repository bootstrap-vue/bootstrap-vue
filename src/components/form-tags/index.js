import { BFormTags } from './form-tags'
import { pluginFactory } from '../../utils/plugins'

const FormTagsPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormTags,
    BTags: BFormTags
  }
})

export { FormTagsPlugin, BFormTags }
