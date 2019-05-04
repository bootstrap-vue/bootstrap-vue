import Vue, { PluginFunction, PluginObject } from 'vue'

export type BvConfigComponentOptionValue = string | string[] | number | number[] | boolean | object | null

export type BvConfigBreakpointsValue = string[]

export interface BvComponentOptions {
  [key: string]: BvComponentOptionValue | any
}

export interface BvConfigOptions {
  [key: string]: BvConfigComponentOptions
  breakpoints?: BvConfigBreakpointsValue
}

export interface BvPlugin {
  install: PluginFunction<BvConfigOptions>
}
