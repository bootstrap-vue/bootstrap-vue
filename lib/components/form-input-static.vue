<template>
    <p :id="id || null"
       :class="inputClass"
       v-html="staticValue"
    ></p>
</template>

<script>
    export default {
        computed: {
            staticValue() {
                const val = this.value;
                return (val === '' || val === null) ? '&nbsp;' : val;
            },
            inputClass() {
                return [
                    'form-control-static',
                    this.size ? `form-control-${this.size}` : null,
                    this.state ? `form-control-${this.state}` : null
                ];
            }
        },
        props: {
            id: {
                type: String,
                default: null
            },
            value: {
                default: null
            },
            size: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            }
        }
    };

</script>
