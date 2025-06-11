export const useUtm = () => {
  const utmParameters = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ];

  const route = useRoute();

  const hasUtmParameters = computed(() => {
    const queryKeys = Object.keys(route.query);

    if (!queryKeys.length) return false;

    return utmParameters.some((param) => queryKeys.includes(param));
  });

  const utmQuery = computed(() => {
    if (!hasUtmParameters.value) return {};

    return utmParameters.reduce((query, param) => {
      if (Object.prototype.hasOwnProperty.call(route.query, param)) {
        query[param] = route.query[param];
      }

      return query;
    }, {});
  });

  function getUrlWithUtm(url) {
    let newUrl;

    try {
      newUrl = new URL(url);
    } catch (_) {
      return url;
    }

    Object.keys(utmQuery.value).forEach((key) => {
      if (newUrl.searchParams.has(key)) return;

      const value = utmQuery.value[key];

      newUrl.searchParams.set(key, value);
    });

    return newUrl.href;
  }

  return {
    getUrlWithUtm,
    hasUtmParameters,
  };
};
