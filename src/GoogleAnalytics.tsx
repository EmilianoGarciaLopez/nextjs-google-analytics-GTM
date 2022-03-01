import React from "react";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gtmDomain = process.env.NEXT_PUBLIC_GTM_DOMAIN;

export function GoogleAnalytics(): JSX.Element | null {
  if (!gaMeasurementId) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://${gtmDomain}/gtag/js?id=${gaMeasurementId}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${gaMeasurementId}', {
                 page_path: window.location.pathname,
                 transport_url: 'https://${gtmDomain}',
                 first_party_collection: true
              });
          `,
        }}
      />
    </>
  );
}

export function GoogleAnalyticsNoscript(): JSX.Element | null {
  if (!gaMeasurementId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://${gtmDomain}/ns.html?id=${gaMeasurementId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
