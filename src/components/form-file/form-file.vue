<style>
    /* Custom-file focus styling: These can possibly be removed once BSV4.beta.3 is released */
    /* Although the focus handling/style will still be needed for Firefox keyboard-only users */
    /* Which will be addressed if PR https://github.com/twbs/bootstrap/pull/24138 is merged */

    /* Regular focus styling */
    .b-form-file.custom-file .custom-file-input.focus ~ .custom-file-control,
    .b-form-file.custom-file .custom-file-input:focus ~ .custom-file-control {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        outline: none;
    }
    /* Invalid focus styling */
    .b-form-file.custom-file .custom-file-input.is-invalid.focus ~ .custom-file-control,
    .b-form-file.custom-file .custom-file-input.is-invalid:focus ~ .custom-file-control,
    .was-validated .b-form-file.custom-file .custom-file-input:invalid.focus ~ .custom-file-control,
    .was-validated .b-form-file.custom-file .custom-file-input:invalid:focus ~ .custom-file-control {
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        border-color: #dc3545;
    }
    /* valid focus styling */
    .b-form-file.custom-file .custom-file-input.is-valid.focus ~ .custom-file-control,
    .b-form-file.custom-file .custom-file-input.is-valid:focus ~ .custom-file-control,
    .was-validated .b-form-file.custom-file .custom-file-input:valid.focus ~ .custom-file-control,
    .was-validated .b-form-file.custom-file .custom-file-input:valid:focus ~ .custom-file-control {
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        border-color: #28a745;
    }
    
    /* Interim fix (until BS V4.beta.3) for is-{state} feedback for plain form-file input */
    /* See issue https://github.com/twbs/bootstrap/issues/24831 */

    .form-control-file.is-invalid ~ .invalid-feedback,
    .form-control-file.is-valid ~ .valid-feedback,
    .was-validated .form-control-file:invalid ~ .invalid-feedback,
    .was-validated .form-control-file:valid ~ .valid-feedback {
        display: block;
    }

    /* Drag/Drop and filenames/prompts custom styling */

    .b-form-file.custom-file .custom-file-control {
        overflow: hidden;
    }
    .b-form-file.custom-file .custom-file-control {
        overflow: hidden;
    }
    .b-form-file.custom-file .custom-file-control.dragging {
        overflow: hidden;
        filter: blur(3px);
    }
    .b-form-file.custom-file .custom-file-control[data-selected]::after {
        content: attr(data-selected);
    }
    .b-form-file.custom-file .custom-file-control[data-choose]::before {
        content: attr(data-choose);
    }
    .b-form-file.custom-file .drop-here {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 3px;
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .b-form-file.custom-file .drop-here::before {
        color: white;
        content: attr(data-drop);
    }
</style>

<script>
    import bFormFile from './_form-file'
    export default bFormFile
</script>
