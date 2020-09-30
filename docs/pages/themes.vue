<template>
  <b-container id="content" fluid="lg" tag="main" class="pb-5">
    <section>
      <header class="bd-content pb-4">
        <h1>Custom themes and dashboards</h1>
        <p class="lead">
          With the themes and dashboards built by our partners, you can build eye-catching
          apps and pages &mdash; all using BootstrapVue! The following items have been curated by
          the BootstrapVue team.
        </p>
      </header>

      <article v-if="!themes || themes.length === 0" class="bvd-theme text-center mb-5">
        <b-card bg-varinatt="light">
          <BvLogo class="mx-auto"></BvLogo>
          <h2 class="display-4 font-weight-bold text-dark mt-3">Coming soon!</h2>
          <p class="card-text">Themes will be coming in the near future.</p>
        </b-card>
      </article>

      <article
        v-for="(theme, idx) in themes"
        :key="idx"
        :aria-labelledby="`theme-label-${idx}`"
        class="bvd-theme mb-5"
      >
        <b-card no-body bg-variant="light">
          <b-row no-gutters>
            <b-col
              md="6"
              lg="4"
              xl="4"
              class="bg-dark"
              aria-hidden="true"
            >
              <b-aspect aspect="4:3" class="h-100 align-items-center">
                <b-card-img-lazy
                  :src="theme.img"
                  alt="Image"
                  blank-width="800"
                  blank-height="600"
                  class="rounded-0"
                ></b-card-img-lazy>
              </b-aspect>
            </b-col>
            <b-col class="d-flex flex-column p-4">
              <!-- We use `<h2>` for correct semantics, but `.h5` style -->
              <h2 :id="`theme-label-${idx}`" class="h5 mb-3">{{ theme.title }}</h2>
              <b-card-text class="flex-grow-1">{{ theme.description }}</b-card-text>
              <b-card-text class="text-muted small">
                <span class="d-block d-lg-inline-block mb-2 mb-lg-0"><strong>Category:</strong> {{ theme.category }}</span>
                <span class="d-block d-lg-inline-block ml-lg-3"><i><strong>Provided by:</strong> {{ theme.provider }}</i></span>
              </b-card-text>
              <b-card-text class="d-flex align-items-center">
                <b-button :href="theme.href" target="_blank" variant="bd-primary">
                  Get {{ theme.type || 'theme' }}
                </b-button>
                <span v-if="theme.price" class="text-muted position-relative ml-3">
                  <strong>Price:</strong> {{ theme.price }}<b-link href="#theme-notes" title="See notes">*</b-link>
                </span>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </article>

      <aside id="theme-notes" class="text-muted mb-3" aria-labelledby="theme-notes-heading">
        <h2 id="theme-notes-heading" class="h6">Notes:</h2>
        <ul class="small">
          <li>
            Prices shown are in US dollars. Prices are subject to change. Refer to the
            vendor/provider website for current pricing.
          </li>
          <li>
            Theme licenses are typically per-site (unless onterwised noted). Refer to the theme
            site documentation for licensing information.
          </li>
          <li>
            BootstrapVue does not guarantee that all custom components provided by a theme are
            WIA-ARIA compliant. Refer to the provider documentation for details.
          </li>
          <li>
            BootstrapVue receives a commission on themes purchased via the above affiliate links.
          </li>
          <li>
            Refer to the <b-link to="/docs/reference/theming">Theming section</b-link> for
            details on incorporating custom theme SCSS files.
          </li>
        </ul>
      </aside>

      <aside id="theme-providers" class="text-muted" aria-labelledby="theme-provider-heading">
        <h2 id="theme-provider-heading" class="h6">Are you a theme provider?</h2>
        <p class="small mb-2">
          If you are interested in being an affiliate and listing your theme or dashboard on this
          page, your product must meet the following guidelines:
        </p>
        <ul class="small">
          <li>It must be based on (or extends) BootstrapVue components.</li>
          <li>
            Must be be compatible with BootstrapVue so that users can incorporate native
            BootstrapVue components if they wish.
          </li>
          <li>
            Should avoid the need for jQuery or Bootstrap v4 JavaScript files (except for included
            3<sup>rd</sup> party components if required).
          </li>
          <li>Should provide the source SCSS/SASS files/variables.</li>
          <li>Should promote that it is based on (or compatible with) <i>BootstrapVue</i>.</li>
          <li>
            Custom components provided by the theme should be WAI-ARIA accessible. Any WAI-ARIA
            limitations should be noted in the theme documeantation.
          </li>
        </ul>
      </aside>
    </section>
  </b-container>
</template>

<script>
import BvLogo from '~/components/bv-logo'

export default {
  components: { BvLogo },
  async asyncData({ $content }) {
    // Themes are stored as YAML files in `docs/content/themes`
    // The theme preview image should be 800x400px (and 4:3 aspect ratio)
    // Data structure:
    //   title: 'Superduper Dashboard - PRO'
    //   type: 'dashboard'
    //   category: 'Admin & Dashboard'
    //   img: 'https://picsum.photos/800/600/?image=84'
    //   href: '#'
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //   provider: 'Innovative Ivan'
    //   price: '$100.00'
    const themes = await $content('themes').fetch()

    return {
      themes
    }
  },
  head() {
    const title = `${this.title} | BootstrapVue`
    const description = 'BootstrapVue based premium themes and dashboards.'
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
  },
  computed: {
    title() {
      return 'Themes and dashboards'
    }
  }
}
</script>

<style lang="scss" scoped>
.bv-logo {
  // BV Logo (SVG)
  width: 280px;
  height: 280px;
}

@media (max-width: 991px) {
  // Shrink the display text a bit on smaller screens
  // Only used if no themes are available
  .display-4 {
    font-size: 2.5rem;
  }
}

.bvd-theme {
  .card {
    // Simple way to get rounded corners on the images
    overflow: hidden;
    // Add some shadow
    box-shadow: 0 25px 20px -20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.06);
  }
}
</style>
