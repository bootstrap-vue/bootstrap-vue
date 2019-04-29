import Vue, {
  Component,
  AsyncComponent,
  ComponentOptions,
  DirectiveOptions,
  DirectiveFunction,
  PluginFunction,
  PluginObject
} from 'vue'

interface BvComponentsObject {
  [key: string]?: Component | AsyncComponent | ComponentOptions
}

interface BvDirectivesObject {
  [key: string]?: DirectiveOptions | DirectiveFunction
}

interface BvPluginsObject {
  [key: string]?: BvPlugin
}

export interface BvComponentOptions {
  [key: string]?: string | number | boolean | any
}

export interface BvInstallOptions {
  breakpoints?: string[]
  [key: string]?: BvComponentOptions
}

export interface BvPlugin {
  install: PluginFunction<BvInstallOptions>
  components?: BvComponentsObject
  directives?: BvDirectivesObject
  plugins?: BvPluginsObject
}
