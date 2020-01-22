import { deepFreeze } from './object'

// --- General BootstrapVue configuration ---

// NOTES
//
// The global config SHALL NOT be used to set defaults for Boolean props, as the props
// would loose their semantic meaning, and force people writing 3rd party components to
// explicity set a true or false value using the v-bind syntax on boolean props
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
    size: null
  },

  // Component specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  BAlert: {
    dismissLabel: 'Close',
    variant: 'info'
  },
  BBadge: {
    variant: 'secondary'
  },
  BButton: {
    size: null,
    variant: 'secondary'
  },
  BButtonClose: {
    content: '&times;',
    // `textVariant` is `null` to inherit the current text color
    textVariant: null,
    ariaLabel: 'Close'
  },
  BCardSubTitle: {
    // `<b-card>` and `<b-card-body>` also inherit this prop
    subTitleTextVariant: 'muted'
  },
  BCarousel: {
    labelPrev: 'Previous Slide',
    labelNext: 'Next Slide',
    labelGotoSlide: 'Goto Slide',
    labelIndicators: 'Select a slide to display'
  },
  BDropdown: {
    toggleText: 'Toggle Dropdown',
    size: null,
    variant: 'secondary',
    splitVariant: null
  },
  BFormFile: {
    browseText: 'Browse',
    // Chrome default file prompt
    placeholder: 'No file chosen',
    dropPlaceholder: 'Drop files here'
  },
  BFormTag: {
    removeLabel: 'Remove tag',
    variant: 'secondary'
  },
  BFormTags: {
    addButtonText: 'Add',
    addButtonVariant: 'outline-secondary',
    duplicateTagText: 'Duplicate tag(s)',
    invalidTagText: 'Invalid tag(s)',
    placeholder: 'Add tag...',
    tagRemoveLabel: 'Remove tag',
    tagVariant: 'secondary'
  },
  BFormText: {
    textVariant: 'muted'
  },
  BImg: {
    blankColor: 'transparent'
  },
  BImgLazy: {
    blankColor: 'transparent'
  },
  BInputGroup: {
    size: null
  },
  BJumbotron: {
    bgVariant: null,
    borderVariant: null,
    textVariant: null
  },
  BListGroupItem: {
    variant: null
  },
  BModal: {
    titleTag: 'h5',
    size: 'md',
    headerBgVariant: null,
    headerBorderVariant: null,
    headerTextVariant: null,
    headerCloseVariant: null,
    bodyBgVariant: null,
    bodyTextVariant: null,
    footerBgVariant: null,
    footerBorderVariant: null,
    footerTextVariant: null,
    cancelTitle: 'Cancel',
    cancelVariant: 'secondary',
    okTitle: 'OK',
    okVariant: 'primary',
    headerCloseContent: '&times;',
    headerCloseLabel: 'Close'
  },
  BNavbar: {
    variant: null
  },
  BNavbarToggle: {
    label: 'Toggle navigation'
  },
  BPagination: {
    size: null
  },
  BPaginationNav: {
    size: null
  },
  BPopover: {
    boundary: 'scrollParent',
    boundaryPadding: 5,
    customClass: null,
    delay: 50,
    variant: null
  },
  BProgress: {
    variant: null
  },
  BProgressBar: {
    variant: null
  },
  BSpinner: {
    variant: null
  },
  BTable: {
    selectedVariant: 'active',
    headVariant: null,
    footVariant: null
  },
  BToast: {
    toaster: 'b-toaster-top-right',
    autoHideDelay: 5000,
    variant: null,
    toastClass: null,
    headerClass: null,
    bodyClass: null
  },
  BToaster: {
    ariaLive: null,
    ariaAtomic: null,
    role: null
  },
  BTooltip: {
    boundary: 'scrollParent',
    boundaryPadding: 5,
    customClass: null,
    delay: 50,
    variant: null
  }
})
