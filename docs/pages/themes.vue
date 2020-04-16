<template>
  <b-container id="content" tag="main" class="pb-5">
    <section>
      <header class="bd-content pb-4">
        <h1>Custom themes and dashboards</h1>
        <p>
          With the below themes and dahsboards built by our partners you can build eye catching
          apps and pages, all using BootstrapVue.
        </p>
      </header>

      <article v-for="(theme, idx) in themes" :key="idx" class="bvd-theme">
        <b-card no-body bg-variant="light" class="shadow">
          <b-row no-gutters>
            <b-col md="auto">
              <b-card-img :src="theme.img" width="320" height="240" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col>
              <b-card-body class="d-flex flex-column">
                <h2 class="h3">To be determined</h2>
                <b-card-text class="flex-grow-1">
                  {{ theme.description }}
                </b-card-text>
                <b-card-text class="text-muted small">
                  <i>Provided by: <b>{{ theme.provider }}</b></i>
                </b-card-text>
                <b-card-text>
                  <b-button :href="theme.href" disabled variant="bd-primary">Get theme</b-button>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </article>
    </section>
  </b-container>
</template>

<style lang="scss" scoped>
.bvd-theme {
  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  .card {
    // Simple way to get rounded corners
    overflow: hidden;
  }
}
</style>

<script>
export default {
  data() {
    return {
      // This could be async data that comes from a JSON file
      themes: [
        {
          title: 'To be determined',
          img: 'https://picsum.photos/320/240/?image=84',
          href: '#',
          description: 'TBD',
          provider: 'XXXXXXX',
          price: '$10,000.00'
        },
        {
          title: 'To be determined',
          img: 'https://picsum.photos/320/240/?image=82',
          href: '#',
          description: 'TBD',
          provider: 'XXXXXXX',
          price: 'Free'
        },
        {
          title: 'To be determined',
          img: 'https://picsum.photos/320/240/?image=54',
          href: '#',
          description: 'TBD',
          provider: 'XXXXXXX',
          price: '$75.00'
        }
      ]
    }
  },
  computed: {
    title() {
      return 'Themes and dashboards'
    }
  },
  head() {
    const title = `${this.title} | BootstrapVue`
    const description = 'Premium and free themes and dashboards for BootstrapVue.'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    }
  }
}
</script>
