<template>
  <div v-if="slug && slug.length">
    <iframe
      :id="uid"
      width="100%"
      :height="height"
      :allowfullscreen="true"
      :allowtransparency="true"
      frameborder="0"
      :src="src"
    ></iframe>
    <div v-if="height === 0" class="text-center">
      <img src="//jsfiddle.net/img/embeddable/logo-dark.png" alt="jsfiddle">
      <br>
      <small class="text-muted mt-1">
        <span> Loading JSFiddle </span>
        <a :href="url" target="_blank" class="text-muted">(Edit in JSFiddle)</a>
      </small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      default: () => 'JSFEMB_' + ~~(new Date().getTime() / 86400000)
    },
    tabs: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    fontColor: {
      type: String,
      default: ''
    },
    accentColor: {
      type: String,
      default: ''
    },
    bodyColor: {
      type: String,
      default: ''
    },
    menuColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      height: 0
    }
  },
  computed: {
    src() {
      const attrs = ['fontColor', 'accentColor', 'bodyColor', 'menuColor']
      const baseUrl = `//jsfiddle.net/${this.slug}/embedded/${this.tabs}/${this.theme}?`
      return attrs.reduce((url, attr) => {
        if (this[attr] && this[attr].length > 0) {
          url += `${attr}=${this[attr]}&`
        }
        return url
      }, baseUrl)
    },
    url() {
      return `//jsfiddle.net/${this.slug}`
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.onMessage, false)
    }
  },
  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', this.onMessage)
    }
  },
  methods: {
    setHeight(data) {
      if (this.slug === data.slug) {
        this.height = data.height <= 0 ? 400 : data.height + 50
      }
    },
    onMessage(event) {
      const [eventName, data] = event.data
      if (eventName === 'embed' || eventName === 'resultsFrame') {
        this.setHeight(data)
      }
    }
  }
}
</script>
