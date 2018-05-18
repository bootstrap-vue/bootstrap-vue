# Form Validation

Bootstrap-Vue does not include form validation by default; we leave that up to the many existing form validation plugins. Below are some examples of plugins and how they may be integrated.

## Vuelidate

Vuelidate provides "Simple, lightweight model-based validation for Vue.js". Installation instructions and other documentation can be found at https://monterail.github.io/vuelidate.

### Example

This example shows how to add different validation and feedback to two form fields, as well as dynamically disable the submit button based on the form validity.

This is a verbose example designed to show how Bootstrap-Vue and Vuelidate interact; in larger applications, you'd likely want to abstract some of the functionality, such as creating a standard error message component.

```html
<template>
  <b-form @submit="onSubmit">
    <b-form-group id="exampleInputGroup1"
                  label="Name"
                  label-for="exampleInput1">
      <b-form-input id="exampleInput1"
                    type="text"
                    v-model="form.name"
                    :state="!$v.form.name.$invalid"
                    aria-describedby="input1LiveFeedback"
                    placeholder="Enter name" />
      <b-form-invalid-feedback id="input1LiveFeedback">
        This is a required field and must be at least 3 characters
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="exampleInputGroup2"
                  label="Food"
                  label-for="exampleInput2">
      <b-form-select id="exampleInput2"
                     :options="foods"
                     :state="!$v.form.food.$invalid"
                     v-model="form.food" />
      <b-form-invalid-feedback id="input2LiveFeedback">
        This is a required field
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit"
              variant="primary"
              :disabled="$v.form.$invalid">
      Submit
    </b-button>
  </b-form>  
</template>

<script>
  import { validationMixin } from "vuelidate"
  import { required, minLength } from "vuelidate/lib/validators"
  
  export default {
    name: "myForm",
    data() {
      return {
        foods: [
          "apple",
          "orange"
        ],
        form: {}
      }
    },
    mixins: [
      validationMixin
    ],
    validations: {
      form: {
        food: {
          required
        },
        name: {
          required,
          minLength: minLength(3)   
        }
      }
    },
    methods: {
      onSubmit() {
        // form submit logic
      }
    }
  }
</script>

<!-- form-validation-1.vue -->
```

## VeeValidate

VeeValidate provides a simple, flexible and configurable fields validation, without needing a model. Installation instructions and other documentation can be found at https://baianat.github.io/vee-validate.

### Example

This example shows how to add different validation and feedback to two form fields, as well as dynamically disable the submit button based on the form validity. You can test it out live at https://codepen.io/uriannrima/pen/aGPvYm

```html
<template>
  <b-form @submit="onSubmit">
    <b-form-group id="exampleInputGroup1"
                  label="Name"
                  label-for="exampleInput1">
      <b-form-input id="exampleInput1"
                    type="text"
                    name="name"
                    v-model="form.name"
                    :state="getState('name')"
                    aria-describedby="input1LiveFeedback"
                    placeholder="Enter name"
                    v-validate="{ required: true, min: 3 }" />
      <b-form-invalid-feedback id="input1LiveFeedback">
        This is a required field and must be at least 3 characters
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="exampleInputGroup2"
                  label="Food"
                  label-for="exampleInput2">
      <b-form-select id="exampleInput2"
                     :options="foods"
                     name="food"
                     :state="getState('food')"
                     v-model="form.food" 
                     v-validate="{ required: true }"/>
      <b-form-invalid-feedback id="input2LiveFeedback">
        This is a required field
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit"
              variant="primary"
              :disabled="errors.any()">
      Submit
    </b-button>
  </b-form>  
</template>

<script>
  export default {
    name: "myForm",
    data() {
      return {
        foods: [
          "apple",
          "orange"
        ],
        form: {}
      }
    },
    methods: {
      /** Required to return a null state, since VeeValidate erros only only true or false. */
      getState(fieldName) {
        const field = this.$validator.fields.find({
          name: fieldName
        });
        if (field && field.flags.touched) {
          return field.flags.valid;
        }
        return null;
      },
      onSubmit() {
        // form submit logic
        console.log('Submited');
      }
    }
  }
</script>

<!-- form-validation-2.vue -->
```