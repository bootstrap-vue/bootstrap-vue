import { isVue2, Vue as OurVue } from '../vue'
import { ROOT_EVENT_EMITTER_KEY } from '../constants/events'
import { setConfig } from './config-set'
import { createEmitter } from './emitter'
import { hasWindowSupport, isJSDOM } from './env'
import { warn } from './warn'

/**
 * Checks if there are multiple instances of Vue, and warns (once) about possible issues
 * @param {object} Vue
 */
const checkMultipleVue = (() => {
  let checkMultipleVueWarned = false

  const MULTIPLE_VUE_WARNING = [
    'Multiple instances of Vue detected!',
    'You may need to set up an alias for Vue in your bundler config.',
    'See: https://bootstrap-vue.org/docs#using-module-bundlers'
  ].join('\n')

  return Vue => {
    /* istanbul ignore next */
    if (!isVue2 && !checkMultipleVueWarned && OurVue !== Vue && !isJSDOM) {
      warn(MULTIPLE_VUE_WARNING)
    }
    checkMultipleVueWarned = true
  }
})()

/**
 * Register a emitter
 * @param {object} app
 */
const registerEmitter = (app, key) => {
  if (isVue2 ? app.prototype[key] : app.config.globalProperties[key]) {
    return
  }
  const emitter = createEmitter()
  if (isVue2) {
    app.prototype[key] = emitter
  } else {
    app.config.globalProperties[key] = emitter
  }
}

/**
 * Register a component
 * @param {object} app
 * @param {string} name
 * @param {object} component
 */
const registerComponent = (app, name, component) => {
  if (app && name && component) {
    app.component(name, component)
  }
}

/**
 * Register a group of components
 * @param {object} app
 * @param {object} components
 */
const registerComponents = (app, components = {}) => {
  for (const name in components) {
    registerComponent(app, name, components[name])
  }
}

/**
 * Register a directive
 * @param {object} pp
 * @param {string} name
 * @param {object} directive
 */
const registerDirective = (app, name, directive) => {
  if (app && name && directive) {
    // Ensure that any leading 'V' is removed from the name,
    // as Vue adds it automatically
    app.directive(name.replace(/^VB/, 'B'), directive)
  }
}

/**
 * Register a group of directives
 * @param {object} app
 * @param {object} directives of directive definitions
 */
const registerDirectives = (app, directives = {}) => {
  for (const name in directives) {
    registerDirective(app, name, directives[name])
  }
}

/**
 * Register a group of plugins
 * @param {object} app
 * @param {object} plugins
 */
const registerPlugins = (app, plugins = {}) => {
  for (const plugin in plugins) {
    if (plugin) {
      app.use(plugin)
    }
  }
}

/**
 * Plugin install factory function
 * @param {object} options
 * @param {boolean} globalConfig
 * @returns {function}
 */
export const installFactory = (
  { components = {}, directives = {}, plugins = {} } = {},
  globalConfig = true
) => {
  const install = (app, config = {}) => {
    /* istanbul ignore next */
    if (install.installed) {
      return
    }
    checkMultipleVue(app)
    if (globalConfig) {
      setConfig(app, config)
    }
    registerEmitter(app, ROOT_EVENT_EMITTER_KEY)
    registerComponents(app, components)
    registerComponents(app, components)
    registerDirectives(app, directives)
    registerPlugins(app, plugins)
    install.installed = true
  }

  install.installed = false

  return install
}

/**
 * Plugin object factory function
 * @param {object} options { components, directives, plugins }
 * @param {object} extend
 * @returns {object}
 */
export const pluginFactory = (options = {}, extend = {}) => ({
  ...extend,
  install: installFactory(options)
})

/**
 * Plugin object factory function (no config option)
 * @param {object} options { components, directives, plugins }
 * @param {object} extend
 * @returns {object}
 */
export const pluginFactoryNoConfig = (options = {}, extend = {}) => ({
  ...extend,
  install: installFactory(options, false)
})

/**
 * Install plugin if `window.Vue` available
 * @param {object} plugin
 */
export const vueUse = plugin => {
  /* istanbul ignore next */
  if (!isVue2) {
    return
  }
  /* istanbul ignore next */
  if (hasWindowSupport && window.Vue) {
    window.Vue.use(plugin)
  }
  /* istanbul ignore next */
  if (hasWindowSupport && plugin.NAME) {
    window[plugin.NAME] = plugin
  }
}
