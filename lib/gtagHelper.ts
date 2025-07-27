export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
