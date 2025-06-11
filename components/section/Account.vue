<script setup>
import breakpoints from '@/configs/breakpoints';

function onBreakpointChange(swiper) {
  swiper.setProgress(0, 0);
}

function scrollToForm() {
  const isSmallScreen = window.innerWidth < breakpoints.sm;
  const targetSection = document.getElementById(
    isSmallScreen ? 'mobile-hero' : 'hero',
  );
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <section id="account" class="section-account">
    <div class="container section-account__container">
      <div class="section-account__content">
        <CPicture
          src="/images/account/main.png"
          class="section-account__picture hidden-mobile"
        />
        <UiButton
          theme="red"
          class="section-account__button"
          :text="$t('accountSection.button')"
          @click="scrollToForm"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-account {
  margin-bottom: em(140);

  @include media-breakpoint-down(sm) {
    margin-top: 0;
    margin-bottom: 0;
    height: auto;
  }

  &__content {
    position: relative;
    padding: em(75) 0;

    @include media-breakpoint-down(sm) {
      padding: 0 0 em(60);
    }
  }

  &__picture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &__button {
    margin-inline: auto;
  }
}
</style>
