import mitt from 'mitt'

export const createEmitter = () => {
  const emitter = mitt()

  emitter.once = (type, handler) => {
    const wrappedHandler = evt => {
      handler(evt)
      emitter.off(type, wrappedHandler)
    }
    emitter.on(type, wrappedHandler)
  }

  return emitter
}
