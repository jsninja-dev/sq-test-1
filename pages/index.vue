<script setup>
import links from '@/constants/links';


const buttonLinks = computed(() => [links.LOGIN, links.REGISTER]);

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
      background: linear-gradient(
        180deg,
        #fff 0%,
        #f7f7f7 14.88%,
        #f7f7f7 87.67%,
        #fff 100%
      );
    }
  }
}
</style>
