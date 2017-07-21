# Form Checkbox Input

> For cross browser consistency, `<b-form-checkbox>` uses Bootstrap's custom
checkbox input to replace the browser default checkbox input. It is built on top of
semantic and accessible markup, so it is a solid replacement for the default checkbox input.

**Example 1:** Single checkbox
```html
<template>
  <div>
    <b-form-checkbox id="checkbox1" v-model="state" value="accepted" unchecked-value="not_accepted">
      I accept terms and use
    </b-form-checkbox>

    <div>State: <strong>{{state}}</strong></div>
  </div>
</template>

<script>
export default {
    data: {
        state: 'please_accept'
    }
}
</script>

<!-- form-checkbox-1.vue -->
```

**Example 2:** Multiple choice checkboxes
```html
<template>
  <div>
    <b-form-fieldset id="fieldset2"
                     :label="label"
                     label-for="checkboxes2"
                     :description="desc"
                     :state="state"
                     :feedback="feedback"
    >
      <div role="group" id="checkboxes2">
        <b-form-checkbox v-model="selected" name="flavour" value="orange">Orange</b-form-checkbox>
        <b-form-checkbox v-model="selected" name="flavour" value="apple">Apple</b-form-checkbox>
        <b-form-checkbox v-model="selected" name="flavour" value="pineapple">Pineapple</b-form-checkbox>
        <b-form-checkbox v-model="selected" name="flavour" value="grape">Grape</b-form-checkbox>
      </div>
    </b-form-fieldset>
    <hr>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
export default {
  data: {
    label: 'Choose Your Flavours:',
    desc: 'Select at most <b>2</b> flavours',
    selected: [] // Must be an array reference!
  },
  computed: {
    feedback() {
       if (this.selected.length > 2) {
         return "Don't be greedy!";
       } else if (this.selected.length === 1) {
         return 'Select one more...';
       }
       return '';
    },
    state() {
       if (this.selected.length > 2) {
         return 'danger';
       } else if (this.selected.length === 2) {
         return 'success';
       } else if (this.selected.length === 1) {
         return 'warning';
       }
       return '';
    }
  }
}
</script>

<!-- form-checkbox-2.vue -->
```

### Value(s)
By default, `<b-form-checkbox>` value will be `true` when checked and `false` when unchecked.
You can customize the checked and unchecked values by specifying the `value` and `unchecked-value`
properties.

`v-model` binds to the `checked` property.  When you have multiple checkboxes that bind to a
single data state variable, you **must** provide an array reference `[]` to your `v-model`!

Note that when `v-model` is bound to multiple checkboxes, the `unchecked-value` is **not used**.
Only the value(s) of the checked chcekboxes will be returned in the `v-model` bound array. You
should provide unique values for each checkbox's `value` prop.


#### Multiple checkboxes and accessibility
When binding multiple checkboxes together, you should set the `name` prop to the same value for
all checkboxes in the group, as well as wrap the group in a `<div>` (or other block element)
which has the aria attribute `role="group"`. This will inform users of assitive technologies
that the checkboxes are related.

When placing the group of checkboxes inside a `<b-form-fieldset>`, set a unique `id` on the
element with `role="group"` and set the `label-for` prop of the `<b-form-fieldet>` to
this `id` value (see **Example 2** above).  Whenever using grouped checkboxes, it is
recommended that they be placed in a `<b-form-fieldset>` component to associate a `<label>`
with the entire group of checkboxes.


### Contextual states
To apply contextual state colors to `<b-form-checkbox>`, it must be wrapped in
a `<b-form-fieldset>` component (which has the `state` prop set to the state you
would like), or wrapped in another element - such as a `<div>` - which has one
of the standard Bootstrap V4 `.has-*` state class applied.


### Indeterminate (tri-state) support
Normally checkbox inputs can only have two states: `checked` or `unchecked`. They can
have any value, but they either submit that value (checked) or don't (unchecked) with
a form submission (although Bootstrap-Vue allows a value for the `unchecked` state)

_Visually_, there are actually three states a checkbox can be in: `checked`,
`unchecked`, or `indeterminate`.

The `indeterminate` state is **visual only**. The checkbox is still either checked or
unchecked as a state. That means the visual indeterminate state masks the real value
of the checkbox, so that better make sense in your UI!

`<b-form-checkbox>` supports setting this visual indeterminate state via the `indeterminate`
prop (defaults to `false`). Clicking the checkbox will clear its indeterminate state.
The `indeterminate` prop can be synced to the checkboxe's state by v-binding the
`indeterminate` prop with the `.sync` modifier.

**Example 3: Single Indeterminate checkbox:**
```html
<template>
  <div>
    <b-form-checkbox v-model="checked" :indeterminate.sync="indeterminate">
      Click me to see what happens
    </b-form-checkbox>
    <br>
    <div aria-live="polite">
      Checked: <strong>{{ checked }}</strong><br>
      Indeterminate: <strong>{{ indeterminate }}</strong>
    </div>
    <b-btn @click="toggleIndeterminate">Toggle Indeterminate State</b-btn>
  </div>
</template>

<script>
export default {
    data: {
        checked: true,
        indeterminate: true
    },
    methods: {
        toggleIndeterminate() {
            this.indeterminate = !this.indeterminate;
        }
    }
}
</script>

<!-- form-checkbox-3.vue -->
```

**Example 4: Indeterminate checkbox use-case:**
```html
<template>
  <b-card>
    <b-form-checkbox v-model="allSelected"
                     :indeterminate="indeterminate"
                     aria-describedby="flavours"
     >
      {{ allSelected ? 'Un-select' : 'Select' }}
      All Flavors
    </b-form-checkbox>
    <div id="flavors" role="group" class="ml-2" aria-label="Individual flavors">
      <b-form-checkbox v-for="flavor in flavors"
                       v-model="selected"
                       name="flav"
                       :value="flavor"
      >{{ flavor }}</b-form-checkbox>
    </div>
    <p aria-live="polite">Selected: <strong>{{ selected }}</strong></p>
  </b-card>
</template>

<script>
export default {
    data: {
        flavors: ['Orange', 'Grape', 'Apple', 'Lime', 'Berry'],
        selected: [],
        allSelected: false,
        indeterminate: false
    },
    watch: {
        allSelected(newVal, oldVal) {
            // Handle selecting/deselecting all checkboxes
            if (newVal !== oldVal) {
                this.selected = newVal ? this.flavors.slice() : [];
            }
        }
        selected(newValue, oldValue) {
            // Handle changes in individual flavor checkboxes
            if (newVal.length === 0) {
                this.indeterminate = false;
                this.allSelected = false;
            } else if (newVal.length === this.flavors.length) {
                this.indeterminate = false;
                this.allSelected = true;
            } else {
                this.indeterminate = true;
                this.allSelected = false;
            }
        }
    }
}
</script>
<!-- form-checkbox-4.vue -->
```

#### Indeterminate state and accessibility
Not all screen readers will convey the indeterminate state to screen reader users.
So it is recommended to provide some form of textual feedback to the user (possibly 
by via the `.sr-only` class) if the indeterminate state has special contextual
meaning in your application.


### Non custom check inputs
You can have `b-form-checkbox` render a browser native chechbox input by setting the `plain` prop.


### See also
- [`<b-form-fieldset>`](./form-fieldset)

