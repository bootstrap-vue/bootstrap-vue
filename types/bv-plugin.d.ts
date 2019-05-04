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
  [key: string]: Component | AsyncComponent | ComponentOptions
}

interface BvDirectivesObject {
  [key: string]: DirectiveOptions | DirectiveFunction
}

interface BvPluginsObject {
  [key: string]: BvPlugin
}

export interface BvComponentOptions {
  [key: string]: string | number | boolean | any
}

export interface BvConfigOptions {
  breakpoints?: string[]
  [key: string]?: BvComponentOptions
}

export interface BvPlugin {
  install: PluginFunction<BvConfigOptions>
  components?: BvComponentsObject
  directives?: BvDirectivesObject
  plugins?: BvPluginsObject
}
