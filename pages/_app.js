import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/gironaStyle.css";
import TagManager from "react-gtm-module";
import React from 'react';
global.XMLHttpRequest = require("xhr2");

const tagManagerArgs = {
  id: "GTM-WHZLGZQ",
};

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
