# Form

> Bootstrap form component that optionally supports inline form styles and validation methods

```html
<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group id="exampleInputGroup1"
                    label="Email address:" label-for="exampleInput1"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="exampleInput1"
                      type="email" v-model="form.email" required
                      placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Your Name:" label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text" v-model="form.name" required
                      placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3"
                    label="Food:" label-for="exampleInput3">
        <b-form-select id="exampleInput3"
                      :options="foods" required
                      v-model="form.food"
        ></b-form-select>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox v-model="form.checked" id="exampleInput4">
          Check me out
        </b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="secondary">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data: {
      form: {
        email: '',
        name: '',
        food: null,
        checked: false,
        secret: 'S3CR3T'
      },
      foods: [
        { text:'Select One', value:null },
        'Carrots','Beans','Tomatoes','Corn'
      ]
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      }
    }
  };
</script>

<!-- b-form-1.vue -->
```

## Inline form

Set the `inline` property to generate a Bootstrap inline form.

## Related Form Control Components

See also:

- [`<b-form-input>`](./form-input) Textual and text-like inputs
- [`<b-form-textarea>`](./form-textarea) Text area inputs
- [`<b-form-select>`](./form-select) Select input
- [`<b-form-radio>`](./form-radio) Radio Input groups
- [`<b-form-checkbox>`](./form-checkbox) Checkbox Input
- [`<b-form-file>`](./form-file) File Input
- [`<b-form-group>`](./form-group) Form input wrapper to generate form-groups that support labels, help text and feedback
- [`<b-button>`](./button) Buttons
- [`<b-input-group>`](./input-group) Form inputs with add-ons

## Helper components

- `<b-form-row>` create form rows with tighter margins
- `<b-form-text>` Help text blocks for inputs
- `<b-form-feedback>` Feedback text blocks for input `invalid` states

## Validation

Disable browser native HTML5 validation by setting the `novalidate` prop to true.

Set the `validated` prop to true to add the Bootstrap V4 `.was-validated` class
to the form.

### Validation methods

Coming soon.
