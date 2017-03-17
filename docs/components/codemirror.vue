<template>
    <textarea ref="textArea" v-model="value"></textarea>
</template>

<script>
    export default {
        data() {
            return {
                CM: null
            };
        },
        mounted() {
            const CodeMirror = require('codemirror');

            require('codemirror/mode/javascript/javascript');
            require('codemirror/mode/vue/vue');
            require('codemirror/mode/htmlmixed/htmlmixed');
            require('codemirror/addon/edit/closetag');
            require('codemirror/addon/edit/closebrackets');
            require('codemirror/addon/fold/xml-fold');

            this.CM = CodeMirror.fromTextArea(this.$refs.textArea, {
                mode: this.mode,
                theme: this.theme,
                tabMode: this.tabMode,
                lineWrapping: this.lineWrapping,
                lineNumbers: this.lineNumbers,
                autoCloseTags: true,
                autoCloseBrackets: true
            });

            this.CM.on('change', () => {
                this.$emit('input', this.CM.getValue());
            });
        },
        beforeDestroy() {
            if (this.CM) {
                this.CM.toTextArea();
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            mode: {
                type: [String, Object],
                default: ''
            },
            theme: {
                type: String,
                default: ''
            },
            tabMode: {
                type: String,
                default: 'indent'
            },
            lineWrapping: {
                type: Boolean,
                default: true
            },
            lineNumbers: {
                type: Boolean,
                default: true
            },
        }
    }
</script>