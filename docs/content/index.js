import { importAll, parseVersion, parseFullVersion } from '~/utils'
import { version, dependencies, devDependencies, description } from '~/../package.json'
import DEFAULT_CONFIG from '~/../src/utils/config-defaults'

const componentsContext = require.context('~/../src/components/', true, /package.json/)
export const components = importAll(componentsContext)

const directivesContext = require.context('~/../src/directives/', true, /package.json/)
export const directives = importAll(directivesContext)

const iconsContext = require.context('~/../src/icons', false, /package.json/)
const icons = importAll(iconsContext) || {}
// Since there are over 300 icons, we only return `BIcon` and `BIconstack` component, plus
// one extra example icon component which we modify the icon name to be `BIcon{IconName}`
// We sort the array to ensure `BIcon` appears first
icons[''].components = icons[''].components
  .filter(c => c.component === 'BIconBlank' || !/^BIcon[A-Z]/.test(c.component))
  .sort((a, b) => (a.component < b.component ? -1 : a.component > b.component ? 1 : 0))
  .map(c => {
    c = { ...c }
    if (c.component === 'BIconBlank') {
      c.component = 'BIcon{IconName}'
      // We add a special `srcComponent` to grab the prop `$options` data from
      c.srcComponent = 'BIconBlank'
    }
    return c
  })
export { icons }

const referenceContext = require.context('~/markdown/reference', true, /meta.json/)
export const reference = importAll(referenceContext)

export const nav = [
  {
    title: 'Getting started',
    base: '',
    exact: true
  },
  {
    title: 'Components',
    base: 'components/',
    pages: components,
    description: 'BootstrapVue components and component group plugins.'
  },
  {
    title: 'Directives',
    base: 'directives/',
    pages: directives,
    description: 'BootstrapVue directives and directive group plugins.'
  },
  {
    title: 'Icons',
    base: 'icons',
    version: '2.3.0',
    description: 'BootstrapVue icons.'
  },
  {
    title: 'Reference',
    base: 'reference/',
    pages: reference,
    description: 'BootstrapVue and Bootstrap reference, and additional resources documentation.'
  }
]

export const bootstrapVersion = parseVersion(dependencies.bootstrap)
export const bootstrapIconsVersion = parseFullVersion(devDependencies['bootstrap-icons'])
export const popperVersion = parseVersion(dependencies['popper.js'])
export const portalVueVersion = parseVersion(dependencies['portal-vue'])
export const nuxtVersion = parseVersion(devDependencies.nuxt)
export const vueVersion = parseVersion(devDependencies.vue)
export const defaultConfig = DEFAULT_CONFIG
export const bvDescription = description

export { version }
