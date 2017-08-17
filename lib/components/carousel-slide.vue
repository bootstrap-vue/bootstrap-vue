<template>
    <div class="carousel-item"
         role="listitem"
         :id="id || null"
         :style="{background,height}"
    >
        <slot name="img">
            <img class="d-block img-fluid" v-if="img" :src="img" :alt="imgAlt">
        </slot>
        <div :is="contentTag" :class="contentClasses">
            <h3 v-if="caption" :is="captionTag" v-html="caption"></h3>
            <p v-if="text" :is="textTag" v-html="text"></p>
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
            contentTag: {
                type: String,
                default: "div"
            },
            caption: {
                type: String
            },
            captionTag: {
                type: String,
                default: "h3"
            },
            text: {
                type: String
            },
            textTag: {
                type: String,
                default: "p"
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
                return [
                    'carousel-caption',
                    this.contentVisibleUp ? 'd-none' : '',
                    this.contentVisibleUp ? `d-${this.contentVisibleUp}-block` : ''
                ];
            }
        }
    };
</script>
