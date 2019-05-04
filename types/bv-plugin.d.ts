import Vue, { PluginFunction, PluginObject } from 'vue'

export type BvConfigComponentOptionValue = string | string[] | number | number[] | boolean | object | null

export type BvConfigBreakpointsValue = string[]

export interface BvConfigComponentOptions {
  [key: string]: BvConfigComponentOptionValue | any
}

export interface BvConfigOptions {
  breakpoints?: BvConfigBreakpointsValue
  [key: string]: BvConfigComponentOptions | any
}

export interface BvPlugin {
  install: PluginFunction<BvConfigOptions>
}
