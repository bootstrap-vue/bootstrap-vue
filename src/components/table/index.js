import BTable from './table'
import { installFactory } from '../../utils/plugins'

const components = {
  BTable
}

export default {
  install: installFactory({ components })
}
