# Breadcrumb

> Indicate the current page’s location within a navigational hierarchy.
  Separators are automatically added in CSS through <code>::before</code> and <code>content</code>.

Items are rendered using `:items` prop. 
It can be an array of objects to provide link and active state.
Active state of last element is automatically set if it is undefined.

``` 
 items = [{
      text: 'Home',
      href: 'http://google.com',
    }, {
      text: 'Posts',
      to: '/another/path',
    }, {
      text: 'Another Story',
      active: true
    }]
```

Or you can simply pass a simple array and use `@click` event handler on breadcrumb to manually handle links.
``` 
 items: ['Home','Posts','Another story']
```