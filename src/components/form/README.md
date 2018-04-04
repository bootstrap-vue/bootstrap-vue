# Form

> Bootstrap form component that optionally supports inline form styles and validation states

```html
<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="exampleInput1"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Your Name:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.name"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3"
                    label="Food:"
                    label-for="exampleInput3">
        <b-form-select id="exampleInput3"
                      :options="foods"
                      required
                      v-model="form.food">
        </b-form-select>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<!-- b-form-1.vue -->
```

## Inline form

Use the `inline` prop on `<b-form>` to display a series of labels, form controls, and
buttons on a single horizontal row. Form controls within inline forms vary slightly
from their default states.

- Controls are `display: flex`, collapsing any HTML white space and allowing you to provide alignment control with spacing and flexbox utilities.
- Controls and input groups receive `width: auto` to override the Bootstrap default width: 100%.
- Controls **only appear inline in viewports that are at least 576px wide** to account for narrow viewports on mobile devices.

You may need to manually address the width and alignment of individual form controls with
[spacing utilities](/docs/reference/spacing) (as shown below). Lastly, be sure to always
include a `<label>` with each form control, even if you need to hide it from non-screenreader
visitors with class `.sr-only`.

```html
<template>
  <div>
    <b-form inline>
      <label class="sr-only" for="inlineFormInputName2">Name</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Jane Doe" />
      <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
      <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input id="inlineFormInputGroupUsername2" placeholder="Username" />
      </b-input-group>
      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
      <b-button variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<!-- b-form-inline-1.vue -->
```

Custom form controls and selects are also supported.

```html
<template>
  <div>
    <b-form inline>
      <label class="mr-sm-2" for="inlineFormCustomSelectPref">Preference</label>
      <b-form-select class="mb-2 mr-sm-2 mb-sm-0"
                     :value="null"
                     :options="{ '1': 'One', '2': 'Two', '3': 'Three' }"
                     id="inlineFormCustomSelectPref">
        <option slot="first" :value="null">Choose...</option>
      </b-form-select>
      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">
        Remember my preference
      </b-form-checkbox>
      <b-button variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<!-- b-form-inline-2.vue -->
```

**Note:** _`<b-form-group>` is not supported in `inline` forms due to layout conflicts._

### Alternatives to hidden labels
Assistive technologies such as screen readers will have trouble with your forms if you
don’t include a label for every input. For these inline forms, you can hide the labels
using the `.sr-only` class. There are further alternative methods of providing a label
for assistive technologies, such as the `aria-label`, `aria-labelledby` or `title`
attributes. If none of these are present, assistive technologies may resort to using
the `placeholder` attribute, if present, but note that use of `placeholder` as a
replacement for other labelling methods is not advised.


## Related Form Control Components

See also:

- [`<b-form-input>`](/docs/components/form-input) Textual and text-like inputs
- [`<b-form-textarea>`](/docs/components/form-textarea) Text area inputs
- [`<b-form-select>`](/docs/components/form-select) Select input
- [`<b-form-radio>`](/docs/components/form-radio) Radio Inputs
- [`<b-form-checkbox>`](/docs/components/form-checkbox) Checkbox Inputs
- [`<b-form-file>`](/docs/components/form-file) File Input
- [`<b-form-group>`](/docs/components/form-group) Form input wrapper to generate form-groups that support labels, help text and feedback
- [`<b-button>`](/docs/components/button) Buttons
- [`<b-input-group>`](/docs/components/input-group) Form inputs with add-ons


## Helper components

- [`<b-form-row>`](/docs/components/layout) create grid rows and columns with tighter margins
- `<b-form-text>` Help text blocks for inputs
- `<b-form-invalid-feedback>` Invalid feedback text blocks for input `invalid` states
- `<b-form-valid-feedback>` Valid feedback text blocks for input `valid` states


## Validation

Disable browser native HTML5 validation by setting the `novalidate` prop to true
on `<b-form>`.

Set the `validated` prop, on `<b-form>`, to `true` to add the Bootstrap V4 `.was-validated` class
to the form to trigger validation states

Refer to the [Bootstrap V4 Form Validation Documentation](https://getbootstrap.com/docs/4.0/components/forms/#validation)
for details on the new Bootstrap V4 validation states.

### Validation mechanisms

Documentation and examples (hopefully) coming soon.

Please see the following references:

- [Bootstrap V4: Form Validation Documentation](https://getbootstrap.com/docs/4.0/components/forms/#validation)
- [MDN: Learn Form Validation - Using JavaScript API](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#Validating_forms_using_JavaScript)
- [MDN: HTML5 Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
- [MDN: Validity State API](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)


## Component Reference
