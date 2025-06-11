<script setup>
import { ref } from 'vue';
import { heroTips } from '@/configs/heroTips';
</script>

<template>
  <section id="hero" class="section-hero">
    <div class="container section-hero__container">
      <div class="section-hero__content">
        <img
          src="/images/logo.svg"
          alt="SquaredFinancial Logo"
          class="section-hero__logo"
        />
        <UiGradientText mobile-gradient="white" class="section-hero__heading">
          <span
            class="section-hero__font section-hero__font--heading--bold"
            v-html="$t('heroSection.title')"
          />
        </UiGradientText>
        <div class="section-hero__fomo">
          <CPicture
            src="/images/hero/60.svg"
            alt=""
            loading="lazy"
            class="section-hero__fomo--img"
          />
          <UiGradientText
            mobile-gradient="white"
            class="section-hero__text--fomo"
          >
            <span
              class="section-hero__font section-hero__font--fomo"
              v-html="$t('heroSection.exp')"
            />
            <span class="square-dot section-hero__dot" />
          </UiGradientText>
        </div>
        <div class="section-hero__text--italic">
          <span class="section-hero__font section-hero__font--italic">
            {{ $t('heroSection.text') }}
          </span>
        </div>
        <CPicture
          src="/images/hero/yahoo.svg"
          alt=""
          loading="lazy"
          class="section-hero__yahoo"
        />
        <div class="section-hero__trust">
          <div class="section-hero__text--trust">
            <span
              class="section-hero__font section-hero__font--trust"
              v-html="$t('heroSection.trust')"
            />
          </div>
          <div class="section-hero__trust--img">
            <CPicture
              src="/images/hero/trust.png"
              alt=""
              loading="lazy"
              class="section-hero__trust--img--l"
            />
            <CPicture
              src="/images/hero/stars.png"
              alt=""
              loading="lazy"
              class="section-hero__trust--img--r"
            />
          </div>
        </div>
        <div class="section-hero__event">
          <ul class="section-hero__list">
            <li
              v-for="(tip, idx) in heroTips"
              :key="idx"
              class="section-hero__item--list"
            >
              <CPicture
                :src="tip.icon"
                alt=""
                loading="lazy"
                class="section-hero__item--icon"
              />
              <span
                class="section-hero__font section-hero__font--list"
                v-html="$t(tip.text)"
              />
            </li>
          </ul>
        </div>
        <UiForm id="mobile-hero" class="section-hero__form" />
      </div>

      <div class="section-hero__background">
        <CPicture
          src="/images/hero/main.png"
          loading="eager"
          fetch-priority="high"
          object-fit="cover"
          class="section-hero__picture section-hero__picture--main"
          :sources="{
            sm: '/images/hero/main-sm.png',
          }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-hero {
  padding-top: em(60);

  @include media-breakpoint-down(sm) {
    padding: em(12) 0 em(42);
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-down(sm) {
    }
  }

  &__logo {
    width: em(272);
    height: em(31);

    @include media-breakpoint-down(sm) {
      order: 1;
      width: em(262);
      height: em(30);
    }
  }

  &__heading {
    width: em(270);
    margin-top: em(111);
    max-width: em(360);

    @include media-breakpoint-down(sm) {
      order: 2;
      width: em(120);
      margin-top: em(30);
    }
  }

  &__dot {
    width: em(19);
    height: em(19);
    flex-shrink: 0;
    margin-left: em(8);

    @include media-breakpoint-down(sm) {
      width: em(13);
      height: em(13);
      margin-left: em(5);
      margin-bottom: 0;
    }
  }

  &__text {
    &--fomo {
      position: relative;
      max-width: em(450);

      @include media-breakpoint-down(sm) {
        max-width: em(200);
      }
    }

    &--italic {
      max-width: em(476);
      margin-top: em(120);

      @include media-breakpoint-down(sm) {
        order: 6;
        margin-top: em(50);
        text-align: center;
      }
    }

    &--trust {
      text-align: right;

      @include media-breakpoint-down(sm) {
        text-align: center;
        margin-bottom: em(12);
      }
    }
  }

  &__yahoo {
    width: em(224);
    height: auto;
    flex-shrink: 0;
    margin-top: em(28);
    margin-bottom: em(21);

    @include media-breakpoint-down(sm) {
      order: 7;
      margin-top: em(13);
      width: auto;
      height: em(18);
      margin-inline: auto;
    }
  }

  &__trust {
    width: em(504);
    border-top: em(2) solid #a9a9a9;
    padding-top: em(25);
    margin-bottom: em(154);

    @include media-breakpoint-down(sm) {
      order: 8;
      width: 100%;
      border-top: em(1) solid $color-grey-200;
      padding-top: em(13);
      margin-bottom: em(24);
    }

    &--img {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: em(6);

      @include media-breakpoint-down(sm) {
        margin-top: 0;
        justify-content: center;
        gap: em(16);
      }

      &--l {
        width: em(171);
        height: auto;

        @include media-breakpoint-down(sm) {
          width: em(102);
        }
      }

      &--r {
        width: em(236);
        height: auto;

        @include media-breakpoint-down(sm) {
          width: em(141);
        }
      }
    }
  }

  &__event {
    position: absolute;
    top: em(215);
    left: em(744);
    width: em(234);
    display: flex;
    flex-direction: column;

    @include media-breakpoint-down(sm) {
      position: relative;
      top: 0;
      left: 0;
      order: 4;
      width: auto;
      padding-bottom: 0;
    }
  }

  &__list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: em(80);

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      gap: em(16);
      width: 100%;
      margin-top: em(24);
    }
  }

  &__item {
    &--list {
      color: $color-white;
      display: flex;
      flex-direction: column;
      gap: em(16);

      @include media-breakpoint-down(sm) {
        position: relative;
        flex-shrink: 0;
        color: rgba($color-grey-300, 0.8);
        flex-direction: row;
        gap: em(8);
      }
    }

    &--icon {
      width: em(36);
      height: em(36);

      @include media-breakpoint-down(sm) {
        width: em(25);
        margin-top: em(-4);
        height: auto;
        flex-shrink: 0;
      }
    }
  }

  &__form {
    position: absolute;
    top: em(142);
    right: 0;

    @include media-breakpoint-down(sm) {
      margin-top: em(48);
      order: 5;
      position: relative;
      top: 0;
      right: 0;
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: calc(50% - #{em(184)});
    z-index: -1;
    width: auto;
    height: em(923);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        314deg,
        #d30044 10.03%,
        rgba(211, 0, 68, 0) 39.12%
      );
      z-index: 1;

      @include media-breakpoint-down(sm) {
        width: em(480);
        height: 100%;
        top: auto;
        bottom: 0;
        left: auto;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
      }
    }

    @include media-breakpoint-down(sm) {
      margin-top: em(52);
      left: 0;
      width: 100%;
      height: auto;
    }
  }

  &__picture {
    &--main {
      width: 100%;
      height: 100%;

      @include media-breakpoint-down(sm) {
        height: 100%;
      }
    }
  }

  &__fomo {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: em(16);
    gap: em(24);

    @include media-breakpoint-down(sm) {
      order: 3;
      margin-top: em(8);
      flex-direction: row;
      gap: em(16);
      padding-bottom: em(24);

      &::after {
        background: linear-gradient(270deg, #CF3269 -1.09%, #0051FF 100%);        content: '';
        display: block;
        height: em(4);
        position: absolute;
        left: em(-20);
        bottom: 0;
        width: calc(100% + em(40));
      }
    }

    &--img {
      width: em(342);
      height: auto;

      @include media-breakpoint-down(sm) {
        width: em(90);
      }
    }
  }

  &__font {
    &--heading {
      &--bold {
        line-height: 1.1;
        font-size: em(56);
        font-weight: $font-weight-semi-bold;

        @include media-breakpoint-down(sm) {
          font-size: em(24);
          font-weight: $font-weight-semi-bold;
          line-height: 1.096;
        }
      }

      &--regular {
        font-size: em(37);
        font-weight: $font-weight-light;
        line-height: 1.78;

        @include media-breakpoint-down(sm) {
          font-weight: $font-weight-regular;
          font-size: em(19);
          line-height: 1.7;
        }
      }
    }

    &--fomo {
      font-size: em(36);
      font-weight: $font-weight-medium;
      line-height: 1.09626;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
        font-weight: $font-weight-medium;
        line-height: 1.096;
      }
    }

    &--italic {
      color: $color-black-900;
      font-size: em(24);
      font-style: italic;
      font-weight: $font-weight-regular;
      line-height: 100%; /* 24px */

      @include media-breakpoint-down(sm) {
        font-size: em(16);
        font-style: italic;
        font-weight: $font-weight-regular;
        line-height: 100%; /* 16px */
      }
    }

    &--trust {
      color: #040714;
      font-size: em(14);
      font-weight: $font-weight-regular;

      @include media-breakpoint-down(sm) {
        font-size: em(14);
        font-weight: $font-weight-regular;
      }

      &:deep(strong) {
        font-weight: $font-weight-bold;
      }
    }

    &--list {
      font-size: em(20);
      line-height: normal;
      font-weight: $font-weight-light;

      @include media-breakpoint-down(sm) {
        color: rgba(197, 203, 213, 0.8);
        font-size: em(14);
        font-weight: $font-weight-light;
      }
    }
  }
}
</style>
