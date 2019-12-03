/**
 * Utils for testing
 */

import FakeTransition from './stubs/fake-transition'
import FakeTransitionGroup from './stubs/fake-transition-group'

export const waitNT = ctx => new Promise(resolve => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))

export { FakeTransition, FakeTransitionGroup }
