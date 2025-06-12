<script setup>
import links from '@/constants/links';

const { tm, rt } = useI18n();

function getTextArray(text) {
  return tm(text).map(rt);
}

defineProps({
  card: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  hasTNC: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="qualities-card">
    <div class="qualities-card__picture">
      <CPicture
        :src="card"
        alt=""
        loading="lazy"
        class="qualities-card__picture--card"
      />
      <CPicture
        :src="icon"
        alt=""
        loading="lazy"
        class="qualities-card__picture--icon"
      />
    </div>
    <div class="qualities-card__content">
      <div class="qualities-card__title">
        <span
          class="qualities-card__font qualities-card__font--title"
          v-html="$t(title)"
        />
      </div>
      <ul class="qualities-card__text">
        <li
          v-for="item in getTextArray(text)"
          :key="item"
          class="qualities-card__item"
        >
          <span
            class="qualities-card__font qualities-card__font--text"
            v-html="item"
          />
        </li>
      </ul>
      <div v-if="hasTNC" class="qualities-card__tnc">
        <a :href="links.TNC" target="_blank" class="qualities-card__link">
          <span class="qualities-card__font qualities-card__font--link">
            {{ $t('tradersSection.content.2.link') }}
          </span>
        </a>
        <span class="qualities-card__font qualities-card__font--apply">
          {{ $t('tradersSection.content.2.apply') }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.qualities-card {
  color: $color-black-1000;
  border: em(2) solid $color-white;
  position: relative;
  overflow: hidden;

  &__picture {
    position: relative;
    width: 100%;

    @include media-breakpoint-down(sm) {
    }

    &--card {
      width: 100%;
      height: auto;

      @include media-breakpoint-down(sm) {
        height: em(170);
        width: 100%;
      }
    }

    &--icon {
      position: absolute;
      bottom: em(40);
      left: em(50);
      width: em(80);
      height: auto;

      @include media-breakpoint-down(sm) {
        bottom: em(22);
        left: em(22);
        width: em(51);
      }
    }
  }

  &__content {
    background: $color-white;
    position: relative;
    width: 100%;
    height: 100%;
    padding: em(45) em(50) em(45) em(50);

    @include media-breakpoint-down(sm) {
      padding: em(20) em(24) em(20) em(24);
    }
  }

  &__title {
    margin-bottom: em(27);

    @include media-breakpoint-down(sm) {
      height: em(45);
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: em(4);
    padding-right: em(185);

    @include media-breakpoint-down(sm) {
      padding-right: 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: em(8);
    align-items: flex-start;

    &::before {
      content: '-';
      font-size: em(18);
      font-weight: $font-weight-light;
      color: $color-black-1000;
      font-family: $font-family-default;
    }
  }

  &__tnc {
    margin-top: em(30);
    display: flex;
    flex-direction: row;
    gap: em(8);

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 0;
    }
  }

  &__font {
    &--title {
      font-size: em(24);
      font-weight: $font-weight-medium;
      line-height: 123.358%;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }

    &--text {
      font-size: em(18);
      font-weight: $font-weight-light;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }

    &--link {
      color: $color-red-700;
      font-size: em(16);
      font-weight: $font-weight-medium;

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }

    &--apply {
      color: $color-grey-700;
      font-size: em(16);
      font-weight: $font-weight-light;

      @include media-breakpoint-down(sm) {
        font-size: em(14);
      }
    }
  }
}
</style>
