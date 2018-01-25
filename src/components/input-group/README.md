# Input Groups
> Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs.

```html
<div>
  <!-- Using props -->
  <b-input-group size="lg" prepend="$" append=".00">
    <b-form-input></b-form-input>
  </b-input-group>
  <br>

  <!-- Using slots -->
  <b-input-group>
    <b-input-group-text slot="append">
        <strong class="text-danger">!</strong>
    </b-input-group-text>
    <b-form-input></b-form-input>
  </b-input-group>
  <br>

  <!-- Using components -->
  <b-input-group prepend="Username">
    <b-form-input></b-form-input>
    <b-input-group-append>
      <b-btn variant="outline-success">Button</b-btn>
      <b-btn variant="info">Button</b-btn>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- input-groups-1.vue -->
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
</div>

<!-- input-group-using-props.vue -->
```

### Using named slots
if you want better control over addons, you can use `prepend` and `append` slots instead.

This slots will be wrapped by `<b-input-group-prepend|append>` to display correctly.

```html
<div>
  <b-input-group prepend="Username">
    <b-form-input></b-form-input>
    <template slot="append">
      <b-dropdown text="Dropdown" variant="success">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</div>

<!-- input-group-using-slots.vue -->
```


### Using components
Use the `<b-input-group-prepend>` or `<b-input-group-append>` to add arbitrary addons wherever you like,
and use these components to group buttons in your input group.
Single buttons must always be wrapped in components for proper styling.

```html
<div>
  <b-input-group>
    <b-input-group-prepend>
      <b-btn variant="outline-info">Button</b-btn>
    </b-input-group-prepend>

    <b-form-input type="number" min="0.00"></b-form-input>

    <b-input-group-append>
      <b-btn variant="outline-secondary">Button</b-btn>
      <b-btn variant="outline-secondary">Button</b-btn>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- input-group-addons-placement.vue -->
```


## Checkbox and radio addons
Place any native checkbox or radio within an input group’s addon instead of text.

**Note:** you must use native radio and checkbox inputs, as `<b-form-radio>` and
`<b-form-checkbox>` include additional markup not required in input groups.

```html
<b-container>
  <b-row>
    <b-col lg="6">
      <b-input-group>
        <b-input-group-prepend is-text>
            <input type="checkbox" aria-label="Checkbox for following text input">
        </b-input-group-prepend>
        <b-form-input type="text" aria-label="Text input with checkbox" />
      </b-input-group>
    </b-col>

    <b-col lg="6">
      <b-input-group>
        <b-input-group-prepend is-text>
            <input type="radio" aria-label="Radio for following text input">
        </b-input-group-prepend>
        <b-form-input type="text" aria-label="Text input with radio button" />
      </b-input-group>
    </b-col>
  </b-row>
</b-container>

<!-- input-group-checks-radios.vue -->
```

## Dropdowns

```html
<b-input-group>
  <template slot="prepend" v-for="i in 2" :key="i">
    <b-dropdown text="Dropdown" variant="info">
      <b-dropdown-item>Action A</b-dropdown-item>
      <b-dropdown-item>Action B</b-dropdown-item>
    </b-dropdown>
  </template>

  <b-form-input></b-form-input>

  <template slot="append" v-for="i in 2" :key="i">
    <b-dropdown text="Dropdown" variant="outline-secondary">
      <b-dropdown-item>Action C</b-dropdown-item>
      <b-dropdown-item>Action D</b-dropdown-item>
    </b-dropdown>
  </template>
</b-input-group>

<!-- input-group-dropdown.vue -->
```

## Multiple addons
Multiple add-ons are supported and can be mixed with checkbox and radio input versions.

```html
<b-container>
  <b-row>
    <b-col lg="6">
      <b-input-group prepend="$">
        <b-input-group-prepend is-text>
            <input type="checkbox" aria-label="Checkbox for following text input">
        </b-input-group-prepend>

        <b-form-input type="text" aria-label="Text input with checkbox" />
      </b-input-group>
    </b-col>
  </b-row>
</b-container>

<!-- input-group-multiple.vue -->
```

## Control sizing
Set height using the `size` prop to `sm` or `lg` for small or large respectively. There
is no need to set size on the individual inputs or buttons. Note however, you will be
required to also set the size on dropdowns.

To control width, place the input inside standard Bootstrap grid column.

```html
<div>
  <b-input-group v-for="size in ['sm','','lg']" :key="size" :size="size" class="mb-3" prepend="Label">
    <b-form-input />
    <b-input-group-append>
      <b-btn size="sm" text="Button" variant="success">Button</b-btn>
    </b-input-group-append>
  </b-input-group>
</div>


<!-- input-group-size.vue -->
```


## Contextual states
Bootstrap currently **does not** support contextual state (i.e. valid or invalid) on
input groups.

## Component Reference
