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
                <template v-for="(field,key) in fields">
                    <td>{{item[key]}}</td>
                </template>
            </tr>
            </tbody>
        </table>
        <div class="text-center">
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
                current: 0,
                size: 10,
            }
        },

        props: ['items', 'fields'],

        computed: {
            _items: function () {
                return this.items.slice(this.current * this.size, (this.current + 1) * this.size);
            }
        },

        methods: {
            change: function (newPage) {
                this.current = newPage - 1;
            },
        }

    }
</script>
