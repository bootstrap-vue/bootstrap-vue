/**
 * Utils for testing
 */

import FakeTransition from './fake-tansition'
import FakeTransitionGroup from './fake-tansition-group'

export const waitNT = ctx => new Promise(resolve => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))

export { FakeTransition, FakeTransitionGroup }
