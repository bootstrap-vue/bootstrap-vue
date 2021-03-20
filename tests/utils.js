import { nextTick } from 'vue'
// --- Utils for testing ---

export const createContainer = (tag = 'div') => {
  const container = document.createElement(tag)
  document.body.appendChild(container)
  return container
}

export const waitNT = () => new Promise(resolve => nextTick(resolve))
export const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))
