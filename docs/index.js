import package_info from '../package.json'
import components from './components'
import directives from './directives'
import reference from './reference'
import layout from './layout'
import misc from './misc'
import setup from '~/../README.md';

// Remove any HTML tags, but leaev entities alone
function stripHTML(str) {
    return str.replace(/<[^>]+>/g,'');
}

// Remove any double quotes from a string
function stripQuotes(str) {
    return str.replace(/"/g,'');
}

// Process an HTML readme and create a page TOC array
// IDs are the only attribute on auto generated heading tags, so we take 
// advantage of that when using our RegExpr matches
// Note IDs may not have quotes when the readme's are parsed in production mode !?!?
// Expected format: <h(1|2|3) id="?id-string"?>heading content</h(1|2|3)>
function processHeadings(readme) {
    if (!readme) {
        return {};
    }
    const toc = [];
    let top = '';
    let title = '';

    // Grab the first H1 tag with ID from readme
    const h1 = readme.match(/<h1 id=([^> ]+)>(.+?)<\/h1>/) || [];
    if (h1) {
        top = `#${stripQuotes(h1[1])}`;
        title = stripHTML(h1[2]);
    }

    // Grab all the H2 and H3 deadings with ID's from readme
    const headings = readme.match(/<h([23]) id=[^> ]+>.+?<\/h\1>/g) || [];

    let idx = 0;
    // Process the h2 and h3 headings into a TOC structure
    headings.forEach(heading => {
        // Pass the link, label and heading level
        const h2h3 = heading.match(/^<(h[23]) id=([^> ]+)>(.+?)<\/\1>$/);
        if (h2h3) {
            const tag = h2h3[1];
            const href = `#${stripQuotes(h2h3[2])}`;
            const label = stripHTML(h2h3[3]);
            if (tag === 'h2') {
                toc.push({ href, label });
                idx = toc.length;
            } else if (tag === 'h3') {
                // We nest h3 tags as a sub array
                toc[idx] = toc[idx] || [];
                toc[idx].push({ href, label });
            }
        }
    });
       
    return { toc, title, top };
}

function makeTOC(setup, layout, sections) {
    const toc = {};
    // Special case
    toc['/docs/'] = processHeadings(setup);
    // Special case
    toc['/docs/layout/'] = processHeadings(layout.readme);
    // Parse all the standard sections
    Object.keys(sections).forEach(section => {
        Object.keys(sections[section]).forEach(page => {
            toc[`/docs/${section}/${page}/`] = processHeadings(sections[section][page].readme);
        });
    });
    return toc;
}

// Our site object
export default {
    package_info,
    toc: makeTOC(setup, layout, { components, directives, reference, misc }),
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
