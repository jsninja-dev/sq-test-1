<script setup>
import seoMeta from '@/configs/seo-meta';

const { t } = useI18n();
const i18nHead = useLocaleHead();

defineProps({
  className: {
    type: String,
    default: undefined,
  },
});

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
});

const title = computed(() => t(seoMeta.title));
const description = computed(() => t(seoMeta.description));

useSeoMeta({
  title,
  description,

  ogTitle: title,
  ogDescription: description,
  ogImage: seoMeta.image,
  ogType: 'website',

  twitterTitle: title,
  twitterDescription: description,
  twitterImage: seoMeta.image,
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <CResize class="layouts-default" :class="className">
    <slot class-name="layouts-default__view" />

    <LayoutFooter />
  </CResize>
</template>

<style scoped lang="scss">
.layouts-default {
  $parent: &;

  display: flex;
  flex-direction: column;

  &:deep(#{$parent}__view) {
    flex-grow: 1;
  }
}
</style>
