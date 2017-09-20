import package_info from '../package.json'
import components from './components'
import directives from './directives'
import reference from './reference'
import layout from './layout'
import misc from './misc'

export default {
    package_info,
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
