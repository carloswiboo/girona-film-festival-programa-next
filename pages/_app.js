import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/gironaStyle.css";
import TagManager from "react-gtm-module";
import React from "react";
import analytics from "./../utilidades/analytics";
global.XMLHttpRequest = require("xhr2");

const tagManagerArgs = {
  id: "GTM-WHZLGZQ",
};

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    analytics.page();
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
