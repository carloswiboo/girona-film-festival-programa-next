import React from "react";
import styles from "./FooterComponent.module.css";
import PlaceIcon from "@mui/icons-material/Place";
const FooterComponent = () => {
  return (
    <>
      <footer className={`mt-4 mb-3 ${styles.footer}`}>
        <a
          href="https://gironafilmfestival.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Girona Film Festival - 34
        </a>

        <h6
          className="fw-light"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open(
              "https://www.google.com/maps/place/Pla%C3%A7a+Jordi+de+Sant+Jordi,+17001+Girona/@41.9846581,2.8215094,19z/data=!3m1!4b1!4m5!3m4!1s0x12bae6e0a4cd3195:0xe5dc12dd7fb73ea9!8m2!3d41.9846581!4d2.8220566",
              "_blank"
            );
          }}
        >
          <PlaceIcon fontSize="inherit" /> CINEMES ALBENIZ PLAÇA
          <br />
          <small style={{ opacity: 0.7 }}>
            Plaça Sant Jordi y por carrer Ancelm Clavè, Girona
          </small>
        </h6>
      </footer>
    </>
  );
};

export default FooterComponent;
