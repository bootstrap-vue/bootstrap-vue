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
    <template v-slot:append>
      <b-input-group-text><strong class="text-danger">!</strong></b-input-group-text>
    </template>
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

You can attach addons using either props, named slots and/or sub-components.

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

The slot content will automatically be wrapped by
[`<b-input-group-prepend>` or `<b-input-group-append>`](#using-sub-components) to display correctly.

```html
<div>
  <b-input-group>
    <template v-slot:prepend>
      <b-input-group-text >Username</b-input-group-text>
    </template>
    <b-form-input></b-form-input>

    <template v-slot:append>
      <b-dropdown text="Dropdown" variant="success">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</div>

<!-- b-input-group-using-slots.vue -->
```

### Using sub-components

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
      <b-button variant="outline-primary">Button</b-button>
      <b-input-group-text>
        <b-icon icon="x" />
      </b-input-group-text>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group-addons-placement.vue -->
```

Set the `is-text` prop on `<b-input-group-prepend>` or `<b-input-group-append>` if the content is
textual in nature to apply proper styling. Alternatively, place the `<b-input-group-text>`
subcomponent inside of the `<b-input-group-prepend>` or `<b-input-group-append>`. This also applies
when you want to use on of [BootstrapVue's icons](/docs/icons).

## Supported form-controls

The following are the form controls supported as the input-group's _main_ input element:

- [`<b-form-input>`](/docs/components/form-input)
- [`<b-form-textarea>`](/docs/components/form-textarea)
- [`<b-form-select>`](/docs/components/form-select)
- [`<b-form-file>`](/docs/components/form-file)
- [`<b-form-rating>`](/docs/components/form-rating)
- [`<b-form-tags>`](/docs/components/form-tags)
- [`<b-form-spinbutton>`](/docs/components/form-spinbutton)
- [`<b-form-datepicker>`](/docs/components/form-datepicker)
- [`<b-form-timepicker>`](/docs/components/form-timepicker)

**Notes:**

- BootstrapVue uses custom SCSS/CSS to handling sizing the `<b-form-file>` input when it is placed
  in a `<b-input-group>` which has a [`size`](#control-sizing) specified.
- BootstrapVue uses custom SCSS/CSS when `<b-form-input type="range">` is placed in a
  `<b-input-group>`.
- BootstrapVue's custom components (i.e. `<b-form-spinbutton>`, `<b-form-rating>`, `<b-form-tags>`,
  etc.) require BootstrapVue's custom SCSS/CSS.

## Checkbox and radio addons

Place any checkbox or radio within an input group's addon instead of text.

**Note:** Bootstrap v4.x recommends using native radio and checkbox inputs over custom radios and
checkboxes, but it is possible to use as `<b-form-radio>` and `<b-form-checkbox>` with a few utility
classes applied.

### Native checkbox and radio addons

```html
<div>
  <b-input-group class="mb-2">
    <b-input-group-prepend is-text>
      <input type="checkbox" aria-label="Checkbox for following text input">
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with checkbox"></b-form-input>
  </b-input-group>

  <b-input-group>
    <b-input-group-prepend is-text>
      <input type="radio" aria-label="Radio for following text input">
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with radio input"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-checks-radios.vue -->
```

### Custom radio, checkbox, and switch addons

Using `<b-form-checkbox>` and `<b-form-radio>` components as addons, using Bootstrap
[utility classes](/docs/reference/utility-classes) for additional styling to get them to "fit" in
the addon:

```html
<div>
  <b-input-group class="mb-2">
    <b-input-group-prepend is-text>
      <b-form-checkbox class="mr-n2">
        <span class="sr-only">Checkbox for following text input</span>
      </b-form-checkbox>
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with checkbox"></b-form-input>
  </b-input-group>

  <b-input-group class="mb-2">
    <b-input-group-prepend is-text>
      <b-form-radio class="mr-n2">
        <span class="sr-only">Radio for following text input</span>
      </b-form-radio>
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with radio input"></b-form-input>
  </b-input-group>

  <b-input-group>
    <b-input-group-prepend is-text>
      <b-form-checkbox switch class="mr-n2">
        <span class="sr-only">Switch for following text input</span>
      </b-form-checkbox>
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with switch"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-custom-checks-radios.vue -->
```

In the above example, we have use the `.sr-only` class on a `<span>` to visually hide the custom
control's label content (while making them still accessible to screen reader users), and used the
utility class `.mr-n2` to add a negative right margin to compensate for the "gutter" space between
the control and the hidden label.

## Multiple inputs

```html
<div>
  <b-input-group prepend="First and last name" class="mb-2">
    <b-form-input aria-label="First name"></b-form-input>
    <b-form-input aria-label="Last name"></b-form-input>
  </b-input-group>
</div>

<!-- input-group-multiple-inputs.vue -->
```

## Multiple addons

Multiple add-ons are supported and can be mixed with checkbox and radio input versions.

```html
<div>
  <b-input-group prepend="Item">
    <b-input-group-prepend is-text>
      <input type="checkbox" aria-label="Checkbox for following text input">
    </b-input-group-prepend>
    <b-input-group-prepend is-text><b>$</b></b-input-group-prepend>
    <b-form-input type="number" aria-label="Text input with checkbox"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-multiple-addons.vue -->
```

## Dropdown addons

```html
<div>
  <b-input-group>
    <template v-slot:prepend>
      <b-dropdown text="Dropdown" variant="info">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </template>

    <b-form-input></b-form-input>

    <template v-slot:append>
      <b-dropdown text="Dropdown" variant="outline-secondary" v-for="i in 2" :key="i">
        <b-dropdown-item>Action C</b-dropdown-item>
        <b-dropdown-item>Action D</b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</div>

<!-- b-input-group-dropdown.vue -->
```

## Control sizing

Set height using the `size` prop to `sm` or `lg` for small or large respectively. There is no need
to set size on the individual inputs or buttons. Note however, you _will be required_ to also set
the size on dropdowns.

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

To control width, place the input inside standard Bootstrap grid column.

### Sizing custom radio, checkbox and switch addons

If using `<b-form-radio>` or `<b-form-checkbox>` as addons, additional utility classes may be
required to make everything fit correctly, depending on the size chosen:

```html
<div>
  <b-input-group size="sm" prepend="Small" class="mb-2">
    <b-form-input aria-label="Small text input with custom switch"></b-form-input>
    <b-input-group-append is-text>
      <b-form-checkbox switch class="mr-n2 mb-n1">
        <span class="sr-only">Checkbox for previous text input</span>
      </b-form-checkbox>
    </b-input-group-append>
  </b-input-group>

  <b-input-group size="lg" prepend="Large" class="mb-2">
    <b-form-input aria-label="Large text input with switch"></b-form-input>
    <b-input-group-append is-text>
      <b-form-checkbox switch class="mr-n2">
        <span class="sr-only">Switch for previous text input</span>
      </b-form-checkbox>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group-custom-checks-radios-sizing.vue -->
```

Specifically, when using the `sm` size on `<b-input-group>` you will need to add a negative bottom
margin, via the use of the `.mb-n1` [utility class](/docs/reference/utility-classes).

## Contextual states

Bootstrap v4 currently **does not** support contextual state styling (i.e. valid or invalid) of
input groups. However, the inputs inside the input group do support contextual state.

<!-- Component reference added automatically from component package.json -->
