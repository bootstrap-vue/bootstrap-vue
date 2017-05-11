<template>
    <div class="carousel-item"
         role="listitem"
         :id="id || null"
         :style="{background,height}"
    >
        <img class="d-block img-fluid" v-if="img" :src="img" :alt="imgAlt">
        <div :class="contentClasses">
            <h3 v-if="caption" v-html="caption"></h3>
            <p v-if="text" v-html="text"></p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String
            },
            img: {
                type: String
            },
            imgAlt: {
                type: String
            },
            contentVisibleUp: {
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
        },
        computed: {
            contentClasses() {
                const classes = {
                    'carousel-caption': Boolean(this.caption)
                };
                if (this.contentVisibleUp) {
                    classes['d-none'] = true;
                    classes[`d-${this.contentVisibleUp}-block`] = true;
                }
                return classes;
            }
        }
    };
</script>
