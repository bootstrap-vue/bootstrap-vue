import {
  NAME_ALERT,
  NAME_AVATAR,
  NAME_BADGE,
  NAME_BUTTON,
  NAME_BUTTON_CLOSE,
  NAME_CALENDAR,
  NAME_CARD_SUB_TITLE,
  NAME_CAROUSEL,
  NAME_DROPDOWN,
  NAME_FORM_DATEPICKER,
  NAME_FORM_FILE,
  NAME_FORM_RATING,
  NAME_FORM_SPINBUTTON,
  NAME_FORM_TAG,
  NAME_FORM_TAGS,
  NAME_FORM_TEXT,
  NAME_FORM_TIMEPICKER,
  NAME_IMG,
  NAME_IMG_LAZY,
  NAME_INPUT_GROUP,
  NAME_JUMBOTRON,
  NAME_LINK,
  NAME_LIST_GROUP_ITEM,
  NAME_MODAL,
  NAME_NAVBAR,
  NAME_NAVBAR_TOGGLE,
  NAME_PAGINATION,
  NAME_PAGINATION_NAV,
  NAME_POPOVER,
  NAME_PROGRESS,
  NAME_PROGRESS_BAR,
  NAME_SPINNER,
  NAME_SKELETON,
  NAME_SKELETON_ICON,
  NAME_SIDEBAR,
  NAME_TABLE,
  NAME_TIME,
  NAME_TOAST,
  NAME_TOASTER,
  NAME_TOOLTIP
} from '../constants/components'
import { deepFreeze } from './object'

// --- General BootstrapVue configuration ---

// NOTES
//
// The global config SHALL NOT be used to set defaults for Boolean props, as the props
// would loose their semantic meaning, and force people writing 3rd party components to
// explicitly set a true or false value using the v-bind syntax on boolean props
//
// Supported config values (depending on the prop's supported type(s)):
// `String`, `Array`, `Object`, `null` or `undefined`

// BREAKPOINT DEFINITIONS
//
// Some components (`<b-col>` and `<b-form-group>`) generate props based on breakpoints,
// and this occurs when the component is first loaded (evaluated), which may happen
// before the config is created/modified
//
// To get around this we make these components' props async (lazy evaluation)
// The component definition is only called/executed when the first access to the
// component is used (and cached on subsequent uses)

// PROP DEFAULTS
//
// For default values on props, we use the default value factory function approach so
// that the default values are pulled in at each component instantiation
//
//  props: {
//    variant: {
//      type: String,
//      default: () => getConfigComponent('BAlert', 'variant')
//    }
//  }
//
// We also provide a cached getter for breakpoints, which are "frozen" on first access

