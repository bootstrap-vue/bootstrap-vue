import Vue, { PluginFunction, PluginObject } from 'vue'

export type BvComponentOptionValue = string | string[] | number | number[] | boolean | object | null | any

export interface BvComponentOptions {
  [key: string]: BvComponentOptionValue
}

export interface BvConfigOptions {
  [key: string]: BvComponentOptions
}

export interface BvPlugin {
  install: PluginFunction<BvConfigOptions>
}
