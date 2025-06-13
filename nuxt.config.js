import {
  API_PREFIX,
  // STORAGE_PREFIX,
} from './constants/variables';
import localeCodes from './constants/localeCodes';
import seoMeta from './configs/seo-meta';
// import { getFontsPreloadList } from './utils/helpers.js';

const isDev = process.env.NODE_ENV === 'development';

const clientUrl = import.meta.env.CLIENT_URL;

let robotsRules = {};
const nuxtRobots =
  import.meta.env.NUXT_ROBOTS?.replace(/'/g, '"') ||
  JSON.stringify({ Disallow: ' / ' });
if (nuxtRobots) {
  try {
    robotsRules = JSON.parse(nuxtRobots);
  } catch (error) {
    console.error('NUXT_ROBOTS parsing error:', error);
  }
}

// const fontsToPreload = getFontsPreloadList([
//   {
//     path: 'font-name/FontName-',
//     weights: ['Light', 'Bold'],
//   },
// ]);

const routeRules = {
  // Cache
  // '/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
  // No-ssr
  // '/profile/**': { ssr: false },
};
if (isDev) {
  Object.assign(routeRules, {
    [`/${API_PREFIX}/**`]: { proxy: `${clientUrl}/${API_PREFIX}/**` },
    // [`/${STORAGE_PREFIX}/**`]: { proxy: `${clientUrl}/${STORAGE_PREFIX}/**` },
  });
}

const baseURL = '/partner-program';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    apiToken: process.env.API_TOKEN,
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  app: {
    head: {
      title: seoMeta.title,
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: seoMeta.description },

        { property: 'og:title', content: seoMeta.title },
        { property: 'og:description', content: seoMeta.description },
        { property: 'og:image', content: seoMeta.image },
        { property: 'og:type', content: 'website' },

        { name: 'twitter:title', content: seoMeta.title },
        { name: 'twitter:description', content: seoMeta.description },
        { name: 'twitter:image', content: seoMeta.image },
        { name: 'twitter:card', content: 'summary_large_image' },

        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: `${baseURL}apple-touch-icon.png`,
        },
        {
          rel: 'shortcut icon',
          href: `${baseURL}favicon.ico`,
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `${baseURL}favicon.svg`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: `${baseURL}favicon-96x96.png`,
        },
        {
          rel: 'manifest',
          href: `${baseURL}site.webmanifest`,
        },
      ],
    },

    baseURL,
  },

  components: ['@/components', { path: '@/components/common', prefix: 'C' }],

  css: ['reset-css', '@/assets/styles/base/index.scss'],

  swiper: {
    styleLang: 'scss',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@use "@/assets/styles/utils" as *;' },
      },
    },
    build: {
      modulePreload: {
        polyfill: false,
        resolveDependencies: () => {
          return [];
        },
      },
    },
  },

  hooks: {
    // https://github.com/nuxt/nuxt/issues/14584#issuecomment-2166544081
    'build:manifest': (manifest) => {
      for (const item of Object.values(manifest)) {
        item.dynamicImports = [];
        item.prefetch = false;
        // Removing preload links is the magic that drops the FCP on mobile
        item.preload = false;
        item.modulePreload = false;
      }
    },
  },

  sourcemap: true,

  routeRules,

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    // '@nuxtjs/device',
    '@nuxtjs/robots',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-svgo',
    'nuxt-swiper', // https://github.com/cpreston321/nuxt-swiper/tree/v1.2.2
  ],

  robots: {
    rules: robotsRules,
  },

  svgo: {
    defaultImport: 'component',
    explicitImportsOnly: true,
  },

  i18n: {
    compilation: { strictMessage: false },
    locales: [
      {
        code: localeCodes.EN,
        language: 'en-US',
        file: 'en.json',
      },
    ],
    detectBrowserLanguage: false,
    baseUrl: baseURL,
    defaultLocale: localeCodes.EN,
  },

  features: {
    inlineStyles: false,
  },

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800],
    },
  },

  compatibilityDate: '2025-02-21',

  nitro: {
    routeRules: {
      '/api/**': { cors: true },
    },
  },
});
