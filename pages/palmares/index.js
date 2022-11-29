import React from "react";
import HeaderProgramaComponent from "../../components/HeaderProgramaComponent/HeaderProgramaComponent";
import { readRemoteFile } from "react-papaparse";
import Head from "next/head";

export default function Index({ resultado }) {
  const [finalData, setFinalData] = React.useState([]);

  const [valorBuscarDias, setValorBuscarDias] = React.useState("ALL");

  React.useEffect(() => {
    readRemoteFile(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRD9cIlCpdnkkljkwj38m-H9N_QfiYAFvqoCzHXttDyoNQLzxFcFuQgVtB7nVWfUA/pub?output=csv",
      {
        header: true,
        complete: (results) => {
          let contador = 1;
          for (const dato of results.data) {
            dato["id"] = contador;
            dato["Orden"] = parseInt(dato["Orden"]);
            contador++;
          }

          const optionsSelected = [];

          results.data.sort(function (a, b) {
            if (a["Orden"] < b["Orden"]) {
              return -1;
            }
            if (a["Orden"] > b["Orden"]) {
              return 1;
            }
            return 0;
          });

          let palmaresData = [];

          for (const pelicula of results.data) {
            if (
              pelicula["Reconocimiento"] == "1" ||
              pelicula["Reconocimiento"] == "1"
            ) {
              palmaresData.push(pelicula);
            }
          }
          setFinalData(palmaresData);
          // results.data.pop();
          console.log(palmaresData);
        },
      }
    );
  }, [valorBuscarDias]);

  return (
    <>
      <Head>
        <title>34 Girona Film Festival - Palmarés</title>
        <meta
          name="description"
          content="34 Girona Film Festival - Consulta los Ganadores 2022"
        ></meta>
        <meta
          name="og:title"
          property="og:title"
          content="34 Girona Film Festival - Consulta los Ganadores 2022"
        ></meta>
        <meta name="robots" content="index, follow"></meta>
        <link href="URL" rel="canonical"></link>
        <link
          rel="icon"
          type="image/png"
          href="https://www.gironafilmfestival.com/wp-content/uploads/2022/08/logo-girona-film-festival.png"
        />
      </Head>

      <HeaderProgramaComponent />
      <div className="container mb-4">
        <div className="row">
          <div className="col-12 h2 text-white">Palmarés 34 GFF</div>
        </div>
      </div>

      <div className="container">
        {finalData.map((pelicula, index) => (
          <React.Fragment key={index}>
            <div className="row d-flex align-items-center">
              <div className="col-md-1">
                <img src={pelicula["Cartel"]} alt="Ganador" className="w-100" />
              </div>
              <div className="col-md-11 mb-3 text-white">
                <img
                  src="https://www.gironafilmfestival.com/wp-content/uploads/2022/11/corona-de-laurel.png"
                  height={30}
                />
                <p className="fw-bold p-0 m-0">{pelicula["Razon"]}</p>
                <h5 className="m-0 p-0">
                  {pelicula["Project Title"]}
                  <small>
                    {pelicula["Project Title (Original Language)"] ==
                    "." ? null : (
                      <>
                        {" "}
                        <br />
                        {pelicula["Project Title (Original Language)"]}
                      </>
                    )}
                  </small>
                </h5>

                <small>{pelicula["Submission Categories"]}</small>
                <br />
                <small>{pelicula["Country of Origin"]}</small>
                <br />
                <small>Director(s): {pelicula["Directors"]}</small>
                <br />
                <small>
                  Producer(s):
                  {pelicula["Producers"] == "." ? null : pelicula["Producers"]}
                </small>
                <br />
                <small>
                  {pelicula["Other Credits"] == "."
                    ? null
                    : pelicula["Other Credits"]}
                </small>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
