import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { readRemoteFile } from "react-papaparse";

export default function Home({ resultado, titulo, description }) {
  const [finalData, setFinalData] = React.useState(resultado);

  debugger;
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

      {
        finalData.map((pelicula) => (
          <>
          
          </>
        ))
      }
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
function llamarPrograma() {
  return new Promise((resolve, reject) => {
    readRemoteFile(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXp8JGVc9gI0zo6uaMTVhAB-WnRqfv-hgmJkB6BJjqof-U7lLpNZ3F4hEwByL4PQwbh9j4F3ku2DOQ/pub?gid=607989452&single=true&output=csv",
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

          // results.data.pop();

          //  console.log(results.data);
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
