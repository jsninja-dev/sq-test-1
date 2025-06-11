<script setup></script>

<template>
  <footer class="layout-footer">
    <div class="container layout-footer__container">
      <div class="layout-footer__content">

        <LayoutFooterPartContacts
          class="layout-footer__part layout-footer__part--contacts"
        />

        <LayoutFooterPartDisclaimers
          class="layout-footer__part layout-footer__part--disclaimers"
        />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.layout-footer {
  position: relative;
  overflow: hidden;

  &__content {
    padding: em(178) 0 em(51);

    @include media-breakpoint-down(sm) {
      padding: em(60) 0 em(40);
    }
  }
}
</style>
