# Navbar

>  The navbar is a wrapper that positions branding, navigation, and other elements into a concise header.
  It’s easily extensible and thanks to our Collapse plugin, it can easily integrate responsive behaviors.

```html
<b-navbar toggleable type="inverse" variant="success">

  <b-nav-toggle target="nav_collapse"></b-nav-toggle>

  <!-- navbar-brand rendered as router link -->
  <b-navbar-brand to="#">BootstrapVue</b-navbar-brand>
  <!-- navbar-brand rendered as link -->
  <!-- <b-navbar-brand href="#">BootstrapVue</b-navbar-brand> -->
  <!-- navbar-brand rendered as div -->
  <!-- <b-navbar-brand>BootstrapVue</b-navbar-brand> -->
  <!-- navbar-brand rendered as h1 -->
  <!-- <b-navbar-brand tag="h1">BootstrapVue</b-navbar-brand> -->

  <b-collapse is-nav id="nav_collapse">

    <b-nav is-nav-bar>
      <b-nav-item>Support</b-nav-item>
      <b-nav-item>Docs</b-nav-item>
      <b-nav-item>Contact Us</b-nav-item>
    </b-nav>

    <b-nav is-nav-bar class="ml-auto">
      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown id="lang_ddown" text="Lang" right>
        <b-dropdown-item to="#">EN</b-dropdown-item>
        <b-dropdown-item to="#">ES</b-dropdown-item>
        <b-dropdown-item to="#">RU</b-dropdown-item>
        <b-dropdown-item to="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown id="user_ddown" right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <span style="font-weight: bold;">User</span>
        </template>
        <b-dropdown-item to="#">Profile</b-dropdown-item>
        <b-dropdown-item to="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>

  </b-collapse>
</b-navbar>

<!-- navbar.vue -->
```

For `<b-nav-item-dropdown>` usage, see the [`<b-dropdown>`](./dropdown) docs.
Note split dropdowns are not supported in `<b-navbar>`.
