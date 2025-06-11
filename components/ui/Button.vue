<script setup>
defineProps({
  to: {
    type: [Object, String],
    default: undefined,
  },
  target: {
    type: String,
    default: undefined,
  },
  isStaticByDefault: {
    type: Boolean,
    default: false,
  },
  staticTag: {
    type: String,
    default: 'div',
  },
  type: {
    type: String,
    default: 'button',
  },
  text: {
    type: String,
    default: undefined,
  },
  theme: {
    type: String,
    default: 'green',
    validator(value) {
      const themes = ['green', 'red', 'red-outline'];

      return themes.includes(value);
    },
  },
  customSize: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const emitClick = (e) => {
  emit('click', e);
};
</script>

<template>
  <CTagDetect
    :to="to"
    :target="target"
    :is-static-by-default="isStaticByDefault"
    :static-tag="staticTag"
    :type="type"
    class="ui-button"
    :class="{
      [`ui-button--size--default`]: !customSize,
      [`ui-button--theme--${theme}`]: !!theme,
    }"
    @click="emitClick"
  >
    <slot>
      <span v-if="text" class="ui-button__font" v-html="text" />
    </slot>
  </CTagDetect>
</template>

<style scoped lang="scss">
@use 'sass:color';

.ui-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: $font-weight-medium;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  transition:
    background-color $time-normal,
    border-color $time-normal,
    color $time-normal;

  &__font {
    font-size: em(22);

    @include media-breakpoint-down(sm) {
      font-size: em(18);
    }
  }

  &--size {
    &--default {
      width: em(412);
      height: em(69);
      border-radius: em(3);

      @include media-breakpoint-down(sm) {
        width: em(335);
        height: em(62);
      }
    }

    &--mobile {
      @include media-breakpoint-down(sm) {
        width: 100% !important;
      }
    }
  }

  &--theme {
    &--green,
    &--red {
      border: none;
    }

    &--green {
      color: $color-white;
      background-color: $color-green-500;

      @include hover {
        background-color: color.adjust($color-green-500, $lightness: 5%);
      }
    }

    &--red {
      color: $color-white;
      background-color: $color-red-700;

      @include hover {
        background-color: color.adjust($color-red-700, $lightness: 5%);
      }
    }

    &--red-outline {
      color: $color-red-700;
      background-color: transparent;
      border: 1px solid $color-red-700;

      @include hover {
        color: $color-white;
        background-color: $color-red-700;
      }
    }
  }
}
</style>
