<template>
    <div class="carousel-item" :style="{background,height}">
        <img class="d-block img-fluid" v-if="img" :src="img" :alt="imgAlt">
        <div class="carousel-caption d-none d-md-block">
            <h3 v-if="caption" v-html="caption"></h3>
            <p v-if="text" v-html="text"></p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            img: {
                type: String
            },
            imgAlt: {
                type: String
            },

            caption: {
                type: String
            },
            text: {
                type: String
            },

            background: {
                type: String
            },
            height: {
                type: String
            }
        }
    };
</script>
