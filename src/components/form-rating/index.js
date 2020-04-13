import { BFormRating } from './form-rating'
import { pluginFactory } from '../../utils/plugins'

const FormRatingPlugin = /*#__PURE__*/ pluginFactory({
  components: { BFormRating, BRating: BFormRating }
})

export { FormRatingPlugin, BFormRating }
