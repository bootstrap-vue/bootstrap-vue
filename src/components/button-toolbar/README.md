# Button toolbar

> Group a series of button-groups and/or input-groups together on a single line, with optional keyboard navigation

**Example 1:** with button groups & Keyboard navigation

```html
<div>
  <b-button-toolbar key-nav  aria-label="Toolbar with button groups">
    <b-button-group class="mx-1">
      <b-btn>&laquo;</b-btn>
      <b-btn>&lsaquo;</b-btn>
    </b-button-group>
    <b-button-group class="mx-1">
      <b-btn>Edit</b-btn>
      <b-btn>Undo</b-btn>
      <b-btn>Redo</b-btn>
    </b-button-group>
    <b-button-group class="mx-1">
      <b-btn>&rsaquo;</b-btn>
      <b-btn>&raquo;</b-btn>
    </b-button-group>
  </b-button-toolbar>
</div>

<!-- button-toolbar-1.vue -->
```

**Example 2:** with mixture of small button groups and small input groups

```html
<div>
  <b-button-toolbar aria-label="Toolbar with button groups and input groups">
    <b-button-group size="sm" class="mx-1">
      <b-btn>New</b-btn>
      <b-btn>Edit</b-btn>
    </b-button-group>
    <b-input-group size="sm" class="w-25 mx-1" left="$" right=".00">
      <b-form-input value="100" class="text-right"></b-form-input>
    </b-input-group>
    <b-input-group  size="sm" class="w-25 mx-1" left="Size">
      <b-form-select value="Medium" :options="['Large','Medium','Small']"></b-form-select>
    </b-input-group>
      <b-button-group  size="sm" class="mx-1">
      <b-btn>Save</b-btn>
      <b-btn>Cancel</b-btn>
    </b-button-group>
  </b-button-toolbar>
</div>

<!-- button-toolbar-2.vue -->
```

**Example 3:** with button groups and dropdown menu

```html
<div>
  <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
    <b-button-group class="mx-1">
      <b-btn>New</b-btn>
      <b-btn>Edit</b-btn>
      <b-btn>Undo</b-btn>
    </b-button-group>
    <b-dropdown class="mx-1" right text="menu">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-dropdown>
    <b-button-group class="mx-1">
      <b-btn>Save</b-btn>
      <b-btn>Cancel</b-btn>
    </b-button-group>
  </b-button-toolbar>
</div>

<!-- button-toolbar-3.vue -->
```

## Usage
Feel free to mix input groups and dropdowns with button groups in your toolbars.
Similar to the example above, you’ll likely need some utility classes
though to space things properly.

## Sizing
Note, if you want smaller or larger buttons or controls, set the `size`
prop directly on the `<b-button-group>`, `<b-input-group>`, and `<b-dropdown>` components.

## Justify
Make the toolbar span the maximum available width, by increasing spacing between the
button groups, input groups and dropdowns, by setting the prop `justify`.

## Keyboard Navigation
Enable optional keyboard navigation by setting the prop `key-nav`.

| Keypress | Action
| -------- | ------
| <kbd>LEFT</kbd> or <kbd>UP</kbd> | Move to the previous non-disabled item in the toolbar
| <kbd>RIGHT</kbd> or <kbd>DOWN</kbd> | Move to the next non-disabled item in the toolbar
| <kbd>SHIFT</kbd>+<kbd>LEFT</kbd> or <kbd>SHIFT</kbd>+<kbd>UP</kbd> | Move to the first non-disabled item in the toolbar
| <kbd>SHIFT</kbd>+<kbd>RIGHT</kbd> or <kbd>SHIFT</kbd>+<kbd>DOWN</kbd> | Move to the last non-disabled item in the toolbar
| <kbd>TAB</kbd> | Move to the next control on the page
| <kbd>SHIFT</kbd>+<kbd>TAB</kbd> | Move to the previous control on the page

**Caution:** If you have text or text-like inputs in your toolbar, leave keyboard navigation off,
as it is not possble to use key presses to jump out of a text (or test-like) inputs.

## Component alias
`<b-button-toolbar>` can also be used via the shorthand alias `<b-btn-toolbar>`

## See Also
- [`<b-button-group>`](./button-group)
- [`<b-dropdown>`](./dropdown)

## Component Reference
