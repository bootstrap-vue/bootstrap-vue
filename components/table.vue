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
                          :per-page="size"
                          @change="change"
            />
        </div>
    </section>
</template>

<script>
    export default{

        data: () => {
            return {
                current: 1,
                size: 10,
            }
        },

        props: ['items', 'fields','pagination'],

        computed: {
            _items: function () {
                if (!this.items) return [];
                return this.items.slice((this.current - 1) * this.size, this.current * this.size);
            }
        },

        methods: {
            change: function (newPage) {
                this.current = newPage;
            },
        }

    }
</script>


