import kebabCase from 'lodash/kebabCase'
import startCase from 'lodash/startCase'

// Remove any HTML tags, but leave entities alone
function stripHTML(str = '') {
  return str.replace(/<[^>]+>/g, '')
}

// Remove any double quotes from a string
function stripQuotes(str = '') {
  return str.replace(/"/g, '')
}

// Process an HTML readme and create a page TOC array
// IDs are the only attribute on auto generated heading tags, so we take
// advantage of that when using our RegExpr matches
// Note IDs may not have quotes when the readme's are parsed in production mode !?!?
// Expected format: <h(1|2|3) id="?id-string"?>heading content</h(1|2|3)>
// Also grabs meta data if available to generate auto headings
export function makeTOC(readme, meta = null) {
  if (!readme) {
    return {}
  }
  const toc = []
  let top = ''
  let title = ''

  // Grab the first H1 tag with ID from readme
  const h1 = readme.match(/<h1 id=([^> ]+)>(.+?)<\/h1>/) || []
  if (h1) {
    top = `#${stripQuotes(h1[1])}`
    title = stripHTML(h1[2])
  }

  // Grab all the H2 and H3 deadings with ID's from readme
  const headings = readme.match(/<h([23]) id=[^> ]+>.+?<\/h\1>/g) || []

  let idx = 0
  // Process the h2 and h3 headings into a TOC structure
  headings.forEach(heading => {
    // Pass the link, label and heading level
    const h2h3 = heading.match(/^<(h[23]) id=([^> ]+)>(.+?)<\/\1>$/)
    if (h2h3) {
      const tag = h2h3[1]
      const href = `#${stripQuotes(h2h3[2])}`
      const label = stripHTML(h2h3[3])
      if (tag === 'h2') {
        toc.push({ href, label })
        idx = toc.length
      } else if (tag === 'h3') {
        // We nest h3 tags as a sub array
        toc[idx] = toc[idx] || []
        toc[idx].push({ href, label })
      }
    }
  })

  // Process meta inforamtion for component pages
  // IDs for headings are defined in componentdoc.vue and importdoc.vue
  if (meta && (meta.component || (meta.components && meta.components.length))) {
    // Addpend component reference info to the TOC
    const comps = [].concat(meta, meta.components).filter(m => m)
    if (comps.length) {
      // Add the reference heading
      toc.push({
        label: `${startCase(meta.title)} Component Reference`,
        href: '#component-reference'
      })
      // Add component sub entries
      toc.push(
        comps.map(c => {
          const tag = kebabCase(c.component)
          return {
            label: tag,
            href: `#comp-ref-${tag}`
          }
        })
      )
      // Add component import sub entry
      toc[toc.length - 1].push({
        label: `Importing Individual ${startCase(meta.title)} Components`,
        href: '#importing-individual-components'
      })
      // Add directive import sub entry
      if (meta.directives && meta.directives.length) {
        toc[toc.length - 1].push({
          label: `Importing Individual ${startCase(meta.title)} Directives`,
          href: '#importing-individual-directives'
        })
      }
      // add plugin import sub entry
      toc[toc.length - 1].push({
        label: `Importing ${startCase(meta.title)} as a Vue Plugin`,
        href: '#importing-as-a-plugin'
      })
    }
  }

  // Process meta inforamtion for directive pages.
  // Directive pages only reference a single directive
  // IDs for headings are defined in importdoc.vue
  if (meta && meta.directive && !meta.directives) {
    // Add the reference heading
    toc.push({
      label: `${startCase(meta.title)} Directive Reference`,
      href: '#directive-reference'
    })
    // Add directive import sub entry
    toc.push([
      {
        label: `Importing Individual ${startCase(meta.title)} Directive`,
        href: '#importing-individual-directives'
      }
    ])
    // add plugin import sub entry
    toc[toc.length - 1].push({
      label: `Importing ${startCase(meta.title)} as a Vue Plugin`,
      href: '#importing-as-a-plugin'
    })
  }

  return { toc, title, top }
}

export function importAll(r) {
  const obj = {}

  r.keys()
    .map(r)
    .map(m => m.meta || m)
    .map(m =>
      Object.assign(
        {
          slug: m.slug || (m.title || '').replace(' ', '-').toLowerCase()
        },
        m
      )
    )
    .sort((a, b) => {
      if (a.slug < b.slug) return -1
      else if (a.slug > b.slug) return 1
      return 0
    })
    .forEach(m => {
      if (m.components) {
        // Normalize meta.components to array of objects form
        m.components = m.components.map(c => (typeof c === 'string' ? { component: c } : c))
      }
      obj[m.slug] = m
    })

  return obj
}

// Smooth Scroll handler methods
function easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export function scrollTo(scroller, to, duration, cb) {
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
export function offsetTop(el) {
  if (!el.getClientRects().length) {
    return 0
  }
  const bcr = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView
  return bcr.top + win.pageYOffset
}
