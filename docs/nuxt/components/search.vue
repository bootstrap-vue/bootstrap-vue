<template>
<form class="bd-search d-flex align-items-center">
  <span class="algolia-autocomplete">

      <input type="search" disabled class="invisible form-control ds-input" id="search-input" placeholder="Search..." aria-label="Search for..." autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-labelledby="search-input" aria-owns="algolia-autocomplete-listbox-0" dir="auto">
      
      <pre aria-hidden="true"></pre>
      
      <span class="ds-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0">
        <div class="ds-dataset-1"></div>
      </span>
  </span>

  <button type="button" v-b-toggle.bd-docs-nav class="bd-search-docs-toggle d-md-none p-0 ml-3" aria-label="Toggle docs navigation">
    <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg>
  </button>
  
</form>
</template>

<style scoped>
  .algolia-autocomplete {
    position: relative;
    display: inline-block;
    direction: ltr;
  }

  .ds-input {
    position: relative;
    vertical-align: top;
  }

  .ds-dropdown-menu {
    position: absolute;
    top: 100%;
    z-index: 100;
    left: 0px;
    right: auto;
    display: none;
  }

  pre {
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font-family: -apple-system, system-ui, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
    font-size: 16px; 
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-weight: normal;
    word-spacing: 0px;
    letter-spacing: normal;
    text-indent: 0px;
    text-rendering: auto;
    text-transform: none;
  }
</style>
