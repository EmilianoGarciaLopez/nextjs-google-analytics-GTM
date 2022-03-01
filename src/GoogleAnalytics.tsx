import React from "react";

export function GoogleAnalytics(): JSX.Element | null {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmDomain = process.env.NEXT_PUBLIC_GTM_DOMAIN;

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
