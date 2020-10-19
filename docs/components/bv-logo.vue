<template>
  <svg
    v-if="showLogo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1200"
    version="1.1"
    shape-rendering="geometricPrecision"
    fill-rule="evenodd"
    clip-rule="evenodd"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    focusable="false"
    class="bv-logo"
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
    <!--
      IE 11 has issues with the same filter being applied to multiple elements,
      So we only apply it to the outer `g` for IE (as IE 11 also doesn't support
      animating SVG child elements)
    -->
    <g :filter="isIE ? 'url(#logo-shadow)' : null">
      <g class="logo-dark-v" :filter="isIE ? null : 'url(#logo-shadow)'">
        <path fill="#34495E" d="M747 311L602 562 458 311H227l375 651 376-651z" />
      </g>
      <g class="logo-purple-v" :filter="isIE ? null : 'url(#logo-shadow)'">
        <path fill="#563D7C" fill-rule="nonzero" d="M219 195h762L599 857z" />
        <path
          class="logo-white-b"
          fill="#ffffff"
          d="M501 282l132 0c25,0 44,5 59,16 15,12 22,28 22,51 0,14 -3,26 -10,35 -7,10 -16,18 -29,23l0 1c17,3 30,11 38,24 9,12 13,27 13,46 0,11 -2,21 -6,30 -3,9 -9,17 -17,24 -9,6 -19,12 -32,16 -12,4 -28,6 -45,6l-125 0 0 -272 0 0zm48 114l77 0c12,0 21,-4 29,-10 8,-7 11,-16 11,-28 0,-14 -3,-24 -10,-29 -7,-6 -17,-9 -30,-9l-77 0 0 76 0 0zm0 119l84 0c14,0 26,-4 33,-11 8,-8 13,-19 13,-32 0,-14 -4,-24 -13,-31 -8,-8 -19,-11 -33,-11l-84 0 0 85z"
        />
      </g>
      <g class="logo-green-v" :filter="isIE ? null : 'url(#logo-shadow)'">
        <path fill="#41B883" d="M839 357L600 771 361 357H202l398 690 398-690z" />
      </g>
    </g>
  </svg>
  <div v-else class="bv-logo"></div>
</template>

<script>
export default {
  data() {
    return {
      isIE: false,
      showLogo: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isIE = /msie|trident/i.test(window.navigator.userAgent || '')
      this.showLogo = true
    })
  }
}
</script>

<style lang="scss" scoped>
.bv-logo {
  display: block;
  width: 240px;
  height: 240px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  will-change: opacity;
  animation: logo-splash-alpha 0.15s 1 ease-in-out;
  // Allow logo path elements to expand outside the svg viewbox
  overflow: visible;

  .logo-dark-v,
  .logo-purple-v,
  .logo-green-v {
    will-change: transform;
    transition: transform 0.15s ease-in-out;
  }

  .logo-dark-v {
    transform-origin: center top;
    animation: logo-splash-dark 1.25s ease-in-out 1;
  }

  .logo-purple-v {
    animation: logo-splash-purple 1.25s ease-in-out 1;
  }

  .logo-green-v {
    animation: logo-splash-green 1.25s ease-in-out 1;
  }

  &:hover {
    .logo-dark-v {
      transform: translateY(-6%) scale(1.15);
    }
    .logo-purple-v {
      transform: translateY(-12%);
    }
    .logo-green-v {
      transform: translateY(12%);
    }
  }

  &,
  .logo-dark-v,
  .logo-purple-v,
  .logo-green-v {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    animation-delay: 0s;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
      animation: none;
    }
  }
}

@keyframes logo-splash-alpha {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes logo-splash-dark {
  0% {
    transform: translateY(-6%) scale(1.15);
  }
  45% {
    transform: translateY(-6%) scale(1.15);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes logo-splash-purple {
  0% {
    transform: translateY(-12%);
  }
  45% {
    transform: translateY(-12%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes logo-splash-green {
  0% {
    transform: translateY(12%);
  }
  45% {
    transform: translateY(12%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
