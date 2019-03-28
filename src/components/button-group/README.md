# Button group

> Group a series of buttons together on a single line with `<b-button-group>`.

**Example 1:** Default button group and button group using contextual variants

```html
<div>
  <div>
    <b-button-group>
      <b-button>Button 1</b-button>
      <b-button>Button 2</b-button>
      <b-button>Button 3</b-button>
    </b-button-group>
  </div>
  <div class="mt-3">
    <b-button-group>
      <b-button variant="success">Success</b-button>
      <b-button variant="info">Info</b-button>
      <b-button variant="warning">Warning</b-button>
    </b-button-group>
  </div>
</div>

<!-- b-button-group.vue -->
```

## Sizing

Set the size prop to `lg` or `sm` to render larger or smaller, respectively, buttons. There is no
need to specify the size on the individual buttons.

**Example 2:** Default, Small, and Large button groups

```html
<div>
  <div>
    <b-button-group>
      <b-button>Button 1</b-button>
      <b-button>Button 2</b-button>
      <b-button>Button 3</b-button>
    </b-button-group>
  </div>
  <div class="mt-3">
    <b-button-group size="sm">
      <b-button>Left</b-button>
      <b-button>Middle</b-button>
      <b-button>Right</b-button>
    </b-button-group>
  </div>
  <div class="mt-3">
    <b-button-group size="lg">
      <b-button>Left</b-button>
      <b-button>Middle</b-button>
      <b-button>Right</b-button>
    </b-button-group>
  </div>
</div>

<!-- b-button-group-sizes.vue -->
```

## Vertical variation

Make a set of buttons appear vertically stacked rather than horizontally by setting the `vertical`
prop. Split button dropdowns are not supported here.

**Example 3:** Vertical button group

```html
<div>
  <b-button-group vertical>
    <b-button>Top</b-button>
    <b-button>Middle</b-button>
    <b-button>Bottom</b-button>
  </b-button-group>
</div>

<!-- b-button-group-vertical.vue -->
```

## Dropdown menu support

Add [`<b-dropdown>`](/docs/components/dropdown) menus directly inside your `<b-button-group>`. Note
that split dropdown menus are not supported when prop `vertical` is set.

**Example 4:** button group with dropdown menus

```html
<div>
  <b-button-group>
    <b-button>Button</b-button>
    <b-dropdown right text="Menu">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-dropdown>
    <b-dropdown right split text="Split Menu">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-dropdown>
  </b-button-group>
</div>

<!-- b-button-group-menu.vue -->
```

## See also

Also check out the [`<b-button-toolbar>`](/docs/components/button-toolbar) component for generating
toolbars containing button groups and input groups.

<!-- Component reference added automatically from component package.json -->
