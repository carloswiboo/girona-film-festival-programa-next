import React from "react";
import { useRouter } from "next/router";
import { readRemoteFile } from "react-papaparse";
import HeaderProgramaComponent from "../../components/HeaderProgramaComponent/HeaderProgramaComponent";
import "./id.module.css";
import { DateTime } from "luxon";
const MovieDetailScreen = ({ resultado }) => {
  const [finalData, setFinalData] = React.useState(resultado);
  const router = useRouter();
  const { id } = router.query;
  console.log(finalData);
  return (
    <React.Fragment>
      <HeaderProgramaComponent />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img
              src={
                resultado["Cartel"] === "" || resultado["Cartel"] === "."
                  ? "https://www.gironafilmfestival.com/wp-content/uploads/2022/09/Sin-titulo-1920-×-1080-px.png"
                  : resultado["Cartel"]
              }
              className="w-100 mb-2"
              alt={resultado["Project Title"]}
            />
            <img
              src={
                resultado["Fotograma"] === "" || resultado["Fotograma"] === "."
                  ? "https://www.gironafilmfestival.com/wp-content/uploads/2022/09/Sin-titulo-1920-×-1080-px.png"
                  : resultado["Fotograma"]
              }
              className="w-100 mb-2 imagen_1_1"
              alt={resultado["Project Title"]}
            />
          </div>
          <div className="col-md-9 text-white">
            <h3>{resultado["Project Title"]}</h3>
            {resultado["Project Title (Original Language)"] == "." ? null : (
              <h3>{resultado["Project Title (Original Language)"]}</h3>
            )}
            {resultado["Dia"] == "." ? null : <h4>{resultado["Dia"]}</h4>}
            {resultado["Hora"] == "." ? null : <h4>{resultado["Hora"]}</h4>}
            {resultado["Country of Origin"] == "." ? null : (
              <p>{resultado["Country of Origin"]}</p>
            )}
            {resultado["Directors"] == "." ? null : (
              <p>{resultado["Directors"]}</p>
            )}
            {resultado["Duration OK"] == "." ? null : (
              <p>{resultado["Duration OK"]}</p>
            )}
            {resultado["Producers"] == "." ? null : (
              <p>{resultado["Producers"]}</p>
            )}
            {resultado["Writers"] == "." ? null : <p>{resultado["Writers"]}</p>}
          </div>
        </div>
      </div>
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
