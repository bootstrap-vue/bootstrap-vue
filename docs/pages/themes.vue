<template>
  <b-container id="content" fluid="lg" tag="main" class="pb-5">
    <section>
      <header class="bd-content pb-4">
        <h1>Custom themes and dashboards</h1>
        <p class="lead">
          With the below themes and dashboards built by our partners, you can build eye-catching
          apps and pages &mdash; all using BootstrapVue! The following items have been curated by
          the BootstrapVue team.
        </p>
      </header>

      <article v-if="!themes || themes.length === 0" class="bvd-theme text-center mb-5">
        <b-card>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
            version="1.1"
            shape-rendering="geometricPrecision"
            fill-rule="evenodd"
            clip-rule="evenodd"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            focusable="false"
            class="bv-theme-logo mt-4"
          >
            <title>BootstrapVue Logo</title>
            <defs>
              <!-- eslint-disable-next-line vue/max-attributes-per-line -->
              <filter id="logo-shadow" filterUnits="objectBoundingBox" x="-50%" y="-50%" width="200%" height="200%">
                <feOffset in="SourceAlpha" dx="-10" dy="25" result="ALPHA1" />
                <feMorphology in="ALPHA1" operator="dilate" radius="15" result="ALPHA" />
                <feGaussianBlur in="ALPHA" stdDeviation="20" result="DROP" />
                <feFlood in="DROP" flood-color="#333" result="SOLID" />
                <feComposite in="DROP" in2="SOLID" operator="in" result="SHADOW1" />
                <feComponentTransfer in="SHADOW1" result="SHADOW">
                  <feFuncA type="linear" slope="0.55" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="SHADOW" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#logo-shadow)">
              <g class="logo-dark-v">
                <path fill="#34495E" d="M747 311L602 562 458 311H227l375 651 376-651z" />
              </g>
              <g class="logo-purple-v">
                <path fill="#563D7C" fill-rule="nonzero" d="M219 195h762L599 857z" />
                <path
                  class="logo-white-b"
                  fill="#ffffff"
                  d="M501 282l132 0c25,0 44,5 59,16 15,12 22,28 22,51 0,14 -3,26 -10,35 -7,10 -16,18 -29,23l0 1c17,3 30,11 38,24 9,12 13,27 13,46 0,11 -2,21 -6,30 -3,9 -9,17 -17,24 -9,6 -19,12 -32,16 -12,4 -28,6 -45,6l-125 0 0 -272 0 0zm48 114l77 0c12,0 21,-4 29,-10 8,-7 11,-16 11,-28 0,-14 -3,-24 -10,-29 -7,-6 -17,-9 -30,-9l-77 0 0 76 0 0zm0 119l84 0c14,0 26,-4 33,-11 8,-8 13,-19 13,-32 0,-14 -4,-24 -13,-31 -8,-8 -19,-11 -33,-11l-84 0 0 85z"
                />
              </g>
              <g class="logo-green-v">
                <path fill="#41B883" d="M839 357L600 771 361 357H202l398 690 398-690z" />
              </g>
            </g>
          </svg>
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
            <b-col md="6" lg="4" xl="4" aria-hidden="true">
              <b-aspect aspect="4:3">
                <b-card-img-lazy
                  :src="theme.img"
                  alt="Image"
                  blank-width="400"
                  blank-height="300"
                  class="rounded-0"
                ></b-card-img-lazy>
              </b-aspect>
            </b-col>
            <b-col class="d-flex flex-column p-4">
              <!-- We use `<h2>` for correct semantics, but `.h5` style -->
              <h2 :id="`theme-label-${idx}`" class="h5">{{ theme.title }}</h2>
              <b-card-text class="flex-grow-1">
                {{ theme.description }}
              </b-card-text>
              <b-card-text class="text-muted small">
                <span class="d-block d-lg-inline-block mb-2 mb-lg-0">Category: {{ theme.category }}</span>
                <span class="d-block d-lg-inline-block ml-lg-3"><i>Provided by: {{ theme.provider }}</i></span>
              </b-card-text>
              <b-card-text class="d-flex align-items-center">
                <b-button :href="theme.href" target="_blank" variant="bd-primary">
                  Get {{ theme.type || 'theme' }}
                </b-button>
                <small v-if="theme.price" class="text-muted position-relative ml-3">
                  Price: {{ theme.price }}
                  <b-link href="#theme-notes" title="See notes" class="stretched-link">
                    <b>*</b>
                  </b-link>
                </small>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </article>

      <aside id="theme-notes" class="text-muted mb-3" aria-labelledby="theme-notes-heading">
        <h2 id="theme-notes-heading" class="h6">Notes:</h2>
        <ul class="small">
          <li>
            Prices shown are in US dollars unless otherwise noted. Prices are subject to change.
            Refer to the vendor/provider website for current pricing.
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
          <li>Should avoid the need for jQuery or Bootstrap v4 JavaScript files.</li>
          <li>Should provide the source SCSS/SASS files/variables.</li>
          <li>Should promote that it is based on (or compatable with) <i>BootstrapVue</i>.</li>
          <li>Any custom components should be WAI-ARIA accessible.</li>
        </ul>
      </aside>
    </section>
  </b-container>
</template>

<style lang="scss" scoped>
.bv-theme-logo {
  // BV Logo (SVG)
  width: 200px;
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

<script>
export default {
  data() {
    return {
      // This could be async data that comes from a JSON file
      // Theme image preview should be 800x400px (and 4:3 aspect ratio)
      themes: [
        /*
        {
          title: 'Superduper Dashboard - PRO',
          type: 'dashboard',
          category: 'Admin & Dashboard',
          img: 'https://picsum.photos/800/600/?image=84',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'Innovative Ivan',
          price: '$500.00'
        },
        {
          title: 'Funky dashboard extreme',
          type: 'dashboard',
          category: 'Admin & Dashboard',
          img: 'https://picsum.photos/800/600/?image=82',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'Dashboards-R-Us',
          price: 'Free'
        },
        {
          title: 'Some mystery theme theatre',
          img: 'https://picsum.photos/800/600/?image=54',
          category: 'Landing & Corporate',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'Cyberdyne Terminators',
          price: '$75.00'
        },
        {
          title: 'Shopper Style Galore',
          img: 'https://picsum.photos/800/600/?image=90',
          category: 'E-Commerce & Retail',
          href: '#',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          provider: 'Cyberdyne Terminators',
          price: '$75.00'
        }
        */
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
  }
}
</script>
