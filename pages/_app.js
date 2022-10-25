import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/gironaStyle.css";
global.XMLHttpRequest = require("xhr2");

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