// prettier-ignore
export default deepFreeze({
  // Breakpoints
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],

  // Form controls
  formControls: {
    size: undefined
  },

  // Component specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  [NAME_ALERT]: {
    dismissLabel: 'Close',
    variant: 'info'
  },
  [NAME_AVATAR]: {
    variant: 'secondary',
    badgeVariant: 'primary'
  },
  [NAME_BADGE]: {
    variant: 'secondary'
  },
  [NAME_BUTTON]: {
    size: undefined,
    variant: 'secondary'
  },
  [NAME_BUTTON_CLOSE]: {
    content: '&times;',
    // `textVariant` is `undefined` to inherit the current text color
    textVariant: undefined,
    ariaLabel: 'Close'
  },
  [NAME_CALENDAR]: {
    selectedVariant: 'primary',
    // Defaults to `selectedVariant`
    todayVariant: undefined,
    navButtonVariant: 'secondary',
    // BFormDate will choose these first if not provided in BFormDate section
    labelPrevDecade: 'Previous decade',
    labelPrevYear: 'Previous year',
    labelPrevMonth: 'Previous month',
    labelCurrentMonth: 'Current month',
    labelNextMonth: 'Next month',
    labelNextYear: 'Next year',
    labelNextDecade: 'Next decade',
    labelToday: 'Today',
    labelSelected: 'Selected date',
    labelNoDateSelected: 'No date selected',
    labelCalendar: 'Calendar',
    labelNav: 'Calendar navigation',
    labelHelp: 'Use cursor keys to navigate calendar dates'
  },
  [NAME_CARD_SUB_TITLE]: {
    // `<b-card>` and `<b-card-body>` also inherit this prop
    subTitleTextVariant: 'muted'
  },
  [NAME_CAROUSEL]: {
    labelPrev: 'Previous Slide',
    labelNext: 'Next Slide',
    labelGotoSlide: 'Goto Slide',
    labelIndicators: 'Select a slide to display'
  },
  [NAME_DROPDOWN]: {
    toggleText: 'Toggle Dropdown',
    size: undefined,
    variant: 'secondary',
    splitVariant: undefined
  },
  [NAME_FORM_DATEPICKER]: {
    // BFormDatepicker will choose from BCalendar first if not provided here
    selectedVariant: undefined,
    todayVariant: undefined,
    navButtonVariant: undefined,
    labelPrevDecade: undefined,
    labelPrevYear: undefined,
    labelPrevMonth: undefined,
    labelCurrentMonth: undefined,
    labelNextMonth: undefined,
    labelNextYear: undefined,
    labelNextDecade: undefined,
    labelToday: undefined,
    labelSelected: undefined,
    labelNoDateSelected: undefined,
    labelCalendar: undefined,
    labelNav: undefined,
    labelHelp: undefined,
    // These props are specific to BFormDatepicker
    labelTodayButton: 'Select today',
    labelResetButton: 'Reset',
    labelCloseButton: 'Close'
  },
  [NAME_FORM_FILE]: {
    browseText: 'Browse',
    // Chrome default file prompt
    placeholder: 'No file chosen',
    dropPlaceholder: 'Drop files here',
    noDropPlaceholder: 'Not allowed'
  },
  [NAME_FORM_RATING]: {
    variant: null,
    color: null
  },
  [NAME_FORM_TAG]: {
    removeLabel: 'Remove tag',
    variant: 'secondary'
  },
  [NAME_FORM_TAGS]: {
    addButtonText: 'Add',
    addButtonVariant: 'outline-secondary',
    duplicateTagText: 'Duplicate tag(s)',
    invalidTagText: 'Invalid tag(s)',
    limitTagsText: 'Tag limit reached',
    placeholder: 'Add tag...',
    tagRemoveLabel: 'Remove tag',
    tagRemovedLabel: 'Tag removed',
    tagVariant: 'secondary'
  },
  [NAME_FORM_TEXT]: {
    textVariant: 'muted'
  },
  [NAME_FORM_TIMEPICKER]: {
    // Fallback to BTime
    labelNoTimeSelected: undefined,
    labelSelected: undefined,
    labelHours: undefined,
    labelMinutes: undefined,
    labelSeconds: undefined,
    labelAmpm: undefined,
    labelAm: undefined,
    labelPm: undefined,
    // Fallback to BTime then BFormSpinbutton
    labelDecrement: undefined,
    labelIncrement: undefined,
    // These props are specific to BFormTimepicker
    labelNowButton: 'Select now',
    labelResetButton: 'Reset',
    labelCloseButton: 'Close'
  },
  [NAME_FORM_SPINBUTTON]: {
    labelDecrement: 'Decrement',
    labelIncrement: 'Increment'
  },
  [NAME_IMG]: {
    blankColor: 'transparent'
  },
  [NAME_IMG_LAZY]: {
    blankColor: 'transparent'
  },
  [NAME_INPUT_GROUP]: {
    size: undefined
  },
  [NAME_JUMBOTRON]: {
    bgVariant: undefined,
    borderVariant: undefined,
    textVariant: undefined
  },
  [NAME_LINK]: {
    routerComponentName: undefined
  },
  [NAME_LIST_GROUP_ITEM]: {
    variant: undefined
  },
  [NAME_MODAL]: {
    titleTag: 'h5',
    size: 'md',
    headerBgVariant: undefined,
    headerBorderVariant: undefined,
    headerTextVariant: undefined,
    headerCloseVariant: undefined,
    bodyBgVariant: undefined,
    bodyTextVariant: undefined,
    footerBgVariant: undefined,
    footerBorderVariant: undefined,
    footerTextVariant: undefined,
    cancelTitle: 'Cancel',
    cancelVariant: 'secondary',
    okTitle: 'OK',
    okVariant: 'primary',
    headerCloseContent: '&times;',
    headerCloseLabel: 'Close'
  },
  [NAME_NAVBAR]: {
    variant: null
  },
  [NAME_NAVBAR_TOGGLE]: {
    label: 'Toggle navigation'
  },
  [NAME_PAGINATION]: {
    size: undefined
  },
  [NAME_PAGINATION_NAV]: {
    size: undefined
  },
  [NAME_POPOVER]: {
    boundary: 'scrollParent',
    boundaryPadding: 5,
    customClass: undefined,
    delay: 50,
    variant: undefined
  },
  [NAME_PROGRESS]: {
    variant: undefined
  },
  [NAME_PROGRESS_BAR]: {
    variant: undefined
  },
  [NAME_SPINNER]: {
    variant: undefined
  },
  [NAME_SKELETON]: {
    animation: 'wave'
  },
  [NAME_SKELETON_ICON]: {
    animation: 'wave'
  },
  [NAME_SIDEBAR]: {
    bgVariant: 'light',
    textVariant: 'dark',
    shadow: false,
    width: undefined,
    tag: 'div',
    backdropVariant: 'dark'
  },
  [NAME_TABLE]: {
    selectedVariant: 'active',
    headVariant: undefined,
    footVariant: undefined
  },
  [NAME_TIME]: {
    labelNoTimeSelected: 'No time selected',
    labelSelected: 'Selected time',
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds',
    labelAmpm: 'AM/PM',
    // It would be nice to be able to get these from Intl.DateTimeFormat somehow
    labelAm: 'AM',
    labelPm: 'PM',
    // The following inherit from BFormSpinbutton if not provided
    labelIncrement: undefined,
    labelDecrement: undefined
  },
  [NAME_TOAST]: {
    toaster: 'b-toaster-top-right',
    autoHideDelay: 5000,
    variant: undefined,
    toastClass: undefined,
    headerClass: undefined,
    bodyClass: undefined
  },
  [NAME_TOASTER]: {
    ariaLive: undefined,
    ariaAtomic: undefined,
    role: undefined
  },
  [NAME_TOOLTIP]: {
    boundary: 'scrollParent',
    boundaryPadding: 5,
    customClass: undefined,
    delay: 50,
    variant: undefined
  }
})
