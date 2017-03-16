<template>
    <div>
        <iframe
                width="100%"
                :height="height"
                :allowfullscreen="true"
                :allowtransparency="true"
                frameborder="0"
                :src="src"
                :id="uid"
        ></iframe>
        <div v-if="height===0" class="text-center">
            <img src="//jsfiddle.net/img/embeddable/logo-dark.png" alt="jsfiddle">
            <br>
            <div class="text-muted mt-1">
                Loading Fiddle
                <br>
                <a :href="url" target="_blank">(Edit in JSFiddle)</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                height: 0
            }
        },
        computed: {
            src() {
                let url = `//jsfiddle.net/${this.slug}/embedded/${this.tabs}/${this.theme}?`;
                ['fontColor', 'accentColor', 'bodyColor', 'menuColor'].forEach(attr => {
                    if (this[attr] && this[attr].length) {
                        url += `${attr}=${this[attr]}&`;
                    }
                });
                return url;
            },
            url() {
                return `//jsfiddle.net/${this.slug}`;
            }
        },
        props: {
            slug: {
                type: String,
                required: true,
            },
            uid: {
                type: String,
                default: () => 'JSFEMB_' + (~~(new Date().getTime() / 86400000))
            },
            tabs: {
                type: String,
                default: ''
            },
            theme: {
                type: String,
                default: 'light',
            },
            fontColor: {
                type: String,
                default: '',
            },
            accentColor: {
                type: String,
                default: '',
            },
            bodyColor: {
                type: String,
                default: '',
            },
            menuColor: {
                type: String,
                default: ''
            }
        },
        methods: {
            setHeight(data) {
                let height;
                if (this.slug === data.slug) {
                    height = data.height <= 0 ? 400 : data.height + 50;
                    return this.height = height;
                }
            },
            onMessage(event) {
                let data, eventName;
                eventName = event.data[0];
                data = event.data[1];
                switch (eventName) {
                    case 'embed':
                        return this.setHeight(data);
                    case 'resultsFrame':
                        return this.setHeight(data);
                }
            }
        },
        mounted() {
            if (typeof window !== 'undefined') {
                window.addEventListener('message', this.onMessage, false);
            }
        },
        destroyed() {
            if (typeof window !== 'undefined') {
                window.removeEventListener('message', this.onMessage);
            }
        }
    }
</script>