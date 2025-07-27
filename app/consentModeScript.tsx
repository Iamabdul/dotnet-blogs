import Script from "next/script";
import React from "react";

const ConsentModeScript = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        type="text/javaScript"
        src="https://cs.iubenda.com/autoblocking/4178340.js"
        async
      ></Script>
      <Script
        strategy="lazyOnload"
        type="text/javaScript"
        src="//cdn.iubenda.com/cs/gpp/stub.js"
        async
      ></Script>
      <Script
        strategy="lazyOnload"
        type="text/javaScript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        async
      ></Script>
    </>
  );
};

export default ConsentModeScript;
