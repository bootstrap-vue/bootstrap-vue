<template>
  <b-container id="content" tag="main" class="pb-5">
    <section>
      <header class="bd-content pb-4">
        <h1>Custom themes and dashboards</h1>
        <p>
          With the below themes and dashboards built by our partners, you can build eye catching
          apps and pages &mdash; all using BootstrapVue!
        </p>
      </header>

      <article v-for="(theme, idx) in themes" :key="idx" class="bvd-theme mb-5">
        <b-card no-body bg-variant="light" class="shadow">
          <b-row no-gutters>
            <b-col md="5" lg="4">
               <b-card-img :src="theme.img" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col>
              <b-card-body class="d-flex flex-column h-100">
                <!-- We use `<h2>` for correct semantics, but `.h4` style -->
                <h2 class="h4">To be determined</h2>
                <b-card-text class="flex-grow-1">
                  {{ theme.description }}
                </b-card-text>
                <b-card-text class="text-muted small">
                  <i>Provided by: {{ theme.provider }}</i>
                </b-card-text>
                <b-card-text class="d-flex align-items-center">
                  <b-button :href="theme.href" disabled variant="bd-primary">Get theme</b-button>
                  <small v-if="theme.price" class="text-muted ml-3">
                    Price: {{ theme.price }}
                    <sup><b-link href="#theme-notes" title="See notes"><b>*</b></b-link></sup>
                  </small>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </article>

      <aside id="#theme-notes" class="pb-5 small text-muted">
        <h2 class="h4">Notes:</h2>
        <ul class="small">
          <li clas="mb-2">
            <b>*</b>: Prices are subject to change. Refer to the vendor/provider website for details.
          </li>
          <li>
            BootstrapVue may receive a commission on themes purchased via the above affiliate links.
          </li>
        </ul>
      </aside>
    </section>
  </b-container>
</template>

<style lang="scss" scoped>
.bvd-theme {
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
          img: 'https://picsum.photos/400/300/?image=84',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'XXXXXXX',
          price: '$10,000.00'
        },
        {
          title: 'To be determined',
          img: 'https://picsum.photos/400/300/?image=82',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'XXXXXXX',
          price: 'Free'
        },
        {
          title: 'To be determined',
          img: 'https://picsum.photos/400/300/?image=54',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
