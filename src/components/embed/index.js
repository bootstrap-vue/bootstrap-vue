import BEmbed from './embed'
import { installFactory } from '../../utils/plugins'

const components = {
  BEmbed
}

export default {
  install: installFactory({ components })
}
