// --- Calendar ---
import Vue from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Plugin
export declare const CalendarPlugin: BvPlugin

// Component: b-calendar
export declare class BCalendar extends BvComponent {
  focus: () => void
  blur: () => void
}

// --- Interfaces ---

// Calendar context event object
export interface BcCalendarCtxObject {
  readonly selectedFormatted: string
  readonly selectedYMD: string
  readonly selectedDate: Date | null
  readonly activeFormatted: string
  readonly activeYMD: string
  readonly activeDate: Date | null
  readonly disabled: boolean
  readonly locale: string
  readonly calendarLocale: string
  readonly rtl: boolean
}
