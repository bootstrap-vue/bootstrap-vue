<template>
  <div>
    <span class="tooltip-trigger" ref="trigger"><slot></slot></span>
    <div class="['tooltip','fade','in',tooltipAlignment]" ref="tooltip">
      <div class="tooltip-inner">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-content">
          <span v-html="text" v-if="text"></span>
          <div class="tooltip-content-wrapper">
            <slot name="content" v-if="!text"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      replace: true,
      computed: {}
  };
</script>
