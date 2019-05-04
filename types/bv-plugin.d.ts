import Vue, { PluginFunction, PluginObject } from 'vue'

export type BvConfigComponentOptionValue = string | string[] | number | number[] | boolean | object | null

export type BvConfigBreakpointsValue = string[]

export interface BvConfigComponentOptions {
  [key: string]: BvConfigComponentOptionValue | any
}

export interface BvConfigOptions {
  [key: string]: BvConfigComponentOptions
  breakpoints?: BvConfigBreakpointsValue
}

export interface BvPlugin {
  install: PluginFunction<BvConfigOptions>
}
