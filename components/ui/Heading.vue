<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  element: {
    type: String,
    default: 'h2',
    validator: (value) => ['div', 'p', 'h1', 'h2', 'h3'].includes(value),
  },
  gradient: {
    type: String,
    default: 'black',
    validator: (value) => ['black', 'white'].includes(value),
  },
  withDot: {
    type: Boolean,
    default: true,
  },
  dotMargin: {
    type: String,
    default: 'sm',
    validator: (value) => ['sm', 'md'].includes(value),
  },
});
</script>

<template>
  <UiGradientText :element="element" :gradient="gradient" class="ui-heading">
    <span class="ui-heading__font">{{ text }}</span
    ><span
      v-if="withDot"
      class="square-dot ui-heading__dot"
      :class="{
        [`ui-heading__dot--margin--${dotMargin}`]: dotMargin,
      }"
    ></span>
  </UiGradientText>
</template>

<style scoped lang="scss">
.ui-heading {
  padding-bottom: em(2); // fix text clip due to low line-height

  &__dot {
    margin-left: em(3);

    &--margin {
      &--sm {
        margin-left: em(3);
      }

      &--md {
        margin-left: em(8);

        @include media-breakpoint-down(sm) {
          margin-left: em(6);
        }
      }
    }
  }

  &__font {
    font-size: em(50);
    font-weight: $font-weight-semi-bold;
    line-height: 1.096;

    @include media-breakpoint-down(sm) {
      font-size: em(32);
    }
  }
}
</style>
