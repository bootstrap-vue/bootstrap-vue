<template>
    <label :class="[custom?'custom-file':null,inputClass]"
           @dragover.stop.prevent="dragover"
    >

        <!-- Drop Here Target -->
        <span class="drop-here"
              v-if="dragging"
              @dragover.stop.prevent="dragover"
              @drop.stop.prevent="drop"
              @dragleave.stop.prevent="dragging=false"
              :data-drop="dropLabel"
        ></span>

        <!-- Real Form input -->
        <input type="file"
               :name="name"
               :id="_id"
               :disabled="disabled"
               ref="input"
               :accept="accept"

               class="custom-file-input"
               @change="onFileChange"
               :multiple="multiple"
               :webkitdirectory="directory"
        >

        <!-- Overlay Labels -->
        <span :class="['custom-file-control',dragging?'dragging':null,inputClass]"
              :data-choose="computedChooseLabel"
              :data-selected="selectedLabel"
              v-if="custom"
        ></span>

    </label>
</template>

<style>
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

    .custom-file-control::after {
        content: attr(data-selected);
    }

    .custom-file-control::before {
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
    import formMixin from '../mixins/form';
    import generateId from '../mixins/generate-id';

    export default {
        mixins: [formMixin, generateId],
        data() {
            return {
                selectedFile: null,
                dragging: false
            };
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
                        this.setFiles(Array.prototype.concat.apply([], filesArr));
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
                if (this.noDrop) {
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
                                resolve(Array.prototype.concat.apply([], filesArr));
                            });
                        });
                    }
                });
            }
        },
        props: {
            accept: {
                type: String,
                default: ''
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
        }
    };
</script>
