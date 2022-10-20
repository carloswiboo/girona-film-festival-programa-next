import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { readRemoteFile } from "react-papaparse";
import HeaderProgramaComponent from "../../components/HeaderProgramaComponent/HeaderProgramaComponent";
import "./id.module.css";
import { DateTime } from "luxon";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import PlaceIcon from "@mui/icons-material/Place";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import Blur from "react-blur";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const style = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
};

const MovieDetailScreen = ({ resultado }) => {
  const [finalData, setFinalData] = React.useState(resultado);
  const router = useRouter();

  const { id } = router.query;
  console.log(finalData);
  return (
    <React.Fragment>
      <Head>
        <title>{resultado["Project Title"]} - Girona Film Festival 34</title>
        <meta
          name="description"
          content={
            "Girona Film Festival Programa 34 (7 al 13 de Noviembre 2022) - Comprar Boletos"
          }
        />
        <link
          rel="icon"
          type="image/png"
          href="https://www.gironafilmfestival.com/wp-content/uploads/2022/08/logo-girona-film-festival.png"
        />

        <meta property="og:title" content={resultado["Project Title"]} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={resultado["Cartel"]} />
        <meta
          property="og:description"
          content={
            "Girona Film Festival Programa 34 (7 al 13 de Noviembre 2022) - Comprar Boletos"
          }
        />
      </Head>

      <Blur
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -11,
          background: "rgba(0,0,0,0.5)",
        }}
        img={
          resultado["Fotograma"] === "" || resultado["Fotograma"] === "."
            ? "https://www.gironafilmfestival.com/wp-content/uploads/2022/09/Sin-titulo-1920-×-1080-px.png"
            : resultado["Fotograma"]
        }
        blurRadius={10}
        enableStyles
      >
        The content.
      </Blur>

      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -10,
          background: "rgba(0,0,0,0.7)",
        }}
      ></div>
      <HeaderProgramaComponent />
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={
                resultado["Cartel"] === "" || resultado["Cartel"] === "."
                  ? "https://www.gironafilmfestival.com/wp-content/uploads/2022/09/Sin-titulo-1920-×-1080-px.png"
                  : resultado["Cartel"]
              }
              className="w-100 mb-2"
              alt={resultado["Project Title"]}
            />
          </div>
          <div className="col-md-4 text-white text-center">
            <h3>
              {resultado["Project Title"]}{" "}
              <small style={{ opacity: 0.7, fontSize: "0.7em" }}>
                {" "}
                <TimerIcon fontSize="inherit" /> {resultado["Duration OK"]}
              </small>
            </h3>
            {resultado["Project Title (Original Language)"] == "." ? null : (
              <h6 style={{opacity: 0.5}}>{resultado["Project Title (Original Language)"]}</h6>
            )}
            {resultado["Dia"] == "." ? null : (
              <h4>
                <CalendarMonthIcon fontSize="inherit" /> {resultado["Dia"]}{" "}
                <AccessTimeIcon fontSize="inherit" /> {resultado["Hora"]}
              </h4>
            )}

            <table style={{ width: "100%" }}>
              {resultado["Country of Origin"] == "." ? null : (
                <React.Fragment>
                  <tr>
                    <td style={{ textAlign: "right", paddingRight: 10 }}>
                      <strong>
                        {" "}
                        <small>País </small>{" "}
                      </strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {" "}
                      {resultado["Country of Origin"]}
                    </td>
                  </tr>
                </React.Fragment>
              )}
              {resultado["Directors"] == "." ? null : (
                <React.Fragment>
                  <tr>
                    <td style={{ textAlign: "right", paddingRight: 10 }}>
                      <strong>
                        {" "}
                        <small>Director(es) </small>{" "}
                      </strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {" "}
                      {resultado["Directors"]}
                    </td>
                  </tr>
                </React.Fragment>
              )}
              {resultado["Producers"] == "." ? null : (
                <React.Fragment>
                  <tr>
                    <td style={{ textAlign: "right", paddingRight: 10 }}>
                      <strong>
                        {" "}
                        <small>Productor(es) </small>{" "}
                      </strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {" "}
                      {resultado["Producers"]}
                    </td>
                  </tr>
                </React.Fragment>
              )}
              {resultado["Writers"] == "." ? null : (
                <React.Fragment>
                  <tr>
                    <td style={{ textAlign: "right", paddingRight: 10 }}>
                      <strong>
                        {" "}
                        <small>Escritor(es) </small>{" "}
                      </strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {" "}
                      {resultado["Writers"]}
                    </td>
                  </tr>
                </React.Fragment>
              )}
            </table>

            <hr />
            <FacebookShareButton
              className="me-2"
              url={"https://programa.gironafilmfestival.com" + router.asPath}
            >
              <FacebookIcon size={30} />
            </FacebookShareButton>
            <TwitterShareButton
              className="me-2"
              url={"https://programa.gironafilmfestival.com" + router.asPath}
            >
              <TwitterIcon size={30} />
            </TwitterShareButton>
            <WhatsappShareButton
              className="me-2"
              url={"https://programa.gironafilmfestival.com" + router.asPath}
            >
              <WhatsappIcon size={30} />
            </WhatsappShareButton>
            <LinkedinShareButton
              className="me-2"
              url={"https://programa.gironafilmfestival.com" + router.asPath}
            >
              <LinkedinIcon size={30} />
            </LinkedinShareButton>
            <InstapaperShareButton
              className="me-2"
              url={"https://programa.gironafilmfestival.com" + router.asPath}
            >
              <InstapaperIcon size={30} />
            </InstapaperShareButton>
          </div>
          <div className="col-md-4 text-white text-center">
            <div
              className="btn btn-sm btn-success mt-3"
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/place/Pla%C3%A7a+Jordi+de+Sant+Jordi,+17001+Girona/@41.9846581,2.8215094,19z/data=!3m1!4b1!4m5!3m4!1s0x12bae6e0a4cd3195:0xe5dc12dd7fb73ea9!8m2!3d41.9846581!4d2.8220566",
                  "_blank"
                );
              }}
            >
              Abrir Ubicación{" "}
            </div>
            <br />
            <div
              className="btn btn-sm btn-warning mt-3"
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
        </div>
      </div>
      <FooterComponent />
    </React.Fragment>
  );
};

//Función Filtrado Programa
function llamarPrograma() {
  return new Promise((resolve, reject) => {
    readRemoteFile(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRD9cIlCpdnkkljkwj38m-H9N_QfiYAFvqoCzHXttDyoNQLzxFcFuQgVtB7nVWfUA/pub?output=csv",
      {
        header: true,
        complete: (results) => {
          let contador = 1;
          for (const dato of results.data) {
            dato["id"] = contador;
            contador++;
          }
          const optionsSelected = [];

          results.data.sort(function (a, b) {
            if (a["Submission Categories"] < b["Submission Categories"]) {
              return -1;
            }
            if (a["Submission Categories"] > b["Submission Categories"]) {
              return 1;
            }
            return 0;
          });
          resolve(results.data);
        },
      }
    );
  });
}

// This function gets called at build time
export async function getServerSideProps({ query }) {
  const resultadoCompleto = await llamarPrograma();
  const resultado = resultadoCompleto.find(
    (pelicula) => pelicula.id.toString() === query.id.toString()
  );

  return {
    props: {
      resultado,
    },
  };
}

export default MovieDetailScreen;
