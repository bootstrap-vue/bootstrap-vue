import package_info from '../package.json';
import components from './components';

export default {
    package_info,

    nav: [
        {
            title: 'Getting started',
            slug: '',
            pages: []
        },
        {
            title: 'Components',
            slug: 'components',
            pages: Object.keys(components).map(key => {
                return {
                    title: components[key].meta.title,
                    slug: key
                };
            })
        }
    ]
};
