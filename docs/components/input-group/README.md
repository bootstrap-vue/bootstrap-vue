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

<!-- input-group-1.vue -->
```

### Usage
You can attach left or right Addons via props or named slots

#### Via `left` and `right` props:

```html
<div>
  <b-input-group left="$" right=".00">
    <b-form-input></b-form-input>
  </b-input-group>
</div>
  
<!-- input-group-addons-1.vue -->
```

#### Via named slots:
if you want better control over addons, you can use `right` and `left` slots instead:

```html
<div>
  <b-input-group left="Username">
    <b-form-input></b-form-input>
    <!-- Attach Right button -->
    <b-input-group-button slot="right">
      <b-dropdown text="Dropdown" variant="success">
        <b-dropdown-item>Action</b-dropdown-item>
        <b-dropdown-item>Action</b-dropdown-item>
      </b-dropdown>
    </b-input-group-button>
  </b-input-group>
</div>
  
<!-- input-group-addons-2.vue -->
```

#### Direct placement of sub components:
Use the `<b-input-group-addon>` to add arbitrary addons wherever you like, and use
the `<b-input-group-button>` component to group buttons in your input group.  Single
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

<!-- input-group-addons-3.vue -->
```


### Control sizing
Set height using the `size` prop to `sm` or `lg` for small or large respectively. There 
is no ned to set size on the individual inputs or buttons..

To control width, place the input inside standard Bootstrap grid column.

### Related components
- `<b-input-group-addon>`
- `<b-input-group-button>`

`b-input-group-button` can also be used by the shorthand alias `b-input-group-btn`
