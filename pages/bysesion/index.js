import Head from "next/head";
import React from "react";
import Image from "next/image";
import { readRemoteFile } from "react-papaparse";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

import VisibilityIcon from "@mui/icons-material/Visibility";
import TimerIcon from "@mui/icons-material/Timer";
import FlagIcon from "@mui/icons-material/Flag";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SearchInAllWebComponent from "../../components/SearchInAllWebComponent/SearchInAllWebComponent";
import Link from "next/link";
export default function IndexByDates({ resultado }) {
  const [finalData, setFinalData] = React.useState(resultado);
  const [finalDataBack, setFinalDataBack] = React.useState(resultado);
  const [finalDataDias, setFinalDataDias] = React.useState([]);
  const [finalDataHoras, setFinalDataHoras] = React.useState([]);
  const [valorBuscarDias, setValorBuscarDias] = React.useState("ALL");
  const [valorBuscarHoras, setValorBuscarHoras] = React.useState("");

  React.useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "es",
        includedLanguages: "en,ms,ta,zh-CN", // include this for selected languages
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  console.log(finalData);

  React.useEffect(() => {
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

          let uniqueArr = [
            ...new Set(results.data.map((data) => data["Num. sesión"])),
          ];

          const uniqueArrHoras = [
            ...new Set(results.data.map((data) => data["Num. sesión"])),
          ];

          uniqueArr.sort(function (a, b) {
            return parseFloat(a) - parseFloat(b);
          });

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
    <div className={null}>
      <Head>
        <title>Programa 34 - Girona Film Festival</title>
        <meta name="description" content={"Girona Film Festival Programa 34"} />
        <link
          rel="icon"
          type="image/png"
          href="https://www.gironafilmfestival.com/wp-content/uploads/2022/08/logo-girona-film-festival.png"
        />
      </Head>

      <div className="container text-center mb-4 pt-5">
        <div className="row">
          <div className="col-12">
            <img
              src="https://www.gironafilmfestival.com/wp-content/uploads/2022/08/logo-blanco-girona.png"
              alt="Girona Logo"
            />
            <h6 className="text-white">Edición 34</h6>
            <h4 className="text-white">Programa</h4>
          </div>
        </div>
      </div>

      <div className="container sticky-top">
        <SearchInAllWebComponent />
      </div>

      <div className="container text-center mb-4 pt-5">
        <div className="row row-cols-md-7">
          {finalDataDias.map((dia) => (
            <React.Fragment key={dia}>
              {valorBuscarDias == dia ? (
                <div className="col mb-2">
                  <div
                    className="btn btn-sm btn-success w-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setValorBuscarDias(dia);
                    }}
                  >
                    {dia}
                  </div>
                </div>
              ) : (
                <div className="col mb-2">
                  <div
                    className="btn btn-sm btn-outline-success text-white w-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setValorBuscarDias(dia);
                    }}
                  >
                    {dia}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {finalData.map((pelicula, index) => (
            <React.Fragment key={index}>
              {pelicula["Num. sesión"] == valorBuscarDias ? (
                <div className="col-sm-4 mb-3" key={index}>
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
                        {pelicula["Project Title"]}
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
                          <ConfirmationNumberIcon fontSize="small" /> Buy
                          Tickets
                        </a>
                      </p>
                    </div>
                    <div className="card-footer">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link href={"/movie/" + pelicula["id"]} className="me-3">
                      <button
                        className="btn btn-sm btn-outline-success"
                        type="button"
                      >
                        Ver más... <VisibilityIcon fontSize="small" />
                      </button>
                    </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {valorBuscarDias == "ALL" ? (
                <div className="col-sm-4 mb-3" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <img
                        src={
                          pelicula["Fotograma"] == "" ||
                          pelicula["Fotograma"] == "."
                            ? "https://www.gironafilmfestival.com/wp-content/uploads/2022/09/Sin-titulo-1920-×-1080-px.png"
                            : pelicula["Fotograma"]
                        }
                        className="w-100 mb-2 imagen_1_1"
                        alt={pelicula["Project Title"]}
                      />
                      <h5 className="card-title">
                        {pelicula["Project Title"]
                          .substring(0, 40)
                          .slice(0, 25) + "..."}
                      </h5>
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
                          rel="noreferrer"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          <ConfirmationNumberIcon fontSize="small" /> Buy
                          Tickets
                        </a>
                      </p>
                    </div>
                    <div className="card-footer">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link href={"/movie/" + pelicula["id"]} className="me-3">
                      <button
                        className="btn btn-sm btn-outline-success"
                        type="button"
                      >
                        Ver más... <VisibilityIcon fontSize="small" />
                      </button>
                    </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </React.Fragment>
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
