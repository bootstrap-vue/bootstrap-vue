import BProgress from './progress'
import BProgressBar from './progress-bar'
import { installFactory } from '../../utils/plugins'

const components = {
  BProgress,
  BProgressBar
}

export default {
  install: installFactory({ components })
}
