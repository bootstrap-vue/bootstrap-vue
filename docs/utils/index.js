const RX_HYPHENATE = /\B([A-Z])/g

// Converts PascalCase or camelCase to kebab-case
export const kebabCase = str => {
  return str.replace(RX_HYPHENATE, '-$1').toLowerCase()
}

// Parse a fully qualified version from a string
export const parseVersion = version => {
  const matches = version.match(/([0-9]+\.[0-9]+\.[0-9]+)/)
  const matchesCount = matches.length
  return matchesCount > 0 ? matches[matchesCount - 1] : ''
}

// Parse a fully qualified version from a string (including alpha/beta/etc
export const parseFullVersion = version => {
  const matches = version.match(/([0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+[.-]?[0-9]+))/)
  const matchesCount = matches.length
  return matchesCount > 0 ? matches[matchesCount - 1] : ''
}

export const parseUrl = value => {
  const anchor = document.createElement('a')
  anchor.href = value

  // We need to add the anchor to the document to make sure the
  // `pathname` is correctly detected in any browser
  document.body.appendChild(anchor)

  const result = ['hash', 'host', 'hostname', 'pathname', 'port', 'protocol', 'search'].reduce(
    (result, prop) => {
      result[prop] = anchor[prop] || null
      return result
    },
    {}
  )

  // Make sure to remove the anchor from document as soon as possible
  document.body.removeChild(anchor)

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
          const tag = kebabCase(component).replace('{', '-{')
          const hash = `#comp-ref-${tag}`.replace('{', '').replace('}', '')
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

export const importAll = r => {
  const obj = {}

  r.keys()
    .map(r)
    .map(m => m.meta || m)
    .map(m => ({
      slug:
        typeof m.slug === 'undefined' ? (m.title || '').replace(' ', '-').toLowerCase() : m.slug,
      ...m
    }))
    .sort((a, b) => {
      if (a.slug < b.slug) return -1
      else if (a.slug > b.slug) return 1
      return 0
    })
    .forEach(m => {
      if (m.components) {
        // Normalize `meta.components` to array of objects form
        m.components = m.components.map(c => (typeof c === 'string' ? { component: c } : c))
      }
      obj[m.slug] = m
    })

  return obj
}

// Smooth Scroll handler methods
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export const scrollTo = (scroller, to, duration, cb) => {
  const start = scroller.scrollTop
  const change = to - start
  const increment = 20
  let currentTime = 0
  const animateScroll = function() {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    scroller.scrollTop = Math.round(val)
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    } else if (cb && typeof cb === 'function') {
      cb()
    }
  }
  animateScroll()
}

// Return an element's offset wrt document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
export const offsetTop = el => {
  if (!el.getClientRects().length) {
    return 0
  }
  const bcr = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView
  return bcr.top + win.pageYOffset
}
