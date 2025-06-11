<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="qualities-card">
    <div class="qualities-card__content">
      <CPicture
        :src="icon"
        alt=""
        loading="lazy"
        class="qualities-card__icon"
      />

      <p class="qualities-card__text">
        <span
          class="qualities-card__font qualities-card__font--text"
          v-html="$t(text)"
        />
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.qualities-card {
  position: relative;
  overflow: hidden;

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: em(34) em(48) em(34) em(40);
    z-index: 1;

    @include media-breakpoint-down(sm) {
      padding: em(25) em(24) em(25) em(24);
    }
  }

  &__icon {
    display: inline-block;
    width: auto;
    height: em(50);
    margin-bottom: em(80);

    @include media-breakpoint-down(sm) {
      height: em(29);
      margin-bottom: em(25);
    }
  }

  &__font {
    &--text {
      font-size: em(32);
      font-weight: $font-weight-medium;
      line-height: 123.358%;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }
  }
}
</style>
