"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: Readonly<{ GA_MEASUREMENT_ID: string }>) {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(
      localStorage.getItem("cookie") === "true" ? "granted" : "denied"
    );
  }, [GA_MEASUREMENT_ID]);

  if (consent === null) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                      'ad_storage': 'denied',
                      'ad_user_data': 'denied',
                      'ad_personalization': 'denied',
                      'analytics_storage': 'denied'
                    });
                
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
}
