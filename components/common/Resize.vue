<template>
  <div class="resize">
    <slot />
  </div>
</template>

<style scoped lang="scss">
$width-desktop: 1920;
$width-mobile: 375;
$font-size: 16;

.resize {
  font-size: calc($font-size / $width-desktop * 100vw);

  @include media-breakpoint-down(sm) {
    font-size: calc($font-size / $width-mobile * 100vw);
  }
}
</style>
