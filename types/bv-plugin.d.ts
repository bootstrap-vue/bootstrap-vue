import Vue, { PluginFunction, PluginObject } from 'vue'

export interface BvComponentOptions {
  [key: string]?: string | number | boolean | any
}

export interface BvInstallOptions {
  breakpoints?: string[]
  [key: string]?: ComponentOptions
}

export interface BvPlugin {
  install: PluginFunction<BvInstallOptions>
}
