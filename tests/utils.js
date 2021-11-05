// --- Utils for testing ---

export const waitNT = ctx => new Promise(resolve => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))
