<script setup>
import { traders } from '@/configs/traders';
import breakpoints from '@/configs/breakpoints';
import { ref, onMounted } from 'vue';

const { tm, rt } = useI18n();

const keys = computed(() => {
  return tm('tradersSection.keys').map(rt);
});

const currentIndex = ref(0);
const contentSwiper = ref(null);
const tagsSwiper = ref(null);

function onBreakpointChange(swiper) {
  swiper.setProgress(0, 0);
}

function onContentSlideChange(swiper) {
  const newIndex = swiper.activeIndex;
  currentIndex.value = newIndex;
  // Ensure the corresponding tag is visible
  if (tagsSwiper.value && tagsSwiper.value.activeIndex !== newIndex) {
    tagsSwiper.value.slideTo(newIndex, 300);
  }
}

function onSwiperInit(swiper) {
  contentSwiper.value = swiper;
}

function onTagsSwiperInit(swiper) {
  tagsSwiper.value = swiper;
}

function handleTagClick(index) {
  if (currentIndex.value !== index) {
    currentIndex.value = index;
    if (contentSwiper.value) {
      contentSwiper.value.slideTo(index, 300);
    }
  }
}

onMounted(() => {
  // Ensure Swiper is initialized
  if (contentSwiper.value?.swiper) {
    console.log('Swiper initialized');
  }
});
</script>

<template>
  <section class="section-traders">
    <div class="container section-traders__container">
      <UiGradientText class="section-traders__heading">
        <span class="section-traders__font section-traders__font--heading">
          {{ $t('tradersSection.title') }}
        </span>
        <span class="square-dot section-traders__dot" />
      </UiGradientText>
      <div class="section-traders__content hidden-mobile">
        <div class="section-traders__content--left">
          <SwiperSlide
            v-for="(item, key) in traders.slice(0, 2)"
            :key="key"
            class="section-traders__slide"
          >
            <SectionTradersCard
              v-bind="item"
              :hasTNC="key === 2"
              class="section-traders__card"
            />
          </SwiperSlide>
        </div>
        <div class="section-traders__content--right">
          <SwiperSlide
            v-for="(item, key) in traders.slice(2, 4)"
            :key="key"
            class="section-traders__slide"
          >
            <SectionTradersCard
              v-bind="item"
              :hasTNC="key === 0"
              class="section-traders__card"
            />
          </SwiperSlide>
        </div>
      </div>
      <Swiper
        slides-per-view="auto"
        :breakpoints="{
          [breakpoints.sm]: {
            allowTouchMove: false,
          },
        }"
        class="section-traders__swiper section-traders__swiper--keys hidden-desktop"
        @breakpoint="onBreakpointChange"
        @swiper="onTagsSwiperInit"
      >
        <SwiperSlide
          v-for="(key, index) in keys"
          :key="index"
          class="section-traders__key"
        >
          <span
            class="section-traders__font section-traders__font--key"
            :class="{
              'section-traders__font--key--active': currentIndex === index,
            }"
            @click="handleTagClick(index)"
          >
            {{ key }}
          </span>
        </SwiperSlide>
      </Swiper>

      <Swiper
        slides-per-view="auto"
        :breakpoints="{
          [breakpoints.sm]: {
            allowTouchMove: false,
          },
        }"
        class="section-traders__swiper hidden-desktop"
        @breakpoint="onBreakpointChange"
        @slide-change="onContentSlideChange"
        @swiper="onSwiperInit"
      >
        <SwiperSlide
          v-for="(item, key) in traders"
          :key="key"
          class="section-traders__slide"
        >
          <SectionTradersCard
            v-bind="item"
            :hasTNC="key === 2"
            class="section-traders__card"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-traders {
  margin-bottom: em(40);
  overflow: visible;

  @include media-breakpoint-down(sm) {
    margin-bottom: em(10);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &--left,
    &--right {
      display: flex;
      flex-direction: column;
      gap: em(20);
    }

    &--right {
      margin-top: em(84);
    }
  }

  &__swiper {
    width: 100%;
    padding-bottom: em(133);

    @include media-breakpoint-down(sm) {
      width: auto;
      padding: 0 em(20) 0 em(20);
      margin: 0 em(-20);
    }

    &--keys {
      @include media-breakpoint-down(sm) {
        margin-bottom: em(40);
      }
    }

    :deep(.swiper-wrapper) {
      height: auto;
    }
  }

  &__slide {
    width: em(764);
    height: auto;

    @include media-breakpoint-down(sm) {
      width: em(327);
    }

    &:nth-child(1) {
      @include media-breakpoint-down(sm) {
        order: 1;
      }
    }

    &:nth-child(2) {
      @include media-breakpoint-down(sm) {
        order: 3;
      }
    }

    &:nth-child(3) {
      @include media-breakpoint-down(sm) {
        order: 2;
      }
    }

    &:nth-child(4) {
      @include media-breakpoint-down(sm) {
        order: 4;
      }
    }

    &:not(:last-child) {
      @include media-breakpoint-down(sm) {
        margin-right: em(8);
      }
    }
  }

  &__key {
    width: auto;
    cursor: pointer;

    &:not(:last-child) {
      @include media-breakpoint-down(sm) {
        margin-right: em(20);
      }
    }
  }

  &__card {
    width: 100%;
    min-height: em(540);

    @include media-breakpoint-down(sm) {
      height: 100%;
      min-height: em(360);
    }
  }

  &__heading {
    max-width: em(860);
    margin-bottom: em(75);

    @include media-breakpoint-down(sm) {
      margin-left: 0;
      max-width: em(240);
      margin-bottom: em(30);
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

  &__keys {
    display: flex;
    flex-direction: row;
    gap: em(20);
    margin-bottom: em(40);
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

    &--key {
      color: $color-grey-500;
      font-size: em(16);
      font-weight: $font-weight-medium;

      &--active {
        color: $color-red-700;
      }
    }
  }
}
</style>

