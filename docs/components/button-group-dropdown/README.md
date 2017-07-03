# Button group dropdown

> Add dropdown menues to your `b-button group`.

```html
<div>
  <b-button-group>
    <b-button variant="success">Button 1</b-button>
    <b-button variant="info">Button 2</b-button>
    <b-button-group-dropdown text="Menu 1">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-button-group-dropdown>
    <b-button variant="danger">Button 3</b-button>
    <b-button-group-dropdown split text="Menu 2">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-button-group-dropdown>
  </b-button-group>
</div>

<!-- button-group-dropdown.vue -->
```

Note: Split button dropdowns are not supported when `<b-button-group>` has the prop `vertical` set.

### See also
- [`<b-dropdown>`](./dropdown) For available sub-components and configuration options.
- [`<b-button-group>`](./button-group)
- [`<b-button-toolbar>`](./button-toolbar)
