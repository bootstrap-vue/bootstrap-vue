<style>
    /*
     * Temporary fix, as BS V4.beta.2 mistakenly removed progress-bar transition.
     * This should be able to be removed once V4.beta.3 is released.
     * And this full component can be moved into the progress.js file
     */
    .progress-bar {
        transition: width .6s ease;
    }
</style>

<script>
  import bProgress from './_progress'
  export default bProgress
</script>
