<template>
    <label :lang="lang" :class="['custom-file',unique_class]">

        <!-- Inject strings -->
        <style>
            .{{unique_class}} .custom-file-control::after {
                content: "{{selectedLabel}}" !important;
            }

            .{{unique_class}} .custom-file-control::before {
                content: "{{chooseLabel}}" !important;
            }
        </style>

        <input type="file" :id="id" class="custom-file-input" @change="onFileChange">
        <span class="custom-file-control"></span>

    </label>
</template>

<script>
    export default {
        data() {
            return {
                selectedFile: null
            };
        },
        computed: {
            selectedLabel() {
                if (!this.selectedFile) {
                    return this.browseLabel;
                }
                return this.selectedFile.name;
            },
            unique_class() {
                return 'form_file_' + this._uid;
            }
        },
        watch: {
            selectedFile(newVal) {
                this.$emit('input', newVal);
            }
        },
        methods: {
            onFileChange(e) {
                this.$emit('change', e);

                const files = e.target.files || e.dataTransfer.files;

                if (!files || files.length === 0) {
                    this.selectedFile = null;
                    return;
                }

                this.selectedFile = files[0];
            }
        },
        props: {
            id: {
                type: String,
                default: null
            },
            lang: {
                type: String,
                default: 'en'
            },
            browseLabel: {
                type: String,
                default: 'Browse'
            },
            chooseLabel: {
                type: String,
                default: 'Choose file...'
            }
        }
    };
</script>
