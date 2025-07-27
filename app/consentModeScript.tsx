import Script from "next/script";
import React from "react";

const ConsentModeScript = () => {
  return (
    <>
      <script
        type="text/javascript"
        src="https://cs.iubenda.com/autoblocking/4178340.js"
      ></script>
      <script
        type="text/javascript"
        src="//cdn.iubenda.com/cs/gpp/stub.js"
      ></script>
      <script
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        async
      ></script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
        var _iub = _iub || [];
        _iub.csConfiguration = {"siteId":4178340,"cookiePolicyId":57567027,"lang":"en","storage":{"useSiteId":true}};`,
        }}
      ></Script>
    </>
  );
};

export default ConsentModeScript;
