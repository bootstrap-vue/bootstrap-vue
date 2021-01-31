const RX_HYPHENATE = /\B([A-Z])/g

// Converts PascalCase or camelCase to kebab-case
export const kebabCase = value => value.replace(RX_HYPHENATE, '-$1').toLowerCase()

// Parse a fully qualified version from a string
export const parseVersion = version => {
  const matches = version.match(/([0-9]+\.[0-9]+\.[0-9]+)/) || []
  return matches.length > 0 ? matches[0] : ''
}

// Parse a fully qualified version from a string (including alpha/beta/etc.)
export const parseFullVersion = version => {
  const matches = version.match(/([0-9]+\.[0-9]+\.[0-9]+(-[a-z]+[.-]?[0-9]+)?)/) || []
  return matches.length > 0 ? matches[0] : ''
}

export const getComponentName = component => kebabCase(component).replace(/{/g, '-{')
export const getCleanComponentName = component => getComponentName(component).replace(/({|})/g, '')

export const parseUrl = value => {
  const $anchor = document.createElement('a')
  $anchor.href = value

  // We need to add the anchor to the document to make sure the
  // `pathname` is correctly detected in any browser
  document.body.appendChild($anchor)

  const result = ['hash', 'host', 'hostname', 'pathname', 'port', 'protocol', 'search'].reduce(
    (result, prop) => {
      result[prop] = $anchor[prop] || null
      return result
    },
    {}
  )

  // Make sure to remove the anchor from document as soon as possible
  document.body.removeChild($anchor)

  // Normalize port
  if (!result.port && result.protocol) {
    if (result.protocol === 'https:') {
      result.port = '443'
    }
    if (result.protocol === 'http:') {
      result.port = '80'
    }
  }

  // Return early for browsers that resolved a non-existing `hostname` correctly
  if (result.hostname) {
    return result
  }

  // Handle relative URL's
  if (value.charAt(0) === '/') {
    return parseUrl(window.location.origin + value)
  }

  // Handle all other URL's
  let baseUrl = window.location.href
  baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))

  return parseUrl(`${baseUrl}/${value}`)
}

export const relativeUrl = url => {
  const { pathname, hash } = parseUrl(url)
  if (!pathname) {
    return url
  }

  return pathname + (hash || '')
}

// Update the tocData with any additional info from the meta data
export const updateMetaTOC = (tocData = {}, meta = null) => {
  if (!meta || tocData.metaMerged) {
    return tocData
  }
  // `tocData` in the format of `{ title, top, toc }`
  const isDirective = !!meta.directive
  const hasComponents = meta.components && meta.components.length > 0
  const hasDirectives = meta.directives && meta.directives.length > 0

  tocData.toc = (tocData.toc || []).slice()
  // Set a flag to say meta has been merged, to prevent
  // duplicate entries on SSR pages
  tocData.metaMerged = true

  if (!isDirective && (hasComponents || hasDirectives)) {
    const componentToc = []
    if (hasComponents) {
      componentToc.push(
        // Add component sub-headings
        ...meta.components.map(({ component }) => {
          const tag = getComponentName(component)
          const hash = `#comp-ref-${getCleanComponentName(tag)}`
          return { label: `&lt;${tag}&gt;`, href: hash }
        }),
        // Add component import sub-heading
        {
          label: 'Importing individual components',
          href: '#importing-individual-components'
        }
      )
    }
    // Add directive import sub-heading
    if (hasDirectives) {
      componentToc.push({
        label: 'Importing individual directives',
        href: '#importing-individual-directives'
      })
    }
    // Add plugin import sub-heading
    componentToc.push({
      label: 'Importing as a Vue.js plugin',
      href: '#importing-as-a-plugin'
    })
    // Add component reference heading
    tocData.toc.push({
      label: 'Component reference',
      href: '#component-reference',
      toc: componentToc
    })
  } else if (isDirective) {
    // Add directive reference heading
    tocData.toc.push({
      label: 'Directive reference',
      href: '#directive-reference',
      toc: [
        // Directive import sub-heading
        {
          label: 'Importing individual directives',
          href: '#importing-individual-directives'
        },
        // Plugin import sub-heading
        {
          label: 'Importing as a Vue.js plugin',
          href: '#importing-as-a-plugin'
        }
      ]
    })
  }

  return tocData
}

export const importAll = context => {
  // Get array of datas by keys from context
  const datas = context.keys().map(context)

  return (
    datas
      // Filter out private datas
      .filter(data => !data.private)
      // Map meta information
      .map(data => data.meta || data)
      // Normalize meta information
      .map(meta => ({
        ...meta,
        slug:
          meta.slug === undefined ? (meta.title || '').replace(' ', '-').toLowerCase() : meta.slug
      }))
      // Sort by slug
      .sort((a, b) => {
        if (a.slug < b.slug) return -1
        else if (a.slug > b.slug) return 1
        return 0
      })
      // Build one object keyed by slug
      .reduce((result, meta) => ({ ...result, [meta.slug]: meta }), {})
  )
}

// Smooth scroll handler methods
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export const scrollTo = ($scroller, to, duration, callback) => {
  const start = $scroller.scrollTop
  const change = to - start
  const increment = 20
  let currentTime = 0
  const animateScroll = function() {
    currentTime += increment
    $scroller.scrollTop = Math.round(easeInOutQuad(currentTime, start, change, duration))
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    } else if (callback && typeof callback === 'function') {
      callback()
    }
  }
  animateScroll()
}

// Return an element's offset wrt document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
export const offsetTop = $el =>
  $el.getClientRects().length > 0
    ? $el.getBoundingClientRect().top + $el.ownerDocument.defaultView.pageYOffset
    : 0

// Scroll an in-page link target into view
export const scrollTargetIntoView = (event, href) => {
  event.stopPropagation()
  // We use an attribute `querySelector()` rather than `getElementByID()`,
  // as some auto-generated ID's are invalid or not unique
  const id = (href || '').replace(/#/g, '')
  const $el = document.body.querySelector(`[id="${id}"]`)
  if ($el) {
    // Get the document scrolling element
    const $scroller = document.scrollingElement || document.documentElement || document.body
    // Scroll heading into view (minus offset to account for nav top height
    scrollTo($scroller, offsetTop($el) - 70, 150, () => {
      // Set a tab index so we can focus header for a11y support
      $el.tabIndex = -1
      // Focus the heading
      $el.focus()
    })
  }
}
