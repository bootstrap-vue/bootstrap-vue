<template>
    <input v-if="plain"
           type="file"
           :id="safeId()"
           ref="input"
           :class="['form-control-file', sizeFormClass, stateClass]"
           :name="name"
           :disabled="disabled"
           :required="required"
           :capture="capture || null"
           :aria-required="required ? 'true' : null"
           :accept="accept || null"
           :multiple="multiple"
           :webkitdirectory="directory"
           @change="onFileChange">
    <div v-else
         :class="['custom-file', 'w-100', stateClass]"
         :id="safeId('_BV_file_outer_')"
         @dragover.stop.prevent="dragover">
         <!-- Normally this div should be label, but IE borks out if label has a file input inside. Awaiting fix from MSFT -->

        <!-- Drop Here Target -->
        <span v-if="dragging"
              :data-drop="dropLabel"
              class="drop-here"
              @dragover.stop.prevent="dragover"
              @drop.stop.prevent="drop"
              @dragleave.stop.prevent="dragging=false"
        ></span>

        <!-- Real Form input -->
        <input type="file"
               :id="safeId()"
               ref="input"
               :class="['custom-file-input', 'w-100', stateClass, hasFocus?'focus':'']"
               :name="name"
               :disabled="disabled"
               :required="required"
               :capture="capture || null"
               :aria-required="required ? 'true' : null"
               :accept="accept || null"
               :multiple="multiple"
               :webkitdirectory="directory"
               :aria-describedby="safeId('_BV_file_control_')"
               @focusin="focusHandler"
               @focusout="focusHandler"
               @change="onFileChange">

        <!-- Overlay Labels -->
        <span :id="safeId('_BV_file_control_')"
              :class="['custom-file-control', dragging?'dragging':null]"
              :data-choose="computedChooseLabel"
              :data-selected="selectedLabel"
        ></span>

    </div>
</template>

