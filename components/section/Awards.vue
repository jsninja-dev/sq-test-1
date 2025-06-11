<script setup>
import { awards } from '@/configs/awards';
</script>

<template>
  <section class="section-awards">
    <div class="container section-awards__container">
      <div class="section-awards__top">
        <div class="section-awards__caption">
          <UiGradientText class="section-awards__caption-title">
            <span class="section-awards__font--caption-title">
              {{ $t('awardsSection.title') }}
            </span>
            <span class="square-dot section-awards__dot" />
          </UiGradientText>

          <div class="section-awards__caption-text">
            <span
              class="section-awards__font section-awards__font--caption-text"
            >
              {{ $t('awardsSection.caption') }}
            </span>
          </div>
        </div>
      </div>

      <div class="section-awards__awards">
        <div
          v-for="(award, index) in awards"
          :key="index"
          class="section-awards__award"
        >
          <CPicture
            :class="`section-awards__icon section-awards__icon--${award.iconName}`"
            :src="`/images/awards/${award.iconName}.svg`"
            loading="lazy"
            :alt="$t(award.title)"
          />

          <div class="section-awards__award-text-wrapper">
            <div class="section-awards__award-title">
              <span
                class="section-awards__font section-awards__font--award-title"
              >
                {{ $t(award.title) }}
              </span>
            </div>

            <div class="section-awards__award-year">
              <span
                class="section-awards__font section-awards__font--award-year"
              >
                {{ award.year }}
              </span>
            </div>

            <div class="section-awards__award-text">
              <span
                class="section-awards__font section-awards__font--award-text"
              >
                {{ $t(award.text) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-awards {
  $parent: &;

  padding-bottom: em(15);

  &__top {
    margin-bottom: em(80);

    @include media-breakpoint-down(sm) {
      margin-bottom: em(30);
    }
  }

  &__caption-title {
    width: 100%;
    margin-bottom: em(40);

    @include media-breakpoint-down(sm) {
      width: em(280);
      margin-bottom: em(12);
    }
  }

  html[lang='es'] &__caption-title {
    @include media-breakpoint-down(sm) {
      width: 100%;
    }
  }

  &__dot {
    width: em(46);
    height: em(46);
    margin-left: em(16);

    @include media-breakpoint-down(sm) {
      width: em(16);
      height: em(16);
      margin-left: em(4);
    }
  }

  &__awards {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include media-breakpoint-down(sm) {
      flex-wrap: wrap;
      gap: em(40) 0;
    }
  }

  &__award {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: em(244);

    @include media-breakpoint-down(sm) {
      width: em(150);
      height: auto;
    }

    &:nth-child(2) {
      @include media-breakpoint-down(sm) {
        padding-top: em(16);
      }
    }

    &:nth-child(5) {
      @include media-breakpoint-down(sm) {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 0 em(8);
      }

      #{$parent} {
        &__award-title {
          @include media-breakpoint-down(sm) {
            margin-top: em(8);
          }
        }

        &__award-title,
        &__award-year,
        &__award-text {
          @include media-breakpoint-down(sm) {
            text-align: start;
          }
        }
      }
    }
  }

  &__award-title {
    margin-top: em(71);
    text-align: center;

    @include media-breakpoint-down(sm) {
      margin-top: em(19);
    }
  }

  &__award-year {
    text-align: center;
  }

  &__award-text {
    text-align: center;
  }

  &__icon {
    &--atoz {
      width: em(181);
      height: em(85);

      @include media-breakpoint-down(sm) {
        width: em(134);
        height: em(63);
      }
    }

    &--gbm {
      width: em(181);
      height: em(85);

      @include media-breakpoint-down(sm) {
        width: em(134);
        height: em(63);
      }
    }

    &--pan {
      width: em(181);
      height: em(107);

      @include media-breakpoint-down(sm) {
        width: em(134);
        height: em(79);
      }
    }

    &--world-finance {
      width: em(201);
      height: em(85);

      @include media-breakpoint-down(sm) {
        width: em(149);
        height: em(63);
      }
    }
  }

  &__font {
    display: block;

    &--caption-title {
      font-size: em(90);
      font-weight: $font-weight-bold;
      line-height: 100%; /* 90px */

      @include media-breakpoint-down(sm) {
        font-size: em(32);
      }
    }

    &--caption-text {
      font-size: em(24);
      font-weight: $font-weight-light;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }

    &--award-title {
      font-size: em(18);
      font-weight: $font-weight-medium;

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }

    &--award-year {
      font-size: em(18);

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }

    &--award-text {
      font-size: em(18);

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }
  }
}
</style>
