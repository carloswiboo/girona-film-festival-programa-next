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
import SearchInAllWebComponent from "../components/SearchInAllWebComponent/SearchInAllWebComponent";
import Link from "next/link";
import PlaceIcon from "@mui/icons-material/Place";
import HeaderProgramaComponent from "../components/HeaderProgramaComponent/HeaderProgramaComponent";
export default function Home({ resultado }) {
  const [finalData, setFinalData] = React.useState(resultado);
  const [finalDataBack, setFinalDataBack] = React.useState(resultado);
  const [finalDataDias, setFinalDataDias] = React.useState([]);
  const [finalDataHoras, setFinalDataHoras] = React.useState([]);
  const [valorBuscarDias, setValorBuscarDias] = React.useState("ALL");
  const [valorBuscarHoras, setValorBuscarHoras] = React.useState("");
  React.useEffect(() => {
    readRemoteFile(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRD9cIlCpdnkkljkwj38m-H9N_QfiYAFvqoCzHXttDyoNQLzxFcFuQgVtB7nVWfUA/pub?output=csv",
      {
        header: true,
        complete: (results) => {
          debugger;
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

          const uniqueArr = [...new Set(results.data.map((data) => data.Dia))];

          const uniqueArrHoras = [
            ...new Set(results.data.map((data) => data.Hora)),
          ];

          function dateToNum(d) {
            // Convert date "26/06/2016" to 20160626
            d = d.split("/");
            return Number(d[2] + d[1] + d[0]);
          }

          uniqueArr.sort(function (a, b) {
            return dateToNum(a) - dateToNum(b);
          });

          debugger;
          uniqueArr.push("ALL");
          uniqueArrHoras.push("ALL");

          setFinalDataDias(uniqueArr);
          setFinalDataHoras(uniqueArrHoras);

          setFinalData(results.data);

          // results.data.pop();

          //  console.log(results.data);
        },
      }
    );
  }, [valorBuscarDias]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Programa 34 - Girona Film Festival</title>
        <meta name="description" content={"Girona Film Festival Programa 34"} />
        <link
          rel="icon"
          type="image/png"
          href="https://www.gironafilmfestival.com/wp-content/uploads/2022/08/logo-girona-film-festival.png"
        />
      </Head>
      <HeaderProgramaComponent />

      <div className="container sticky-top">
        <SearchInAllWebComponent />
      </div>
      <div className="container mt-5">
        <div className="row">
          {finalData.map((pelicula, index) => (
            <div className="col-sm-3 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <img
                    src={
                      pelicula["Fotograma"] === "" ||
                      pelicula["Fotograma"] === "."
                        ? "https://www.gironafilmfestival.com/wp-content/uploads/2022/09/Sin-titulo-1920-??-1080-px.png"
                        : pelicula["Fotograma"]
                    }
                    className="w-100 mb-2 imagen_1_1"
                    alt={pelicula["Project Title"]}
                  />
                  <h5 className="card-title">
                    {pelicula["Project Title"].substring(0, 40).slice(0, 25) +
                      "..."}
                  </h5>
                  <h6 className="card-title">
                    {pelicula["Project Title (Original Language)"]
                      .substring(0, 40)
                      .slice(0, 25) + "..."}
                  </h6>
                  <p className="card-text">
                    {pelicula["Directors"] === "" ? null : (
                      <>{pelicula["Directors"]}</>
                    )}
                    <br />
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
                      className="d-none"
                      rel="noreferrer"
                      style={{ color: "#800142", textDecoration: "none" }}
                    >
                      <ConfirmationNumberIcon fontSize="small" /> Buy Tickets
                    </a>
                  </p>
                </div>
                <div className="card-footer">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={"/movie/" + pelicula["id"]}
                      className="me-3"
                    >
                      <button
                        className="btn btn-sm btn-outline-success"
                        type="button"
                      >
                        Ver m??s... <VisibilityIcon fontSize="small" />
                      </button>
                    </a>
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
  const resultado = [];
  return {
    props: {
      resultado,
    },
  };
}
