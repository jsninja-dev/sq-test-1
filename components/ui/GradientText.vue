<script setup>
defineProps({
  gradient: {
    type: String,
    default: 'black',
    validator: (value) => ['black', 'white', 'orange'].includes(value),
  },
  mobileGradient: {
    type: String,
    default: undefined,
    validator: (value) => ['black', 'white', 'orange'].includes(value),
  },
  element: {
    type: String,
    default: 'div',
    validator: (value) => ['div', 'p', 'h1', 'h2', 'h3'].includes(value),
  },
});
</script>

<template>
  <component
    :is="element"
    class="ui-gradient-text"
    :class="{
      [`ui-gradient-text--color--${gradient}`]: !!gradient,
      [`ui-gradient-text--mobile-color--${mobileGradient}`]: !!mobileGradient,
    }"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.ui-gradient-text {
  --gradient-black: linear-gradient(283deg, #d30044 34.11%, #13151d 91.92%);
  --gradient-white: linear-gradient(283deg, #d30044 34.11%, #fff 91.92%);
  --gradient-orange: url("data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='url(%23paint0_linear_15_1003)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_15_1003' x1='8.63636' y1='2.25225' x2='9.0939' y2='7.14056' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23CF3269'/%3E%3Cstop offset='1' stop-color='%23FF9494'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  --gradient-blue: url("data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='url(%23paint0_linear_15_1003)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_15_1003' x1='8.63636' y1='2.25225' x2='9.0939' y2='7.14056' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23C5CBD5'/%3E%3Cstop offset='1' stop-color='%230051FF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");

  color: transparent;
  background-clip: text;
  background-size: cover;

  &--color {
    &--black {
      background-image: var(--gradient-black);
    }

    &--white {
      background-image: var(--gradient-white);
    }

    &--orange {
      background-image: var(--gradient-orange);
    }

    &--blue {
      background-image: var(--gradient-blue);
    }
  }

  &--mobile-color {
    @include media-breakpoint-down(sm) {
      &--black {
        background-image: var(--gradient-black);
      }

      &--white {
        background-image: var(--gradient-white);
      }

      &--orange {
        background-image: var(--gradient-orange);
      }

      &--blue {
        background-image: var(--gradient-blue);
      }
    }
  }
}
</style>
