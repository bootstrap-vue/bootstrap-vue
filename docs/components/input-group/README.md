# Input Groups
> Easily extend form controls by adding text, buttons, or button groups on either side of textual 

You can simply attach Left or right Addons:

```html
<b-input-group left="$" right=".00">
    <b-form-input></b-form-input>
</b-input-group>
```

Or if you want better control over addons, you can use `right` and `left` slots instead:

```html
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
```