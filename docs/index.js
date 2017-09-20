import package_info from '../package.json'
import components from './components'
import directives from './directives'
import reference from './reference'
import layout from './layout'
import misc from './misc'
import setup from '~/../README.md';

// Process an hTML readme and create a page TOC array
function processHeadings(readme) {
    if (!readme) {
        return [];
    }
    const toc = [];
    // Grab all the H2 and H3 tags with ID's from readme
    const headings = readme.match(/<h[23].*? id="[^"]+".+?<\/h\d>/g) || [];
    let h2Idx = 0;
    headings.forEach(heading => {
        // Pass the link, label and heading level
        const matches = heading.match(/^<(h[23]).*? id="([^"]+)"[^>]*>(.+?)<\/h\d>$/);
        const tag = matches[1];
        const href = `#${matches[2]}`;
        // Remove any HTML markup in the label
        const label = matches[3].replace(/<[^>]+>/g, '');
        if (tag === 'h2') {
            toc.push({ href, label });
            h2Idx = toc.length;
        } else if (tag === 'h3') {
            toc[h2Idx] = toc[h2Idx] || [];
            toc[h2Idx].push({ href, label });
        }
    });
    return toc;
}

// Our documentation sections
const SECTIONS = {
    components,
    directives,
    reference,
    misc
};

// TOC object
const TOC = {};

// Special case for /docs
TOC['/docs/'] = processHeadings(setup);

// Special case for /layout
TOC['/docs/layout/'] = processHeadings(layout.readme);

// Process the rest of the sections
Object.keys(SECTIONS).forEach(section => {
    Object.keys(SECTIONS[section]).forEach(page => {
      TOC[`/docs/${section}/${page}/`] = processHeadings(SECTIONS[section][page].readme);
    });
});

// Out site object
export default {
    package_info,
    toc: TOC,
    nav: [
        {
            title: 'Getting started',
            slug: '',
        },
        {
            title: 'Layout & Grid',
            slug: 'layout/',
            new: true
        },
        {
            title: 'Components',
            slug: 'components/',
            pages: Object.keys(components).map(key => {
                return {
                    title: components[key].meta.title,
                    new: components[key].meta.new,
                    beta: components[key].meta.beta,
                    breaking: components[key].meta.breaking,
                    slug: key
                }
            })
        },
        {
            title: 'Directives',
            slug: 'directives/',
            pages: Object.keys(directives).map(key => {
                return {
                    title: directives[key].meta.title,
                    new: directives[key].meta.new,
                    beta: directives[key].meta.beta,
                    breaking: directives[key].meta.breaking,
                    slug: key
                }
            })
        },
        {
            title: 'Reference',
            slug: 'reference/',
            new: true,
            pages: Object.keys(reference).map(key => {
                return {
                    title: reference[key].meta.title,
                    new: reference[key].meta.new,
                    beta: reference[key].meta.beta,
                    slug: key
                }
            })
        },
        {
            title: 'Misc',
            slug: 'misc/',
            pages: Object.keys(misc).map(key => {
                return {
                    title: misc[key].meta.title,
                    new: misc[key].meta.new,
                    beta: misc[key].meta.beta,
                    slug: key
                }
            })
        }
    ]
}
