const pkg = require('../package.json')
const year = new Date().getFullYear()

const banner = `/*!
 * BoostrapVue ${pkg.version}
 *
 * @link ${pkg.homepage}
 * @source https://github.com/bootstrap-vue/bootstrap-vue
 * @copyright (c) 2016-${year} BootstrapVue
 * @license ${pkg.license}
 * https://github.com/bootstrap-vue/bootstrap-vue/blob/master/LICENSE
 */
`

module.exports = banner
