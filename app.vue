<script setup></script>

<template>
  <div id="app" class="app">
    <NuxtLayout v-slot="{ className }" class="app__layout">
      <NuxtPage :class="className" />
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
.app {
  $parent: &;

  display: flex;
  flex-direction: column;

  &:deep(#{$parent}__layout) {
    flex-grow: 1;
  }
}
</style>
