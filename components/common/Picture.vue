<script setup>
import breakpoints from '@/configs/breakpoints';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  srcset: {
    type: String,
    default: undefined,
  },
  sources: {
    type: Object,
    default: undefined,
    validator(value) {
      const breakpointKeys = Object.keys(breakpoints);

      return Object.keys(value).every((key) => breakpointKeys.includes(key));
    },
  },
  alt: {
    type: String,
    default: '',
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['lazy', 'eager'].includes(value),
  },
  fetchPriority: {
    type: String,
    default: undefined,
    validator: (value) => ['high', 'low', 'auto'].includes(value),
  },
  objectFit: {
    type: String,
    default: undefined,
    validator: (value) => ['cover', 'contain'].includes(value),
  },
});

const {
  app: { baseURL },
} = useRuntimeConfig();

const sourceData = computed(() => {
  if (!props.sources) return;

  const breakpointsEntriesAsc = Object.entries(breakpoints).sort(
    (a, b) => a[1] - b[1],
  );

  return breakpointsEntriesAsc.reduce(
    (resultData, [breakpointKey, breakpointValue]) => {
      const srcset = props.sources[breakpointKey];

      if (!srcset) return resultData;

      const srcsetWithBaseUrl = srcset
        .split(',')
        .map((src) => combineURLs(baseURL, src.trim()))
        .join(', ');

      const media = `(max-width: ${breakpointValue - 0.02}px)`;

      return [
        ...resultData,
        {
          srcset: srcsetWithBaseUrl,
          media,
        },
      ];
    },
    [],
  );
});
</script>

<template>
  <picture class="picture">
    <source
      v-for="{ srcset: sourceSrcset, media } in sourceData"
      :key="media"
      :srcset="sourceSrcset"
      :media="media"
    />

    <CImage
      :src="src"
      :srcset="srcset"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchPriority"
      class="picture__image"
      :class="`picture__image--fit--${objectFit}`"
    />
  </picture>
</template>

<style scoped lang="scss">
.picture {
  &__image {
    width: 100%;
    height: 100%;

    &--fit {
      &--cover {
        object-fit: cover;
      }

      &--contain {
        object-fit: contain;
      }
    }
  }
}
</style>
