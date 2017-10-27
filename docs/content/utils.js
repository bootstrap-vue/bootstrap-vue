// Remove any HTML tags, but leaev entities alone
function stripHTML(str) {
    return str.replace(/<[^>]+>/g, '');
}

// Remove any double quotes from a string
function stripQuotes(str) {
    return str.replace(/"/g, '');
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

export function makeTOC(setup, sections) {
    const toc = {};
    // Special case
    toc['/docs/'] = processHeadings(setup);

    // Parse all the standard sections
    Object.keys(sections).forEach(section => {
        Object.keys(sections[section]).forEach(page => {
            let readme = sections[section][page].readme;
            if (section === 'misc' && page === 'changelog' && readme) {
                // Special case: remove all h3 tags due to duplicate IDs
                // Which screws up the TOC handling and scrollspy.
                readme = readme.replace(/<h3 .*?<\/h3>/g, '');
            }
            toc[`/docs/${section}/${page}/`] = processHeadings(readme);
        });
    });

    return toc;
}

export function importAll(r) {
    const obj = {}

    r.keys()
        .map(r)
        .map(m => m.meta || m)
        .map(m => Object.assign({
            slug: m.slug || (m.title || '').replace(' ', '-').toLowerCase()
        }, m))
        .forEach(m => {
            obj[m.slug] = m
        })

    return obj
}
