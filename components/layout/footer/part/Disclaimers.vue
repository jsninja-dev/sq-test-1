<script setup>
import { disclaimers } from '@/configs/disclaimers';

const { $tp } = useNuxtApp();
</script>

<template>
  <section class="layout-footer-disclaimers">
    <div class="layout-footer-disclaimers__disclaimers">
      <div
        v-for="(disclaimer, index) in disclaimers"
        :key="index"
        :class="`layout-footer-disclaimers__disclaimer layout-footer-disclaimers__disclaimer--${disclaimer.alias}`"
      >
        <div class="layout-footer-disclaimers__title">
          <span
            class="layout-footer-disclaimers__font layout-footer-disclaimers__font--title"
          >
            {{ $t(disclaimer.title) }}
          </span>
        </div>

        <div class="layout-footer-disclaimers__text">
          <span
            class="layout-footer-disclaimers__font layout-footer-disclaimers__font--text"
          >
            {{ $tp($t(disclaimer.text)) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.layout-footer-disclaimers {
  padding-top: em(36);

  @include media-breakpoint-down(sm) {
    padding-top: em(12);
  }

  &__disclaimers {
    display: flex;
    justify-content: space-between;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
    }
  }

  &__disclaimer {
    &:not(:last-child) {
      @include media-breakpoint-down(sm) {
        margin-bottom: em(29);
      }
    }

    &--risk-warning {
      width: em(356);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    &--disclaimers {
      width: em(540);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    &--legal {
      width: em(591);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
  }

  &__title {
    margin-bottom: em(20);

    @include media-breakpoint-down(sm) {
      margin-bottom: em(18);
    }
  }

  &__text {
    color: $color-grey-400;
  }

  &__font {
    display: block;

    &--title {
      font-size: em(16);
      font-weight: $font-weight-regular;

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }

    &--text {
      font-size: em(16);

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }
  }
}
</style>
