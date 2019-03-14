import { importAll, parseVersion } from '~/utils'
import { version, dependencies, devDependencies } from '~/../package.json'

const componentsContext = require.context('~/../src/components/', true, /package.json/)
export const components = importAll(componentsContext)

const directivesContext = require.context('~/../src/directives/', true, /package.json/)
export const directives = importAll(directivesContext)

const referenceContext = require.context('~/markdown/reference', true, /meta.json/)
export const reference = importAll(referenceContext)

const miscContext = require.context('~/markdown/misc', true, /meta.json/)
export const misc = importAll(miscContext)

export const nav = [
  {
    title: 'Getting started',
    base: ''
  },
  {
    title: 'Components',
    base: 'components/',
    pages: components
  },
  {
    title: 'Directives',
    base: 'directives/',
    pages: directives
  },
  {
    title: 'Reference',
    base: 'reference/',
    pages: reference
  },
  {
    title: 'Misc',
    base: 'misc/',
    pages: misc
  }
]

export const bootstrapVersion = parseVersion(dependencies.bootstrap)
export const vueVersion = parseVersion(devDependencies.vue)

export { version }
