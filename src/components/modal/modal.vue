<style>
    /*
      This CSS can be removed once Bootstrap V4.beta.3 is released
      https://github.com/twbs/bootstrap/pull/24510
      Once BSV4.beta.3 is released, the script section can be moved into the modal.js file
      V4.beta.3 will be changing modal margin to rem units
    */
    .modal-dialog-centered {
        display: flex;
        align-items: center;
        /* min-height: calc(100% - (1rem * 2)); */
        min-height: calc(100% - (10px * 2));
    }
    .modal-dialog-centered .modal-content {
        width: 100%;
    }
    @media (min-width: 576px) {
        .modal-dialog-centered {
            /* min-height: calc(100% - (1.75rem * 2)); */
            min-height: calc(100% - (30px * 2));
        }
    }
</style>

<script>
  import bModal from './_modal'
  export default bModal
</script>
