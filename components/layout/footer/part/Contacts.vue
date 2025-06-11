<script setup>
import links from '@/constants/links';

const socials = [
  {
    title: 'facebook',
    iconName: 'facebook',
    link: links.FACEBOOK,
  },
  {
    title: 'x',
    iconName: 'x',
    link: links.X,
  },
  {
    title: 'linked-in',
    iconName: 'linked-in',
    link: links.LINKEDIN,
  },
  {
    title: 'instagram',
    iconName: 'instagram',
    link: links.INSTAGRAM,
  },
  {
    title: 'telegram',
    iconName: 'telegram',
    link: links.TELEGRAM,
  },
  {
    title: 'youtube',
    iconName: 'youtube',
    link: links.YOUTUBE,
  },
];
</script>

<template>
  <section class="layout-footer-contacts">
    <div
      class="layout-footer-contacts__wrapper layout-footer-contacts__wrapper--logo"
    >
      <img
        src="/images/logo.svg"
        :alt="$t('alt.logo2')"
        class="layout-footer-contacts__icon layout-footer-contacts__icon--logo"
      />

      <div class="layout-footer-contacts__copyright">
        <span
          class="layout-footer-contacts__font layout-footer-contacts__font--copyright"
        >
          {{ $t('footer.contacts.copyright') }}
        </span>
      </div>
    </div>

    <div
      class="layout-footer-contacts__wrapper layout-footer-contacts__wrapper--socials"
    >
      <div class="layout-footer-contacts__socials-text">
        <span
          class="layout-footer-contacts__font layout-footer-contacts__font--socials-text"
        >
          {{ $t('footer.contacts.findUs') }}
        </span>
      </div>

      <div class="layout-footer-contacts__socials">
        <a
          v-for="(social, index) in socials"
          :key="index"
          :href="social.link"
          target="_blank"
          class="layout-footer-contacts__social"
        >
          <CPicture
            :src="`/images/socials/${social.iconName}.svg`"
            :alt="social.title"
            loading="lazy"
            :class="`layout-footer-contacts__icon layout-footer-contacts__icon--${social.iconName}`"
          />
        </a>
      </div>
    </div>

    <div class="hidden-desktop layout-footer-contacts__divider"></div>

    <div
      class="layout-footer-contacts__wrapper layout-footer-contacts__wrapper--address"
    >
      <div class="layout-footer-contacts__address">
        <span
          class="layout-footer-contacts__font layout-footer-contacts__font--address"
        >
          {{ $t('footer.contacts.address') }}
        </span>
      </div>

      <UiButton
        :to="links.CONTACT_US"
        target="_blank"
        theme="red-outline"
        custom-size
        class="layout-footer-contacts__button"
      >
        <span
          class="layout-footer-contacts__font layout-footer-contacts__font--contact-us"
        >
          {{ $t('footer.contacts.contactUs') }}
        </span>
      </UiButton>
    </div>

    <div class="hidden-mobile layout-footer-contacts__divider"></div>
  </section>
</template>

<style scoped lang="scss">
.layout-footer-contacts {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-bottom: em(30);

  &__wrapper {
    &--logo {
      margin-right: em(70);

      @include media-breakpoint-down(sm) {
        margin-right: 0;
      }
    }

    &--socials {
      display: flex;
      padding-top: em(6);
      margin-right: auto;

      @include media-breakpoint-down(sm) {
        flex-direction: column;
        width: 100%;
        padding-top: em(35);
      }
    }

    &--address {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-top: em(15);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
  }

  &__copyright {
    margin-top: em(33);
    color: $color-grey-400;

    @include media-breakpoint-down(sm) {
      margin-top: em(10);
    }
  }

  &__socials-text {
    margin-right: em(6);

    @include media-breakpoint-down(sm) {
      margin-right: 0;
    }
  }

  &__socials {
    display: flex;
    transform: translateY(em(-9));

    @include media-breakpoint-down(sm) {
      margin-top: em(10);
      transform: translate(em(-17), em(-9));
    }
  }

  &__social {
    padding: em(10);
    transition: opacity ease-out $time-normal;

    @include media-breakpoint-down(sm) {
      padding: em(10) em(19);
    }

    @include hover {
      opacity: 0.75;
    }
  }

  &__address {
    margin-bottom: em(19);

    @include media-breakpoint-down(sm) {
      margin-bottom: em(24);
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    margin-top: em(20);
    background-color: $color-grey-200;

    @include media-breakpoint-down(sm) {
      margin: em(12) 0 em(16);
    }
  }

  &__button {
    width: em(119);
    height: em(39);
    border-radius: em(3);

    @include media-breakpoint-down(sm) {
      width: 100%;
      height: em(62);
    }
  }

  &__icon {
    &--logo {
      width: em(271);
      height: em(31);

      @include media-breakpoint-down(sm) {
        width: em(262);
        height: em(30);
      }
    }

    &--instagram {
      width: em(16);
      height: em(16);
      transform: translateY(em(1));

      @include media-breakpoint-down(sm) {
        width: em(20);
        height: em(20);
        transform: translateY(em(2));
      }
    }

    &--linked-in {
      width: em(18);
      height: em(16);

      @include media-breakpoint-down(sm) {
        width: em(21);
        height: em(20);
      }
    }

    &--facebook {
      width: em(9);
      height: em(16);

      @include media-breakpoint-down(sm) {
        width: em(11);
        height: em(20);
      }
    }

    &--x {
      width: em(16);
      height: em(15);

      @include media-breakpoint-down(sm) {
        width: em(25);
        height: em(22);
      }
    }

    &--telegram {
      width: em(17);
      height: em(15);
      transform: translateY(em(2));

      @include media-breakpoint-down(sm) {
        width: em(24);
        height: em(23);
        transform: translateY(em(1));
      }
    }

    &--youtube {
      width: em(19);
      height: em(13);
      transform: translateY(em(3));

      @include media-breakpoint-down(sm) {
        width: em(29);
        height: em(20);
      }
    }
  }

  &__font {
    display: block;

    &--copyright {
      font-size: em(16);

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }

    &--socials-text {
      font-size: em(16);
    }

    &--address {
      font-size: em(16);
      font-weight: $font-weight-regular;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }

    &--contact-us {
      font-size: em(16);
      font-weight: $font-weight-regular;
      line-height: 1.1875;

      @include media-breakpoint-down(sm) {
        font-size: em(18);
        font-weight: $font-weight-medium;
      }
    }
  }
}
</style>
