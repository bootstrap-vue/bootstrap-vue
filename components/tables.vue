<template>
  <div :class="{repsonsive: responsive}">
    <slot></slot>
  </div>
</template>

<script>
  import '../utils/ie9_polyfill.js'

  export default {
    replace: true,
    computed: {},
    data() {
      return {
        show: false,
      }
    },
    props: {
      id: {
        type: String,
        default: ''
      },
      styled: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: false
      },
      inverse: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      responsive: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      head: {
        type: String,
        default: ''
      },
    },
    methods: {},
    mounted() {
      this._table = this.$el.querySelectorAll('table')[0]
      this._theads = this._table.querySelectorAll('thead')

      // lets add some attributes and classes to the table based on props
      // id
      this._table.setAttribute('id', this.id)
      // add .table -> true by default
      if (this.styled) {
        this._table.classList.add('table')
      }
      // add .table-border -> false by default
      if (this.border) {
        this._table.classList.add('table-bordered')
      }
      // add .table-inverse -> false by default
      if (this.inverse) {
        this._table.classList.add('table-inverse')
      }
      // add .table-hover -> false by default
      if (this.hover) {
        this._table.classList.add('table-hover')
      }
      // add .table-sm -> false by default
      if (this.small) {
        this._table.classList.add('table-sm')
      }
      // add .table-striped -> false by default
      if (this.striped) {
        this._table.classList.add('table-striped')
      }
      // add .thead-inverse/.thead-default -> '' by default
      if (this.head) {
        for (const key in this._theads) {
          if (this._theads.hasOwnProperty(key)) {
            this._theads[key].classList.add('thead-' + this.head)
          }
        }
      }
    }
  }
</script>
