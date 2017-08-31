# Tooltips

> Easily add tooltips to elements or components via the `<b-tooltip>` component or
[`v-b-tooltip`](/docs/directives/tooltip) directive (preferred method).


## `<b-tooltip>` Component Usage

```html
<b-container fluid>
  <b-row>
    <b-col md="6" class="py-4">
      <b-btn id="exButton1" variant="outline-success">Live chat</b-btn>
    </b-col>
    <b-col md="6" class="py-4">
      <b-btn id="exButton2" variant="outline-success">Html chat</b-btn>
    </b-col>
  </b-row>

  <b-tooltip target-id="exButton1" title="Online!"></b-tooltip>

  <b-tooltip target-id="exButton2" placement="bottom">
    Hello <strong>World!</strong>
  </b-tooltip>
</b-container>

<!-- tooltip-1.vue -->
```

### Component usage notes
The `<b-tooltip` component inserts a hidden (`display:none`) `<div>` container
element at the point in the DOM where the `<b-tooltip>` component is placed.  This may 
affect layout and/or styling of components such as `<b-button-group>`, `<b-button-toolbar>`,
and `<b-input-group>`. To avoid these posible layout issues, place the `<b-tooltip>`
component **outside** of these types of components.

The target element **must** exist in the document before `<b-tooltip>` is mounted. If the
target element is not found during mount, the tooltip will never open. Always place
your `<b-tooltip>` component lower in the DOM than your target element.

## `v-b-tooltip` Directive Usage

The `v-b-tooltip` directive makes adding tooltips even easier:

```html
<b-container fluid>
  <b-row>
    <b-col md="6" class="py-4">
      <b-btn v-b-tooltip
             title="Online!"
             variant="outline-success">
        Live chat
      </b-btn>
    </b-col>
    <b-col md="6" class="py-4">
      <b-btn v-b-tooltip.html.bottom
             title="Hello <strong>World!</strong>"
             variant="outline-success">
        Html chat
      </b-btn>
    </b-col>
  </b-row>
</b-container>

<!-- tooltip-2.vue -->
```

Refer to the [`v-b-tooltip` documentation](/docs/directives/tooltip) for more information
and features of the directive format.
