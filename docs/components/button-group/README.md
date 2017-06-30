# Button group

> Group a series of buttons together on a single line with `b-button group`.

```html
<div class="row">
<div class="col">
    <b-button-group vertical>
    <b-button variant="success">Top</b-button>
    <b-button variant="info">Middle</b-button>
    <b-button variant="primary">Bottom</b-button>
    </b-button-group>
</div>
<div class="col">
    <b-button-group>
    <b-button>Left</b-button>
    <b-button>Middle</b-button>
    <b-button>Right</b-button>
    </b-button-group>
</div>
<div class="col">
    <b-button-group size="sm">
    <b-button>Left</b-button>
    <b-button>Middle</b-button>
    <b-button>Right</b-button>
    </b-button-group>
</div>
</div>

<!-- button-group.vue -->
```

### Sizing
Set the size prop to `lg` or `sm` to render larger or smaller, respectively, buttons.
There is no need to specify the size on the individual buttons.

### Vertical variation
Make a set of buttons appear vertically stacked rather than horizontally by setting
the `vertical` prop. Split button dropdowns are not supported here.

### Justification
Make horizontal `b-button-group` span the entire width of its prent container by
setting the `justify` prop. This setting has no effect when `vertical` is set.

### Alias
`b-button` group can also be used by its shorter alias `b-btn-group`.

### See also
Also check out the [`<b-button-toolabr>`](./button-toolbar) component for generating
toolbars containing button groups and input groups.

### Tooltips and popovers
Due to the specific implementation (and some other components), tooltips and popovers
on elements within a button-group will have adverse effect on styling.