<style scoped>
    /* Custom-file focus styling */
    /* regular focus styling */
    .custom-file-input.focus ~ .custom-file-control,
    .custom-file-input:focus ~ .custom-file-control {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: none;
    }

    /* Invalid focus styling */
    .custom-file-input.is-invalid.focus ~ .custom-file-control,
    .custom-file-input.is-invalid:focus ~ .custom-file-control,
    .was-validated .custom-file-input:invalid.focus ~ .custom-file-control,
    .was-validated .custom-file-input:invalid:focus ~ .custom-file-control {
        -webkit-box-shadow: 0 0 0 .2rem rgba(220,53,69,.25);
        box-shadow: 0 0 0 .2rem rgba(220,53,69,.25);
        border-color: #dc3545;
    }

    /* valid focus styling */
    .custom-file-input.is-valid.focus ~ .custom-file-control,
    .custom-file-input.is-valid:focus ~ .custom-file-control,
    .was-validated .custom-file-input:valid.focus ~ .custom-file-control,
    .was-validated .custom-file-input:valid:focus ~ .custom-file-control {
        -webkit-box-shadow: 0 0 0 .2rem rgba(40,167,69,.25);
        box-shadow: 0 0 0 .2rem rgba(40,167,69,.25);
        border-color: #28a745;
    }

    /* Drag/Drop and filenames/prompts handling */
    .custom-file-control {
        overflow: hidden;
    }

    .custom-file-control {
        overflow: hidden;
    }

    .custom-file-control.dragging {
        overflow: hidden;
        filter: blur(3px);
    }

    .custom-file-control[data-selected]::after {
        content: attr(data-selected);
    }

    .custom-file-control[data-choose]::before {
        content: attr(data-choose);
    }

    .custom-file .drop-here {
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

    .custom-file .drop-here::before {
        color: white;
        content: attr(data-drop);
    }

</style>

<script>
    import { idMixin, formStateMixin, formCustomMixin, formMixin } from '../mixins';
    import { from as arrayFrom } from '../utils/array';

    export default {
        mixins: [idMixin, formMixin, formStateMixin, formCustomMixin],
        data() {
            return {
                selectedFile: null,
                dragging: false,
                hasFocus: false
            };
        },
        props: {
            accept: {
                type: String,
                default: ''
            },
            capture: {
                // Instruct input to capture from camera
                type: Boolean,
                default: false
            },            
            placeholder: {
                type: String,
                default: null
            },
            chooseLabel: {
                type: String,
                default: null
            },
            multiple: {
                type: Boolean,
                default: false
            },
            directory: {
                type: Boolean,
                default: false
            },
            noTraverse: {
                type: Boolean,
                default: false
            },
            selectedFormat: {
                type: String,
                default: ':count Files'
            },
            noDrop: {
                type: Boolean,
                default: false
            },
            dropLabel: {
                type: String,
                default: 'Drop files here'
            }
        },
        computed: {
            selectedLabel() {
                if (!this.selectedFile || this.selectedFile.length === 0) {
                    return this.placeholder || 'No file chosen';
                }

                if (this.multiple) {
                    if (this.selectedFile.length === 1) {
                        return this.selectedFile[0].name;
                    }

                    return this.selectedFormat
                        .replace(':names', this.selectedFile.map(file => file.name).join(','))
                        .replace(':count', this.selectedFile.length);
                }

                return this.selectedFile.name;
            },
            computedChooseLabel() {
                return this.chooseLabel || (this.multiple ? 'Choose Files' : 'Choose File');
            }
        },
        watch: {
            selectedFile(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }

                if (!newVal && this.multiple) {
                    this.$emit('input', []);
                } else {
                    this.$emit('input', newVal);
                }
            }
        },
        methods: {
            focusHandler(evt) {
                // Boostrap v4.beta doesn't have focus styling for custom file input
                // Firefox has a borked '[type=file]:focus ~ sibling' selector, so we add
                // A 'focus' class to get around this bug
                if (this.plain || evt.type === 'focusout') {
                    this.hasFocus = false;
                } else {
                    // Add focus styling for custom file input
                    this.hasFocus = true;
                }
            },
            reset() {
                try {
                    // Wrapped in try in case IE < 11 craps out
                    this.$refs.input.value = '';
                } catch (e) {
                }

                // IE < 11 doesn't support setting input.value to '' or null
                // So we use this little extra hack to reset the value, just in case
                // This also appears to work on modern browsers as well.
                this.$refs.input.type = '';
                this.$refs.input.type = 'file';

                this.selectedFile = this.multiple ? [] : null;
            },
            onFileChange(e) {
                // Always emit original event
                this.$emit('change', e);

                // Check if special `items` prop is available on event (drop mode)
                // Can be disabled by setting no-traverse
                const items = e.dataTransfer && e.dataTransfer.items;
                if (items && !this.noTraverse) {
                    const queue = [];
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i].webkitGetAsEntry();
                        if (item) {
                            queue.push(this.traverseFileTree(item));
                        }
                    }
                    Promise.all(queue).then(filesArr => {
                        this.setFiles(arrayFrom(filesArr));
                    });
                    return;
                }

                // Normal handling
                this.setFiles(e.target.files || e.dataTransfer.files);
            },
            setFiles(files) {
                if (!files) {
                    this.selectedFile = null;
                    return;
                }

                if (!this.multiple) {
                    this.selectedFile = files[0];
                    return;
                }

                // Convert files to array
                const filesArray = [];
                for (let i = 0; i < files.length; i++) {
                    if (files[i].type.match(this.accept)) {
                        filesArray.push(files[i]);
                    }
                }

                this.selectedFile = filesArray;
            },
            dragover(e) {
                if (this.noDrop || !this.custom) {
                    return;
                }

                this.dragging = true;
                e.dataTransfer.dropEffect = 'copy';
            },
            drop(e) {
                if (this.noDrop) {
                    return;
                }

                this.dragging = false;
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    this.onFileChange(e);
                }
            },
            traverseFileTree(item, path) {
                // Based on http://stackoverflow.com/questions/3590058
                return new Promise(resolve => {
                    path = path || '';
                    if (item.isFile) {
                        // Get file
                        item.file(file => {
                            file.$path = path; // Inject $path to file obj
                            resolve(file);
                        });
                    } else if (item.isDirectory) {
                        // Get folder contents
                        item.createReader().readEntries(entries => {
                            const queue = [];
                            for (let i = 0; i < entries.length; i++) {
                                queue.push(this.traverseFileTree(entries[i], path + item.name + '/'));
                            }
                            Promise.all(queue).then(filesArr => {
                                resolve(arrayFrom(filesArr));
                            });
                        });
                    }
                });
            }
        }
    };
</script>
