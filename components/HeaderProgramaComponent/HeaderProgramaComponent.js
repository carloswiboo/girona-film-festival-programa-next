import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TranslatorWidget from "react-translate-widget";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";

const HeaderProgramaComponent = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "es",
        includedLanguages: "en,ca,es", // include this for selected languages
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  React.useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <>
      <div
        id="google_translate_element"
        style={{ position: "fixed", bottom: "0", left: "0", zIndex: 100000 }}
      ></div>
      <div className="container mb-4 pt-5">
        <div className="row d-flex align-items-center">
          <div className="col-6">
            <img
              onClick={() => {
                window.open("/", "_self");
              }}
              src="https://www.gironafilmfestival.com/wp-content/uploads/2022/08/logo-blanco-girona.png"
              alt="Girona Logo"
              height="50"
            />
            <small className="text-white ms-2">
              <strong>Histórico</strong> - Edición 34 - 7 al 13 Noviembre 2022{" "}
            </small>
          </div>
          <div
            className="col-6 text-right d-none"
            style={{ textAlign: "right" }}
          >
            <h6
              className=""
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/place/Pla%C3%A7a+Jordi+de+Sant+Jordi,+17001+Girona/@41.9846581,2.8215094,19z/data=!3m1!4b1!4m5!3m4!1s0x12bae6e0a4cd3195:0xe5dc12dd7fb73ea9!8m2!3d41.9846581!4d2.8220566",
                  "_blank"
                );
              }}
            >
              <PlaceIcon fontSize="inherit" /> CINEMES ALBENIZ PLAÇA
              <br />
              <small style={{ opacity: 0.7 }} className="fw-light">
                Plaza Santa Jordi y por la calle Anselm Clavé, Girona
              </small>
            </h6>
            <div
              className="btn btn-sm btn-warning mt-2 d-none"
              onClick={() => {
                window.open(
                  "https://filmfreeway.com/GironaFilmFestival/tickets/",
                  "_blank"
                );
              }}
            >
              <ConfirmationNumberIcon fontSize="inherit" /> Comprar Entradas{" "}
            </div>
          </div>
          <div className="col-6 text-right" style={{ textAlign: "right" }}>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-sm btn-success"
                type="button"
                onClick={() => {
                  window.open(
                    "https://www.gironafilmfestival.com/wp-content/uploads/2022/11/34_Palmares_2022_ESP.pdf",
                    "_blank"
                  );
                }}
              >
                <DownloadIcon fontSize="inherit" />
                <PictureAsPdfIcon fontSize="inherit" />
                ESP
              </button>
              <button
                className="btn btn-sm btn-success"
                type="button"
                onClick={() => {
                  window.open(
                    "https://www.gironafilmfestival.com/wp-content/uploads/2022/11/34_Palmares_2022_CAT.pdf",
                    "_blank"
                  );
                }}
              >
                <DownloadIcon fontSize="inherit" />
                <PictureAsPdfIcon fontSize="inherit" />
                CAT
              </button>
              <button
                className="btn btn-sm btn-success"
                type="button"
                onClick={() => {
                  window.open(
                    "https://www.gironafilmfestival.com/wp-content/uploads/2022/11/34_Palmares_2022_ENG.pdf",
                    "_blank"
                  );
                }}
              >
                <DownloadIcon fontSize="inherit" />
                <PictureAsPdfIcon fontSize="inherit" />
                ENG
              </button>
            </div>

            <h6
              className="mt-3"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => {
                window.open(
                  "https://patrocinadores.gironafilmfestival.com",
                  "_blank"
                );
              }}
            >
              <AcUnitIcon fontSize="inherit" /> Ver Patrocinadores
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderProgramaComponent;
