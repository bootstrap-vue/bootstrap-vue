/**
 * Utils for testing
 */

import FakeTransition from './fake-tansition.js'

export const waitNT = ctx => new Promise(resolve => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))

export { FakeTransiton }
