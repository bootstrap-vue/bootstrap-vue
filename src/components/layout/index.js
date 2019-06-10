import { BContainer } from './container'
import { BRow } from './row'
import { BCol } from './col'
import { BFormRow } from './form-row'
import { pluginFactory } from '../../utils/plugins'

const LayoutPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BContainer,
    BRow,
    BCol,
    BFormRow
  }
})

export { LayoutPlugin, BContainer, BRow, BCol, BFormRow }

export default LayoutPlugin
