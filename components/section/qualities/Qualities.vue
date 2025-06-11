<script setup>
import { qualities } from '@/configs/qualities';
import breakpoints from '@/configs/breakpoints';

function onBreakpointChange(swiper) {
  swiper.setProgress(0, 0);
}
</script>

<template>
  <section class="section-qualities">
    <div class="container section-qualities__container">
      <div class="section-qualities__part--picture">
        <CPicture
          src="/images/qualities/gradient.png"
          class="section-qualities__picture--gradient"
        />
        <div class="section-qualities__picture--main"></div>
      </div>

      <div class="section-qualities__part--content">
        <UiGradientText class="section-qualities__heading">
          <span
            class="section-qualities__font section-qualities__font--heading"
          >
            {{ $t('qualitiesSection.title') }}
          </span>
          <span class="square-dot section-qualities__dot" />
        </UiGradientText>

        <Swiper
          slides-per-view="auto"
          :breakpoints="{
            [breakpoints.sm]: {
              allowTouchMove: false,
            },
          }"
          class="section-qualities__swiper"
          @breakpoint="onBreakpointChange"
        >
          <SwiperSlide
            v-for="(item, key) in qualities"
            :key="key"
            class="section-qualities__slide"
          >
            <SectionQualitiesCard
              v-bind="item"
              class="section-qualities__card"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-qualities {
  margin-bottom: em(170);
  overflow: visible;

  @include media-breakpoint-down(sm) {
    margin-bottom: em(75);
  }

  &__part {
    &--picture {
      @include media-breakpoint-down(sm) {
      }
    }

    &--content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;

      @include media-breakpoint-down(sm) {
      }
    }
  }

  &__swiper {
    width: 100%;
    padding-bottom: em(133);

    @include media-breakpoint-down(sm) {
      width: auto;
      padding: 0 em(20) 0 em(20);
      margin: 0 em(-20) em(50);
    }

    :deep(.swiper-wrapper) {
      height: auto;
    }
  }

  &__slide {
    width: em(383);
    height: auto;

    @include media-breakpoint-down(sm) {
      width: em(232);
    }

    &:nth-child(1) {
      background: linear-gradient(25deg, #487ef0 -4.66%, #c5cbd5 60.91%);
    }

    &:nth-child(2) {
      border: 1px solid #040714;
      background: $color-white;
    }

    &:nth-child(3) {
      background: $color-grey-100;
    }

    &:nth-child(4) {
      background: $color-red-700;
      color: $color-white;
    }

    &:not(:last-child) {
      color: $color-black-850;
      margin-right: em(21);

      @include media-breakpoint-down(sm) {
        margin-right: em(12);
      }
    }
  }

  &__card {
    width: 100%;
    min-height: em(353);

    @include media-breakpoint-down(sm) {
      min-height: em(191);
    }
  }

  &__heading {
    max-width: em(860);
    margin-bottom: em(62);

    @include media-breakpoint-down(sm) {
      margin-left: 0;
      max-width: em(240);
      margin-bottom: em(56);
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

  &__picture {
    &--main {
      position: absolute;
      top: em(250);
      right: 0;
      width: em(878);
      height: em(567);
      background: linear-gradient(115deg, #040714 40.7%, #297362 96.08%);

      @include media-breakpoint-down(sm) {
        width: em(243);
        height: em(277);
        top: em(95);
        background: linear-gradient(161deg, #040714 23.77%, #286f5f 88.54%);
      }
    }

    &--gradient {
      position: absolute;
      bottom: em(-1200);
      left: 0;
      height: em(1775);
      width: auto;
      pointer-events: none;

      @include media-breakpoint-down(sm) {
        height: em(545);
        bottom: em(-360);
        left: 0;
      }
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
  }
}
</style>
