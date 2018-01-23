import InputGroupAddon, { propsFactory } from './input-group-addon'

export default {
  functional: true,
  props: propsFactory(true),
  render: InputGroupAddon.render
}
