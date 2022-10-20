import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
const HeaderProgramaComponent = () => {
  return (
    <div className="container mb-4 pt-5">
      <div className="row">
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
            Edición 34 - 7 al 13 Noviembre 2022{" "}
          </small>
        </div>
        <div className="col-6 text-right" style={{ textAlign: "right" }}>
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
            <small style={{ opacity: 0.7 }}>
              Plaça Sant Jordi y por carrer Ancelm Clavè, Girona
            </small>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default HeaderProgramaComponent;
