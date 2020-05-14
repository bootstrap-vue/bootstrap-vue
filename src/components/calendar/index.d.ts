// --- Calendar ---
import Vue from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Plugin
export declare const CalendarPlugin: BvPlugin

// Calendar context object
export interface BCalendarContextEvent {
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

// Component: b-calendar
export declare class BCalendar extends BvComponent {
  focus: () => void
  blur: () => void
}
