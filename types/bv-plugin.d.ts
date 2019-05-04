import Vue, {
  Component,
  AsyncComponent,
  ComponentOptions,
  DirectiveOptions,
  DirectiveFunction,
  PluginFunction,
  PluginObject
} from 'vue'

export interface BvComponentOptions {
  [key: string]?: string | string[] | number | boolean | object | any
}

export interface BvConfigOptions {
  [key: string]?: BvComponentOptions
}

export interface BvPlugin {
  install: PluginFunction<BvConfigOptions>
}
