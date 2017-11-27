<style>
    /*
      This CSS can be removed once Bootstrap V4.beta.3 is released
      https://github.com/twbs/bootstrap/pull/24510
      Vertically centered modals are not suited to tall content (the header gets cut off)
      Once BSV4.beta.3 is released, the script section can be moved into the modal.js file
    */
    .modal-dialog-centered {
        display: flex;
        align-items: center;
        min-height: calc(100% - 30px);
    }
    .modal-dialog-centered .modal-content {
        width: 100%;
    }
</style>

<script>
  import bModal from './_modal'
  export default bModal
</script>
