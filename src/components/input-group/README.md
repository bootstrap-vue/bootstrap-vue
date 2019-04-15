# Input Groups

> Easily extend form controls by adding text, buttons, or button groups on either side of textual
> inputs.

```html
<div>
  <!-- Using props -->
  <b-input-group size="lg" prepend="$" append=".00">
    <b-form-input></b-form-input>
  </b-input-group>

  <!-- Using slots -->
  <b-input-group class="mt-3">
    <b-input-group-text slot="append"><strong class="text-danger">!</strong></b-input-group-text>
    <b-form-input></b-form-input>
  </b-input-group>

  <!-- Using components -->
  <b-input-group prepend="Username" class="mt-3">
    <b-form-input></b-form-input>
    <b-input-group-append>
      <b-button variant="outline-success">Button</b-button>
      <b-button variant="info">Button</b-button>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group.vue -->
```

## Usage

You can attach addons using either props, named slots or components.

### Using `prepend` and `append` props

Values will be internally wrapped by a `<b-input-group-text>` to display correctly.

```html
<div>
  <b-input-group prepend="$" append=".00">
    <b-form-input></b-form-input>
  </b-input-group>

  <b-input-group prepend="0" append="100" class="mt-3">
    <b-form-input type="range" min="0" max="100"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-using-props.vue -->
```

### Using named slots

if you want better control over addons, you can use `prepend` and `append` slots instead.

This slots will be wrapped by `<b-input-group-prepend|append>` to display correctly.

```html
<div>
  <b-input-group>
    <b-input-group-text slot="prepend">Username</b-input-group-text>
    <b-form-input></b-form-input>

    <b-dropdown text="Dropdown" variant="success" slot="append">
      <b-dropdown-item>Action A</b-dropdown-item>
      <b-dropdown-item>Action B</b-dropdown-item>
    </b-dropdown>
  </b-input-group>
</div>

<!-- b-input-group-using-slots.vue -->
```

### Using components

Use the `<b-input-group-prepend>` or `<b-input-group-append>` to add arbitrary addons wherever you
like, and use these components to group buttons in your input group. Single buttons must always be
wrapped in these components for proper styling.

```html
<div>
  <b-input-group>
    <b-input-group-prepend>
      <b-button variant="outline-info">Button</b-button>
    </b-input-group-prepend>

    <b-form-input type="number" min="0.00"></b-form-input>

    <b-input-group-append>
      <b-button variant="outline-secondary">Button</b-button>
      <b-button variant="outline-secondary">Button</b-button>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group-addons-placement.vue -->
```

Set the `is-text` prop on `<b-input-group-prepend>` or `<b-input-group-append>` if the content is
textual in nature to apply proper styling. Alternatively, use the `<b-input-group-text>`
subcomponent inside the `<b-input-group-prepend>` or `<b-input-group-append>`.

## Checkbox and radio addons

Place any native checkbox or radio within an input group's addon instead of text.

**Note:** you must use native radio and checkbox inputs, as `<b-form-radio>` and `<b-form-checkbox>`
include additional markup not required in input groups.

```html
<b-container>
  <b-row>
    <b-col lg="6">
      <b-input-group>
        <b-input-group-prepend is-text>
          <input type="checkbox" aria-label="Checkbox for following text input">
        </b-input-group-prepend>
        <b-form-input aria-label="Text input with checkbox"></b-form-input>
      </b-input-group>
    </b-col>

    <b-col lg="6">
      <b-input-group>
        <b-input-group-prepend is-text>
          <input type="radio" aria-label="Radio for following text input">
        </b-input-group-prepend>
        <b-form-input aria-label="Text input with radio button"></b-form-input>
      </b-input-group>
    </b-col>
  </b-row>
</b-container>

<!-- b-input-group-checks-radios.vue -->
```

## Dropdowns

```html
<b-input-group>
  <b-dropdown slot="prepend" text="Dropdown" variant="info" v-for="i in 2" :key="i">
    <b-dropdown-item>Action A</b-dropdown-item>
    <b-dropdown-item>Action B</b-dropdown-item>
  </b-dropdown>

  <b-form-input></b-form-input>

  <b-dropdown slot="append" text="Dropdown" variant="outline-secondary" v-for="i in 2" :key="i">
    <b-dropdown-item>Action C</b-dropdown-item>
    <b-dropdown-item>Action D</b-dropdown-item>
  </b-dropdown>
</b-input-group>

<!-- b-input-group-dropdown.vue -->
```

## Multiple addons

Multiple add-ons are supported and can be mixed with checkbox and radio input versions.

```html
<b-container>
  <b-row>
    <b-col lg="6">
      <b-input-group prepend="Item">
        <b-input-group-prepend is-text>
          <input type="checkbox" aria-label="Checkbox for following text input">
        </b-input-group-prepend>
        <b-input-group-prepend is-text><b>$</b></b-input-group-prepend>
        <b-form-input type="number" aria-label="Text input with checkbox"></b-form-input>
      </b-input-group>
    </b-col>
  </b-row>
</b-container>

<!-- b-input-group-multiple.vue -->
```

## Control sizing

Set height using the `size` prop to `sm` or `lg` for small or large respectively. There is no need
to set size on the individual inputs or buttons. Note however, you will be required to also set the
size on dropdowns.

To control width, place the input inside standard Bootstrap grid column.

```html
<div>
  <b-input-group
    v-for="size in ['sm','','lg']"
    :key="size"
    :size="size"
    class="mb-3"
    prepend="Label"
  >
    <b-form-input></b-form-input>
    <b-input-group-append>
      <b-button size="sm" text="Button" variant="success">Button</b-button>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group-size.vue -->
```

## Contextual states

Bootstrap V4 currently **does not** support contextual state styling (i.e. valid or invalid) of
input groups. However, the inputs inside the input group do support contextual state.

<!-- Component reference added automatically from component package.json -->
