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

  debugger;

  const { id } = router.query;
  console.log(finalData);
  return (
    <React.Fragment>
      <Head>
        <title>{resultado["Project Title"]} - Girona Film Festival 34</title>
        <meta name="description" content={"Girona Film Festival Programa 34"} />
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
          content={"GFF 8 al 13 Noviembre 2022"}
        />
      </Head>
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
              <p><strong>País</strong> {resultado["Country of Origin"]}</p>
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
              url={"https://programa.gironafilmfestival.com" + router.asPath}
            >
              <LinkedinIcon size={30} />
            </LinkedinShareButton>
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
