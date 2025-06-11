import { analyticsId } from '@/composables/useAnalytics';

// const { initGtm, initMetaPixel, initZeSnippet, initGtag } = useAnalytics();
// const { initGtm, initMetaPixel, initGtag } = useAnalytics();
const { initGtm, initGtag } = useAnalytics();

export default defineNuxtPlugin(() => {
  initGtm(analyticsId.gtm);
  //initMetaPixel(analyticsId.metaPixel);
  // initZeSnippet(analyticsId.zeSnippet);
  initGtag(analyticsId.gtag);
});
