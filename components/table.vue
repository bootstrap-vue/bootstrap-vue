<template>
    <section>
        <table class="table">
            <thead>
            <tr>
                <template v-for="field in fields">
                    <th>{{field.label}}</th>
                </template>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in _items">
                <td v-for="(field,key) in fields">
                    <slot :name="key" :value="item[key]" :item="item">{{item[key]}}</slot>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="text-center" v-if="pagination">
            <b-pagination size="md"
                          variant="primary"
                          :total-rows="items.length"
                          :per-page="perPage"
                          v-model="current"
            />
        </div>
    </section>
</template>

<script>
    export default{

        data: () => {
            return {
                current: 1,
            }
        },

        props: {
            items: {
                type: Array,
                default: () => []
            },
            fields: {
                type: Object,
                default: () => {}
            },
            pagination: {
                type: Boolean,
                default: false
            },
            perPage: {
                type: Number,
                default: 20,
            },
        },

        computed: {
            _items: function () {
                if (!this.items) return [];
                return this.items.slice((this.current - 1) * this.perPage, this.current * this.perPage);
            }
        },


    }
</script>


