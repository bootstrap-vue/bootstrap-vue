<template>
    <layout :docs="docs">
        <template slot="name">
            Pagination
        </template>

        <template slot="description">
            Quick previous and next links for simple pagination implementations with light markup and styles.
            It’s great for simple sites like blogs or magazines.
            Provide pagination links for your site or app with the multi-page pagination component.
        </template>

        <template slot="demo">

            <h2>currentPage: {{currentPage}}</h2>
            <br>

            <div>
                <h6>Default</h6>
                <b-pagination size="md"
                              :total-rows="100"
                              v-model="currentPage"
                              :per-page="10"
                >
                </b-pagination>

                <br>

                <h6>Styled</h6>
                <b-pagination size="md"
                              :total-rows="100"
                              variant="primary"
                              secondaryVariant="info"
                              v-model="currentPage"
                              :per-page="10"
                >
                </b-pagination>
            </div>

        </template>

        <template slot="usage">
            &lt;b-pagination size=&quot;md&quot;
            variant=&quot;danger&quot;
            :total-rows=&quot;100&quot;
            v-model=&quot;currentPage&quot;
            :per-page=&quot;10&quot;
            &gt;
            &lt;/b-pagination&gt;
        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data() {
            return {
                docs: {
                    component: 'bPagination'

                },
                currentPage: 3
            };
        },
        methods: {
            details(item) {
                // eslint-disable-next-line no-alert
                alert(JSON.stringify(item));
            }
        }
    };
</script>
