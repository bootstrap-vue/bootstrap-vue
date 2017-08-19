# Dropdowns

> Dropdowns are toggleable, contextual overlays for displaying lists of links and actions
in a dropdown menu format.


**Example:** Various usage
```html
<div>

  <b-dropdown id="ddown1" text="Dropdown Button sm" variant="primary" class="m-md-2">
    <b-dropdown-header id="header1">Heading 1</b-dropdown-header>
    <b-dropdown-item aria-describedby="header1">Action</b-dropdown-item>
    <b-dropdown-item aria-describedby="header1">Another action</b-dropdown-item>
    <b-dropdown-header id="header2">Heading 2</b-dropdown-header>
    <b-dropdown-item aria-describedby="header2">Some Action</b-dropdown-item>
    <b-dropdown-item aria-describedby="header2">Some other action</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item>Something else here...</b-dropdown-item>
    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
  </b-dropdown>

  <br>

  <b-dropdown id="ddown2" text="Split Dropdown Button" variant="success" split class="m-md-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>

  <br>

  <b-dropdown id="ddown3" text="Right align" variant="danger" right class="m-md-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <br>

  <b-dropdown id="ddown4" text="Drop-Up" dropup variant="info" class="m-md-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <br>

  <b-dropdown id="ddown5" text="Dropdown using buttons as menu items" class="m-md-2">
    <b-dropdown-item-button>I'm a button</b-dropdown-item-button>
    <b-dropdown-item-button>I'm also a button</b-dropdown-item-button>
    <b-dropdown-item-button>I don't look like a button, but I am!</b-dropdown-item-button>
  </b-dropdown>

</div>
  
<!-- dropdown.vue -->
```

## Menu alignment
The dropdown menu can either be left aligned (default) or right aligned with respect
to the button above it. To have the dropdown aligned on the right, set the `right` prop.


## Dropup
Turn your dropdown menu into a drop-up menu by setting the `dropup` prop.


## Split button support
Create a split dropdown button, where the left button provides standard
`click` event support, while the right hand side is the dropdown menu toggle button.


## Sizing
Button dropdowns work with buttons of all sizes, including default and split
dropdown buttons.

Set the `size` prop to either `sm` for small button(s), or `lg` for large button(s).

Note chaging the size of the button(s) does not affect the size of the menu items.

## Button contextual variants
The dropdown buttons can have one of the standard Boostrap contextual variants applied
by setting the prop `variant` to `success`, `info`, `danger`, `link` etc.

See [`<b-button>`](./button) for a list of supported contextual variants.


## Supported sub-components
The following components can be placed inside of your dropdowns. Using any other
component or markup may break keyboard navigation.

| Sub-component | Description | Aliases
| --------- | ----------- | -------
| `<b-dropdown-item>` | Action items that provide click, link, and `<router-link>` functionality. renders as an `<a>` element by default. | `<b-dd-item>`
| `<b-dropdown-item-button>` | An alternative to `<b-dropdown-item>` that renders a menu item using a `<button>` element.  |  `<b-dropdown-item-btn>`, `<b-dd-item-button>`, `<b-dd-item-btn>`
| `<b-dropdown-header>` | A header item, used to help identify a group of dropdown items. | `<b-dd-header>`
| `<b-dropdown-divider>` | A divider / spacer which can be used to separate dropdown items. | `<b-dd-divider>`

_Note: Nested sub-menus are **not** supported._


## Accessibility
Providing a unique `id` prop ensures ARIA compliance by automatically adding
the appropriate `aria-*` attributes in the rendered markup.

### Accessibility with Headers
When using `<b-dropdown-header>` components in the dropdown menu, it is reccomended to add an
`id` attribute to the header, and then set the `aria-describedby` attribite (set to the `id`
value of the associated header) on each following dropdown items associated with the header.
This will provide users of assitive technologies (i.e. sight-impared users) context about
the dropdown item:

```html
<template>
  <div>
    <b-dropdown id="ddown_hdrs" text="Dropdown Button sm" variant="primary" class="m-md-2">
      <b-dropdown-header id="header1">Heading 1</b-dropdown-header>
      <b-dropdown-item aria-describedby="header1">Action</b-dropdown-item>
      <b-dropdown-item aria-describedby="header1">Another action</b-dropdown-item>
      <b-dropdown-header id="header2">Heading 2</b-dropdown-header>
      <b-dropdown-item aria-describedby="header2">Some Action</b-dropdown-item>
      <b-dropdown-item aria-describedby="header2">Some other action</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Something else here...</b-dropdown-item>
      <b-dropdown-item disabled>Disabled action</b-dropdown-item>
    </b-dropdown>
  </div>
</template>
```

### Keyboard navigation:
Dropdowns support keyboard navigation, emulating native `<select>` behaviour.

| Keypress | Action
| -------- | ------
| <kbd>DOWN</kbd> | Will highlight the next lower non-disabled item in the menu.
| <kbd>UP</kbd> | Will highlight the next higher non-disbled item in the menu.
| <kbd>ENTER</kbd> or <kbd>SPACE</kbd> | Will click the highlighted menu item.
| <kbd>ESC</kbd> | Will close the dropdown and return focus to the trigger button.
| <kbd>TAB</kbd> | Will close the dropdown and jump to the next focusable control on the page.
| <kbd>SHIFT</kbd>+<kbd>TAB</kbd> | Will close the dropdown and jump to the previous focusable control on the page.

## Component Alias
`<b-dropdown>` can be used via it's shorter alias of `<b-dd>`

