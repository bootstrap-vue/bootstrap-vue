# Input Groups
> Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs.

```html
<div>
  <b-input-group left="$" right=".00">
    <b-form-input></b-form-input>
  </b-input-group>

  <br>

  <b-input-group size="lg" left="$" right=".00">
    <b-form-input></b-form-input>
  </b-input-group>

  <br>

  <b-input-group>
    <!-- Add-ons -->
    <b-input-group-addon>
      <strong class="text-danger">!</strong>
    </b-input-group-addon>
    <b-input-group-addon>
      Username
    </b-input-group-addon>

    <!-- Main form input -->
    <b-form-input></b-form-input>

    <!-- Attach Right button Group via slot -->
    <b-input-group-button slot="right">
      <b-dropdown text="Dropdown" variant="success" right>
        <b-dropdown-item>Action</b-dropdown-item>
        <b-dropdown-item>Action</b-dropdown-item>
      </b-dropdown>
      <b-btn variant="info">Button</b-btn>
    </b-input-group-button>

  </b-input-group>
</div>

<!-- input-groups-1.vue -->
```

## Usage
You can attach left or right Addons via props or named slots

### Via `left` and `right` props:

```html
<div>
  <b-input-group left="$" right=".00">
    <b-form-input></b-form-input>
  </b-input-group>
</div>

<!-- input-group-addons-props.vue -->
```

### Via named slots:
if you want better control over addons, you can use `right` and `left` slots instead:

```html
<div>
  <b-input-group left="Username">
    <b-input-group-button slot="right">
      <b-dropdown text="Dropdown" variant="success">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </b-input-group-button>
    <b-form-input></b-form-input>
  </b-input-group>
</div>

<!-- input-group-addons-slots.vue -->
```


### Direct placement of sub components:
Use the `<b-input-group-addon>` to add arbitrary addons wherever you like, and use
the `<b-input-group-button>` component to group buttons in your input group. Single
buttons must always be wrapped in a `<b-input-group-button>` for proper styling

```html
<div>
  <b-input-group>
    <b-input-group-addon>$</b-input-group-addon>
    <b-form-input type="number" min="0.00"></b-form-input>
    <b-input-group-addon>.00</b-input-group-addon>
    <b-input-group-button>
      <b-btn variant="success">Buy Now</b-btn>
    </b-input-group-button>
  </b-input-group>
</div>

<!-- input-group-addons-placement.vue -->
```


## Checkbox and radio addons
Place any native checkbox or radio within an input group’s addon instead of text.

```html
<b-container>
  <b-row>
    <b-col lg="6">
      <b-input-group>
        <b-input-group-addon>
          <input type="checkbox" aria-label="Checkbox for following text input">
        </b-input-group-addon>
        <b-form-input type="text" aria-label="Text input with checkbox" />
      </b-input-group>
    </b-col>
    <b-col lg="6">
      <b-input-group>
        <b-input-group-addon>
          <input type="radio" aria-label="Radio button for following text input">
        </b-input-group-addon>
        <b-form-input type="text" aria-label="Text input with radio button" />
      </b-input-group>
    </b-col>
  </b-row>
</b-container>

<!-- input-group-checks-radios.vue -->
```

**Note:** you must use native radio and checkbox inputs, as `<b-form-radio>` and
`<b-form-checkbox>` include additional markup not required in input groups.


## Multiple addons
Multiple add-ons are supported and can be mixed with checkbox and radio input versions.


```html
<b-container>
  <b-row>
    <b-col lg="6">
      <b-input-group>
        <b-input-group-addon>
          <input type="checkbox" aria-label="Checkbox for following text input">
        </b-input-group-addon>
        <b-input-group-addon>$</b-input-group-addon>
        <b-form-input type="text" aria-label="Text input with checkbox" />
      </b-input-group>
    </b-col>
    <b-col lg="6">
      <b-input-group>
        <b-input-group-addon>$</b-input-group-addon>
        <b-input-group-addon>0.00</b-input-group-addon>
        <b-form-input type="text" aria-label="Text input multiple addons" />
      </b-input-group>
    </b-col>
  </b-row>
</b-container>

<!-- input-group-multiple.vue -->
```


## Button addons
Buttons in input groups must wrapped in a `<b-input-group-button>` for proper alignment
and sizing. This is required due to default browser styles that cannot be overridden.
Multiple buttons can be placed inside a single `<b-input-group-button>`.

```html
<b-container>
  <b-row>
    <b-col lg="6" class="mb-3">
      <b-input-group>
        <b-input-group-button>
          <b-button>Go!</b-button>
        </b-input-group-button>
        <b-form-input type="text" placeholder="Search for..." />
      </b-input-group>
    </b-col>
    <b-col lg="6" class="mb-3">
      <b-input-group>
        <b-form-input type="text" placeholder="Search for..." />
        <b-input-group-button>
          <b-button>Go!</b-button>
        </b-input-group-button>
      </b-input-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col lg="6" class="mb-3">
      <b-input-group>
        <b-input-group-button>
          <b-button variant="success">Love It</b-button>
        </b-input-group-button>
        <b-form-input type="text" placeholder="Product" />
        <b-input-group-button>
          <b-button variant="danger">Hate It</b-button>
        </b-input-group-button>
      </b-input-group>
    </b-col>
    <b-col lg="6" class="mb-3">
      <b-input-group>
        <b-form-input type="text" placeholder="Product" />
        <b-input-group-button>
          <b-button variant="success">Add</b-button>
          <b-button variant="danger">Remove</b-button>
        </b-input-group-button>
      </b-input-group>
    </b-col>
  </b-row>
</b-container>

<!-- input-group-buttons.vue -->
```

## Addons with dropdowns
Dropdowns, like buttons, must be placed inside a `<b-input-group-button>`

```html
<div>
  <b-input-group>
    <b-form-input placeholder="Produt" />
    <b-input-group-button>
      <b-dropdown text="Dropdown" variant="success">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </b-input-group-button>
  </b-input-group>
</div>

<!-- input-group-dropdowns.vue -->
```

## Control sizing
Set height using the `size` prop to `sm` or `lg` for small or large respectively. There
is no need to set size on the individual inputs or buttons. Note however, you will be
required to also set the size on dropdowns.

To control width, place the input inside standard Bootstrap grid column.

```html
<div>
  <b-input-group size="sm" class="mb-3">
    <b-input-group-addon>Small</b-input-group-addon>
    <b-form-input type="text" />
    <b-input-group-button>
      <b-dropdown size="sm" text="Dropdown" variant="success">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </b-input-group-button>
  </b-input-group>
  <b-input-group size="lg">
    <b-input-group-addon>Large</b-input-group-addon>
    <b-input-group-addon>$</b-input-group-addon>
    <b-form-input type="text" />
    <b-input-group-button>
      <b-button>Button</b-button>
    </b-input-group-button>
  </b-input-group>
</div>

<!-- input-group-size.vue -->
```


## Contextual states
Bootstrap V4.beta currently **does not** support contextual state (i.e. valid or invalid) on
input groups.


## Related sub-components
- `<b-input-group-addon>`
- `<b-input-group-button>`

## Component aliases
- `<b-input-group-button>` can also be used by the shorthand alias `<b-input-group-btn>`

## Component Reference
