import kebabCase from 'lodash/kebabCase'

// Parse a fully qualified version from a string
export const parseVersion = version => {
  const matches = version.match(/([0-9]+\.[0-9]+\.[0-9]+)/g)
  const matchesCount = matches.length
  return matchesCount > 0 ? matches[matchesCount - 1] : ''
}

// Remove any HTML tags, but leave entities alone
const stripHTML = (str = '') => str.replace(/<[^>]+>/g, '')

// Remove any double quotes from a string
const stripQuotes = (str = '') => str.replace(/"/g, '')

export const parseUrl = value => {
  let anchor = document.createElement('a')
  anchor.href = value

  // We need to add the anchor to the document to make sure the
  // `pathname` is correctly detected in any browser
  document.body.appendChild(anchor)

  let result = ['hash', 'host', 'hostname', 'pathname', 'port', 'protocol', 'search'].reduce(
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

// Process an HTML README and create a page TOC array
// IDs are the only attribute on auto generated heading tags,
// so we take advantage of that when using our RegExpr matches
// Note: IDs may not have quotes when the README's are parsed in production mode !?!?
// Expected format: <h(1|2|3) id="?id-string"?>heading content</h(1|2|3)>
// Also grabs meta data if available to generate auto headings
export const makeTOC = (readme, meta = null) => {
  if (!readme) {
    return {}
  }

  let top = ''
  let title = ''
  let toc = []
  let parentIdx = 0

  // Get the first <h1> tag with ID
  const h1 = readme.match(/<h1 id=([^> ]+)>(.+?)<\/h1>/) || []
  if (h1) {
    top = `#${stripQuotes(h1[1])}`
    title = stripHTML(h1[2])
  }

  // Get all the <h2> and <h3> headings with ID's
  const headings = readme.match(/<h([23]) id=[^> ]+>.+?<\/h\1>/g) || []

  // Process the <h2> and <h3> headings into a TOC structure
  headings
    // Create a match `[value, tag, id, content]`
    .map(heading => heading.match(/^<(h[23]) id=([^> ]+)>(.+?)<\/\1>$/))
    // Filter out un-matched values
    .filter(v => Array.isArray(v))
    // Create TOC structure
    .forEach(([value, tag, id, content]) => {
      const href = `#${stripQuotes(id)}`
      const label = stripHTML(content)
      if (tag === 'h2') {
        toc.push({ href, label })
        parentIdx = toc.length - 1
      } else if (tag === 'h3') {
        let parent = toc[parentIdx]
        if (parent) {
          // We nest <h3> tags as a sub array
          parent.toc = parent.toc || []
          parent.toc.push({ href, label })
        }
      }
    })

  // Process meta information for component pages
  if (meta) {
    const isDirective = !!meta.directive
    const hasComponents = meta.components && meta.components.length > 0
    const hasDirectives = meta.directives && meta.directives.length > 0
    if (!isDirective && (hasComponents || hasDirectives)) {
      let componentToc = []
      if (hasComponents) {
        componentToc.push(
          // Add component sub-headings
          ...meta.components.map(({ component }) => {
            const tag = kebabCase(component)
            return { label: `&lt;${tag}&gt;`, href: `#comp-ref-${tag}` }
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
      toc.push({
        label: 'Component reference',
        href: '#component-reference',
        toc: componentToc
      })
    } else if (isDirective) {
      // Add directive reference heading
      toc.push({
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
  }

  return { title, top, toc }
}

export const importAll = r => {
  const obj = {}

  r.keys()
    .map(r)
    .map(m => m.meta || m)
    .map(m => ({
      slug: m.slug || (m.title || '').replace(' ', '-').toLowerCase(),
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
