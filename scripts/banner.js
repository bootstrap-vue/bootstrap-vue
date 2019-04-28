import { homepage, license, version } from '../package.json'

const year = new Date().getFullYear()

const banner = `/*!
 * BoostrapVue ${version}
 *
 * @link ${homepage}
 * @source https://github.com/bootstrap-vue/bootstrap-vue
 * @copyright (c) 2016-${year} BootstrapVue
 * @license ${license}
 * https://github.com/bootstrap-vue/bootstrap-vue/blob/master/LICENSE
 */
`

export default banner
