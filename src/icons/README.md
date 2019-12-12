# Bootstrap Icons

> Bootstrap Icons are designed to work with Bootstrap components, from form controls to navigation.
> Bootstrap Icons are SVGs, so they scale quickly and easily and can be styled with CSS. While they
> are built for Bootstrap, they will work in any project.

BootstrapVue icon components are based on [`bootstrap-icons`](https://icons.getbootstrap.com/). Icons
are opt-in, meaning that they explicity need to be imported in order to be used. They are not installed
by default (except in the [browser build](/docs#build-variants)).

## Icons

<div class="bd-example bv-icons-table notranslate" key="_bv-icons-table_">
  <b-form @submit.prevent>
   <b-form-group
     label="Search icons"
     label-cols-sm="6"
     label-cols-md="8"
     label-align-sm="right"
   >
     <b-form-input
       key="_bv-icons-table-input_"
       v-model="iconFilter"
       type="search"
       aria-controls="bv-icons-table"
     ></b-form-input>
   </b-form-group>
  </b-form>
  <b-row id="bv-icons-table" tag="ul" cols="3" cols-sm="4" cols-lg="6" class="list-unstyled mb-0">
    <b-col
      v-for="icon in filteredIcons"
      :key="icon"
      tag="li"
      class="mb-2 text-center"
    >
      <b-card bg-variant="light"><b-icon :icon="icon"></b-icon></b-card>
      <b-form-text class="mt-1">{{ icon }}</b-form-text>
    </b-col>
  </b-row>
</div>

## Usage

TBD

### Naming convention

TBD

### Helper component

TBD

### Variants

TBD

### Sizing

TBD

## Working with SVGs

TBD
