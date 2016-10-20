<template>
  <div
    :class="[progress,progressVariant,striped ? 'progress-striped' : '',animated ? 'progres-animated' : '']"
    :value="value"
    :max="max"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    ref="progress">

    <div class="progress">
      <span class="progress-bar" :style="{width: value + '%'}" ref="progressbar"></span>
    </div>

  </div>
</template>

<script>
  export default {
    replace: true,
    computed: {
      progressVariant() {
        return !this.variant || this.variant === `default` ? `progress-primary` : `progress-${this.variant}`
      },
    },
    props: {
      animated: {
        type: Boolean,
        default: false,
      },
      max: {
        type: Number,
        default: 100,
      },
      striped: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Number,
        default: 0,
      },
      variant: {
        type: String,
        default: 'default',
      },
    },
    mounted() {
      this._progress = this.$refs.progress;
      this._progressBar = this.$refs.progressbar;
      this._progressBar.style.width = this.value + '%';
      this._progress.setAttribute('value', this.value)
    },
    watch: {
      value(val) {
        this._progress.setAttribute('value', val);
        this._progressBar.style.width = this.value + '%'
      }
    }
  }


</script>
