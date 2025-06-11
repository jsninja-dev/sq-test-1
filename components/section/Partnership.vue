<script setup>
import breakpoints from '@/configs/breakpoints';

function onBreakpointChange(swiper) {
  swiper.setProgress(0, 0);
}
</script>

<template>
  <section class="section-partnership">
    <CPicture
      src="/images/partnership/gradient.png"
      class="section-partnership__gradient"
    />
    <div class="container section-partnership__container">
      <UiGradientText class="section-partnership__heading">
        <span
          class="section-partnership__font section-partnership__font--heading"
        >
          {{ $t('partnershipSection.title') }}
        </span>
        <span class="square-dot section-partnership__dot" />
      </UiGradientText>
      <div class="section-partnership__content">
        <div class="section-partnership__card">
          <div class="section-partnership__card--top">
            <div class="section-partnership__title">
              <span class="section-partnership__font--title">
                {{ $t('partnershipSection.content[0].title') }}
              </span>
            </div>
            <div class="section-partnership__card--top-left">
              <span
                class="section-partnership__font--content"
                v-html="$t('partnershipSection.content[0].content')"
              />
              <span
                class="section-partnership__font--percent"
                v-html="$t('partnershipSection.content[0].percent')"
              />
            </div>
          </div>
          <div class="section-partnership__card--bottom">
            <div class="section-partnership__title">
              <span class="section-partnership__font--title">
                {{ $t('partnershipSection.content[1].title') }}
              </span>
            </div>
            <div class="section-partnership__card--content">
              <span
                class="section-partnership__font--content"
                v-html="$t('partnershipSection.content[1].content')"
              />
            </div>
          </div>
        </div>
        <div class="section-partnership__card section-partnership__card--right">
          <div class="section-partnership__card--top">
            <div class="section-partnership__title">
              <span class="section-partnership__font--title">
                {{ $t('partnershipSection.content[2].title') }}
              </span>
            </div>
            <div class="section-partnership__card--content">
              <span
                class="section-partnership__font--content"
                v-html="$t('partnershipSection.content[2].content')"
              />
            </div>
          </div>
          <div class="section-partnership__card--bottom">
            <div class="section-partnership__title">
              <span class="section-partnership__font--title">
                {{ $t('partnershipSection.content[3].title') }}
              </span>
            </div>
            <div class="section-partnership__card--content">
              <span
                class="section-partnership__font--content"
                v-html="$t('partnershipSection.content[3].content')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-partnership {
  margin-bottom: em(50);

  @include media-breakpoint-down(sm) {
    margin-bottom: em(66);
  }

  &__heading {
    max-width: em(1080);
    margin-bottom: em(80);

    @include media-breakpoint-down(sm) {
      margin-left: 0;
      max-width: 100%;
      margin-bottom: em(45);
    }
  }

  &__dot {
    width: em(46);
    height: em(46);
    margin-left: em(12);

    @include media-breakpoint-down(sm) {
      width: em(16);
      height: em(16);
      margin-left: em(6);
    }
  }

  &__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: auto;
    height: em(223);
    z-index: -1;
    pointer-events: none;

    @include media-breakpoint-down(sm) {
      height: em(123);
      top: em(40);
      right: em(-48);
      bottom: auto;
      left: auto;
      transform: scaleX(-1);
    }
  }

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: em(20);
    padding-bottom: em(92);

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      gap: 0;
      padding-bottom: 0;
    }
  }

  &__card {
    width: em(780);
    height: em(560);
    border: em(1) solid #030303;

    @include media-breakpoint-down(sm) {
      width: 100%;
      height: auto;
      text-align: center;
    }

    &--top-left {
      display: flex;
      flex-direction: row;
      gap: em(12);

      @include media-breakpoint-down(sm) {
        flex-direction: column;
        gap: em(4);
      }
    }

    &--right {
      background-image: url('#{$images-path}/partnership/dot.svg');
      background-repeat: repeat;
      background-position: em(4) 0;
      background-size: em(20);
      position: relative;

      @include media-breakpoint-down(sm) {
        background-size: em(12);

        &::before {
          background: linear-gradient(90deg, #c30044 20.55%, #13151d 100%);
          content: '';
          display: block;
          height: em(4);
          position: absolute;
          left: 0;
          top: em(-2);
          width: 100%;
        }
      }
    }

    &--top {
      height: em(271);
      position: relative;
      padding: em(50) em(54);

      @include media-breakpoint-down(sm) {
        height: auto;
        padding: em(22) em(20) em(12);
        border-bottom: em(1) solid $color-grey-200;
      }

      &::after {
        background: linear-gradient(90deg, #c30044 20.55%, #13151d 100%);
        content: '';
        display: block;
        height: em(4);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;

        @include media-breakpoint-down(sm) {
          display: none;
        }
      }
    }

    &--bottom {
      padding: em(56) em(54);

      @include media-breakpoint-down(sm) {
        padding: em(22) em(20);
      }
    }
  }

  &__title {
    margin-bottom: em(40);

    @include media-breakpoint-down(sm) {
      margin-bottom: em(12);
    }
  }

  &__font {
    &--heading {
      font-size: em(90);
      font-weight: $font-weight-semi-bold;
      line-height: 1; /* 67.2px */

      @include media-breakpoint-down(sm) {
        font-size: em(24);
      }
    }

    &--title {
      color: $color-black-1000;
      font-size: em(36);
      font-weight: $font-weight-semi-bold;
      line-height: 1;

      @include media-breakpoint-down(sm) {
        font-size: em(24);
      }
    }

    &--content {
      color: $color-black-1000;
      font-size: em(24);
      font-weight: $font-weight-regular;
      line-height: 1;

      @include media-breakpoint-down(sm) {
        font-size: em(12);
      }
    }

    &--percent {
      margin-top: em(-2);
      color: $color-black-1000;
      font-size: em(128);
      font-weight: $font-weight-bold;
      line-height: 1;

      @include media-breakpoint-down(sm) {
        font-size: em(64);
        margin-top: 0;
      }

      &:deep(sup) {
        font-size: em(8);
        font-weight: $font-weight-bold;
        line-height: 1;
        vertical-align: super;
      }
    }
  }
}
</style>
