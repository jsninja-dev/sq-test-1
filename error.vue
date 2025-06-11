<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div id="app" class="error">
    Error

    <NuxtLayout v-slot="{ className }" class="error__layout">
      <div :class="className">
        <pre>{{ error }}</pre>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
.error {
  $parent: &;

  display: flex;
  flex-direction: column;

  &:deep(#{$parent}__layout) {
    flex-grow: 1;
  }
}
</style>
