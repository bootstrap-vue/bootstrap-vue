// Polyfills for SSR

const isSSR = typeof window === 'undefined'

export const HTMLElement = isSSR ? Object : window.HTMLElement
