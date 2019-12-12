# Bootstrap Icons

> Bootstrap Icons are designed to work with Bootstrap components, from form controls to navigation.
> Bootstrap Icons are SVGs, so they scale quickly and easily and can be styled with CSS. While they
> are built for Bootstrap, they will work in any project.

BootstrapVue icon components are based on [`bootstrap-icons`](https://icons.getbootstrap.com/). Icons
are opt-in, meaning that they explicity need to be imported in order to be used. They are not installed
by default (except in the [browser build](/docs#build-variants)).

## Icons

<!--
  TODO:
    - Import icon list into data, and render as a loop
    - Make searchable
    - Include full component name ?
-->

<div class="bd-example bv-icons-table notranslate">
  <b-form @submit.prevent>
   <b-form-group
     label="Search icons"
     label-cols-sm="6"
     label-cols-md="8"
     label-align-sm="right"
   >
     <b-form-input type="search"></b-form-input>
   </b-form-group>
  </b-form>
  <b-row tag="ul" cols="3" cols-sm="4" cols-lg="6" class="list-unstyled mb-0">
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-circle-fill"></b-icon></b-card>
      <b-form-text class="mt-1">alert-circle-fill</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-circle"></b-icon></b-card>
      <b-form-text class="mt-1">alert-circle</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-octagon-fill"></b-icon></b-card>
      <b-form-text class="mt-1">alert-octagon-fill</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-octagon"></b-icon></b-card>
      <b-form-text class="mt-1">alert-octagon</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-square-fill"></b-icon></b-card>
      <b-form-text class="mt-1">alert-square-fill</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-square"></b-icon></b-card>
      <b-form-text class="mt-1">alert-square</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-triangle-fill"></b-icon></b-card>
      <b-form-text class="mt-1">alert-triangle-fill</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="alert-triangle"></b-icon></b-card>
      <b-form-text class="mt-1">alert-triangle</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="archive-fill"></b-icon></b-card>
      <b-form-text class="mt-1">archive-fill</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="archive"></b-icon></b-card>
      <b-form-text class="mt-1">archive</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="arrow-clockwise"></b-icon></b-card>
      <b-form-text class="mt-1">arrow-clockwise</b-form-text>
    </b-col>
    <b-col tag="li" class="mb-2 text-center">
      <b-card bg-variant="light"><b-icon icon="arrow-counterclockwise"></b-icon></b-card>
      <b-form-text class="mt-1">arrow-counterclockwise</b-form-text>
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
