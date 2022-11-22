import React from "react";
import HeaderProgramaComponent from "../../components/HeaderProgramaComponent/HeaderProgramaComponent";
import { readRemoteFile } from "react-papaparse";
export default function Index({ resultado }) {
  const [finalData, setFinalData] = React.useState(resultado);

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
      <HeaderProgramaComponent />
      <div className="container">
        <div className="row">
          <div className="col-12 h2 text-white">Palmarés 34 GFF</div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {finalData.map((pelicula) => (
            <>
              <div className="col-12 mb-3 text-white">
                <img
                  src="https://www.gironafilmfestival.com/wp-content/uploads/2022/11/corona-de-laurel.png"
                  height={30}
                />
                <p className="fw-bold p-0 m-0 pb-1">{pelicula["Razon"]}</p>
                <h5 className="m-0 p-0 pb-1">
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
                <small>Director(s): {pelicula["Directors"]}</small>
                <br />
                <small>
                  Producer(s):{" "}
                  {pelicula["Producers"] == "." ? null : pelicula["Producers"]}
                </small>
                <br />
                <small>
                  {pelicula["Other Credits"] == "."
                    ? null
                    : pelicula["Other Credits"]}
                </small>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
