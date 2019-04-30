import BJumbotron from './jumbotron'
import { installFactory } from '../../utils/plugins'

const components = {
  BJumbotron
}

export { BJumbotron }

export default {
  install: installFactory({ components })
}
