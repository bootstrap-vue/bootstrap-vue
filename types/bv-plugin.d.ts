import Vue, { PluginFunction, PluginObject } from 'vue'

export type BvComponentOptionValue = string | string[] | number | number[] | boolean | object | null | any

export type BvBreakpointsValue = string[]

export interface BvComponentOptions {
  [key: string]: BvComponentOptionValue
}

export interface BvConfigOptions {
  [key: string]: BvComponentOptions
  breakpoints?: BvBreakpointsValue
}

export interface BvPlugin {
  install: PluginFunction<BvConfigOptions>
}
