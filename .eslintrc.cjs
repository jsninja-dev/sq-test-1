module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config', '@vue/eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-undef': 'off',
    'vue/no-v-html': 'off',
  },
  // https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work
  overrides: [
    {
      files: ['landings/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
};
