// --- Time ---
import Vue from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Plugin
export declare const TimePlugin: BvPlugin

// Component: b-time
export declare class BTime extends BvComponent {
  focus: () => void
  blur: () => void
}

// --- Interfaces ---

// Time context event object
export interface BvTimeCtxEvent {
  readonly formatted: string
  readonly value: string
  readonly hours: number | null
  readonly minutes: number | null
  readonly seconds: number | null
  readonly hourCycle: string
  readonly hour12: boolean
  readonly locale: string
  readonly isRtl: boolean
}
