<template>
    <div class="btn-group" data-toggle="buttons">
        <label :class="['btn', btnVariant, btnSize, checked(index) ? 'active' : '']" v-for="(item,index) in list">
            <input type="checkbox"
                   :value="item.value"
                   autocomplete="off"
                   v-model="item.checked"
                   :disabled="item.disabled"
                   v-html="item.text"
            />
        </label>
    </div>
</template>

<script>
    export default {
        replace: true,
        computed: {
            btnVariant() {
                return !this.variant || this.variant === `default` ? `btn-secondary` : `btn-${this.variant}`;
            },
            btnSize() {
                return !this.size || this.size === `default` ? `` : `btn-${this.size}`;
            }
        },
        props: {
            list: {
                type: Array,
                default: [],
                required: true
            },
            model: {
                type: Array,
                default: []
            },
            size: {
                type: String,
                default: 'md'
            },
            variant: {
                type: String,
                default: 'default'
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            checked(index) {
                if (!this.list) {
                    return false;
                }
                let result = false;
                if (this.returnObject) {
                    for (let i = 0; i < this.model.length; i++) {
                        if (this.model[i].value === this.list[index].value) {
                            result = true;
                        }
                    }
                } else {
                    result = this.model.indexOf(this.list[index].value) !== -1;
                }
                return result;
            }
        },
        watch: {
            list: {
//                handler(val) {
//                    this.model = []
//                    this.list.forEach((item) = > {
//                        if (item.checked
//                )
//                    {
//                        if (this.returnObject) {
//                            this.model.push(item)
//                        } else {
//                            this.model.push(item.value)
//                        }
//                    }
//                })
//                    ;
//                    console.log(changed);
//                    // Emit an event
//                    this.$emit('changed', this.model)
//                },
//                deep: true,
            }
        },
        mounted() {
            // handle initial selection
            this.list.forEach(item => {
                if (this.returnObject) {
                    this.model.forEach(modelItem => {
                        if (modelItem.value === item.value
                        ) {
                            item.checked = true;
                        }
                    });
                } else if (this.model.indexOf(item.value) !== -1) {
                    item.checked = true;
                }
            });
        }
    };
</script>
