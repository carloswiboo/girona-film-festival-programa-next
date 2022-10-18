import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { readRemoteFile } from "react-papaparse";
import FooterComponent from "../components/FooterComponent/FooterComponent";

import VisibilityIcon from "@mui/icons-material/Visibility";
import TimerIcon from "@mui/icons-material/Timer";
import FlagIcon from "@mui/icons-material/Flag";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function Home({ resultado, titulo, description }) {
  const [finalData, setFinalData] = React.useState(resultado);

  console.log(finalData);

  return (
    <div className={styles.container}>
      <Head>
        <title>{titulo}</title>
        <meta name="description" content={description} />
        <link
          rel="icon"
          type="image/png"
          href="https://www.gironafilmfestival.com/wp-content/uploads/2022/08/logo-girona-film-festival.png"
        />
      </Head>

      <div className="container">
        <div className="row">
          {finalData.map((pelicula, index) => (
            <div className="col-sm-3 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <img
                    src={
                      pelicula["Fotograma"] === "" ||
                      pelicula["Fotograma"] === "."
                        ? "https://www.gironafilmfestival.com/wp-content/uploads/2022/09/Sin-titulo-1920-×-1080-px.png"
                        : pelicula["Fotograma"]
                    }
                    className="w-100 mb-2 imagen_1_1"
                    alt={pelicula["Project Title"]}
                  />
                  <h5 className="card-title">
                    {pelicula["Project Title"].substring(0, 40).slice(0, 25) +
                      "..."}
                  </h5>
                  <p className="card-text">
                    <CalendarToday
                      fontSize="small"
                      style={{ opacity: 0.5, fontSize: 16 }}
                    />{" "}
                    {pelicula["Dia"]}
                    <br />
                    <TimerIcon
                      fontSize="small"
                      style={{ opacity: 0.5, fontSize: 16 }}
                    />{" "}
                    {pelicula["Hora"]}
                    <br />
                    <TimerIcon
                      fontSize="small"
                      style={{ opacity: 0.5, fontSize: 16 }}
                    />{" "}
                    {pelicula["Duration OK"]}
                    <br />
                    <LocalMoviesIcon
                      fontSize="small"
                      style={{ opacity: 0.5, fontSize: 16 }}
                    />
                    {pelicula["Submission Categories"]}
                    <br />
                    <FlagIcon
                      fontSize="small"
                      style={{ opacity: 0.5, fontSize: 16 }}
                    />{" "}
                    {pelicula["Country of Origin"]}
                    <br />
                    <LanguageIcon
                      fontSize="small"
                      style={{ opacity: 0.5, fontSize: 16 }}
                    />{" "}
                    {pelicula["Language"]}
                    <br />
                    <a
                      href="https://filmfreeway.com/GironaFilmFestival/tickets/128404"
                      target={"_blank"}
                      rel="noreferrer"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <ConfirmationNumberIcon fontSize="small" /> Buy Tickets
                    </a>
                  </p>
                </div>
                <div className="card-footer">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      type="button"
                      onClick={() => {
                        setIsOpen(true);
                        setMovieSelected(pelicula);
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}
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
export async function getStaticProps() {
  const titulo = "Programa 34 - Girona Film Festival";
  const description = "Configura el programa";

  const resultado = await llamarPrograma();

  return {
    props: {
      resultado,
      titulo,
      description,
    },
  };
}
