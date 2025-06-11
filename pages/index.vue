<script setup>
import links from '@/constants/links';

// const { t } = useI18n();
// const button = computed(() => t('link.button'));

const buttonLinks = computed(() => [links.LOGIN, links.REGISTER]);

//<editor-fold desc="UTM">
const { getUrlWithUtm, hasUtmParameters } = useUtm();

onMounted(() => {
  addUtm();
});

function addUtm() {
  if (!hasUtmParameters.value) return;

  buttonLinks.value.forEach((link) => {
    const urlWithUtm = getUrlWithUtm(link);
    const links = document.querySelectorAll(`a[href="${link}"]`);

    links.forEach((link) => {
      link.href = urlWithUtm;
    });
  });
}

//</editor-fold>
</script>

<template>
  <div class="pages-home">
    <SectionHero class="pages-home__hero" />

    <SectionPartnership class="pages-home__partnership" />

    <SectionQualities class="pages-home__qualities" />

    <SectionSpec class="pages-home__spec" />

    <div class="pages-home__wrapper pages-home__wrapper--about">
      <SectionTraders class="pages-home__traders" />
      <SectionAccount class="pages-home__account" />
      <SectionAwards class="pages-home__awards" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pages-home {
  &__wrapper {
    &--about {
      padding: 0;
      background: linear-gradient(180deg, #FFF 0%, #F7F7F7 14.88%, #F7F7F7 87.67%, #FFF 100%);
    }
  }
}
</style>
