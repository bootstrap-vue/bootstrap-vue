import { BCalendar } from './calendar'
import { pluginFactory } from '../../utils/plugins'

const CalendarPlugin = /*#__PURE__*/ pluginFactory({
  components: { BCalendar }
})

export { CalendarPlugin, BCalendar }
