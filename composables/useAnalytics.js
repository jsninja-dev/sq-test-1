export const analyticsId = {
  gtag: 'G-3FQQMPDDZM',
  gtm: 'GTM-P8BVNMT',
  metaPixel: '878668181014579',
  zeSnippet: '35182fbc-4bf1-4813-be25-5c5fdf57a8c4',
};

export const analyticsName = {
  gtag: 'gtag',
  gtm: 'gtm',
  metaPixel: 'metaPixel',
  zeSnippet: 'zeSnippet',
};

const scripts = {
  [analyticsName.gtag]: {
    externalScript(gtagID) {
      return `https://www.googletagmanager.com/gtag/js?id=${gtagID}`;
    },
    script(gtagID) {
      return `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gtagID}');`;
    },
  },
  [analyticsName.gtm]: {
    script(gtmID) {
      return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmID}');`;
    },
    noscript(gtmID) {
      return `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    },
  },
  [analyticsName.metaPixel]: {
    script(pixelID) {
      return `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelID}');
      fbq('track', 'PageView');`;
    },
  },
  [analyticsName.zeSnippet]: {
    script(snippetID) {
      return `(function(d,s,i){var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s);j.async=true;j.id='ze-snippet';j.src=
        'https://static.zdassets.com/ekr/snippet.js?key='+i;f.parentNode.insertBefore(j,f);
        })(document,'script','${snippetID}');`;
    },
  },
};

/**
 * Add analytic metric on page
 * @param name analytic name from 'scripts' object above
 * @param id analytic unique id
 */
function setAnalytics(name, id) {
  const analytics = scripts[name];

  // external script
  if (analytics?.externalScript) {
    const externalScript = document.createElement('script');
    externalScript.src = analytics.externalScript(id);
    externalScript.async = true;
    document.head.appendChild(externalScript);
  }

  // script
  const script = document.createElement('script');
  script.innerHTML = analytics.script(id);
  document.head.appendChild(script);

  // noscript
  if (analytics?.noscript) {
    const noscript = document.createElement('noscript');
    noscript.innerHTML = analytics.noscript(id);
    document.body.prepend(noscript);
  }
}

function initGtag(gtagID) {
  if (gtagID) setAnalytics(analyticsName.gtag, gtagID);
}

function initGtm(gtmID) {
  if (gtmID) setAnalytics(analyticsName.gtm, gtmID);
}

function initMetaPixel(pixelID) {
  if (pixelID) setAnalytics(analyticsName.metaPixel, pixelID);
}

function initZeSnippet(snippetID) {
  if (snippetID) setAnalytics(analyticsName.zeSnippet, snippetID);
}

export const useAnalytics = () => {
  return {
    initGtm,
    initGtag,
    initMetaPixel,
    initZeSnippet,
  };
};
