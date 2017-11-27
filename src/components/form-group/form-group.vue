<style>
/*
   Bootstrap V4.beta uses ~ sibling selector to display the .invalid-feedback
   so we ue a style override and also place .is-invalid on the input layout section
   to target our b-form-feedback (.invalid-feedback) to display it in case
   the form input(s) are wrapped in another element, no longer making them siblings
 */
.b-form-group.form-group.is-invalid .invalid-feedback {
  display: block !important;
}
.b-form-group.form-group.is-valid .invalid-feedback {
  display: none !important;
}
.b-form-group.form-group.is-valid .valid-feedback {
  display: block !important;
}
.b-form-group.form-group.is-invalid .valid-feedback {
  display: none !important;
}
</style>

<script>
    import bFormGroup from './_form-group'
    export default bFormGroup
</script>
