import React from "react";
import Script, { ScriptProps } from "next/script";

export function GoogleAnalytics({
  strategy,
}: {
  strategy?: ScriptProps["strategy"];
}): JSX.Element | null {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmDomain = process.env.NEXT_PUBLIC_GTM_DOMAIN;

  if (!gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`{https://${gtmDomain}/gtag}/js?id=${gaMeasurementId}`}
        strategy={strategy}
      />
      <Script id="nextjs-google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              page_path: window.location.pathname,
            });
          `}
      </Script>
    </>
  );
}
